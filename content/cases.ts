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
      question: "Kalau kamu di posisi ini, langkah awal yang paling sesuai gaya kamu apa?",
      options: {
        A: "Buat dua versi (standar + ringkas) dan jelaskan kapan masing-masing dipakai.",
        B: "Mulai dari versi ringkas untuk kebutuhan cepat, sambil siapkan standar untuk arsip.",
        C: "Dorong satu standar dulu supaya rapi, lalu evaluasi kalau ada yang keberatan.",
        D: "Ajak pimpinan menentukan arah agar semua panitia punya acuan yang sama.",
      },
    },
    {
      id: "ADKES-2",
      title: "Surat Mendesak, Data Kurang",
      situation:
        "H-1 acara, panitia minta surat peminjaman ruangan. Data inti (waktu, PIC, kontak) masih bolong dan mereka bilang “nanti nyusul”. Kalau menunggu, surat terlambat. Kalau lanjut, salah detail bisa bikin reputasi jelek.",
      question: "Apa respons yang paling natural buatmu?",
      options: {
        A: "Kirim checklist data wajib + deadline singkat; siapkan draft “pending data” untuk PIC.",
        B: "Susun draft dengan asumsi aman, lalu minta konfirmasi cepat sebelum dikirim.",
        C: "Tahan proses sampai data inti lengkap meski ada risiko telat.",
        D: "Eskalasi ke pimpinan agar keputusan diambil bersama soal risiko waktunya.",
      },
    },
    {
      id: "ADKES-3",
      title: "Arsip Berantakan di Drive",
      situation:
        "Drive organisasi penuh file tanpa nama jelas (final2, revisi_fix_fix). Saat dibutuhkan cepat, semua bingung. Kamu bukan “pemilik” drive, tapi kamu yang paling sering diberi tugas cari dokumen.",
      question: "Langkah pertama yang kamu ambil biasanya apa?",
      options: {
        A: "Susun struktur folder + aturan penamaan sederhana, lalu ajak inti pengurus sepakat memakainya.",
        B: "Rapikan sebagian dokumen yang paling sering dipakai dulu agar cepat terasa manfaatnya.",
        C: "Mulai dari membuat daftar dokumen penting dan lokasi terakhirnya sebelum beres-beres besar.",
        D: "Koordinasi dengan pemilik drive untuk minta akses dan pembagian peran rapi-rapi.",
      },
    },
    {
      id: "ADKES-4",
      title: "Dokumen “Biar Cepat Aja”",
      situation:
        "Ada panitia minta kamu “edit dikit aja” dokumen orang lain, tapi kamu melihat ada bagian yang rawan salah paham (kalimatnya tegas banget, bisa menyinggung pihak tertentu). Panitia bilang: “Udah, biar cepat aja.”",
      question: "Kalau itu kamu, kamu akan bagaimana?",
      options: {
        A: "Kasih catatan di bagian rawan + jelaskan risikonya secara singkat, tawarkan wording yang aman.",
        B: "Tetap bantu cepat, tapi batasi perubahan hanya pada bagian yang jelas aman.",
        C: "Minta waktu singkat untuk cek ulang dan pastikan ada persetujuan penanggung jawab.",
        D: "Minta klarifikasi tertulis dulu supaya keputusan revisi punya pijakan.",
      },
    },
    {
      id: "ADKES-5",
      title: "Panitia vs Standar Admin",
      situation:
        "Panitia bilang: “Admin jangan banyak aturan, bikin ribet.” Tapi kamu tahu kalau terlalu longgar, nanti banyak missing data dan revisi di belakang. Kamu ingin tetap ramah tanpa jadi ‘polisi’ dokumen.",
      question: "Cara menengahi yang paling terasa “kamu” apa?",
      options: {
        A: "Tetapkan minimum data wajib yang ringkas + jelaskan manfaatnya; sisanya fleksibel.",
        B: "Berikan ruang fleksibel di awal, lalu rapikan setelah panitia mulai paham kebutuhannya.",
        C: "Gunakan standar tetap, tapi beri jalur pengecualian dengan alasan yang jelas.",
        D: "Ajak pimpinan menjelaskan agar aturan punya legitimasi dan tidak terkesan personal.",
      },
    },
    {
      id: "ADKES-6",
      title: "Notulen Mepet, Banyak Rapat",
      situation:
        "Dalam seminggu ada beberapa rapat. Notulen sebelumnya sering telat atau tidak jelas, bikin tindak lanjut kacau. Kamu diminta “bantu notulensi” tapi waktumu juga terbatas.",
      question: "Strategi yang paling realistis buatmu apa?",
      options: {
        A: "Pakai template ringkas (keputusan, PIC, deadline) + kirim draft cepat untuk konfirmasi.",
        B: "Buat notulen detail tapi fokus rapat prioritas saja agar tetap terjaga kualitasnya.",
        C: "Minta setiap PIC merangkum tindak lanjutnya, lalu kamu satukan jadi notulen singkat.",
        D: "Rotasi notulen per rapat agar beban terbagi merata.",
      },
    },
  ],

  BIRO_KL: [
    {
      id: "KL-1",
      title: "Quality Time Berhasil",
      situation:
        "Kamu bikin sesi kebersamaan pengurus yang sederhana tapi ramai dan terasa akrab. Setelah itu, ada yang bilang “akhirnya kerasa punya rumah”. Namun ada juga yang merasa “ini buang waktu, mending kerja”.",
      question: "Respons yang paling kamu pilih biasanya apa?",
      options: {
        A: "Rangkum feedback: pertahankan, tapi buat format lebih singkat dengan tujuan yang jelas.",
        B: "Pertahankan konsepnya, tapi ubah frekuensi agar tidak terasa mengganggu kerja.",
        C: "Tes satu sesi lagi dengan format baru sebelum memutuskan lanjut/stop.",
        D: "Diskusikan di forum pimpinan agar keputusan dirasa adil.",
      },
    },
    {
      id: "KL-2",
      title: "Pengurus Mendadak Menurun",
      situation:
        "Dua orang pengurus belakangan sering absen dan slow respon. Kamu tahu mereka punya kesibukan, tapi tim mulai terdampak. Kamu tidak ingin menghakimi, tapi perlu kejelasan.",
      question: "Langkah awal yang paling mungkin kamu ambil?",
      options: {
        A: "Ajak ngobrol 1:1, tanya kondisi + tawarkan penyesuaian beban dan target kecil.",
        B: "Minta update progres di grup agar terlihat jelas siapa butuh bantuan.",
        C: "Buat kesepakatan ulang soal komitmen dan timeline untuk semua anggota.",
        D: "Konsultasikan ke pimpinan tentang opsi redistribusi tugas.",
      },
    },
    {
      id: "KL-3",
      title: "Data Kehadiran vs Realita",
      situation:
        "Di absensi, seseorang tampak ‘hadir’ tapi kontribusinya minim. Di sisi lain, ada yang jarang rapat tapi kerjaannya beres. Kamu diminta menilai keaktifan untuk evaluasi.",
      question: "Kalau harus menilai, kamu menilai dengan cara apa?",
      options: {
        A: "Gabungkan indikator: kehadiran, output, respons, dan feedback tim; jelaskan rubriknya.",
        B: "Fokus pada output utama dan dampaknya, lalu catat konteks kehadiran.",
        C: "Gunakan data absensi sebagai dasar, lalu beri ruang catatan kualitatif.",
        D: "Minta forum kecil untuk kalibrasi penilaian agar tidak bias pribadi.",
      },
    },
    {
      id: "KL-4",
      title: "Aspirasi yang “Panas”",
      situation:
        "Ada aspirasi masuk: “Pengurus A toxic.” Tidak ada bukti jelas, tapi isu ini bisa bikin tim pecah kalau disebar mentah. Kamu pegang kanal aspirasi.",
      question: "Respons yang paling kamu ambil?",
      options: {
        A: "Validasi aspirasi: minta contoh konkret + tawarkan mediasi tertutup, jaga privasi.",
        B: "Simpan dulu, lalu cek ke pihak terkait secara privat untuk konteks.",
        C: "Buat ringkasan isu tanpa menyebut nama untuk dibahas di forum terbatas.",
        D: "Diskusikan dengan pimpinan tentang langkah yang aman sebelum ditindaklanjuti.",
      },
    },
    {
      id: "KL-5",
      title: "Konflik Dua Pengurus",
      situation:
        "Dua pengurus sering bentrok gaya kerja. Satu cepat tapi ‘asal jalan’, satu rapi tapi lambat. Mereka mulai saling sindir, performa tim turun.",
      question: "Kalau kamu yang pegang, apa langkahmu?",
      options: {
        A: "Fasilitasi obrolan: sepakati standar output, timeline, dan cara komunikasi; bagi peran sesuai kekuatan.",
        B: "Uji coba pembagian tugas berbeda selama 1-2 minggu, lalu evaluasi bersama.",
        C: "Tawarkan pendampingan singkat agar keduanya paham ekspektasi masing-masing.",
        D: "Minta pimpinan ikut mediasi agar keputusan lebih objektif.",
      },
    },
    {
      id: "KL-6",
      title: "Deadline Evaluasi Pengurus",
      situation:
        "Kamu harus merangkum evaluasi untuk forum pimpinan besok. Data belum lengkap. Kalau menunggu sempurna, telat. Kalau buru-buru, bisa tidak adil.",
      question: "Pilihan yang paling kamu ambil?",
      options: {
        A: "Buat ringkasan sementara + catatan keterbatasan data; lanjutkan pengumpulan untuk revisi.",
        B: "Tunda rapat evaluasi dan komunikasikan alasan serta timeline baru.",
        C: "Kirim versi awal dengan data minimal, lalu jadwalkan sesi klarifikasi.",
        D: "Minta masukan cepat dari pimpinan tentang prioritas data yang wajib ada.",
      },
    },
  ],

  BIRO_ADKEU: [
    {
      id: "ADKEU-1",
      title: "LPJ Tepat, Panitia Lega",
      situation:
        "Kamu bantu panitia menyusun LPJ, semua bukti rapi, dan laporan diterima tanpa revisi. Mereka senang dan ingin pola ini jadi standar. Tapi beberapa orang takut “terlalu ribet” untuk proker kecil.",
      question: "Kalau kamu diminta saran, kamu akan bilang apa?",
      options: {
        A: "Buat standar bertingkat: proker kecil versi ringkas, proker besar versi lengkap.",
        B: "Tetapkan standar dasar wajib, lalu beri ruang penyesuaian per proker.",
        C: "Mulai dari versi ringkas dulu, lalu naikkan standar jika tim sudah nyaman.",
        D: "Diskusikan di forum panitia agar keputusan terasa adil untuk semua.",
      },
    },
    {
      id: "ADKEU-2",
      title: "Bukti Hilang Menjelang Deadline",
      situation:
        "Panitia bilang beberapa bukti transaksi hilang. Deadline laporan besok. Kalau tidak ada bukti, laporan berisiko dipertanyakan. Mereka panik dan minta “solusi cepat”.",
      question: "Langkahmu kalau menghadapi ini?",
      options: {
        A: "Minta kronologi + cari bukti pengganti (mutasi/nota digital) + tulis catatan klarifikasi.",
        B: "Prioritaskan transaksi besar dulu, sisanya dicari bertahap dengan tenggat jelas.",
        C: "Diskusikan dengan bendum apakah perlu dibuat berita acara kehilangan bukti.",
        D: "Eskalasi ke pimpinan untuk menentukan batas risiko yang bisa diterima.",
      },
    },
    {
      id: "ADKEU-3",
      title: "Cashflow Menipis, Proker Jalan Terus",
      situation:
        "Di tengah periode, kas menipis. Ada proker yang tetap minta dana segera. Kalau ditahan, proker bisa terganggu. Kalau dilepas, risiko kas kosong untuk kebutuhan mendadak.",
      question: "Keputusan yang paling mungkin kamu ambil?",
      options: {
        A: "Buat prioritas pengeluaran + jadwal pencairan bertahap; transparan soal kondisi kas.",
        B: "Cairkan sebagian sesuai urgensi, lalu evaluasi ulang setelah pemasukan berikutnya.",
        C: "Tahan pencairan non-urgent sampai kas stabil, sambil beri opsi penyesuaian proker.",
        D: "Minta rapat singkat untuk menyepakati batas minimal kas aman.",
      },
    },
    {
      id: "ADKEU-4",
      title: "Sponsor Masuk, Syaratnya Aneh",
      situation:
        "Ada sponsor mau bantu dana, tapi minta hal yang berpotensi merusak citra (mis. promosi agresif di acara internal). Tim butuh dana, tapi kamu ragu risiko jangka panjang.",
      question: "Kalau kamu yang pegang, apa langkahmu?",
      options: {
        A: "Negosiasi syarat: cari titik aman (branding wajar) + minta persetujuan pimpinan.",
        B: "Ajukan opsi kerja sama terbatas dulu untuk uji respons, baru dievaluasi.",
        C: "Minta tim menilai risiko citra vs kebutuhan dana sebelum menentukan sikap.",
        D: "Minta pimpinan memutuskan karena dampaknya strategis.",
      },
    },
    {
      id: "ADKEU-5",
      title: "Bendum vs Panitia: Pengeluaran Dadakan",
      situation:
        "Panitia minta pencairan dana mendadak tanpa proposal rinci karena “waktunya mepet”. Mereka bilang nanti bukti nyusul. Kamu tahu ini rawan masalah.",
      question: "Respons yang paling kamu ambil?",
      options: {
        A: "Minta detail minimum (jumlah, tujuan, PIC) + gunakan form pencairan cepat.",
        B: "Cairkan sebagian dulu dengan komitmen bukti dan laporan singkat segera.",
        C: "Tawarkan bantuan menyusun proposal ringkas agar bisa diproses tepat waktu.",
        D: "Diskusikan ke pimpinan untuk menyepakati batas minimal proses pencairan.",
      },
    },
    {
      id: "ADKEU-6",
      title: "Transparansi ke Anggota",
      situation:
        "Ada anggota bertanya: “Uang kas dipakai apa aja?” Kamu ingin transparan, tapi juga tidak ingin membuka detail yang bisa disalahpahami tanpa konteks.",
      question: "Cara jawab yang paling nyaman buatmu?",
      options: {
        A: "Buat ringkasan laporan (kategori + total) + sediakan bukti lewat jalur resmi.",
        B: "Bagikan ringkasan visual (infografik) lalu tawarkan sesi tanya jawab singkat.",
        C: "Jelaskan prinsip penggunaan kas + janji update laporan berkala.",
        D: "Ajak yang bertanya berdiskusi privat agar konteksnya tidak salah paham.",
      },
    },
  ],

  BIRO_EKRAF: [
    {
      id: "EKRAF-1",
      title: "Produk Laku, Tim Bangga",
      situation:
        "Kamu dan tim berhasil jual produk proker, respon bagus. Tapi ada anggota yang protes karena merasa tidak dilibatkan, padahal sebelumnya dia pasif.",
      question: "Respons yang paling menggambarkan kamu?",
      options: {
        A: "Ajak evaluasi: buka peluang peran jelas di batch berikutnya, sambil tegas soal komitmen.",
        B: "Tawarkan satu tugas kecil terlebih dulu agar dia bisa membuktikan konsistensi.",
        C: "Buat sistem pendaftaran peran sejak awal supaya keterlibatan transparan.",
        D: "Diskusikan dengan pimpinan tentang batas keterlibatan yang realistis.",
      },
    },
    {
      id: "EKRAF-2",
      title: "Target Penjualan Tidak Tercapai",
      situation:
        "Penjualan jauh dari target. Tim mulai saling menyalahkan (desain jelek, promosi kurang, harga kemahalan). Kamu harus ambil langkah cepat.",
      question: "Langkah awal yang paling kamu pilih?",
      options: {
        A: "Ambil data sederhana (channel, produk, harga) + tetapkan 1-2 eksperimen cepat minggu ini.",
        B: "Fokus pada satu bottleneck (mis. harga atau promosi) lalu uji perbaikan singkat.",
        C: "Ajak tim sinkronisasi tujuan dan peran agar tidak saling menyalahkan dulu.",
        D: "Minta mentor/partner memberi masukan cepat tentang apa yang bisa ditingkatkan.",
      },
    },
    {
      id: "EKRAF-3",
      title: "Kualitas vs Kecepatan Produksi",
      situation:
        "Deadline mepet. Kalau produksi cepat, kualitas menurun (finishing jelek). Kalau fokus kualitas, jumlah stok kurang. Tim bingung.",
      question: "Kamu cenderung memilih yang mana?",
      options: {
        A: "Tentukan standar minimum kualitas + prioritaskan item penting; komunikasikan trade-off.",
        B: "Bagi produk: sebagian cepat untuk stok, sebagian premium untuk kualitas.",
        C: "Pilih kualitas untuk item utama, sisanya disederhanakan agar tetap ada stok.",
        D: "Ajak tim memilih bersama berdasarkan data permintaan minggu ini.",
      },
    },
    {
      id: "EKRAF-4",
      title: "Kolaborasi dengan Tim Lain",
      situation:
        "Bidang lain minta kolaborasi: mereka butuh merchandise, tapi brief berubah-ubah. Kamu merasa timmu jadi ‘tukang jahit’ tanpa arah.",
      question: "Kalau kamu yang pegang, apa yang kamu lakukan?",
      options: {
        A: "Minta brief tertulis + deadline fix + satu PIC agar kerjaan jelas.",
        B: "Jalankan versi MVP dulu, lalu buka slot revisi terjadwal.",
        C: "Sepakati batas perubahan (jumlah revisi) sejak awal supaya tetap realistis.",
        D: "Minta pimpinan membantu menyepakati scope agar kolaborasi sehat.",
      },
    },
    {
      id: "EKRAF-5",
      title: "Harga Terasa “Kemahalan”",
      situation:
        "Ada kritik: produk kemahalan untuk mahasiswa. Tapi kalau turunin harga, margin tipis dan kas kecil. Kamu ingin adil dan realistis.",
      question: "Solusi yang paling terasa masuk akal buatmu?",
      options: {
        A: "Buat opsi harga: versi standar + budget; transparan soal biaya & manfaat.",
        B: "Tawarkan promo terbatas waktu agar harga terasa terjangkau tanpa menekan margin permanen.",
        C: "Perbaiki value (bonus/packaging) agar harga terasa lebih pantas.",
        D: "Diskusikan target pasar agar strategi harga konsisten dengan tujuan proker.",
      },
    },
    {
      id: "EKRAF-6",
      title: "Distribusi Keuntungan",
      situation:
        "Setelah proker, ada keuntungan. Tim beda pendapat: ada yang mau semua masuk kas, ada yang mau sebagian untuk apresiasi tim.",
      question: "Kalau harus memilih, kamu pilih yang mana?",
      options: {
        A: "Tentukan pembagian jelas: mayoritas ke kas + porsi kecil apresiasi; dokumentasikan.",
        B: "Buat mekanisme apresiasi non-tunai agar kas tetap aman.",
        C: "Sisihkan sebagian untuk pengembangan tim (tools/pelatihan) agar manfaatnya jangka panjang.",
        D: "Bawa ke forum tim untuk voting agar keputusan diterima bersama.",
      },
    },
  ],

  BIDANG_I: [
    {
      id: "B1-1",
      title: "Program Akademik Disambut Baik",
      situation:
        "Kamu bikin program belajar bareng yang ternyata ramai dan bermanfaat. Ada saran untuk memperluas topik, tapi timmu terbatas.",
      question: "Langkah yang paling kamu ambil?",
      options: {
        A: "Pilih topik prioritas + rekrut mentor tambahan/kolaborasi, mulai bertahap.",
        B: "Buat siklus topik bergilir agar semua usul tetap terakomodasi.",
        C: "Uji coba satu topik tambahan dulu untuk melihat kapasitas tim.",
        D: "Ajak peserta memilih topik lewat polling supaya prioritas jelas.",
      },
    },
    {
      id: "B1-2",
      title: "Mentor Mendadak Batal",
      situation:
        "H-1 kelas, mentor utama mendadak batal. Peserta sudah daftar banyak. Kamu harus menyelamatkan acara tanpa bikin panik.",
      question: "Kalau itu kamu, apa yang kamu lakukan?",
      options: {
        A: "Cari mentor pengganti cepat + siapkan materi ringkas; informasikan solusi jelas ke peserta.",
        B: "Ganti format jadi sharing internal/kelas Q&A agar tetap ada nilai.",
        C: "Jadwalkan ulang dengan komunikasi terbuka dan kompensasi materi tambahan.",
        D: "Minta pembicara cadangan dari tim agar tetap berjalan.",
      },
    },
    {
      id: "B1-3",
      title: "Konten Ambigu / Hoaks Halus",
      situation:
        "Ada konten akademik yang dibagikan, tapi kamu ragu akurasinya. Kalau dibiarkan, bisa menyesatkan. Kalau ditegur, takut bikin suasana tegang.",
      question: "Sikap yang paling kamu ambil?",
      options: {
        A: "Cek sumber cepat + ajak klarifikasi privat; revisi tanpa mempermalukan.",
        B: "Tambahkan catatan sumber/rujukan agar pembaca bisa verifikasi.",
        C: "Tawarkan update konten bersama agar tetap akurat dan aman.",
        D: "Konsultasi ke pihak kompeten sebelum ambil tindakan.",
      },
    },
    {
      id: "B1-4",
      title: "Konflik Nilai: Akses Belajar",
      situation:
        "Ada ide kelas berbayar untuk kualitas. Tapi ada yang khawatir akses jadi tidak inklusif. Kamu perlu keputusan yang adil.",
      question: "Kalau harus memilih, kamu condong ke mana?",
      options: {
        A: "Buat skema campuran: gratis untuk materi inti + opsi berbayar untuk tambahan.",
        B: "Mulai dari uji coba kelas berbayar kecil dulu untuk lihat respons.",
        C: "Cari sponsor/donasi agar tetap gratis tanpa mengorbankan kualitas.",
        D: "Diskusikan di forum agar keputusan dianggap adil bagi semua pihak.",
      },
    },
    {
      id: "B1-5",
      title: "Konflik Anggota: “Sok Pintar”",
      situation:
        "Ada anggota yang aktif memberi masukan, tapi dianggap ‘sok pintar’ oleh yang lain. Mulai ada sindiran, suasana tim tidak nyaman.",
      question: "Cara kamu menengahi biasanya bagaimana?",
      options: {
        A: "Tegaskan aturan diskusi: kritik ide bukan orang; beri ruang semua bicara.",
        B: "Ajak pihak yang merasa terganggu ngobrol privat untuk pahami batasannya.",
        C: "Fasilitasi sesi feedback terstruktur agar semua punya kesempatan yang sama.",
        D: "Minta pimpinan jadi mediator agar tidak terlihat pilih kasih.",
      },
    },
    {
      id: "B1-6",
      title: "Deadline Proposal Akademik",
      situation:
        "Kamu butuh proposal akademik untuk kerja sama. Tim belum menyusun. Waktu tinggal sedikit, tapi kamu ingin output tetap rapi.",
      question: "Taktik yang paling kamu pilih?",
      options: {
        A: "Bagi bagian proposal ke PIC + pakai template; kamu QC akhir.",
        B: "Buat draf kerangka dulu, lalu minta tim mengisi bagian mereka.",
        C: "Kirim one-pager ringkas dulu, lalu susulkan detailnya.",
        D: "Ajak mentor senior review cepat agar kualitas tetap terjaga.",
      },
    },
  ],

  BIDANG_II: [
    {
      id: "B2-1",
      title: "Maba Antusias, Tim Kewalahan",
      situation:
        "Program penyambutan maba ramai. Banyak yang tanya hal serupa. Tim kamu kewalahan menjawab satu per satu.",
      question: "Langkah yang paling kamu ambil?",
      options: {
        A: "Buat FAQ/guide + sistem antrian pertanyaan; bagi shift admin, jawab yang urgent dulu.",
        B: "Bagi topik pertanyaan ke beberapa admin agar respon tetap cepat.",
        C: "Buka sesi tanya jawab terjadwal agar pertanyaan terkumpul rapi.",
        D: "Minta bantuan bidang lain untuk sementara agar beban terbagi.",
      },
    },
    {
      id: "B2-2",
      title: "Info Berubah Mendadak",
      situation:
        "Ada perubahan info penting (jadwal/ruangan). Kalau telat update, maba bingung. Tapi kamu belum dapat konfirmasi final.",
      question: "Kalau kamu yang pegang, kamu memilih apa?",
      options: {
        A: "Umumkan “sementara” dengan label jelas + waktu update berikutnya; revisi saat final.",
        B: "Buat pemberitahuan internal dulu agar tim satu suara sebelum diumumkan.",
        C: "Siapkan dua skenario info dan jelaskan bahwa final akan segera diumumkan.",
        D: "Minta konfirmasi cepat ke pihak terkait lalu rilis update singkat.",
      },
    },
    {
      id: "B2-3",
      title: "Kelompok Maba Tidak Seimbang",
      situation:
        "Pembagian kelompok maba tidak seimbang: ada kelompok terlalu ramai, ada yang sepi. Beberapa maba protes.",
      question: "Solusi yang paling kamu pilih?",
      options: {
        A: "Evaluasi distribusi + pindahkan sebagian dengan komunikasi halus agar adil.",
        B: "Tawarkan opsi tukar kelompok sukarela dengan batas waktu jelas.",
        C: "Tambah mentor pada kelompok yang terlalu ramai agar beban seimbang.",
        D: "Ajak koordinator kelompok berdiskusi tentang pembagian yang lebih pas.",
      },
    },
    {
      id: "B2-4",
      title: "Mentor/KK Tidak Responsif",
      situation:
        "Ada mentor/KK yang lambat respon. Maba jadi bertanya ke banyak orang dan informasi simpang siur.",
      question: "Langkah yang paling kamu ambil?",
      options: {
        A: "Follow-up 1:1 + tetapkan aturan respon; siapkan backup mentor.",
        B: "Buat jadwal piket mentor agar beban respon lebih merata.",
        C: "Kumpulkan feedback maba dulu untuk memastikan masalahnya nyata.",
        D: "Koordinasi dengan pimpinan untuk menetapkan standar respon minimal.",
      },
    },
    {
      id: "B2-5",
      title: "Maba Overwhelm / Takut Bertanya",
      situation:
        "Ada maba yang terlihat kewalahan dan enggan bertanya di grup. Kamu ingin membantu tanpa membuat dia malu.",
      question: "Kalau kamu di posisi ini, kamu melakukan apa?",
      options: {
        A: "DM suportif + tawarkan kanal anonim/teman pendamping; pastikan ada kontak aman.",
        B: "Ajak mentor/pendamping mendekat secara halus agar dia merasa nyaman.",
        C: "Buat sesi sharing kecil agar yang pendiam bisa ikut tanpa tekanan besar.",
        D: "Koordinasi dengan koor untuk memberi perhatian khusus tanpa memaksa.",
      },
    },
    {
      id: "B2-6",
      title: "Kegiatan Tabrak Jadwal Kuliah",
      situation:
        "Kegiatan penyambutan tabrakan jadwal kuliah sebagian maba. Kalau dipindah, panitia repot. Kalau lanjut, banyak yang tidak bisa ikut.",
      question: "Keputusan yang paling kamu ambil?",
      options: {
        A: "Cari opsi hybrid/rekap + jadwal alternatif; jelaskan prioritas kuliah.",
        B: "Pindahkan sebagian kegiatan ke waktu yang lebih aman, sisanya tetap.",
        C: "Buat dua sesi berbeda agar lebih banyak yang bisa ikut.",
        D: "Minta masukan maba lewat polling cepat untuk menentukan opsi terbaik.",
      },
    },
  ],

  BIDANG_III: [
    {
      id: "B3-1",
      title: "SOP Kegiatan: Beda Tafsir",
      situation:
        "Tim punya SOP kegiatan, tapi banyak yang menafsir beda-beda. Akhirnya eksekusi tidak konsisten dan mulai ada komplain.",
      question: "Langkah yang paling kamu ambil?",
      options: {
        A: "Ringkas SOP jadi poin inti + contoh kasus; briefing singkat dan kanal tanya jawab.",
        B: "Buat versi cheat sheet satu halaman agar lebih mudah dipakai.",
        C: "Tetapkan satu sesi simulasi supaya semua paham tafsirnya sama.",
        D: "Minta koor tiap tim menjelaskan ulang SOP ke anggotanya.",
      },
    },
    {
      id: "B3-2",
      title: "Aturan Terasa ‘Keras’",
      situation:
        "Ada aturan yang dibuat demi ketertiban, tapi sebagian peserta merasa aturan itu ‘terlalu keras’ dan tidak manusiawi.",
      question: "Respons yang paling kamu pilih?",
      options: {
        A: "Evaluasi dampak aturan + jelaskan tujuan; revisi jadi tegas tapi tetap manusiawi.",
        B: "Uji coba aturan dengan masa adaptasi agar peserta bisa menyesuaikan.",
        C: "Buka forum masukan singkat untuk mencari titik tengah.",
        D: "Konsultasi ke pimpinan tentang batas aturan yang masih relevan.",
      },
    },
    {
      id: "B3-3",
      title: "Ambigu: Aspirasi Anonim Minim Detail",
      situation:
        "Ada aspirasi anonim: “Bidang X nggak jalan.” Tidak ada contoh, waktu, atau konteks. Kalau kamu eskalasi mentah, bisa memicu konflik. Kalau kamu abaikan, kanal aspirasi kehilangan makna.",
      question: "Kalau kamu yang pegang, kamu lakukan apa?",
      options: {
        A: "Minta klarifikasi tambahan lewat form (opsional anonim) + rangkum jadi pertanyaan konstruktif.",
        B: "Hubungi beberapa pihak terkait untuk mencari konteks tanpa memicu rumor.",
        C: "Sampaikan ke pimpinan sebagai sinyal awal, sambil menunggu bukti tambahan.",
        D: "Buat sesi aspirasi terbuka agar detail bisa terkumpul dengan aman.",
      },
    },
    {
      id: "B3-4",
      title: "Konflik Nilai: Privasi vs Transparansi",
      situation:
        "Ada anggota curhat soal konflik organisasi. Dia ingin anonim, tapi kasusnya butuh tindakan. Kamu harus menjaga privasi tanpa membuat isu “menggantung”.",
      question: "Cara yang paling cocok buatmu?",
      options: {
        A: "Jelaskan batas privasi + minta izin bagian yang boleh dibagikan; fokus pada pola masalah.",
        B: "Diskusikan opsi mediasi anonim agar kasus tetap bisa ditangani.",
        C: "Kumpulkan data tambahan dulu sebelum melangkah lebih jauh.",
        D: "Minta pendampingan dari pihak netral agar proses aman.",
      },
    },
    {
      id: "B3-5",
      title: "Konflik Panitia: Gaya Keras vs Hangat",
      situation:
        "Sebagian panitia ingin gaya keras, sebagian ingin hangat. Diskusi memanas. Padahal kamu butuh keputusan cepat agar SOP jalan.",
      question: "Cara kamu memutuskan biasanya bagaimana?",
      options: {
        A: "Balik ke prinsip: aman, menghormati, jelas tujuannya; tegas tapi sopan + SOP tertulis.",
        B: "Pilih pendekatan moderat: aturan jelas, tapi ruang empati tetap ada.",
        C: "Uji coba dua pendekatan di kelompok kecil sebelum dipakai luas.",
        D: "Ajak pimpinan menentukan garis besar agar keputusan punya legitimasi.",
      },
    },
    {
      id: "B3-6",
      title: "Deadline: Briefing Panitia",
      situation:
        "Briefing panitia besok pagi, tapi materi belum siap. Kalau briefing berantakan, eksekusi kacau.",
      question: "Strategi yang paling kamu ambil?",
      options: {
        A: "Susun materi inti 1 halaman (tujuan, alur, do/don’t, eskalasi) lalu bagi peran.",
        B: "Buat briefing singkat sekarang, lalu susul detail via dokumen setelahnya.",
        C: "Gunakan slide template lama agar cepat siap dan tetap rapi.",
        D: "Minta bantuan tim menyusun poin inti agar briefing tetap siap waktu.",
      },
    },
  ],

  BIDANG_IV: [
    {
      id: "B4-1",
      title: "Kolaborasi Jalan, Tapi Brief Berubah",
      situation:
        "Tim lain ngajak kolaborasi, tapi brief berubah-ubah. Kamu takut kerjaan mubazir dan timmu capek revisi terus.",
      question: "Kalau kamu yang pegang, tindakanmu?",
      options: {
        A: "Minta brief tertulis + scope fix + deadline; set 1 PIC untuk perubahan.",
        B: "Jalankan versi dasar dulu, lalu jadwalkan revisi terukur.",
        C: "Sepakati batas revisi agar tim tidak kelelahan.",
        D: "Ajak pimpinan menetapkan ekspektasi agar kolaborasi sehat.",
      },
    },
    {
      id: "B4-2",
      title: "Mitra Lambat Respon",
      situation:
        "Mitra eksternal lambat respon, padahal kamu butuh kepastian untuk timeline. Tim internal mulai panik.",
      question: "Strategi yang paling kamu pilih?",
      options: {
        A: "Follow-up sopan dengan batas waktu + siapkan plan B sambil tetap profesional.",
        B: "Hubungi lewat kanal lain yang resmi agar respon lebih cepat.",
        C: "Buat timeline internal dan beri tenggat jelas sebelum memutuskan.",
        D: "Diskusikan dengan pimpinan opsi mengganti mitra bila sudah melewati batas.",
      },
    },
    {
      id: "B4-3",
      title: "Komunikasi Formal vs Santai",
      situation:
        "Ada stakeholder yang sangat formal. Tim internal terbiasa santai. Kamu khawatir salah gaya komunikasi menurunkan trust.",
      question: "Kalau kamu di posisi ini, kamu melakukan apa?",
      options: {
        A: "Buat SOP komunikasi eksternal (format, PIC, template pesan) + briefing singkat.",
        B: "Buat contoh pesan formal agar tim bisa menyesuaikan tanpa kehilangan gaya mereka.",
        C: "Tetapkan satu juru bicara utama, sisanya mendukung di belakang.",
        D: "Latih tim dengan simulasi singkat sebelum bertemu stakeholder.",
      },
    },
    {
      id: "B4-4",
      title: "Overcommit Demi Deal",
      situation:
        "Agar kerja sama terjadi, ada godaan untuk menjanjikan hal berlebihan (overcommit). Kamu takut tim tidak sanggup memenuhi.",
      question: "Pilihan yang paling kamu ambil?",
      options: {
        A: "Tawarkan komitmen realistis + jelaskan kapasitas; kecil tapi terpenuhi.",
        B: "Buat opsi komitmen bertahap agar bisa naik kalau kapasitas aman.",
        C: "Tawarkan barter nilai (non-angka) agar tetap menarik tanpa overcommit.",
        D: "Minta pimpinan menyetujui batas komitmen sebelum disampaikan.",
      },
    },
    {
      id: "B4-5",
      title: "Konflik Internal: Siapa PIC Eksternal",
      situation:
        "Dua orang ingin jadi PIC relasi eksternal, masing-masing merasa paling mampu. Ini mulai jadi ego. Kamu butuh pembagian yang sehat.",
      question: "Solusi yang paling terasa cocok buatmu?",
      options: {
        A: "Bagi peran (PIC komunikasi vs PIC konten/dokumen) + aturan update; target jelas.",
        B: "Rotasi PIC per mitra agar keduanya punya ruang belajar.",
        C: "Buat kriteria PIC (respons, jejaring, kapasitas) lalu pilih berdasarkan itu.",
        D: "Ajak pimpinan menjadi penentu agar keputusan tidak bias.",
      },
    },
    {
      id: "B4-6",
      title: "Deadline: Proposal untuk Mitra",
      situation:
        "Mitra minta proposal hari ini. Tim konten lambat. Kamu harus kirim sesuatu yang layak tanpa menunggu sempurna.",
      question: "Taktik yang paling kamu ambil?",
      options: {
        A: "Kirim one-pager (tujuan, benefit, timeline) + janji proposal lengkap besok.",
        B: "Kirim draft awal dan minta feedback, sambil revisi cepat.",
        C: "Gunakan template proposal lama agar tetap layak tanpa menunggu sempurna.",
        D: "Minta tim fokus isi bagian inti, sisanya disusulkan.",
      },
    },
  ],

  BIDANG_V: [
    {
      id: "B5-1",
      title: "Konten Naik, Engagement Sehat",
      situation:
        "Konten organisasi naik performanya. Tapi ada yang bilang gaya konten mulai ‘terlalu mengejar viral’ dan takut menggeser citra profesional.",
      question: "Kalau harus memilih, kamu cenderung ke mana?",
      options: {
        A: "Tetapkan guideline brand (tone, batas humor) + evaluasi konten pakai metrik & nilai.",
        B: "Buat porsi konten: sebagian informatif, sebagian kreatif agar tetap seimbang.",
        C: "Uji format kreatif di platform sekunder sebelum dipakai di kanal utama.",
        D: "Ajak tim menyepakati tujuan konten agar arahnya konsisten.",
      },
    },
    {
      id: "B5-2",
      title: "Revisi Tanpa Henti",
      situation:
        "Desain sudah dibuat, tapi revisi terus datang dari banyak orang dan kadang saling bertentangan. Deadline mepet.",
      question: "Tindakan yang paling kamu ambil?",
      options: {
        A: "Tetapkan 1 PIC keputusan final + batasi putaran revisi; rangkum feedback.",
        B: "Buat matriks prioritas revisi (must-have vs nice-to-have) agar waktu terkendali.",
        C: "Sediakan dua opsi desain, lalu minta pilihan cepat agar tidak berputar-putar.",
        D: "Minta deadline revisi tegas supaya proses tidak melebar.",
      },
    },
    {
      id: "B5-3",
      title: "Krisis Komunikasi",
      situation:
        "Ada postingan yang disalahpahami dan memicu komentar negatif. Kamu harus merespons cepat tapi tetap elegan.",
      question: "Langkah yang paling kamu ambil?",
      options: {
        A: "Tarik/clarify postingan + buat klarifikasi singkat, sopan, fokus ke fakta.",
        B: "Buat Q&A singkat untuk menjawab poin utama tanpa memperpanjang debat.",
        C: "Koordinasi internal dulu, lalu rilis pernyataan resmi dari organisasi.",
        D: "Buka kanal DM untuk merespons kritik secara lebih personal.",
      },
    },
    {
      id: "B5-4",
      title: "Kolaborasi Konten Lintas Tim",
      situation:
        "Tim lain minta konten, tapi mereka lambat kirim bahan. Kamu dikejar deadline posting.",
      question: "Kalau kamu yang pegang, apa yang kamu lakukan?",
      options: {
        A: "Kirim deadline bahan + template input; kalau lewat, posting versi minimal yang akurat.",
        B: "Buat outline konten dulu, lalu isi bagian penting saat bahan datang.",
        C: "Tawarkan bantuan menyusun bahan agar mereka lebih cepat kirim.",
        D: "Koordinasi dengan pimpinan untuk menetapkan prioritas konten.",
      },
    },
    {
      id: "B5-5",
      title: "Brand Terasa Tidak Konsisten",
      situation:
        "Feed terlihat campur aduk: warna, font, gaya desain beda-beda karena banyak admin. Kamu ingin rapi tapi tidak mau mematikan kreativitas.",
      question: "Solusi yang paling realistis buatmu?",
      options: {
        A: "Buat kit sederhana (warna, font, layout) + template; kreativitas tetap di dalam batas.",
        B: "Tetapkan tema bulanan agar feed rapi tapi tetap bervariasi.",
        C: "Adakan review mingguan agar konsistensi terjaga tanpa terlalu kaku.",
        D: "Tunjuk satu orang sebagai penjaga brand untuk QC ringan.",
      },
    },
    {
      id: "B5-6",
      title: "Ide Kreatif vs Risiko Salah Paham",
      situation:
        "Ada ide konten kreatif yang lucu, tapi berpotensi disalahpahami. Tim terbelah: ‘gas aja’ vs ‘main aman’.",
      question: "Keputusan yang paling kamu ambil?",
      options: {
        A: "Uji dulu dengan cek risiko (audience, konteks) + revisi wording bila perlu.",
        B: "Coba versi ringan di platform kecil untuk melihat respons sebelum rilis penuh.",
        C: "Gabungkan ide kreatif dengan disclaimer atau konteks yang jelas.",
        D: "Ajak tim voting setelah diberi kriteria risiko yang disepakati.",
      },
    },
  ],

  BIDANG_VI: [
    {
      id: "B6-1",
      title: "Anggota Baru Bingung Alur",
      situation:
        "Anggota baru bingung alur kerja: harus lapor siapa, format apa, deadline kapan. Akhirnya banyak miskom.",
      question: "Langkah yang paling kamu ambil?",
      options: {
        A: "Buat alur kerja ringkas (PIC, format, deadline) + onboarding singkat; pasang mudah diakses.",
        B: "Pasangkan anggota baru dengan buddy agar adaptasi lebih cepat.",
        C: "Buat checklist mingguan supaya alur kerja lebih jelas.",
        D: "Minta pimpinan mempertegas alur di forum umum.",
      },
    },
    {
      id: "B6-2",
      title: "Task Menumpuk, Prioritas Kacau",
      situation:
        "Banyak task masuk bersamaan. Tim bingung mana yang didahulukan. Kamu melihat beberapa orang burnout.",
      question: "Kalau kamu di posisi ini, kamu melakukan apa?",
      options: {
        A: "Susun prioritas (impact vs urgent) + pecah task + cek kapasitas sebelum membagi.",
        B: "Buat sprint pendek dengan target harian agar beban lebih terukur.",
        C: "Delegasikan tugas paling berat lebih dulu agar risiko menumpuk berkurang.",
        D: "Ajak tim re-estimate kapasitas dan turunkan target sementara.",
      },
    },
    {
      id: "B6-3",
      title: "Miskom Antar Tim",
      situation:
        "Tim A merasa Tim B tidak support, Tim B merasa Tim A tidak jelas brief. Konflik mulai terasa.",
      question: "Respons yang paling kamu ambil?",
      options: {
        A: "Fasilitasi sinkronisasi: brief tertulis, PIC, timeline; sepakati update & eskalasi.",
        B: "Buat forum mingguan lintas tim agar miskom berkurang.",
        C: "Minta masing-masing tim menulis ulang brief untuk memastikan pemahaman sama.",
        D: "Libatkan pimpinan sebagai moderator supaya keputusan lebih netral.",
      },
    },
    {
      id: "B6-4",
      title: "Kualitas Output Turun",
      situation:
        "Output makin banyak, tapi kualitas turun (typo, salah info, desain asal). Kamu ingin kualitas naik tanpa memperlambat total.",
      question: "Kalau harus memilih, kamu pilih yang mana?",
      options: {
        A: "Buat checkpoint QC ringan + template; bagi peran draft vs QC agar efisien.",
        B: "Tetapkan standar minimum kualitas, lalu perketat hanya pada output prioritas.",
        C: "Gunakan buddy review agar kualitas naik tanpa menambah banyak waktu.",
        D: "Kurangi output sementara agar kualitas bisa pulih.",
      },
    },
    {
      id: "B6-5",
      title: "Orang Kunci Tidak Ada",
      situation:
        "Orang yang pegang satu hal penting mendadak tidak bisa dihubungi. Tim stuck.",
      question: "Solusi yang paling kamu ambil?",
      options: {
        A: "Bangun sistem backup: dokumentasi, akses bersama, peran pengganti; cari workaround minimal.",
        B: "Minta akses darurat ke pihak terkait agar pekerjaan bisa lanjut.",
        C: "Alihkan tugas sementara ke orang yang paling dekat dengan konteks.",
        D: "Eskalasi ke pimpinan untuk keputusan cepat soal prioritas.",
      },
    },
    {
      id: "B6-6",
      title: "Evaluasi Tengah Periode",
      situation:
        "Kamu diminta evaluasi tengah periode. Tim capek. Kalau terlalu formal, mereka jenuh. Kalau terlalu santai, tidak ada perubahan.",
      question: "Format evaluasi yang paling kamu pilih?",
      options: {
        A: "Evaluasi ringkas berbasis data + 1-2 aksi perbaikan; tutup dengan apresiasi.",
        B: "Gabungkan evaluasi singkat dengan check-in santai agar tetap manusiawi.",
        C: "Buat survei anonim dulu, baru rangkum poin pentingnya.",
        D: "Minta tim memilih fokus perbaikan utama agar tidak melebar.",
      },
    },
  ],
};
