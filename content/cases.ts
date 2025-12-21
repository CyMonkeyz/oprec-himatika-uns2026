// content/cases.ts
import { UNITS, type UnitId } from "@/content/units";

export type CaseKey = "A" | "B" | "C" | "D";
export type CaseQuestion = {
  id: string;
  title: string;
  situation: string;
  question: string;
  options: Record<CaseKey, string>;
};

export type CasesBank = Record<UnitId, CaseQuestion[]>;

export const CASES: CasesBank = {
  BIRO_ADKES: [
    {
      id: "ADKES-1",
      title: "Template Rapi, Panitia Senang",
      situation:
        "Kamu diminta bikin template proposal/LPJ yang seragam untuk beberapa kepanitiaan. Setelah kamu rapikan, satu panitia bilang formatmu “terlalu ribet” dan minta versi bebas. Di sisi lain, pengurus lain butuh standar biar arsip gampang dicari.",
      question: "Kamu memilih langkah pertama apa?",
      options: {
        A: "Buat 2 versi: standar + versi ringkas, jelaskan bedanya dan kapan dipakai.",
        B: "Ikuti permintaan panitia itu dulu agar cepat, standar belakangan.",
        C: "Tahan dulu, minta semua panitia ikut standar penuh demi kerapihan.",
        D: "Minta Sekum putuskan, kamu hanya jalankan keputusan.",
      },
    },
    {
      id: "ADKES-2",
      title: "Surat Mendesak, Data Kurang",
      situation:
        "H-1 acara, panitia minta surat peminjaman ruangan. Data inti (waktu, PIC, kontak) masih bolong dan mereka bilang “nanti nyusul”. Kalau menunggu, surat terlambat. Kalau lanjut, salah detail bisa bikin reputasi jelek.",
      question: "Responmu yang paling mungkin?",
      options: {
        A: "Kirim checklist data wajib + deadline 30 menit; kalau lewat, ajukan versi draft “pending data” ke PIC.",
        B: "Tulis saja asumsi paling aman biar surat jadi, koreksi belakangan.",
        C: "Tolak proses sebelum data lengkap, meski surat terlambat.",
        D: "Oper ke orang lain biar kamu tidak ikut tanggung jawab.",
      },
    },
    {
      id: "ADKES-3",
      title: "Arsip Berantakan di Drive",
      situation:
        "Drive organisasi penuh file tanpa nama jelas (final2, revisi_fix_fix). Saat dibutuhkan cepat, semua bingung. Kamu bukan “pemilik” drive, tapi kamu yang paling sering diberi tugas cari dokumen.",
      question: "Apa tindakan pertamamu?",
      options: {
        A: "Buat struktur folder + aturan penamaan sederhana, lalu ajak inti pengurus sepakat untuk mulai rapih dari sekarang.",
        B: "Rapihin diam-diam sendiri biar cepat beres, tanpa perlu diskusi.",
        C: "Biarkan saja, nanti juga ketemu kalau dicari lama-lama.",
        D: "Minta orang lain saja yang urus drive, karena itu bukan tugasmu.",
      },
    },
    {
      id: "ADKES-4",
      title: "Dokumen “Biar Cepat Aja”",
      situation:
        "Ada panitia minta kamu “edit dikit aja” dokumen orang lain, tapi kamu melihat ada bagian yang rawan salah paham (kalimatnya tegas banget, bisa menyinggung pihak tertentu). Panitia bilang: “Udah, biar cepat aja.”",
      question: "Kamu akan bagaimana?",
      options: {
        A: "Kasih catatan revisi di bagian rawan + jelaskan singkat risikonya, ajak pilih wording aman tanpa memperlambat banyak.",
        B: "Ikuti saja, yang penting cepat selesai.",
        C: "Tolak bantu karena takut disalahkan.",
        D: "Diam-diam ubah total tanpa bilang, biar aman menurutmu.",
      },
    },
    {
      id: "ADKES-5",
      title: "Panitia vs Standar Admin",
      situation:
        "Panitia bilang: “Admin jangan banyak aturan, bikin ribet.” Tapi kamu tahu kalau terlalu longgar, nanti banyak missing data dan revisi di belakang. Kamu ingin tetap ramah tanpa jadi ‘polisi’ dokumen.",
      question: "Cara kamu menengahi paling masuk akal?",
      options: {
        A: "Tetapkan “minimum data wajib” yang ringkas + jelaskan manfaatnya; sisanya fleksibel sesuai kebutuhan.",
        B: "Longgarkan semua aturan agar panitia nyaman, nanti rapihin belakangan.",
        C: "Kunci aturan ketat dari awal, biar tidak ada yang melanggar.",
        D: "Minta pimpinan yang menjelaskan, kamu menghindari debat.",
      },
    },
    {
      id: "ADKES-6",
      title: "Notulen Mepet, Banyak Rapat",
      situation:
        "Dalam seminggu ada beberapa rapat. Notulen sebelumnya sering telat atau tidak jelas, bikin tindak lanjut kacau. Kamu diminta “bantu notulensi” tapi waktumu juga terbatas.",
      question: "Strategi kamu yang paling realistis?",
      options: {
        A: "Buat template notulen ringkas (keputusan, PIC, deadline) + kirim draft cepat setelah rapat untuk dikonfirmasi.",
        B: "Tulis notulen detail panjang, walau baru selesai beberapa hari setelah rapat.",
        C: "Tidak usah notulen, cukup ingat-ingat saja.",
        D: "Tunggu ada yang lain notulen, kamu fokus tugas lain.",
      },
    },
  ],

  BIRO_KL: [
    {
      id: "KL-1",
      title: "Quality Time Berhasil",
      situation:
        "Kamu bikin sesi kebersamaan pengurus yang sederhana tapi ramai dan terasa akrab. Setelah itu, ada yang bilang “akhirnya kerasa punya rumah”. Namun ada juga yang merasa “ini buang waktu, mending kerja”.",
      question: "Respon paling kamu pilih?",
      options: {
        A: "Rangkum feedback: pertahankan tapi buat format lebih efisien (mis. 45 menit + tujuan jelas).",
        B: "Stop saja agar tidak ada yang protes.",
        C: "Tetap lanjut seperti biasa, yang tidak suka biarin.",
        D: "Serahkan ke pimpinan, kamu ikut saja.",
      },
    },
    {
      id: "KL-2",
      title: "Pengurus Mendadak Menurun",
      situation:
        "Dua orang pengurus belakangan sering absen dan slow respon. Kamu tahu mereka punya kesibukan, tapi tim mulai terdampak. Kamu tidak ingin menghakimi, tapi perlu kejelasan.",
      question: "Langkah awalmu?",
      options: {
        A: "Ajak ngobrol 1:1, tanya kondisi & tawarkan penyesuaian beban + target kecil yang jelas.",
        B: "Tegur di grup biar jadi contoh.",
        C: "Diam dulu, nanti evaluasi di akhir periode.",
        D: "Langsung usulkan diganti tanpa diskusi.",
      },
    },
    {
      id: "KL-3",
      title: "Data Kehadiran vs Realita",
      situation:
        "Di absensi, seseorang tampak ‘hadir’ tapi kontribusinya minim. Di sisi lain, ada yang jarang rapat tapi kerjaannya beres. Kamu diminta menilai keaktifan untuk evaluasi.",
      question: "Kamu menilai bagaimana?",
      options: {
        A: "Gunakan kombinasi: kehadiran + output + respons + feedback tim; jelaskan indikatornya.",
        B: "Pakai absensi saja biar objektif.",
        C: "Pakai opini pribadi saja dari yang paling kamu percaya.",
        D: "Tidak usah menilai, nanti terserah pimpinan.",
      },
    },
    {
      id: "KL-4",
      title: "Aspirasi yang “Panas”",
      situation:
        "Ada aspirasi masuk: “Pengurus A toxic.” Tidak ada bukti jelas, tapi isu ini bisa bikin tim pecah kalau disebar mentah. Kamu pegang kanal aspirasi.",
      question: "Responmu?",
      options: {
        A: "Validasi aspirasi: minta contoh konkret + ajak mediasi tertutup bila perlu; jaga privasi.",
        B: "Langsung sebar ke grup biar semua tahu.",
        C: "Abaikan karena berpotensi bikin gaduh.",
        D: "Langsung vonis orangnya tanpa klarifikasi.",
      },
    },
    {
      id: "KL-5",
      title: "Konflik Dua Pengurus",
      situation:
        "Dua pengurus sering bentrok gaya kerja. Satu cepat tapi ‘asal jalan’, satu rapi tapi lambat. Mereka mulai saling sindir, performa tim turun.",
      question: "Apa yang kamu lakukan?",
      options: {
        A: "Fasilitasi obrolan: sepakati standar output + timeline + cara komunikasi; bagi peran sesuai kekuatan.",
        B: "Suruh mereka ‘dewasa sendiri’, kamu tidak mau terlibat.",
        C: "Pihak salah satu, yang lain biar menyesuaikan.",
        D: "Laporkan ke pimpinan dan lepas tangan.",
      },
    },
    {
      id: "KL-6",
      title: "Deadline Evaluasi Pengurus",
      situation:
        "Kamu harus merangkum evaluasi untuk forum pimpinan besok. Data belum lengkap. Kalau menunggu sempurna, telat. Kalau buru-buru, bisa tidak adil.",
      question: "Pilihanmu?",
      options: {
        A: "Buat ringkasan “sementara” + catatan keterbatasan data; lanjutkan pengumpulan untuk revisi.",
        B: "Tunda rapat evaluasi sampai data lengkap.",
        C: "Isi kekosongan data dengan asumsi dari cerita orang.",
        D: "Kirim apa adanya tanpa pengecekan.",
      },
    },
  ],

  BIRO_ADKEU: [
    {
      id: "ADKEU-1",
      title: "LPJ Tepat, Panitia Lega",
      situation:
        "Kamu bantu panitia menyusun LPJ, semua bukti rapi, dan laporan diterima tanpa revisi. Mereka senang dan ingin pola ini jadi standar. Tapi beberapa orang takut “terlalu ribet” untuk proker kecil.",
      question: "Kamu menyarankan apa?",
      options: {
        A: "Buat standar bertingkat: proker kecil versi ringkas, proker besar versi lengkap.",
        B: "Pakai standar lengkap untuk semua tanpa kompromi.",
        C: "Bebaskan tiap panitia, biar cepat.",
        D: "Terserah panitia saja, kamu hanya cek akhir.",
      },
    },
    {
      id: "ADKEU-2",
      title: "Bukti Hilang Menjelang Deadline",
      situation:
        "Panitia bilang beberapa bukti transaksi hilang. Deadline laporan besok. Kalau tidak ada bukti, laporan berisiko dipertanyakan. Mereka panik dan minta “solusi cepat”.",
      question: "Langkahmu?",
      options: {
        A: "Minta kronologi + cari bukti pengganti (mutasi/nota digital) + tulis catatan klarifikasi di laporan.",
        B: "Suruh mereka bikin bukti baru supaya lengkap.",
        C: "Hapus saja transaksi itu dari laporan biar aman.",
        D: "Serahkan ke pimpinan, kamu tidak mau ikut.",
      },
    },
    {
      id: "ADKEU-3",
      title: "Cashflow Menipis, Proker Jalan Terus",
      situation:
        "Di tengah periode, kas menipis. Ada proker yang tetap minta dana segera. Kalau ditahan, proker bisa terganggu. Kalau dilepas, risiko kas kosong untuk kebutuhan mendadak.",
      question: "Keputusanmu?",
      options: {
        A: "Buat prioritas pengeluaran + jadwal pencairan bertahap; transparan ke panitia soal kondisi kas.",
        B: "Cairkan semua sesuai permintaan, biar proker lancar.",
        C: "Stop semua pencairan sampai kas aman.",
        D: "Diam saja, biar nanti kelihatan sendiri kalau kas habis.",
      },
    },
    {
      id: "ADKEU-4",
      title: "Sponsor Masuk, Syaratnya Aneh",
      situation:
        "Ada sponsor mau bantu dana, tapi minta hal yang berpotensi merusak citra (mis. promosi agresif di acara internal). Tim butuh dana, tapi kamu ragu risiko jangka panjang.",
      question: "Apa yang kamu lakukan?",
      options: {
        A: "Negosiasi syarat: cari titik aman (branding wajar) + minta persetujuan pimpinan sebelum deal.",
        B: "Terima saja, yang penting dana masuk.",
        C: "Tolak langsung tanpa diskusi, takut ribet.",
        D: "Biarkan orang lain yang putuskan, kamu tidak mau terlibat.",
      },
    },
    {
      id: "ADKEU-5",
      title: "Bendum vs Panitia: Pengeluaran Dadakan",
      situation:
        "Panitia minta pencairan dana mendadak tanpa proposal rinci karena “waktunya mepet”. Mereka bilang nanti bukti nyusul. Kamu tahu ini rawan masalah.",
      question: "Responmu?",
      options: {
        A: "Minta detail minimum (jumlah, tujuan, PIC) + buat form pencairan cepat; tanpa itu tidak bisa cair.",
        B: "Cairkan dulu biar cepat, bukti nyusul.",
        C: "Tolak keras, meski proker terancam gagal.",
        D: "Oper ke pimpinan biar kamu aman.",
      },
    },
    {
      id: "ADKEU-6",
      title: "Transparansi ke Anggota",
      situation:
        "Ada anggota bertanya: “Uang kas dipakai apa aja?” Kamu ingin transparan, tapi juga tidak ingin membuka detail yang bisa disalahpahami tanpa konteks.",
      question: "Cara menjawab paling tepat?",
      options: {
        A: "Buat ringkasan laporan (kategori + total) + sediakan bukti jika diminta via jalur resmi.",
        B: "Buka semua bukti mentah di publik biar selesai.",
        C: "Jawab singkat: ‘pokoknya dipakai proker’, tanpa data.",
        D: "Tidak jawab karena takut diperdebatkan.",
      },
    },
  ],

  BIRO_EKRAF: [
    {
      id: "EKRAF-1",
      title: "Produk Laku, Tim Bangga",
      situation:
        "Kamu dan tim berhasil jual produk proker, respon bagus. Tapi ada anggota yang protes karena merasa tidak dilibatkan, padahal sebelumnya dia pasif.",
      question: "Responmu?",
      options: {
        A: "Ajak evaluasi: buka peluang peran jelas di batch berikutnya, sambil tetap tegas soal komitmen & deadline.",
        B: "Balas: ‘kan kamu yang pasif’, selesai.",
        C: "Biarin aja, yang penting produk laku.",
        D: "Serahkan ke pimpinan biar kamu tidak pusing.",
      },
    },
    {
      id: "EKRAF-2",
      title: "Target Penjualan Tidak Tercapai",
      situation:
        "Penjualan jauh dari target. Tim mulai saling menyalahkan (desain jelek, promosi kurang, harga kemahalan). Kamu harus ambil langkah cepat.",
      question: "Langkah awalmu?",
      options: {
        A: "Ambil data sederhana (channel, produk, harga) + tetapkan 1-2 eksperimen cepat (promo, bundling, konten) minggu ini.",
        B: "Cari siapa yang salah dan tegur biar kapok.",
        C: "Ganti semua strategi sekaligus biar cepat berubah.",
        D: "Diam dulu, nanti juga membaik.",
      },
    },
    {
      id: "EKRAF-3",
      title: "Kualitas vs Kecepatan Produksi",
      situation:
        "Deadline mepet. Kalau produksi cepat, kualitas menurun (finishing jelek). Kalau fokus kualitas, jumlah stok kurang. Tim bingung.",
      question: "Kamu memilih apa?",
      options: {
        A: "Tentukan standar minimum kualitas + prioritas item paling penting; komunikasikan trade-off ke tim & pembeli.",
        B: "Gas cepat saja, yang penting banyak barang.",
        C: "Kualitas nomor satu, meski stok sedikit dan telat.",
        D: "Tunggu tim memutuskan, kamu ikut saja.",
      },
    },
    {
      id: "EKRAF-4",
      title: "Kolaborasi dengan Tim Lain",
      situation:
        "Bidang lain minta kolaborasi: mereka butuh merchandise, tapi brief berubah-ubah. Kamu merasa timmu jadi ‘tukang jahit’ tanpa arah.",
      question: "Apa yang kamu lakukan?",
      options: {
        A: "Minta brief tertulis + deadline fix + satu PIC; tanpa itu kerjaan tidak bisa jalan rapi.",
        B: "Ikuti saja semua perubahan biar mereka senang.",
        C: "Tolak kolaborasi karena bikin repot.",
        D: "Kerjain seenaknya, kalau mereka komplain baru diubah.",
      },
    },
    {
      id: "EKRAF-5",
      title: "Harga Terasa “Kemahalan”",
      situation:
        "Ada kritik: produk kemahalan untuk mahasiswa. Tapi kalau turunin harga, margin tipis dan kas kecil. Kamu ingin adil dan realistis.",
      question: "Solusi yang paling masuk akal?",
      options: {
        A: "Buat opsi harga: versi standar + versi budget; transparan soal biaya & manfaatnya.",
        B: "Turunkan harga drastis biar laku, urusan kas belakangan.",
        C: "Pertahankan harga, yang nggak mampu ya sudah.",
        D: "Stop jualan saja biar aman.",
      },
    },
    {
      id: "EKRAF-6",
      title: "Distribusi Keuntungan",
      situation:
        "Setelah proker, ada keuntungan. Tim beda pendapat: ada yang mau semua masuk kas, ada yang mau sebagian untuk apresiasi tim.",
      question: "Kamu memilih apa?",
      options: {
        A: "Tentukan pembagian jelas: mayoritas ke kas + porsi kecil apresiasi; dokumentasikan keputusan.",
        B: "Bagi rata ke tim biar semangat.",
        C: "Masukkan semua ke kas tanpa diskusi.",
        D: "Biarkan saja sampai lupa, tidak usah dibahas.",
      },
    },
  ],

  BIDANG_I: [
    {
      id: "B1-1",
      title: "Program Akademik Disambut Baik",
      situation:
        "Kamu bikin program belajar bareng yang ternyata ramai dan bermanfaat. Ada saran untuk memperluas topik, tapi timmu terbatas.",
      question: "Langkahmu?",
      options: {
        A: "Pilih topik prioritas + rekrut mentor tambahan/kolaborasi, mulai bertahap.",
        B: "Iyakan semua saran dan jalankan semuanya sekaligus.",
        C: "Stop program karena takut tidak sanggup mengelola.",
        D: "Biarkan berjalan tanpa rencana, yang penting ada.",
      },
    },
    {
      id: "B1-2",
      title: "Mentor Mendadak Batal",
      situation:
        "H-1 kelas, mentor utama mendadak batal. Peserta sudah daftar banyak. Kamu harus menyelamatkan acara tanpa bikin panik.",
      question: "Apa yang kamu lakukan?",
      options: {
        A: "Cari mentor pengganti cepat (alumni/teman) + siapkan materi ringkas; info peserta dengan solusi jelas.",
        B: "Batalkan mendadak tanpa penjelasan detail.",
        C: "Tetap jalan tanpa mentor, improvisasi saja.",
        D: "Biarkan peserta menunggu, nanti juga paham.",
      },
    },
    {
      id: "B1-3",
      title: "Konten Ambigu / Hoaks Halus",
      situation:
        "Ada konten akademik yang dibagikan, tapi kamu ragu akurasinya. Kalau dibiarkan, bisa menyesatkan. Kalau ditegur, takut bikin suasana tegang.",
      question: "Sikapmu?",
      options: {
        A: "Cek sumber cepat + ajak klarifikasi secara privat; revisi konten dengan cara yang tidak mempermalukan.",
        B: "Biarkan saja, yang penting niatnya baik.",
        C: "Tegur keras di grup biar kapok.",
        D: "Hapus tanpa bilang siapa-siapa.",
      },
    },
    {
      id: "B1-4",
      title: "Konflik Nilai: Akses Belajar",
      situation:
        "Ada ide kelas berbayar untuk kualitas. Tapi ada yang khawatir akses jadi tidak inklusif. Kamu perlu keputusan yang adil.",
      question: "Kamu memilih apa?",
      options: {
        A: "Buat skema campuran: gratis untuk materi inti + opsi berbayar untuk tambahan; sediakan subsidi/slot gratis.",
        B: "Jadikan semua berbayar biar serius dan berkualitas.",
        C: "Batalkan semua kegiatan berbayar, titik.",
        D: "Diam, biar keputusan lewat saja.",
      },
    },
    {
      id: "B1-5",
      title: "Konflik Anggota: “Sok Pintar”",
      situation:
        "Ada anggota yang aktif memberi masukan, tapi dianggap ‘sok pintar’ oleh yang lain. Mulai ada sindiran, suasana tim tidak nyaman.",
      question: "Kamu menengahi bagaimana?",
      options: {
        A: "Tegaskan aturan diskusi: kritik ide bukan orang; beri ruang semua bicara + contoh cara feedback yang baik.",
        B: "Minta orang aktif itu diam biar tidak memancing emosi.",
        C: "Biarkan saja, nanti juga reda.",
        D: "Keluarkan salah satu biar selesai cepat.",
      },
    },
    {
      id: "B1-6",
      title: "Deadline Proposal Akademik",
      situation:
        "Kamu butuh proposal akademik untuk kerja sama. Tim belum menyusun. Waktu tinggal sedikit, tapi kamu ingin output tetap rapi.",
      question: "Taktikmu?",
      options: {
        A: "Bagi bagian proposal ke PIC (latar, tujuan, timeline) + pakai template; kamu QC akhir.",
        B: "Kerjakan sendiri semua biar cepat.",
        C: "Tunda saja, nanti cari kesempatan lain.",
        D: "Kirim draft seadanya tanpa cek.",
      },
    },
  ],

  BIDANG_II: [
    {
      id: "B2-1",
      title: "Maba Antusias, Tim Kewalahan",
      situation:
        "Program penyambutan maba ramai. Banyak yang tanya hal serupa. Tim kamu kewalahan menjawab satu per satu.",
      question: "Apa langkahmu?",
      options: {
        A: "Buat FAQ/guide + sistem antrian pertanyaan; bagi shift admin, jawab yang urgent dulu.",
        B: "Tetap jawab satu per satu walau lembur parah.",
        C: "Biarkan saja pertanyaan menumpuk, nanti juga sepi.",
        D: "Tutup akses tanya jawab supaya tenang.",
      },
    },
    {
      id: "B2-2",
      title: "Info Berubah Mendadak",
      situation:
        "Ada perubahan info penting (jadwal/ruangan). Kalau telat update, maba bingung. Tapi kamu belum dapat konfirmasi final.",
      question: "Kamu memilih apa?",
      options: {
        A: "Umumkan “sementara” dengan label jelas + waktu update berikutnya; segera revisi saat final.",
        B: "Tunggu final, meski banyak yang keburu salah info.",
        C: "Umumkan cepat tanpa cek, nanti kalau salah minta maaf.",
        D: "Tidak usah diumumkan, biar maba cari sendiri.",
      },
    },
    {
      id: "B2-3",
      title: "Kelompok Maba Tidak Seimbang",
      situation:
        "Pembagian kelompok maba tidak seimbang: ada kelompok terlalu ramai, ada yang sepi. Beberapa maba protes.",
      question: "Solusimu?",
      options: {
        A: "Evaluasi distribusi + pindahkan sebagian dengan komunikasi halus (jelaskan tujuannya agar adil).",
        B: "Biarkan saja, nanti menyesuaikan sendiri.",
        C: "Suruh maba yang protes pindah sendiri.",
        D: "Batalkan sistem kelompoknya.",
      },
    },
    {
      id: "B2-4",
      title: "Mentor/KK Tidak Responsif",
      situation:
        "Ada mentor/KK yang lambat respon. Maba jadi bertanya ke banyak orang dan informasi simpang siur.",
      question: "Apa langkahmu?",
      options: {
        A: "Follow-up 1:1 + tetapkan aturan respon; siapkan backup mentor bila perlu.",
        B: "Umumkan di grup bahwa mentor itu kurang aktif.",
        C: "Diam saja, nanti juga jalan.",
        D: "Serahkan ke pimpinan, kamu tidak ikut.",
      },
    },
    {
      id: "B2-5",
      title: "Maba Overwhelm / Takut Bertanya",
      situation:
        "Ada maba yang terlihat kewalahan dan enggan bertanya di grup. Kamu ingin membantu tanpa membuat dia malu.",
      question: "Kamu melakukan apa?",
      options: {
        A: "DM secara suportif + tawarkan kanal anonim/teman pendamping; pastikan dia punya kontak aman.",
        B: "Paksa dia cerita di grup biar cepat beres.",
        C: "Biarkan saja, nanti dia adaptasi sendiri.",
        D: "Anggap itu bukan urusan panitia.",
      },
    },
    {
      id: "B2-6",
      title: "Kegiatan Tabrak Jadwal Kuliah",
      situation:
        "Kegiatan penyambutan tabrakan jadwal kuliah sebagian maba. Kalau dipindah, panitia repot. Kalau lanjut, banyak yang tidak bisa ikut.",
      question: "Keputusanmu?",
      options: {
        A: "Cari opsi hybrid/rekap + jadwal alternatif; jelaskan prioritas kuliah dan tetap inklusif.",
        B: "Tetap jadwal awal, yang tidak bisa ikut ya sudah.",
        C: "Batalkan kegiatan saja.",
        D: "Serahkan ke pihak lain untuk putuskan.",
      },
    },
  ],

  BIDANG_III: [
    {
      id: "B3-1",
      title: "SOP Kegiatan: Beda Tafsir",
      situation:
        "Tim punya SOP kegiatan, tapi banyak yang menafsir beda-beda. Akhirnya eksekusi tidak konsisten dan mulai ada komplain.",
      question: "Langkahmu?",
      options: {
        A: "Ringkas SOP jadi poin inti + contoh kasus; lakukan briefing singkat dan tetapkan kanal tanya jawab.",
        B: "Biarkan saja, tiap orang gaya masing-masing.",
        C: "Tegur orang yang salah eksekusi di grup besar.",
        D: "Stop kegiatan sampai semua paham sempurna.",
      },
    },
    {
      id: "B3-2",
      title: "Aturan Terasa ‘Keras’",
      situation:
        "Ada aturan yang dibuat demi ketertiban, tapi sebagian peserta merasa aturan itu ‘terlalu keras’ dan tidak manusiawi.",
      question: "Responmu?",
      options: {
        A: "Evaluasi dampak aturan + jelaskan tujuan; revisi jadi tegas tapi tetap manusiawi dan aman.",
        B: "Pertahankan aturan apa adanya, yang tidak suka silakan.",
        C: "Hapus semua aturan biar tidak ada konflik.",
        D: "Diam saja, nanti juga lupa.",
      },
    },
    {
      id: "B3-3",
      title: "Ambigu: Aspirasi Anonim Minim Detail",
      situation:
        "Ada aspirasi anonim: “Bidang X nggak jalan.” Tidak ada contoh, waktu, atau konteks. Kalau kamu eskalasi mentah, bisa memicu konflik. Kalau kamu abaikan, kanal aspirasi kehilangan makna.",
      question: "Kamu lakukan apa?",
      options: {
        A: "Minta klarifikasi tambahan lewat form (opsional anonim) + rangkum jadi pertanyaan konstruktif untuk forum.",
        B: "Langsung kirim ke Bidang X apa adanya.",
        C: "Abaikan karena tidak jelas.",
        D: "Post ke publik agar ramai dan cepat ditangani.",
      },
    },
    {
      id: "B3-4",
      title: "Konflik Nilai: Privasi vs Transparansi",
      situation:
        "Ada anggota curhat soal konflik organisasi. Dia ingin anonim, tapi kasusnya butuh tindakan. Kamu harus menjaga privasi tanpa membuat isu “menggantung”.",
      question: "Cara terbaik?",
      options: {
        A: "Jelaskan batas privasi + minta izin bagian mana yang boleh dibagikan; fokus pada pola masalah, bukan identitas.",
        B: "Sebarkan detail lengkap biar semua tahu konteks.",
        C: "Abaikan karena takut salah langkah.",
        D: "Paksa dia membuka identitas biar berani.",
      },
    },
    {
      id: "B3-5",
      title: "Konflik Panitia: Gaya Keras vs Hangat",
      situation:
        "Sebagian panitia ingin gaya keras, sebagian ingin hangat. Diskusi memanas. Padahal kamu butuh keputusan cepat agar SOP jalan.",
      question: "Cara kamu memutuskan?",
      options: {
        A: "Balik ke prinsip: aman, menghormati, jelas tujuannya; pilih pendekatan tegas tapi sopan + SOP tertulis.",
        B: "Pilih gaya keras agar cepat selesai.",
        C: "Pilih gaya hangat total, semua aturan dibuat longgar.",
        D: "Biarkan saja campur, tiap kelompok beda gaya.",
      },
    },
    {
      id: "B3-6",
      title: "Deadline: Briefing Panitia",
      situation:
        "Briefing panitia besok pagi, tapi materi belum siap. Kalau briefing berantakan, eksekusi kacau.",
      question: "Strategimu?",
      options: {
        A: "Susun materi inti 1 halaman (tujuan, alur, do/don’t, eskalasi masalah) lalu bagi peran jelas.",
        B: "Briefing spontan saja, nanti juga jalan.",
        C: "Tunda briefing sampai materi lengkap.",
        D: "Minta orang lain buat, kamu hanya hadir.",
      },
    },
  ],

  BIDANG_IV: [
    {
      id: "B4-1",
      title: "Kolaborasi Jalan, Tapi Brief Berubah",
      situation:
        "Tim lain ngajak kolaborasi, tapi brief berubah-ubah. Kamu takut kerjaan mubazir dan timmu capek revisi terus.",
      question: "Tindakanmu?",
      options: {
        A: "Minta brief tertulis + scope fix + deadline; set 1 PIC untuk perubahan biar rapi.",
        B: "Ikuti semua perubahan biar cepat selesai.",
        C: "Tolak kolaborasi karena bikin repot.",
        D: "Kerjain seadanya, kalau salah baru revisi.",
      },
    },
    {
      id: "B4-2",
      title: "Mitra Lambat Respon",
      situation:
        "Mitra eksternal lambat respon, padahal kamu butuh kepastian untuk timeline. Tim internal mulai panik.",
      question: "Strategimu?",
      options: {
        A: "Follow-up sopan dengan batas waktu + siapkan plan B (opsi mitra lain) sambil tetap profesional.",
        B: "Spam chat terus sampai dibalas.",
        C: "Tunggu saja, tidak usah follow-up biar tidak mengganggu.",
        D: "Batalkan kerja sama tanpa kabar.",
      },
    },
    {
      id: "B4-3",
      title: "Komunikasi Formal vs Santai",
      situation:
        "Ada stakeholder yang sangat formal. Tim internal terbiasa santai. Kamu khawatir salah gaya komunikasi menurunkan trust.",
      question: "Kamu melakukan apa?",
      options: {
        A: "Buat SOP komunikasi eksternal (format, PIC, template pesan) + briefing singkat ke tim.",
        B: "Biarkan tim gaya bebas biar natural.",
        C: "Serahkan komunikasi ke pimpinan saja.",
        D: "Hindari kerja sama dengan stakeholder formal.",
      },
    },
    {
      id: "B4-4",
      title: "Overcommit Demi Deal",
      situation:
        "Agar kerja sama terjadi, ada godaan untuk menjanjikan hal berlebihan (overcommit). Kamu takut tim tidak sanggup memenuhi.",
      question: "Pilihanmu?",
      options: {
        A: "Tawarkan komitmen realistis + jelaskan kapasitas; lebih baik kecil tapi terpenuhi daripada besar tapi gagal.",
        B: "Janji besar dulu, nanti dipikirkan belakangan.",
        C: "Tolak semua kerja sama biar aman.",
        D: "Diam dan biarkan orang lain yang memutuskan.",
      },
    },
    {
      id: "B4-5",
      title: "Konflik Internal: Siapa PIC Eksternal",
      situation:
        "Dua orang ingin jadi PIC relasi eksternal, masing-masing merasa paling mampu. Ini mulai jadi ego. Kamu butuh pembagian yang sehat.",
      question: "Solusimu?",
      options: {
        A: "Bagi peran (PIC komunikasi vs PIC konten/dokumen) + aturan update; ukur dengan target jelas.",
        B: "Pilih satu orang favorit, yang lain mengikuti.",
        C: "Biarkan mereka bersaing, yang kuat menang.",
        D: "Ambil semua sendiri biar tidak ribut.",
      },
    },
    {
      id: "B4-6",
      title: "Deadline: Proposal untuk Mitra",
      situation:
        "Mitra minta proposal hari ini. Tim konten lambat. Kamu harus kirim sesuatu yang layak tanpa menunggu sempurna.",
      question: "Taktikmu?",
      options: {
        A: "Kirim one-pager dulu (tujuan, benefit, timeline) + janji proposal lengkap besok; minta input cepat dari tim.",
        B: "Tunggu proposal lengkap baru kirim.",
        C: "Kirim apa adanya tanpa review.",
        D: "Batalkan saja, keburu pusing.",
      },
    },
  ],

  BIDANG_V: [
    {
      id: "B5-1",
      title: "Konten Naik, Engagement Sehat",
      situation:
        "Konten organisasi naik performanya. Tapi ada yang bilang gaya konten mulai ‘terlalu mengejar viral’ dan takut menggeser citra profesional.",
      question: "Kamu memilih apa?",
      options: {
        A: "Tetapkan guideline brand (tone, batas humor) + evaluasi konten pakai metrik & nilai organisasi.",
        B: "Gas viral terus, yang penting rame.",
        C: "Stop posting hal kreatif, balik formal total.",
        D: "Biarkan tiap admin posting sesuka hati.",
      },
    },
    {
      id: "B5-2",
      title: "Revisi Tanpa Henti",
      situation:
        "Desain sudah dibuat, tapi revisi terus datang dari banyak orang dan kadang saling bertentangan. Deadline mepet.",
      question: "Tindakanmu?",
      options: {
        A: "Tetapkan 1 PIC keputusan final + batasi putaran revisi; rangkum feedback jadi 1 arahan jelas.",
        B: "Ikuti semua revisi sampai semua puas.",
        C: "Abaikan semua revisi, kirim desain awal.",
        D: "Ngambek dan berhenti desain.",
      },
    },
    {
      id: "B5-3",
      title: "Krisis Komunikasi",
      situation:
        "Ada postingan yang disalahpahami dan memicu komentar negatif. Kamu harus merespons cepat tapi tetap elegan.",
      question: "Langkahmu?",
      options: {
        A: "Tarik/clarify postingan + buat klarifikasi singkat, sopan, dan fokus ke fakta; evaluasi internal agar tidak terulang.",
        B: "Balas komentar satu-satu dengan nada keras.",
        C: "Diam saja, nanti juga reda.",
        D: "Hapus semua komentar biar tidak kelihatan.",
      },
    },
    {
      id: "B5-4",
      title: "Kolaborasi Konten Lintas Tim",
      situation:
        "Tim lain minta konten, tapi mereka lambat kirim bahan. Kamu dikejar deadline posting.",
      question: "Apa yang kamu lakukan?",
      options: {
        A: "Kirim deadline bahan + template input; kalau lewat, posting versi minimal (tanpa mengorbankan akurasi).",
        B: "Tunggu bahan lengkap, meski posting telat.",
        C: "Posting tanpa bahan, asal jalan.",
        D: "Stop bantu tim lain sama sekali.",
      },
    },
    {
      id: "B5-5",
      title: "Brand Terasa Tidak Konsisten",
      situation:
        "Feed terlihat campur aduk: warna, font, gaya desain beda-beda karena banyak admin. Kamu ingin rapi tapi tidak mau mematikan kreativitas.",
      question: "Solusi paling realistis?",
      options: {
        A: "Buat kit sederhana (warna, font, layout) + contoh template; kreativitas tetap boleh di dalam batas itu.",
        B: "Kunci semuanya ketat, tidak boleh beda.",
        C: "Biarkan saja, yang penting posting.",
        D: "Ganti admin agar konsisten.",
      },
    },
    {
      id: "B5-6",
      title: "Ide Kreatif vs Risiko Salah Paham",
      situation:
        "Ada ide konten kreatif yang lucu, tapi berpotensi disalahpahami. Tim terbelah: ‘gas aja’ vs ‘main aman’.",
      question: "Keputusanmu?",
      options: {
        A: "Uji dulu dengan cek risiko (target audience, konteks) + revisi wording; kalau masih risk tinggi, pilih alternatif aman.",
        B: "Gas langsung biar seru.",
        C: "Tolak semua ide kreatif, formal saja.",
        D: "Biarkan voting ramai-ramai tanpa panduan.",
      },
    },
  ],

  BIDANG_VI: [
    {
      id: "B6-1",
      title: "Anggota Baru Bingung Alur",
      situation:
        "Anggota baru bingung alur kerja: harus lapor siapa, format apa, deadline kapan. Akhirnya banyak miskom.",
      question: "Langkahmu?",
      options: {
        A: "Buat alur kerja ringkas (PIC, format, deadline) + onboarding singkat; pasang di tempat yang mudah diakses.",
        B: "Biarkan mereka belajar sendiri seiring waktu.",
        C: "Marahi yang salah alur biar kapok.",
        D: "Tunggu pimpinan yang menjelaskan.",
      },
    },
    {
      id: "B6-2",
      title: "Task Menumpuk, Prioritas Kacau",
      situation:
        "Banyak task masuk bersamaan. Tim bingung mana yang didahulukan. Kamu melihat beberapa orang burnout.",
      question: "Kamu melakukan apa?",
      options: {
        A: "Susun prioritas (impact vs urgent) + pecah task jadi kecil + cek kapasitas tiap orang sebelum membagi.",
        B: "Bagi rata task tanpa lihat kapasitas.",
        C: "Kerjakan sendiri biar cepat.",
        D: "Tunda semua sampai suasana tenang.",
      },
    },
    {
      id: "B6-3",
      title: "Miskom Antar Tim",
      situation:
        "Tim A merasa Tim B tidak support, Tim B merasa Tim A tidak jelas brief. Konflik mulai terasa.",
      question: "Responmu?",
      options: {
        A: "Fasilitasi sinkronisasi: brief tertulis, PIC, timeline; sepakati cara update dan eskalasi masalah.",
        B: "Pihak salah satu tim.",
        C: "Biarkan saja, nanti terbiasa.",
        D: "Laporkan ke pimpinan dan lepas tangan.",
      },
    },
    {
      id: "B6-4",
      title: "Kualitas Output Turun",
      situation:
        "Output makin banyak, tapi kualitas turun (typo, salah info, desain asal). Kamu ingin kualitas naik tanpa memperlambat total.",
      question: "Kamu memilih apa?",
      options: {
        A: "Buat checkpoint QC ringan + template; bagi peran (draft vs QC) agar efisien.",
        B: "QC super ketat untuk semua hal, meski jadi lambat.",
        C: "Biarkan saja, yang penting cepat.",
        D: "Stop produksi sampai semua bisa rapi.",
      },
    },
    {
      id: "B6-5",
      title: "Orang Kunci Tidak Ada",
      situation:
        "Orang yang pegang satu hal penting mendadak tidak bisa dihubungi. Tim stuck.",
      question: "Solusimu?",
      options: {
        A: "Bangun sistem backup: dokumentasi, akses bersama, dan peran pengganti; untuk kasus ini cari workaround minimal agar tetap jalan.",
        B: "Tunggu orang itu balik, meski deadline lewat.",
        C: "Marahi orang itu di grup.",
        D: "Batalkan saja, tidak bisa apa-apa.",
      },
    },
    {
      id: "B6-6",
      title: "Evaluasi Tengah Periode",
      situation:
        "Kamu diminta evaluasi tengah periode. Tim capek. Kalau terlalu formal, mereka jenuh. Kalau terlalu santai, tidak ada perubahan.",
      question: "Kamu memilih format apa?",
      options: {
        A: "Evaluasi ringkas berbasis data + 1-2 aksi perbaikan yang jelas; tutup dengan apresiasi.",
        B: "Evaluasi panjang dan detail semua masalah.",
        C: "Tidak usah evaluasi, biar jalan saja.",
        D: "Hanya fokus menyalahkan yang kurang aktif.",
      },
    },
  ],
};
