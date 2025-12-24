// app/api/upload-ttd/route.ts
import { NextResponse } from "next/server";
import { getImageExt, parseDriveError, sanitizeBaseName, uploadImageToDrive } from "@/lib/drive";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"]);

const RL_WINDOW_MS = 60_000;
const RL_MAX = 12;
const rateMap = new Map<string, { count: number; resetAt: number }>();

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

export async function POST(req: Request) {
  const ip = getIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, message: "Terlalu banyak upload. Coba lagi sebentar ya." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec || 60) } }
    );
  }

  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ ok: false, message: "Invalid content-type" }, { status: 415 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("file");
    if (files.length !== 1) {
      return NextResponse.json({ ok: false, message: "Wajib unggah 1 file." }, { status: 400 });
    }

    const file = files[0];
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, message: "File tidak valid." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ ok: false, message: "Format file harus JPG/PNG." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, message: "Ukuran file melebihi 4MB." }, { status: 400 });
    }

    const fullName = String(formData.get("full_name") || "").trim();
    if (!fullName) {
      return NextResponse.json({ ok: false, message: "Nama lengkap wajib diisi." }, { status: 400 });
    }

    const folderId = process.env.GOOGLE_DRIVE_TTD_UPLOAD_FOLDER_ID;
    if (!folderId) {
      return NextResponse.json({ ok: false, message: "Folder TTD belum dikonfigurasi." }, { status: 500 });
    }

    const baseName = sanitizeBaseName(fullName);
    const ext = getImageExt(file.type);
    if (!ext) {
      return NextResponse.json({ ok: false, message: "Format file tidak didukung." }, { status: 400 });
    }

    const name = `${baseName} - TTD.${ext}`;
    const data = await uploadImageToDrive({ file, folderId, name });

    return NextResponse.json({
      ok: true,
      fileId: data.id,
      webViewLink: data.webViewLink,
      name: data.name,
      size: Number(data.size || file.size),
    });
  } catch (err: any) {
    const parsed = parseDriveError(err);
    return NextResponse.json(
      { ok: false, message: parsed.message, code: parsed.code },
      { status: parsed.status }
    );
  }
}
