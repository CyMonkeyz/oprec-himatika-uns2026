// content/units.ts
export type UnitId =
  | "BIDANG_I"
  | "BIDANG_II"
  | "BIDANG_III"
  | "BIDANG_IV"
  | "BIDANG_V"
  | "BIDANG_VI"
  | "BIRO_ADKES"
  | "BIRO_KL"
  | "BIRO_ADKEU"
  | "BIRO_EKRAF";

export type Unit = {
  id: UnitId;
  name: string;
  shortDesc: string;
};

export const UNITS: Unit[] = [
  { id: "BIDANG_I", name: "Bidang I", shortDesc: "Fokus pada … (isi nanti)" },
  { id: "BIDANG_II", name: "Bidang II", shortDesc: "Fokus pada … (isi nanti)" },
  { id: "BIDANG_III", name: "Bidang III", shortDesc: "Fokus pada … (isi nanti)" },
  { id: "BIDANG_IV", name: "Bidang IV", shortDesc: "Fokus pada … (isi nanti)" },
  { id: "BIDANG_V", name: "Bidang V", shortDesc: "Fokus pada … (isi nanti)" },
  { id: "BIDANG_VI", name: "Bidang VI", shortDesc: "Fokus pada … (isi nanti)" },
  { id: "BIRO_ADKES", name: "Biro Adkes", shortDesc: "Administrasi & kesekretariatan." },
  { id: "BIRO_KL", name: "Biro KL", shortDesc: "Komunikasi & layanan internal/eksternal." },
  { id: "BIRO_ADKEU", name: "Biro Adkeu", shortDesc: "Administrasi keuangan & rapi-rapi data." },
  { id: "BIRO_EKRAF", name: "Biro Ekraf", shortDesc: "Kreatif: desain, konten, branding." },
];
