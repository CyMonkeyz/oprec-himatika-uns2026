import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="px-4 py-14">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/30 p-6 sm:p-10">
          <p className="text-xs text-zinc-400">Pendaftaran terkirim</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">
            Terima kasih! 🎉
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            Data kamu sudah kami terima. Panitia akan memproses dan menghubungi lewat kontak yang kamu tulis.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/20 p-4">
              <p className="text-sm font-medium text-zinc-100">Yang bisa kamu lakukan sekarang</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300 space-y-1">
                <li>Pastikan kontak kamu aktif.</li>
                <li>Siapkan waktu untuk tahap lanjut.</li>
                <li>Tetap jaga ritme kuliah ya 🙂</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/20 p-4">
              <p className="text-sm font-medium text-zinc-100">Kalau ada kendala</p>
              <p className="mt-2 text-sm text-zinc-300">
                Kalau kamu merasa ada data yang salah, kamu bisa daftar ulang dan beri catatan di jawaban.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/20 px-5 py-3 text-sm font-medium text-zinc-100 hover:bg-zinc-950/40 transition"
            >
              Kembali ke Beranda
            </Link>

            <a
              href="https://chat.whatsapp.com/ForJ8mjzTIn9eLWfzTuFGg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20 transition"
            >
              Gabung Grup WhatsApp
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Jangan khawatir—kami tidak meminta password atau data sensitif.
          </p>
        </div>
      </div>
    </main>
  );
}
