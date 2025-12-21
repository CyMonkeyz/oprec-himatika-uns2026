import Link from "next/link";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950/30 px-3 py-1 text-xs text-zinc-200">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
      <p className="text-sm font-medium text-zinc-100">{title}</p>
      <p className="mt-1 text-sm text-zinc-300">{desc}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* HERO */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/30 p-6 sm:p-10">
          <div className="flex flex-wrap gap-2">
            <Badge>Open Recruitment</Badge>
            <Badge>HIMATIKA FMIPA UNS</Badge>
            <Badge>2026</Badge>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            PENDAFTARAN PENGURUS HIMATIKA 2026
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
            Berkontribusi dari <span className="text-zinc-100 font-medium">dalam</span>,{" "}
            menuju HIMATIKA mencapai <span className="text-zinc-100 font-medium">puncak yang baru</span> {" "}
            <span className="text-zinc-100 font-medium">Menempa diri</span> bersama menjadi lebih baik.. RAWR!!
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>Estimasi 6–10 menit</Badge>
            <Badge>3 pilihan biro/bidang</Badge>
            <Badge>Studi kasus: 6/unit (pilgan)</Badge>
          </div>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/daftar"
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-white transition"
            >
              Mulai Pendaftaran
            </Link>

            <a
              href="#info"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/20 px-5 py-3 text-sm font-medium text-zinc-100 hover:bg-zinc-950/40 transition"
            >
              Lihat Info Singkat
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            Catatan: isi dengan jujur ya — nggak ada jawaban “paling benar”, yang penting jelas dan manusiawi.
          </p>
        </div>

        {/* INFO */}
        <section id="info" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FeatureCard
            title="Eksplorasi Diri"
            desc="Kenali arah, nilai, dan potensi diri agar bermanfaat untuk prodi dan diri sendiri."
          />
          <FeatureCard
            title="Mengontrol Emosi"
            desc="Menjaga kejernihan pikiran agar respons tetap efektif dalam situasi yang menantang."
          />
          <FeatureCard
            title="Menjadi Lebih Berani"
            desc="Mendorong untuk bertindak, membuka peluang, dan bertumbuh lebih cepat."
          />
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-zinc-100">Alurnya gimana?</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
              <p className="text-sm font-medium text-zinc-100">1) Isi biodata</p>
              <p className="mt-1 text-sm text-zinc-300">Nama, NIM, angkatan, asal, domisili, kontak.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
              <p className="text-sm font-medium text-zinc-100">2) Pilih 3 biro/bidang</p>
              <p className="mt-1 text-sm text-zinc-300">Nanti studi kasusnya muncul sesuai pilihanmu.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
              <p className="text-sm font-medium text-zinc-100">3) Studi kasus singkat</p>
              <p className="mt-1 text-sm text-zinc-300">Pilih A–D. Minimal 5 dari 6 per pilihan.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4">
              <p className="text-sm font-medium text-zinc-100">4) Pertanyaan inti</p>
              <p className="mt-1 text-sm text-zinc-300">Esai hanya 2: alasan join & strategi saat ada kendala.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/daftar"
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-white transition"
            >
              Gas Daftar Sekarang
            </Link>
            <p className="text-xs text-zinc-400 sm:self-center">
              Kalau kamu pernah mulai isi, nanti bisa lanjutkan draft.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 text-center text-xs text-zinc-500">
          © HIMATIKA FMIPA UNS 2026 • Form ini tidak meminta password / data sensitif.
        </footer>
      </div>
    </main>
  );
}
