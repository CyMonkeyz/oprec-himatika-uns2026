// app/api/submit/route.ts
import { NextResponse } from "next/server";
import { SubmitSchema, type SubmitPayload } from "@/lib/schema";
import { appendRowToSheet } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ===== Rate limit sederhana (memory, cukup untuk Vercel free) =====
const RL_WINDOW_MS = 60_000;
const RL_MAX = 20;

const rateMap = new Map<string, { count: number; resetAt: number }>();
const idemMap = new Map<string, number>();

function getIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const cur = rateMap.get(ip);

  if (!cur || now > cur.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
    return { ok: true };
  }

  if (cur.count >= RL_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((cur.resetAt - now) / 1000) };
  }

  cur.count += 1;
  rateMap.set(ip, cur);
  return { ok: true };
}

function isTooFast(draftStartedAt?: number) {
  if (!draftStartedAt) return false; // jangan bikin keras; masih dev-friendly
  const dt = Date.now() - draftStartedAt;
  return dt >= 0 && dt < 8000; // < 8 detik dianggap bot-ish
}

function normalizeText(s: string) {
  return (s || "").trim().replace(/\s+/g, " ");
}

function safeJson(obj: unknown) {
  try {
    return JSON.stringify(obj);
  } catch {
    return "";
  }
}

/**
 * Urutan kolom row harus sama dengan header sheet kamu.
 * (Kamu bilang sudah hapus kolom "alasan pilih 3", jadi row ini tidak menyertakan itu.)
 */
function buildRow(payload: SubmitPayload, meta: { ip: string; ua: string }) {
  const submittedAt = new Date().toISOString();

  // Pick 3 -> 3 kolom
  const [p1, p2, p3] = payload.dept.pick_3;

  // Cases -> simpan sebagai JSON string (lebih aman dan tidak bikin 18 kolom)
  // bentuk: { "UNIT_ID": { "UNIT-Q1":"A", ... } }
  const casesCompact = payload.caseAnswers ?? {};

  // Work values
  const workValues = (payload.essays.work_values || []).join(" | ");

  return [
    submittedAt,

    payload.bio.full_name,
    payload.bio.preferred_name || "",
    payload.bio.nim,
    payload.bio.angkatan,
    payload.bio.hometown,
    payload.bio.current_residence,
    payload.bio.contact,

    payload.transport.mode,
    payload.transport.offline_flex,

    payload.commitment.scenario,
    payload.commitment.scenario_detail || "",
    payload.commitment.comms,
    payload.commitment.comms_detail || "",
    payload.commitment.consistency,
    payload.commitment.consistency_detail || "",

    p1,
    p2,
    p3,

    safeJson(casesCompact),

    payload.essays.constraints_mitigation,
    payload.essays.growth_hope,
    payload.essays.growth_detail || "",
    workValues,

    payload.twibbon.proof_file_id,
    payload.twibbon.proof_view_link || "",
    payload.twibbon.proof_file_name || "",
    payload.ttd.file_id,
    payload.ttd.view_link || "",
    payload.ttd.file_name || "",

    payload.idempotencyKey || "",
    meta.ip,
    meta.ua,
  ].map((v) => (typeof v === "string" ? normalizeText(v) : v));
}

export async function POST(req: Request) {
  const ip = getIp(req);
  const ua = req.headers.get("user-agent") || "";

  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, message: "Terlalu sering submit. Coba lagi sebentar ya." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec || 60) } }
    );
  }

  // Only JSON
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return NextResponse.json({ ok: false, message: "Invalid content-type" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = SubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Data belum lengkap / tidak valid.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const payload = parsed.data;

  // Honeypot
  if (payload.hp && payload.hp.trim().length > 0) {
    return NextResponse.json({ ok: false, message: "Spam detected." }, { status: 400 });
  }

  // Too fast submit
  if (isTooFast(payload.draftStartedAt)) {
    return NextResponse.json({ ok: false, message: "Terlalu cepat. Coba isi santai ya 🙂" }, { status: 400 });
  }

  // Idempotency (simple)
  const idem = payload.idempotencyKey || "";
  if (idem) {
    const last = idemMap.get(idem);
    const now = Date.now();
    if (last && now - last < 5 * 60_000) {
      return NextResponse.json({ ok: true, message: "Already submitted" }, { status: 200 });
    }
    idemMap.set(idem, now);
  }

  // Append to sheet
  try {
    const row = buildRow(payload, { ip, ua });
    await appendRowToSheet(row);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message || "Gagal menulis ke spreadsheet." },
      { status: 500 }
    );
  }
}
