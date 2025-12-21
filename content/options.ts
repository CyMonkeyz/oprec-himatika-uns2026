// content/options.ts
export type OptionItem = {
  value: string;
  label: string;
  desc?: string; // optional, aman
};

export const OPTIONS = {
  angkatan: ["2022", "2023", "2024", "2025", "Lainnya"],

  plan_next_year: [
    { value: "KULIAH_REGULER", label: "Kuliah reguler (ritme normal)" },
    { value: "SKS_BERAT", label: "Ambil SKS berat/kelas padat" },
    { value: "RISET_PKM", label: "Riset/PKM/skripsi awal" },
    { value: "MAGANG", label: "Magang (part/full time)" },
    { value: "KERJA_PARTTIME", label: "Kerja part-time/freelance" },
    { value: "KKN_MBKM", label: "KKN/MBKM non-magang" },
    { value: "LOMBA", label: "Fokus lomba/kompetisi/portofolio" },
    { value: "ORGANISASI_INTENS", label: "Aktif organisasi lain (intens)" },
    { value: "LAINNYA", label: "Lainnya" },
  ] as OptionItem[],

  transport_mode: [
    { value: "JALAN_SEPEDA", label: "Jalan kaki/sepeda" },
    { value: "MOTOR_PRIBADI", label: "Motor pribadi" },
    { value: "MOTOR_NEBENG", label: "Motor pinjam/nebeng" },
    { value: "MOBIL", label: "Mobil" },
    { value: "UMUM_OJOL", label: "Transport umum/ojek online" },
    { value: "SITUASIONAL", label: "Situasional (gabungan)" },
  ] as OptionItem[],

  // skala 1–5
  transport_offline_flex: ["1", "2", "3", "4", "5"],

  commit_scenario: [
    { value: "KABARIN_OPSI", label: "Kabarin secepatnya + tawarkan opsi pengganti (reschedule/online)" },
    { value: "HADIR_TELAT_UPDATE", label: "Tetap hadir sebisa mungkin walau telat, sambil update kondisi" },
    { value: "MINTA_TEMAN_WAKIL", label: "Minta teman mewakili poin yang bisa kamu siapkan" },
    { value: "URUSAN_DULU_RINGKASAN", label: "Fokus urusan dulu, lalu minta ringkasan rapat setelahnya" },
    { value: "LAINNYA", label: "Lainnya (jelaskan singkat)" },
  ] as OptionItem[],

  commit_comms: [
    { value: "KABARI_PJ_MINTA_PRIORITAS", label: "Langsung kabari PJ + jelasin kondisi + minta prioritas" },
    { value: "CARI_SOLUSI_DULU", label: "Cari solusi dulu, baru lapor dengan opsi yang siap" },
    { value: "TANYA_TEMAN_DULU", label: "Tanya teman 1–2 orang dulu, lalu kabari PJ" },
    { value: "DIAM_SAMPE_MEPET", label: "Cenderung diam dulu sampai mepet, baru lapor" },
    { value: "LAINNYA", label: "Lainnya (jelaskan singkat)" },
  ] as OptionItem[],

  role_deadline: [
    { value: "EKSEKUTOR", label: "Eksekutor (ngebut ngerjain task yang jelas)" },
    { value: "KOORDINATOR_SPRINT", label: "Koordinator sprint (bagi tugas, jaga alur, follow-up)" },
    { value: "QUALITY_CONTROL", label: "Quality control (cek detail, rapihin output, minim error)" },
    { value: "PROBLEM_SOLVER", label: "Problem solver (beresin hambatan yang bikin tim stuck)" },
    { value: "SUPPORT_BACKUP", label: "Support/back-up (siap isi celah tugas yang bolong)" },
  ] as OptionItem[],

  // pengganti essay_commitment_pattern -> pilihan
  consistency_pattern: [
    { value: "JADWAL", label: "Bikin jadwal realistis + pegang ritme" },
    { value: "PECAH_TUGAS", label: "Pecah tugas kecil + checklist" },
    { value: "ACCOUNTABILITY", label: "Punya teman cek-in (diingetin progres)" },
    { value: "PRIORITAS", label: "Pilih 1–2 prioritas dulu, sisanya menyusul" },
    { value: "DEADLINE_ALERT", label: "Pasang pengingat deadline + waktu fokus" },
    { value: "LAINNYA", label: "Lainnya (jelaskan singkat)" },
  ] as OptionItem[],

  // pengganti essay_growth_hope -> pilihan
  growth_hope: [
    { value: "KOMUNIKASI", label: "Lebih berani & rapi dalam komunikasi tim" },
    { value: "MANAJEMEN_WAKTU", label: "Lebih rapi manajemen waktu & prioritas" },
    { value: "LEADERSHIP", label: "Lebih siap ambil peran memimpin/koordinasi" },
    { value: "DETAIL_KUALITAS", label: "Lebih teliti & konsisten kualitas output" },
    { value: "NETWORKING", label: "Lebih luas relasi & kolaborasi" },
  ] as OptionItem[],

  // pengganti essay_work_values -> checklist max 3
  work_values: [
    "Feedback jelas & sopan",
    "Diberi kepercayaan",
    "Tujuan kerja jelas",
    "Kerja rapi & terstruktur",
    "Apresiasi effort kecil",
    "Ruang berpendapat",
    "Tim responsif & saling bantu",
  ],
} as const;
