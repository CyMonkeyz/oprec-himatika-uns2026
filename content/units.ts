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
  { id: "BIDANG_I", name: "Bidang I", shortDesc: "Pengembangan Aplikasi Ilmu Pengetahuan dan Teknologi Kematematikaan" },
  { id: "BIDANG_II", name: "Bidang II", shortDesc: "Kaderisasi dan Pengembangan Anggota" },
  { id: "BIDANG_III", name: "Bidang III", shortDesc: "Apresiasi Mahasiswa" },
  { id: "BIDANG_IV", name: "Bidang IV", shortDesc: "Hubungan Eksternal" },
  { id: "BIDANG_V", name: "Bidang V", shortDesc: "Media Informasi dan Komunikasi" },
  { id: "BIDANG_VI", name: "Bidang VI", shortDesc: "Minat dan Bakat" },
  { id: "BIRO_ADKES", name: "Biro Adkes", shortDesc: "Administrasi Kesekretariatan " },
  { id: "BIRO_KL", name: "Biro KL", shortDesc: "Konsolidasi Lembaga" },
  { id: "BIRO_ADKEU", name: "Biro Adkeu", shortDesc: "Administrasi Keuangan" },
  { id: "BIRO_EKRAF", name: "Biro Ekraf", shortDesc: "Ekonomi Kreatif" },
];
