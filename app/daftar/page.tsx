// app/daftar/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Path } from "react-hook-form";

import { UNITS, type UnitId } from "@/content/units";
import { OPTIONS, type OptionItem } from "@/content/options";

// =====================
// Types
// =====================
type CaseKey = "A" | "B" | "C" | "D" | "";
type CaseQuestion = {
  id: string;
  title: string;
  situation: string;
  question: string;
  options: Record<"A" | "B" | "C" | "D", string>;
};
type CasesBank = Record<string, CaseQuestion[]>;

type FormValues = {
  hp?: string;

  bio: {
    full_name: string;
    preferred_name?: string;
    nim: string;
    angkatan: string;
    hometown: string;
    current_residence: string;
    contact: string;
  };

  transport: {
    mode: string;
    offline_flex: string; // "1".."5"
  };

  commitment: {
    scenario: string;
    scenario_detail?: string;

    comms: string;
    comms_detail?: string;

    consistency: string;
    consistency_detail?: string;
  };

  dept: {
    pick_3: UnitId[];
  };

  caseAnswers: Record<string, Record<string, CaseKey>>;

  essays: {
    constraints_mitigation: string; // penting
    growth_hope: string; // pilihan ganda (boleh ada "LAINNYA")
    growth_detail?: string;
    work_values: string[]; // max 3
  };

  consent_data: boolean;
};

// =====================
// Constants
// =====================
const DRAFT_KEY = "oprec_himatika_2026_draft_v7";
const TAGLINE = "Syncronized Growth, Reaching New heights";
const LOGO_SRC = "/HimatikaLogo.png";
const CASES_PER_PACK = 5;
const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || "";

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => number;
      reset: (id?: number) => void;
    };
  }
}

type StepDef =
  | {
      kind: "base";
      key: "bio" | "transport" | "work" | "pick" | "essay" | "review";
      title: string;
      fields: Array<Path<FormValues>>;
      comfortHint?: string;
    }
  | {
      kind: "case";
      key: string;
      title: string;
      unitId: UnitId;
      packIndex: number;
      packTotal: number;
    };

// =====================
// Helpers
// =====================
function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

function safeLoadDraft(): Partial<FormValues> | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveDraft(values: unknown) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
  } catch {}
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
}

function genKey(len = 24) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function shuffleOnce<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function hasLainnya(list: readonly OptionItem[]) {
  return list.some((o) => o.value === "LAINNYA");
}

// =====================
// UI atoms (light + pretty)
// =====================
function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1", className)} aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce" />
    </span>
  );
}

function ShimmerLine({ w = "w-full" }: { w?: string }) {
  return (
    <div
      className={cx(
        "h-3 rounded-full bg-white/10 overflow-hidden relative",
        w
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

function SoftButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "rounded-2xl px-5 py-2 text-sm font-semibold transition active:scale-[0.99]",
        variant === "primary" &&
          "border border-white/15 bg-white/10 text-white hover:bg-white/15 active:bg-white/20",
        variant === "ghost" &&
          "border border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06] active:bg-white/[0.09]",
        disabled && "opacity-60 cursor-not-allowed active:scale-100"
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  helper,
  error,
  name,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5" data-field={name}>
      <div className="flex items-end justify-between gap-3">
        <div className="text-sm font-medium text-white/90">{label}</div>
        {helper ? <div className="text-xs text-white/50">{helper}</div> : null}
      </div>
      {children}
      {error ? <div className="text-xs text-rose-300">{error}</div> : null}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const invalid = props["aria-invalid"];
  return (
    <input
      {...props}
      className={cx(
        "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none",
        "placeholder:text-white/35 focus:border-white/25 focus:ring-2 focus:ring-white/10",
        invalid && "border-rose-400/70 focus:border-rose-300 focus:ring-rose-400/20",
        props.className
      )}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const invalid = props["aria-invalid"];
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none",
        "placeholder:text-white/35 focus:border-white/25 focus:ring-2 focus:ring-white/10",
        invalid && "border-rose-400/70 focus:border-rose-300 focus:ring-rose-400/20",
        props.className
      )}
    />
  );
}

function ChoiceCard({
  active,
  disabled,
  hasError,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "w-full rounded-2xl border px-4 py-3 text-left transition",
        active
          ? "border-white/25 bg-white/10"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
        hasError && "border-rose-400/70 bg-rose-500/10",
        disabled && "opacity-50 cursor-not-allowed hover:bg-white/[0.03]"
      )}
    >
      {children}
    </button>
  );
}

function TinyBreak({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.06] grid place-items-center">
          <span className="text-lg">☁️</span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white/85">{title}</div>
          <div className="mt-1 text-xs text-white/55 leading-relaxed">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-white/40 transition-[width] duration-300" style={{ width: `${v}%` }} />
    </div>
  );
}

// =====================
// Page
// =====================
export default function DaftarPage() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [casesBank, setCasesBank] = useState<CasesBank | null>(null);
  const [caseOrder, setCaseOrder] = useState<UnitId[] | null>(null);
  const [caseErrors, setCaseErrors] = useState<Record<string, boolean>>({});

  const [draftFound, setDraftFound] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [bannerMsg, setBannerMsg] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const submitLock = useRef(false);
  const saveTimer = useRef<number | null>(null);
  const saveStatusTimer = useRef<number | null>(null);
  const captchaContainerRef = useRef<HTMLDivElement | null>(null);
  const captchaWidgetId = useRef<number | null>(null);
  const pendingScrollField = useRef<string | null>(null);

  const draftStartedAt = useRef<number>(Date.now());
  const idempotencyKey = useRef<string>(genKey());

  const form = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      hp: "",
      bio: {
        full_name: "",
        preferred_name: "",
        nim: "",
        angkatan: "",
        hometown: "",
        current_residence: "",
        contact: "",
      },
      transport: { mode: "", offline_flex: "" },
      commitment: {
        scenario: "",
        scenario_detail: "",
        comms: "",
        comms_detail: "",
        consistency: "",
        consistency_detail: "",
      },
      dept: { pick_3: [] },
      caseAnswers: {},
      essays: {
        constraints_mitigation: "",
        growth_hope: "",
        growth_detail: "",
        work_values: [],
      },
      consent_data: false,
    },
    shouldUnregister: false,
  });

  const {
    register,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  // draft detect
  useEffect(() => {
    const d = safeLoadDraft();
    if (d) setDraftFound(true);
  }, []);

  // autosave
  useEffect(() => {
    const sub = watch((v) => {
      setSaveStatus("saving");
      if (saveTimer.current) window.clearTimeout(saveTimer.current);

      saveTimer.current = window.setTimeout(() => {
        saveDraft(v);
        setSaveStatus("saved");
        if (saveStatusTimer.current) window.clearTimeout(saveStatusTimer.current);
        saveStatusTimer.current = window.setTimeout(() => setSaveStatus("idle"), 1400);
      }, 400);
    });

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      if (saveStatusTimer.current) window.clearTimeout(saveStatusTimer.current);
      sub.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    if (!HCAPTCHA_SITEKEY) return;
    let cancelled = false;

    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        if (document.getElementById("hcaptcha-script")) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.id = "hcaptcha-script";
        script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("HCaptcha failed"));
        document.body.appendChild(script);
      });

    ensureScript()
      .then(() => {
        if (cancelled || !captchaContainerRef.current || captchaWidgetId.current !== null) return;
        if (!window.hcaptcha) {
          setCaptchaError("Captcha gagal dimuat. Coba refresh ya.");
          return;
        }
        captchaWidgetId.current = window.hcaptcha.render(captchaContainerRef.current, {
          sitekey: HCAPTCHA_SITEKEY,
          callback: (token: string) => {
            setCaptchaToken(token);
            setCaptchaError("");
          },
          "expired-callback": () => {
            setCaptchaToken("");
          },
          "error-callback": () => {
            setCaptchaToken("");
            setCaptchaError("Captcha gagal dimuat. Coba refresh ya.");
          },
        });
      })
      .catch(() => {
        if (!cancelled) setCaptchaError("Captcha gagal dimuat. Coba refresh ya.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pick3Live = watch("dept.pick_3");
  const commitScenario = watch("commitment.scenario");
  const commitComms = watch("commitment.comms");
  const commitConsistency = watch("commitment.consistency");
  const growthHope = watch("essays.growth_hope");
  const workValues = watch("essays.work_values");

  // enforce max 3 work values
  useEffect(() => {
    if (!workValues) return;
    if (workValues.length <= 3) return;
    setValue("essays.work_values", workValues.slice(0, 3), { shouldValidate: true });
    setBannerMsg("Maksimal pilih 3 nilai kerja ya 🙂");
  }, [workValues, setValue]);

  const baseSteps: StepDef[] = useMemo(
    () => [
      {
        kind: "base",
        key: "bio",
        title: "Biodata",
        fields: [
          "bio.full_name",
          "bio.nim",
          "bio.angkatan",
          "bio.hometown",
          "bio.current_residence",
          "bio.contact",
        ],
        comfortHint: "HALOO!! Calon keluarga HIMATIKA FMIPA UNS 2026! Hayuk bergabung dan berkontribusi dari dalem untuk prodi kita tercinta. Siap buat di tempa? kalo iya, si dengan baik ya. Draft tersimpan otomatis.",
      },
      {
        kind: "base",
        key: "transport",
        title: "Transportasi",
        fields: ["transport.mode", "transport.offline_flex"],
        comfortHint: "Biar kami paham fleksibilitas offline kamu.",
      },
      {
        kind: "base",
        key: "work",
        title: "Gaya Kerja",
        fields: ["commitment.scenario", "commitment.comms", "commitment.consistency"],
        comfortHint: "Tidak ada jawaban paling benar—yang jujur paling membantu.",
      },
      {
        kind: "base",
        key: "pick",
        title: "Pilih 3",
        fields: [],
        comfortHint: "Setelah ini kamu dapat 3 paket studi kasus (tanpa judul bidang).",
      },
    ],
    []
  );

  // create dynamic case steps (3 slide) after pick_3 valid & (optionally) shuffled
  const caseUnits: UnitId[] = useMemo(() => {
    const chosen = (caseOrder && caseOrder.length === 3 ? caseOrder : pick3Live) || [];
    return chosen.slice(0, 3) as UnitId[];
  }, [pick3Live, caseOrder]);

  const tailSteps: StepDef[] = useMemo(
    () => [
      {
        kind: "base",
        key: "essay",
        title: "Pertanyaan Inti",
        fields: ["essays.constraints_mitigation", "essays.growth_hope"],
        comfortHint: "Terakhir—habis ini tinggal review & kirim.",
      },
      {
        kind: "base",
        key: "review",
        title: "Review & Kirim",
        fields: ["consent_data"],
        comfortHint: "Cek cepat. Kalau sudah oke, kirim.",
      },
    ],
    []
  );

  const caseSteps: StepDef[] = useMemo(() => {
    if (caseUnits.length !== 3) return [];
    return caseUnits.map((unitId, idx) => ({
      kind: "case" as const,
      key: `case-${idx + 1}`,
      title: "Studi Kasus",
      unitId,
      packIndex: idx + 1,
      packTotal: 3,
    }));
  }, [caseUnits]);

  const steps: StepDef[] = useMemo(() => [...baseSteps, ...caseSteps, ...tailSteps], [baseSteps, caseSteps, tailSteps]);

  const currentStep = steps[current];

  // lazy load cases when entering a case step
  useEffect(() => {
    if (!currentStep || currentStep.kind !== "case") return;
    if (casesBank) return;

    import("@/content/cases")
      .then((m) => setCasesBank((m as any).CASES as CasesBank))
      .catch(() => setBannerMsg("Gagal memuat studi kasus. Coba refresh halaman ya."));
  }, [currentStep, casesBank]);

  // keep current safe
  useEffect(() => {
    if (current > steps.length - 1) setCurrent(steps.length - 1);
  }, [current, steps.length]);

  const progressPct = Math.round(((current + 1) / steps.length) * 100);

  function requestScrollToField(field: string) {
    pendingScrollField.current = field;
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      const el = document.querySelector(`[data-field="${field}"]`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      pendingScrollField.current = null;
    });
  }

  function getErrorAtPath(err: any, path: string) {
    return path.split(".").reduce((acc, key) => acc?.[key], err);
  }

  function scrollToFirstInvalid(fields: Array<Path<FormValues> | string>) {
    for (const field of fields) {
      if (getErrorAtPath(errors, String(field))) {
        requestScrollToField(String(field));
        return;
      }
    }
  }

  function loadDraft() {
    const d = safeLoadDraft();
    if (!d) {
      setDraftFound(false);
      return;
    }
    reset({ ...getValues(), ...d });
    setDraftFound(false);
    setBannerMsg("Draft dimuat ✅");
  }

  function startNew() {
    clearDraft();
    router.refresh();
  }

  function validatePick3Exact() {
    const chosen = getValues("dept.pick_3") || [];
    if (chosen.length !== 3) {
      setError("dept.pick_3" as any, { type: "manual", message: "Pilih tepat 3 ya." });
      setBannerMsg("Pilih tepat 3 biro/bidang dulu ya 🙂");
      requestScrollToField("dept.pick_3");
      return false;
    }
    clearErrors("dept.pick_3" as any);
    return true;
  }

  function ensureCaseOrderOnce() {
    if (caseOrder && caseOrder.length === 3) return;
    const chosen = getValues("dept.pick_3") || [];
    if (chosen.length !== 3) return;
    setCaseOrder(shuffleOnce(chosen));
  }

  function getCaseAnsweredCount(unitId: UnitId, ids: string[]) {
    const map = (getValues(`caseAnswers.${unitId}` as any) || {}) as Record<string, CaseKey>;
    let c = 0;
    for (const qid of ids) {
      const v = map[qid];
      if (v === "A" || v === "B" || v === "C" || v === "D") c++;
    }
    return c;
  }

  function validateCasePack(unitId: UnitId) {
    if (!casesBank) {
      setBannerMsg("Studi kasus belum termuat. Tunggu sebentar ya…");
      return false;
    }
    const list = (casesBank[unitId] || []).slice(0, CASES_PER_PACK);
    const ids = list.map((q) => q.id);
    const count = getCaseAnsweredCount(unitId, ids);

    if (list.length === 0) {
      setBannerMsg("Studi kasus untuk pilihan ini belum ditemukan. (Cek key CASES vs UNITS.id)");
      return false;
    }
    if (count < CASES_PER_PACK) {
      setBannerMsg(`Slide ini wajib terjawab ${CASES_PER_PACK}/${CASES_PER_PACK} dulu ya 🙂`);
      setCaseErrors((prev) => {
        const next = { ...prev };
        for (const id of ids) {
          const v = (getValues(`caseAnswers.${unitId}.${id}` as any) || "") as CaseKey;
          const key = `${unitId}:${id}`;
          next[key] = v !== "A" && v !== "B" && v !== "C" && v !== "D";
        }
        return next;
      });
      const firstMissing = ids.find((id) => {
        const v = (getValues(`caseAnswers.${unitId}.${id}` as any) || "") as CaseKey;
        return v !== "A" && v !== "B" && v !== "C" && v !== "D";
      });
      if (firstMissing) requestScrollToField(`caseAnswers.${unitId}.${firstMissing}`);
      return false;
    }
    return true;
  }

  async function goNext() {
    setBannerMsg("");

    if (!currentStep) return;

    // pick step: enforce exact 3 + shuffle case order once
    if (currentStep.kind === "base" && currentStep.key === "pick") {
      if (!validatePick3Exact()) return;
      ensureCaseOrderOnce();
    }

    // case step: enforce 5/5
    if (currentStep.kind === "case") {
      const ok = validateCasePack(currentStep.unitId);
      if (!ok) return;
      setCurrent((c) => Math.min(c + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // base step: trigger validations
    if (currentStep.kind === "base" && currentStep.fields.length) {
      const ok = await trigger(currentStep.fields as any, { shouldFocus: true });
      if (!ok) {
        scrollToFirstInvalid(currentStep.fields);
        return;
      }
    }

    setCurrent((c) => Math.min(c + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setBannerMsg("");
    setCurrent((c) => Math.max(c - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function RadioGroup({
    name,
    options,
    requiredMsg,
    includeLainnyaIfMissing = false,
    hasError,
  }: {
    name: Path<FormValues> | string;
    options: readonly OptionItem[];
    requiredMsg: string;
    includeLainnyaIfMissing?: boolean;
    hasError?: boolean;
  }) {
    const v = watch(name as any) as string;

    return (
      <div
        className={cx(
          "mt-2 grid grid-cols-1 gap-2",
          hasError && "rounded-2xl border border-rose-400/70 bg-rose-500/10 p-2"
        )}
      >
        {options.map((opt) => {
          const active = v === opt.value;
          return (
            <ChoiceCard key={opt.value} active={active} onClick={() => setValue(name as any, opt.value, { shouldValidate: true })}>
              <div className="flex items-start gap-3">
                <div
                  className={cx(
                    "mt-0.5 h-5 w-5 shrink-0 rounded-full border",
                    active ? "border-white/60 bg-white/20" : "border-white/20"
                  )}
                  aria-hidden
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white/90">{opt.label}</div>
                  {opt.desc ? <div className="mt-0.5 text-xs text-white/55">{opt.desc}</div> : null}
                </div>
              </div>
              <input
                className="sr-only"
                type="radio"
                value={opt.value}
                {...register(name as any, { required: requiredMsg })}
              />
            </ChoiceCard>
          );
        })}

        {includeLainnyaIfMissing && !hasLainnya(options) && (
          <ChoiceCard
            active={v === "LAINNYA"}
            onClick={() => setValue(name as any, "LAINNYA", { shouldValidate: true })}
          >
            <div className="flex items-start gap-3">
              <div
                className={cx(
                  "mt-0.5 h-5 w-5 shrink-0 rounded-full border",
                  v === "LAINNYA" ? "border-white/60 bg-white/20" : "border-white/20"
                )}
                aria-hidden
              />
              <div className="text-sm font-medium text-white/90">Lainnya</div>
            </div>
            <input className="sr-only" type="radio" value="LAINNYA" {...register(name as any, { required: requiredMsg })} />
          </ChoiceCard>
        )}
      </div>
    );
  }

  async function finalSubmit() {
    if (submitLock.current) return;
    submitLock.current = true;

    setSubmitting(true);
    setBannerMsg("");

    try {
      // quick validations
      const okConsent = await trigger(["consent_data"] as any, { shouldFocus: true });
      if (!okConsent) {
        setCurrent(steps.findIndex((s) => s.kind === "base" && s.key === "review"));
        requestScrollToField("consent_data");
        return;
      }

      if (!validatePick3Exact()) {
        setCurrent(steps.findIndex((s) => s.kind === "base" && s.key === "pick"));
        return;
      }

      if (HCAPTCHA_SITEKEY && !captchaToken) {
        setBannerMsg("Captcha dibutuhkan.");
        return;
      }

      // ensure cases loaded for validation
      let bank = casesBank;
      if (!bank) {
        const m = await import("@/content/cases");
        bank = (m as any).CASES as CasesBank;
      }

      const selected = (caseOrder && caseOrder.length === 3 ? caseOrder : getValues("dept.pick_3")) || [];
      for (const unitId of selected) {
        const list = (bank[unitId] || []).slice(0, CASES_PER_PACK);
        const ids = list.map((q) => q.id);
        const answered = getCaseAnsweredCount(unitId, ids);
        if (list.length === 0 || answered < CASES_PER_PACK) {
          setBannerMsg("Masih ada studi kasus yang belum lengkap. Cek lagi ya 🙂");
          // jump to first problematic pack
          const packIdx = selected.findIndex((u) => u === unitId);
          const idx = steps.findIndex((s) => s.kind === "case" && (s as any).packIndex === packIdx + 1);
          if (idx >= 0) setCurrent(idx);
          setCaseErrors((prev) => {
            const next = { ...prev };
            for (const id of ids) {
              const v = (getValues(`caseAnswers.${unitId}.${id}` as any) || "") as CaseKey;
              const key = `${unitId}:${id}`;
              next[key] = v !== "A" && v !== "B" && v !== "C" && v !== "D";
            }
            return next;
          });
          const firstMissing = ids.find((id) => {
            const v = (getValues(`caseAnswers.${unitId}.${id}` as any) || "") as CaseKey;
            return v !== "A" && v !== "B" && v !== "C" && v !== "D";
          });
          if (firstMissing) requestScrollToField(`caseAnswers.${unitId}.${firstMissing}`);
          return;
        }
      }

      // submit
      const values = getValues();

      const payload: any = {
        ...values,
        dept: { pick_3: values.dept.pick_3 },
        // anti-spam meta (dev-friendly for now)
        draftStartedAt: draftStartedAt.current,
        idempotencyKey: idempotencyKey.current,
        captchaToken,
      };

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setBannerMsg(json?.message || "Gagal submit. Coba lagi ya.");
        return;
      }

      clearDraft();
      router.push("/sukses");
    } catch (e: any) {
      setBannerMsg(e?.message || "Network error");
    } finally {
      setSubmitting(false);
      submitLock.current = false;
    }
  }

  // =====================
  // Derived UI data
  // =====================
  const O: any = OPTIONS as any;

  const transportOptions: OptionItem[] = (O.transport_mode ?? O.transport ?? []) as OptionItem[];
  const offlineFlexOptions: string[] = (O.transport_offline_flex ?? ["1", "2", "3", "4", "5"]) as string[];

  const scenarioOptions: OptionItem[] = (O.commit_scenario ?? []) as OptionItem[];
  const commsOptions: OptionItem[] = (O.commit_comms ?? []) as OptionItem[];
  const consistencyOptions: OptionItem[] = (O.consistency_pattern ?? []) as OptionItem[];

  const growthOptions: OptionItem[] = (O.growth_hope ?? []) as OptionItem[];
  const workValueOptions: string[] = (O.work_values ?? []) as string[];

  const headerRight = useMemo(() => {
    if (saveStatus === "saving") return <span className="text-xs text-white/55">Menyimpan<LoadingDots className="ml-2" /></span>;
    if (saveStatus === "saved") return <span className="text-xs text-white/55">Tersimpan ✅</span>;
    return <span className="text-xs text-white/45">Draft aktif</span>;
  }, [saveStatus]);

  const breakCard = useMemo(() => {
    // kecil aja biar user nggak capek
    if (currentStep?.kind !== "base") return null;
    if (currentStep.key === "work") return <TinyBreak title="Kamu sudah jauh" desc={`Sedikit lagi. ${TAGLINE}`} />;
    if (currentStep.key === "essay") return <TinyBreak title="Almost there" desc="Tulis singkat dan spesifik. 4–6 kalimat cukup." />;
    return null;
  }, [currentStep, current]);

  useEffect(() => {
    if (!pendingScrollField.current) return;
    const el = document.querySelector(`[data-field="${pendingScrollField.current}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    pendingScrollField.current = null;
  }, [currentStep, caseErrors, errors]);

  // =====================
  // Render
  // =====================
  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(900px_500px_at_90%_20%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.98))] px-4 py-10 text-white">
      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          const el = e.target as HTMLElement | null;
          if (el?.tagName === "TEXTAREA") return;
          e.preventDefault();
        }}
      >
        <div className="mx-auto w-full max-w-2xl space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <Image src={LOGO_SRC} alt="HIMATIKA" fill className="object-contain p-2" priority />
              </div>
              <div>
                <div className="text-xs text-white/55">Open Recruitment</div>
                <div className="text-xl font-semibold tracking-tight">HIMATIKA FMIPA UNS 2026</div>
                <div className="mt-0.5 text-xs text-white/50">{TAGLINE}</div>
              </div>
            </div>
            <div className="text-right">
              {headerRight}
              <div className="mt-1 text-[11px] text-white/40">{progressPct}%</div>
            </div>
          </div>

          {/* Draft found */}
          {draftFound && (
            <GlassCard className="p-5">
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Image src={LOGO_SRC} alt="HIMATIKA" fill className="object-contain p-2" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white/90">Kami menemukan draft sebelumnya</div>
                  <div className="mt-1 text-xs text-white/55">
                    Mau lanjutkan? (Aman, tidak menghapus jawaban.)
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <SoftButton onClick={loadDraft}>Lanjutkan</SoftButton>
                    <SoftButton variant="ghost" onClick={startNew}>
                      Mulai baru
                    </SoftButton>
                    <SoftButton variant="ghost" onClick={() => setDraftFound(false)}>
                      Nanti
                    </SoftButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Banner */}
          {bannerMsg ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">{bannerMsg}</div>
                <button
                  type="button"
                  className="text-xs text-white/50 hover:text-white/70"
                  onClick={() => setBannerMsg("")}
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : null}

          {/* Progress */}
          <GlassCard className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-white/55">Progress</div>
                <div className="text-base font-semibold text-white">
                  {currentStep?.title ?? "—"}
                </div>
                <div className="mt-1 text-xs text-white/50">
                  {currentStep?.kind === "base"
                    ? currentStep.comfortHint
                    : `Jawab cepat, ${CASES_PER_PACK} pertanyaan saja di slide ini.`}
                </div>
              </div>
              <div className="text-xs text-white/55">
                {current + 1}/{steps.length}
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={progressPct} />
            </div>
          </GlassCard>

          {breakCard}

          {/* Content */}
          <GlassCard className="p-5">
            {/* honeypot */}
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("hp")} />

            {/* ========== STEP: BIODATA ========== */}
            {currentStep?.kind === "base" && currentStep.key === "bio" && (
              <div className="space-y-4">
                <Field label="Nama lengkap" error={(errors as any)?.bio?.full_name?.message} name="bio.full_name">
                  <TextInput
                    placeholder="Nama sesuai identitas"
                    aria-invalid={Boolean((errors as any)?.bio?.full_name)}
                    {...register("bio.full_name", {
                      required: "Wajib diisi ya",
                      minLength: { value: 2, message: "Minimal 2 karakter" },
                      maxLength: { value: 80, message: "Kepanjangan" },
                    })}
                  />
                </Field>

                <Field label="Nama panggilan" helper="Opsional" name="bio.preferred_name">
                  <TextInput placeholder="Boleh kosong" {...register("bio.preferred_name")} />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="NIM" error={(errors as any)?.bio?.nim?.message} name="bio.nim">
                    <TextInput
                      placeholder="M0xxxxxx"
                      aria-invalid={Boolean((errors as any)?.bio?.nim)}
                      {...register("bio.nim", { required: "Wajib diisi ya" })}
                    />
                  </Field>
                  <Field label="Angkatan" error={(errors as any)?.bio?.angkatan?.message} name="bio.angkatan">
                    <TextInput
                      placeholder="2024"
                      aria-invalid={Boolean((errors as any)?.bio?.angkatan)}
                      {...register("bio.angkatan", {
                        required: "Wajib diisi ya",
                        minLength: { value: 4, message: "Contoh: 2024" },
                        maxLength: { value: 4, message: "Contoh: 2024" },
                      })}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Asal" error={(errors as any)?.bio?.hometown?.message} name="bio.hometown">
                    <TextInput
                      placeholder="Kota/kabupaten asal"
                      aria-invalid={Boolean((errors as any)?.bio?.hometown)}
                      {...register("bio.hometown", { required: "Wajib diisi ya" })}
                    />
                  </Field>
                  <Field label="Domisili sekarang" error={(errors as any)?.bio?.current_residence?.message} name="bio.current_residence">
                    <TextInput
                      placeholder="Kota tempat tinggal sekarang"
                      aria-invalid={Boolean((errors as any)?.bio?.current_residence)}
                      {...register("bio.current_residence", { required: "Wajib diisi ya" })}
                    />
                  </Field>
                </div>

                <Field
                  label="Kontak aktif (Whatsapp)"
                  error={(errors as any)?.bio?.contact?.message}
                  helper="Untuk komunikasi panitia"
                  name="bio.contact"
                >
                  <TextInput
                    placeholder="08xxxx"
                    aria-invalid={Boolean((errors as any)?.bio?.contact)}
                    {...register("bio.contact", { required: "Wajib diisi ya" })}
                  />
                </Field>

                <div
                  className={cx(
                    "rounded-2xl border border-white/10 bg-white/[0.03] p-4",
                    (errors as any)?.dept?.pick_3 && "border-rose-400/70 bg-rose-500/10"
                  )}
                  data-field="dept.pick_3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                      <Image src={LOGO_SRC} alt="HIMATIKA" fill className="object-contain p-2" />
                    </div>
                    <div className="text-xs text-white/55">
                      Tip: kalau kamu harus berhenti, tutup tab aja—draft kamu aman tersimpan.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========== STEP: TRANSPORT ========== */}
            {currentStep?.kind === "base" && currentStep.key === "transport" && (
              <div className="space-y-4">
                <Field label="Transportasi utama" error={(errors as any)?.transport?.mode?.message} name="transport.mode">
                  <RadioGroup
                    name="transport.mode"
                    options={transportOptions}
                    requiredMsg="Pilih salah satu ya."
                    hasError={Boolean((errors as any)?.transport?.mode)}
                  />
                </Field>

                <Field
                  label="Seberapa fleksibel hadir offline?"
                  helper="1 = sulit, 5 = sangat fleksibel"
                  error={(errors as any)?.transport?.offline_flex?.message}
                  name="transport.offline_flex"
                >
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {offlineFlexOptions.map((v) => {
                      const active = watch("transport.offline_flex") === v;
                      return (
                        <ChoiceCard
                          key={v}
                          active={active}
                          hasError={Boolean((errors as any)?.transport?.offline_flex)}
                          onClick={() => setValue("transport.offline_flex", v, { shouldValidate: true })}
                        >
                          <div className="flex items-center justify-center">
                            <div className={cx("h-8 w-8 rounded-2xl grid place-items-center border",
                              active ? "border-white/40 bg-white/10" : "border-white/15 bg-white/[0.03]"
                            )}>
                              <span className="text-sm font-semibold">{v}</span>
                            </div>
                          </div>
                          <input className="sr-only" type="radio" value={v} {...register("transport.offline_flex", { required: "Pilih skala ya." })} />
                        </ChoiceCard>
                      );
                    })}
                  </div>
                </Field>
              </div>
            )}

            {/* ========== STEP: WORK ========== */}
            {currentStep?.kind === "base" && currentStep.key === "work" && (
              <div className="space-y-6">
                <Field
                  label="Kalau ada bentrok jadwal mendadak, kamu biasanya…"
                  error={(errors as any)?.commitment?.scenario?.message}
                  name="commitment.scenario"
                >
                  <RadioGroup
                    name="commitment.scenario"
                    options={scenarioOptions}
                    requiredMsg="Pilih salah satu ya."
                    includeLainnyaIfMissing
                    hasError={Boolean((errors as any)?.commitment?.scenario)}
                  />
                </Field>

                {commitScenario === "LAINNYA" && (
                  <Field label="Detail singkat" helper="Opsional" name="commitment.scenario_detail">
                    <TextInput placeholder="Tulis 1 kalimat" {...register("commitment.scenario_detail")} />
                  </Field>
                )}

                <Field
                  label="Kalau progres mulai melambat, pola komunikasimu…"
                  error={(errors as any)?.commitment?.comms?.message}
                  name="commitment.comms"
                >
                  <RadioGroup
                    name="commitment.comms"
                    options={commsOptions}
                    requiredMsg="Pilih salah satu ya."
                    includeLainnyaIfMissing
                    hasError={Boolean((errors as any)?.commitment?.comms)}
                  />
                </Field>

                {commitComms === "LAINNYA" && (
                  <Field label="Detail singkat" helper="Opsional" name="commitment.comms_detail">
                    <TextInput placeholder="Tulis 1 kalimat" {...register("commitment.comms_detail")} />
                  </Field>
                )}

                <Field
                  label="Kalau ingin konsisten, kamu paling terbantu oleh…"
                  error={(errors as any)?.commitment?.consistency?.message}
                  name="commitment.consistency"
                >
                  <RadioGroup
                    name="commitment.consistency"
                    options={consistencyOptions}
                    requiredMsg="Pilih salah satu ya."
                    includeLainnyaIfMissing
                    hasError={Boolean((errors as any)?.commitment?.consistency)}
                  />
                </Field>

                {commitConsistency === "LAINNYA" && (
                  <Field label="Detail singkat" helper="Opsional" name="commitment.consistency_detail">
                    <TextInput placeholder="Tulis 1 kalimat" {...register("commitment.consistency_detail")} />
                  </Field>
                )}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/55">
                  Mini note: ini bukan tes “ideal”. Kami hanya ingin tim yang nyaman dan sinkron. <span className="text-white/70">{TAGLINE}</span>
                </div>
              </div>
            )}

            {/* ========== STEP: PICK 3 ========== */}
            {currentStep?.kind === "base" && currentStep.key === "pick" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white/90">Pilih tepat 3</div>
                  <div className="mt-1 text-xs text-white/55">
                    Setelah ini kamu akan dapat 3 paket studi kasus (masing-masing {CASES_PER_PACK} soal). Tidak ada judul bidang agar jawaban tidak bias.
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {(watch("dept.pick_3") || []).map((id) => (
                      <span
                        key={id}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/75"
                      >
                        {(UNITS as any).find?.((u: any) => u.id === id)?.name ?? String(id)}
                      </span>
                    ))}
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/55">
                      {(watch("dept.pick_3") || []).length}/3 dipilih
                    </span>
                  </div>
                  {(errors as any)?.dept?.pick_3?.message ? (
                    <div className="mt-2 text-xs text-rose-300">{(errors as any).dept.pick_3.message}</div>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(UNITS as any).map((u: any) => {
                    const selected = (watch("dept.pick_3") || []).includes(u.id);
                    const selectedCount = (watch("dept.pick_3") || []).length;
                    const disabled = !selected && selectedCount >= 3;

                    return (
                      <button
                        type="button"
                        key={u.id}
                        disabled={disabled}
                        onClick={() => {
                          const cur = getValues("dept.pick_3") || [];
                          const exists = cur.includes(u.id);

                          if (exists) {
                            setValue(
                              "dept.pick_3",
                              cur.filter((x) => x !== u.id),
                              { shouldValidate: true }
                            );
                            return;
                          }

                          if (cur.length >= 3) {
                            setBannerMsg("Maksimal 3 pilihan ya 🙂 (hapus salah satu dulu).");
                            return;
                          }

                          setValue("dept.pick_3", [...cur, u.id], { shouldValidate: true });
                        }}
                        className={cx(
                          "rounded-3xl border px-4 py-4 text-left transition",
                          selected
                            ? "border-white/25 bg-white/10"
                            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                          disabled && "opacity-50 cursor-not-allowed hover:bg-white/[0.03]"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white/90">{u.name}</div>
                            {u.shortDesc ? (
                              <div className="mt-1 text-xs text-white/55 leading-relaxed">{u.shortDesc}</div>
                            ) : null}
                          </div>
                          <div
                            className={cx(
                              "h-7 min-w-7 rounded-full border px-2 text-xs grid place-items-center",
                              selected ? "border-white/40 bg-white/10 text-white/80" : "border-white/15 text-white/45"
                            )}
                          >
                            {selected ? "✓" : ""}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========== STEP: CASE (3 slides, no unit title) ========== */}
            {currentStep?.kind === "case" && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-white/55">Studi Kasus</div>
                    <div className="text-base font-semibold text-white">
                      Paket {currentStep.packIndex}/{currentStep.packTotal}
                    </div>
                    <div className="mt-1 text-xs text-white/55">
                      SE MA NGATT!! • Wajib jawab {CASES_PER_PACK}/{CASES_PER_PACK} • Pilih yang paling menggambarkan langkah kamu
                    </div>
                  </div>
                  <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                    <Image src={LOGO_SRC} alt="HIMATIKA" fill className="object-contain p-2" />
                  </div>
                </div>

                {!casesBank ? (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.06] grid place-items-center">
                        <LoadingDots />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white/85">Memuat studi kasus</div>
                        <div className="mt-1 text-xs text-white/55">Sebentar ya…</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <ShimmerLine />
                      <ShimmerLine w="w-5/6" />
                      <ShimmerLine w="w-2/3" />
                      <div className="pt-2 space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                          <ShimmerLine />
                          <ShimmerLine w="w-4/5" />
                          <ShimmerLine w="w-3/5" />
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                          <ShimmerLine />
                          <ShimmerLine w="w-4/5" />
                          <ShimmerLine w="w-3/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  (() => {
                    const unitId = currentStep.unitId;
                    const list = (casesBank[unitId] || []).slice(0, CASES_PER_PACK);

                    if (list.length === 0) {
                      return (
                        <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-100">
                          Studi kasus untuk pilihan ini belum ditemukan.
                          <div className="mt-2 text-xs text-rose-100/80">
                            Cek: key di <b>content/cases.ts</b> harus sama persis dengan <b>UNITS[].id</b>.
                            <br />
                            UnitId sekarang: <b>{String(unitId)}</b>
                          </div>
                        </div>
                      );
                    }

                    const ids = list.map((q) => q.id);
                    const answered = getCaseAnsweredCount(unitId, ids);

                    return (
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-xs text-white/55">Progress paket</div>
                            <div className="text-xs text-white/75">
                              {answered}/{CASES_PER_PACK} terjawab
                            </div>
                          </div>
                          <div className="mt-3">
                            <ProgressBar value={(answered / CASES_PER_PACK) * 100} />
                          </div>
                        </div>

                        {list.map((q, idx) => {
                          const selected = watch(`caseAnswers.${unitId}.${q.id}` as any) as CaseKey;
                          const caseKey = `${unitId}:${q.id}`;
                          const hasCaseError = Boolean(caseErrors[caseKey]);

                          return (
                            <div
                              key={q.id}
                              className={cx(
                                "rounded-3xl border border-white/10 bg-white/[0.03] p-4",
                                hasCaseError && "border-rose-400/70 bg-rose-500/10"
                              )}
                              data-field={`caseAnswers.${unitId}.${q.id}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                <div className="text-xs text-white/55">
                                  Soal {idx + 1}/{CASES_PER_PACK}
                                </div>
                                  <div className="mt-0.5 text-sm font-semibold text-white/90">{q.title}</div>
                                </div>
                                <div className="text-[11px] text-white/45">{selected ? `Jawaban: ${selected}` : "Belum dijawab"}</div>
                              </div>

                              {/* Situation (no dropdown) */}
                              <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/70 leading-relaxed">
                                {q.situation}
                              </div>

                              <div className="mt-3 text-sm font-medium text-white/85">{q.question}</div>

                              <div className="mt-3 grid grid-cols-1 gap-2">
                                {(Object.keys(q.options) as Array<"A" | "B" | "C" | "D">).map((k) => {
                                  const active = selected === k;
                                  return (
                                    <ChoiceCard
                                      key={`${q.id}-${k}`}
                                      active={active}
                                      hasError={hasCaseError}
                                      onClick={() => {
                                        setValue(`caseAnswers.${unitId}.${q.id}` as any, k, { shouldValidate: true });
                                        setCaseErrors((prev) => {
                                          const next = { ...prev };
                                          next[caseKey] = false;
                                          return next;
                                        });
                                      }}
                                    >
                                      <div className="flex items-start gap-3">
                                        <div
                                          className={cx(
                                            "mt-0.5 h-6 w-6 shrink-0 rounded-full border grid place-items-center text-xs",
                                            active ? "border-white/50 bg-white/15 text-white" : "border-white/20 text-white/60"
                                          )}
                                          aria-hidden
                                        >
                                          {k}
                                        </div>
                                        <div className="text-sm text-white/85 leading-relaxed">{q.options[k]}</div>
                                      </div>
                                      <input
                                        className="sr-only"
                                        type="radio"
                                        value={k}
                                        {...register(`caseAnswers.${unitId}.${q.id}` as any, { required: true })}
                                      />
                                    </ChoiceCard>
                                  );
                                })}
                                {hasCaseError ? (
                                  <div className="text-xs text-rose-300">Wajib pilih salah satu jawaban.</div>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* ========== STEP: ESSAY (2 short essay) ========== */}
            {currentStep?.kind === "base" && currentStep.key === "essay" && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                      <Image src={LOGO_SRC} alt="HIMATIKA" fill className="object-contain p-2" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/90">Sedikit lagi ✨</div>
                      <div className="text-xs text-white/55">{TAGLINE}</div>
                    </div>
                  </div>
                </div>

                <Field
                  label="Kalau kamu punya kendala/tanggungan, strategi kamu biar tetap jalan?"
                  helper="jujur & realistis"
                  error={(errors as any)?.essays?.constraints_mitigation?.message}
                  name="essays.constraints_mitigation"
                >
                  <TextArea
                    rows={5}
                    placeholder="Contoh: aku bagi waktu, komunikasi dari awal, dan pilih prioritas…"
                    aria-invalid={Boolean((errors as any)?.essays?.constraints_mitigation)}
                    {...register("essays.constraints_mitigation", {
                      required: "Wajib diisi ya",
                      minLength: { value: 50, message: "Minimal 50 karakter" },
                      maxLength: { value: 800, message: "Maks 800 karakter" },
                    })}
                  />
                </Field>

                <Field label="Growth yang paling kamu harapkan" error={(errors as any)?.essays?.growth_hope?.message} name="essays.growth_hope">
                  <RadioGroup
                    name="essays.growth_hope"
                    options={growthOptions}
                    requiredMsg="Pilih salah satu ya."
                    includeLainnyaIfMissing
                    hasError={Boolean((errors as any)?.essays?.growth_hope)}
                  />
                </Field>

                {growthHope === "LAINNYA" && (
                  <Field label="Detail singkat" helper="Opsional" name="essays.growth_detail">
                    <TextInput placeholder="Tulis 1 kalimat" {...register("essays.growth_detail")} />
                  </Field>
                )}

                {workValueOptions.length > 0 && (
                  <Field label="Nilai kerja yang kamu suka di tim" helper="maks 3 pilihan" name="essays.work_values">
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {workValueOptions.map((txt) => {
                        const active = (watch("essays.work_values") || []).includes(txt);
                        const disabled = !active && (watch("essays.work_values") || []).length >= 3;

                        return (
                          <ChoiceCard
                            key={txt}
                            active={active}
                            disabled={disabled}
                            onClick={() => {
                              const cur = getValues("essays.work_values") || [];
                              if (cur.includes(txt)) {
                                setValue(
                                  "essays.work_values",
                                  cur.filter((x) => x !== txt),
                                  { shouldValidate: true }
                                );
                              } else {
                                if (cur.length >= 3) return;
                                setValue("essays.work_values", [...cur, txt], { shouldValidate: true });
                              }
                            }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm text-white/85">{txt}</div>
                              <div
                                className={cx(
                                  "h-6 min-w-6 rounded-full border px-2 text-xs grid place-items-center",
                                  active ? "border-white/40 bg-white/10 text-white/80" : "border-white/15 text-white/45"
                                )}
                              >
                                {active ? "✓" : ""}
                              </div>
                            </div>
                            <input className="sr-only" type="checkbox" value={txt} {...register("essays.work_values")} />
                          </ChoiceCard>
                        );
                      })}
                    </div>
                  </Field>
                )}
              </div>
            )}

            {/* ========== STEP: REVIEW ========== */}
            {currentStep?.kind === "base" && currentStep.key === "review" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                      <Image src={LOGO_SRC} alt="HIMATIKA" fill className="object-contain p-2" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90">Review sebelum kirim</div>
                      <div className="text-xs text-white/55">
                        Cek cepat ya. Kalau sudah oke, klik <span className="text-white/80 font-medium">Kirim</span>.
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-white/50">{TAGLINE}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs text-white/55">Data utama</div>
                  <div className="mt-2 space-y-1 text-sm text-white/80">
                    <div className="flex justify-between gap-3"><span>Nama</span><span className="text-white/60">{watch("bio.full_name") || "—"}</span></div>
                    <div className="flex justify-between gap-3"><span>NIM</span><span className="text-white/60">{watch("bio.nim") || "—"}</span></div>
                    <div className="flex justify-between gap-3"><span>Angkatan</span><span className="text-white/60">{watch("bio.angkatan") || "—"}</span></div>
                    <div className="flex justify-between gap-3"><span>Kontak</span><span className="text-white/60">{watch("bio.contact") || "—"}</span></div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs text-white/55">Studi kasus</div>
                  <div className="mt-2 space-y-1 text-sm text-white/80">
                    {caseUnits.length === 3 ? (
                      caseUnits.map((u, idx) => {
                        const list = casesBank ? (casesBank[u] || []).slice(0, CASES_PER_PACK) : [];
                        const ids = list.map((q) => q.id);
                        const answered = ids.length ? getCaseAnsweredCount(u, ids) : 0;
                        return (
                          <div key={`${u}-${idx}`} className="flex items-center justify-between gap-3">
                            <span className="text-white/75">Paket {idx + 1}</span>
                            <span className="text-white/55">
                              {casesBank ? `${answered}/${CASES_PER_PACK} terjawab` : "—"}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-white/55">—</div>
                    )}
                  </div>
                </div>

                <div
                  className={cx(
                    "rounded-2xl border border-white/10 bg-white/[0.03] p-4",
                    (errors as any)?.consent_data && "border-rose-400/70 bg-rose-500/10"
                  )}
                  data-field="consent_data"
                >
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-white"
                      {...register("consent_data", { required: true })}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white/90">Persetujuan data</div>
                      <div className="mt-1 text-xs text-white/55 leading-relaxed">
                        Saya setuju data yang saya isi digunakan untuk proses seleksi & pemetaan Open Recruitment HIMATIKA 2026.
                      </div>
                      {(errors as any)?.consent_data ? (
                        <div className="mt-2 text-xs text-rose-300">Wajib dicentang dulu ya.</div>
                      ) : null}
                    </div>
                  </label>
                </div>

                {HCAPTCHA_SITEKEY ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-sm font-medium text-white/90">Verifikasi captcha</div>
                    <div className="mt-3">
                      <div ref={captchaContainerRef} />
                    </div>
                    {captchaError ? (
                      <div className="mt-2 text-xs text-rose-300">{captchaError}</div>
                    ) : null}
                    {!captchaToken ? (
                      <div className="mt-2 text-[11px] text-white/50">Centang captcha dulu sebelum kirim.</div>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/50">
                    Captcha belum dikonfigurasi. Tambahkan <span className="text-white/70">NEXT_PUBLIC_HCAPTCHA_SITEKEY</span> di env.
                  </div>
                )}
              </div>
            )}
          </GlassCard>

          {/* Sticky nav */}
          <div className="sticky bottom-4">
            <div className="rounded-3xl border border-white/10 bg-black/60 p-3 backdrop-blur shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between gap-3">
                <SoftButton variant="ghost" onClick={goBack} disabled={current === 0 || submitting}>
                  Kembali
                </SoftButton>

                <div className="flex items-center gap-2">
                  <SoftButton
                    variant="ghost"
                    disabled={submitting}
                    onClick={() => {
                      saveDraft(getValues());
                      setSaveStatus("saved");
                      setBannerMsg("Draft tersimpan ✅");
                      if (saveStatusTimer.current) window.clearTimeout(saveStatusTimer.current);
                      saveStatusTimer.current = window.setTimeout(() => setSaveStatus("idle"), 1400);
                    }}
                  >
                    Simpan
                  </SoftButton>

                  {current < steps.length - 1 ? (
                    <SoftButton onClick={goNext} disabled={submitting}>
                      Lanjut
                    </SoftButton>
                  ) : (
                    <SoftButton
                      onClick={finalSubmit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          Mengirim <LoadingDots />
                        </span>
                      ) : (
                        "Kirim"
                      )}
                    </SoftButton>
                  )}
                </div>
              </div>

              <div className="mt-2 text-center text-[11px] text-white/40">
                {currentStep?.kind === "case"
                  ? "Studi kasus disusun tanpa judul bidang untuk mengurangi bias."
                  : "Tombol \"Simpan\" itu cuman buat simpan progress kamu secara manual—draft aman tersimpan."}
              </div>
            </div>
          </div>

          <div className="pb-8 text-center text-xs text-white/35">
            © HIMATIKA 2026 • {TAGLINE}
          </div>
        </div>
      </form>
    </main>
  );
}
