// lib/schema.ts
import { z } from "zod";

const t = (max: number) => z.string().trim().min(1, "Wajib diisi").max(max, "Terlalu panjang");

const OptionalShort = z.string().trim().max(2000).optional().or(z.literal(""));

const CaseKey = z.enum(["A", "B", "C", "D", ""]);

export const SubmitSchema = z.object({
  hp: z.string().optional().or(z.literal("")),

  bio: z.object({
    full_name: t(120),
    preferred_name: z.string().trim().max(120).optional().or(z.literal("")),
    nim: t(40),
    angkatan: t(10),
    hometown: t(80),
    current_residence: t(80),
    contact: t(120),
  }),

  transport: z.object({
    mode: t(80),
    offline_flex: z.string().trim().regex(/^[1-5]$/, "Pilih 1–5"),
  }),

  commitment: z.object({
    scenario: t(120),
    scenario_detail: OptionalShort,

    comms: t(120),
    comms_detail: OptionalShort,

    consistency: t(120),
    consistency_detail: OptionalShort,
  }),

  dept: z.object({
    pick_3: z.array(z.string().trim().min(1)).length(3, "Harus pilih tepat 3"),
  }),

  caseAnswers: z
    .record(z.string(), z.record(z.string(), CaseKey))
    .default({}),

  essays: z.object({
    constraints_mitigation: z.string().trim().min(50, "Minimal 50 karakter").max(800, "Maks 800 karakter"),
    growth_hope: t(120),
    growth_detail: OptionalShort,
    work_values: z.array(z.string().trim().min(1)).max(3, "Maks 3").default([]),
  }),

  twibbon: z.object({
    proof_file_id: z.string().trim().min(1, "Wajib upload Twibbon"),
    proof_view_link: z.string().trim().max(400).optional().or(z.literal("")),
    proof_file_name: z.string().trim().max(200).optional().or(z.literal("")),
  }),

  ttd: z.object({
    file_id: z.string().trim().min(1, "Wajib upload tanda tangan"),
    view_link: z.string().trim().max(400).optional().or(z.literal("")),
    file_name: z.string().trim().max(200).optional().or(z.literal("")),
  }),

  consent_data: z.boolean().refine((v) => v === true, "Wajib setuju"),

  // meta anti-spam
  draftStartedAt: z.number().optional(),
  idempotencyKey: z.string().trim().min(8).max(80).optional(),
});

export type SubmitPayload = z.infer<typeof SubmitSchema>;
