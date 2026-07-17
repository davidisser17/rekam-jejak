import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOrQEEqHmFD4p7QmZJNqbOi7X_z2alIfw",
  authDomain: "database-pejabat.firebaseapp.com",
  projectId: "database-pejabat",
  storageBucket: "database-pejabat.firebasestorage.app",
  messagingSenderId: "935762546326",
  appId: "1:935762546326:web:8d0becc2d89b4cdac07cb7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const realData = [
  // ─── 1. PRABOWO SUBIANTO ──────────────────────────────────────────────────
  {
    official: {
      name: "Prabowo Subianto",
      currentAgency: "Pemerintah Republik Indonesia",
      currentPosition: "Presiden RI Ke-8",
      party: "Gerindra",
      photoUrl: "https://bojonegorokab.go.id/storage/uploads/artikel/rMePXMqy8xtka99H.jpg"
    },
    trackRecords: [
      { position: "Presiden RI", agency: "Pemerintah RI", startDate: "2024-10-20", endDate: null },
      { position: "Menteri Pertahanan", agency: "Kementerian Pertahanan", startDate: "2019-10-23", endDate: "2024-10-20" },
      { position: "Ketua Umum Partai Gerindra", agency: "Partai Gerindra", startDate: "2008-02-06", endDate: null },
      { position: "Pangkostrad", agency: "TNI AD", startDate: "1998-03-20", endDate: "1998-05-22" },
      { position: "Danjen Kopassus", agency: "TNI AD", startDate: "1995-12-01", endDate: "1998-03-20" }
    ],
    news: [
      { title: "Prabowo Resmi Dilantik Sebagai Presiden RI ke-8", content: "Prabowo Subianto dan Gibran Rakabuming Raka resmi mengucapkan sumpah jabatan sebagai Presiden dan Wakil Presiden RI di hadapan MPR. Pelantikan ini menandai berakhirnya era Joko Widodo setelah dua periode.", sentiment: "Positif", date: "2024-10-20", sourceName: "Setneg", sourceUrl: "https://presidenri.go.id/siaran-pers/prabowo-subianto-dan-gibran-rakabuming-raka-resmi-dilantik-sebagai-presiden-dan-wakil-presiden-ri/" },
      { title: "Prabowo Hadapi Gelombang Protes 2025, Lima Menteri Dicopot", content: "Presiden Prabowo melakukan reshuffle besar pada 8 September 2025 di tengah gelombang unjuk rasa yang dipicu pemangkasan anggaran besar-besaran untuk program Makan Bergizi Gratis. Lima menteri dicopot, termasuk Sri Mulyani dan Budi Gunawan.", sentiment: "Negatif", date: "2025-09-08", sourceName: "Al Jazeera", sourceUrl: "https://www.aljazeera.com/news/2025/9/9/indonesian-president-prabowo-replaces-five-ministers-after-deadly-protests" },
      { title: "Program Makan Bergizi Gratis Dimulai", content: "Pemerintah mulai menjalankan program makan bergizi gratis untuk anak sekolah sebagai janji kampanye utama Prabowo-Gibran yang menjadi salah satu program andalan Asta Cita.", sentiment: "Positif", date: "2025-01-15", sourceName: "Detik", sourceUrl: "https://news.detik.com/berita/d-7718836/program-makan-bergizi-gratis-dimulai-hari-ini" }
    ],
    crimes: [
      { type: "Dugaan Pelanggaran HAM Masa Lalu", description: "Diberhentikan dari militer oleh DKP tahun 1998 terkait kasus penculikan aktivis pro-demokrasi. Prabowo secara konsisten membantah tuduhan pidana dan tidak pernah dihukum oleh pengadilan sipil manapun.", status: "Diberhentikan (Militer)", date: "1998-08-24", sourceName: "Tempo", sourceUrl: "https://www.tempo.co/cekfakta/sebagian-benar-klaim-tentang-pemecatan-terhadap-prabowo-pada-1998-349032" }
    ]
  },

  // ─── 2. GIBRAN RAKABUMING RAKA ────────────────────────────────────────────
  {
    official: {
      name: "Gibran Rakabuming Raka",
      currentAgency: "Pemerintah Republik Indonesia",
      currentPosition: "Wakil Presiden RI",
      party: "Independen",
      photoUrl: "https://image.kemenpora.go.id/2024/12/04/5758/9061wapres-gibran-minta-kementerian-lembaga-komitmen-sukseskan-dbon.jpg"
    },
    trackRecords: [
      { position: "Wakil Presiden RI", agency: "Pemerintah RI", startDate: "2024-10-20", endDate: null },
      { position: "Ketua Komite Percepatan Pembangunan Papua", agency: "Pemerintah RI", startDate: "2025-07-01", endDate: null },
      { position: "Wali Kota Surakarta", agency: "Pemerintah Kota Surakarta", startDate: "2021-02-26", endDate: "2024-07-19" }
    ],
    news: [
      { title: "Gibran Ditunjuk Pimpin Percepatan Pembangunan Papua", content: "Presiden Prabowo menunjuk Wapres Gibran sebagai Ketua Komite Pengarah Percepatan Pembangunan Papua, sebuah jabatan yang dibentuk berdasarkan UU Otonomi Khusus Papua 2021 untuk mengkoordinasikan pembangunan di wilayah timur Indonesia.", sentiment: "Positif", date: "2025-07-01", sourceName: "Straits Times", sourceUrl: "https://www.straitstimes.com/asia/se-asia/indonesia-v-p-gibrans-papua-assignment-puts-spotlight-on-his-place-in-prabowos-government" },
      { title: "Gibran Menemui Mahasiswa Pengunjuk Rasa, Akui Ada Kekurangan Program", content: "Wapres Gibran turun langsung menemui mahasiswa yang berunjuk rasa menentang program Makan Bergizi Gratis dan Koperasi Merah Putih, mengakui adanya kekurangan dan berjanji mencari solusi.", sentiment: "Netral", date: "2025-05-20", sourceName: "Straits Times", sourceUrl: "https://www.straitstimes.com/asia/se-asia/gibrans-outreach-to-student-protesters-puts-focus-on-his-role-in-government" }
    ],
    crimes: [
      { type: "Kontroversi Putusan MK No. 90/2023", description: "Lolosnya Gibran sebagai cawapres didasari Putusan MK No 90/2023 yang membolehkan kepala daerah berpengalaman di bawah 40 tahun maju sebagai cawapres. Putusan ini memicu pelanggaran etik berat oleh Ketua MK Anwar Usman (paman Gibran) yang kemudian dipecat dari jabatannya.", status: "Kontroversi Etik", date: "2023-11-07", sourceName: "MKRI", sourceUrl: "https://www.mkri.id/berita/-19751" }
    ]
  },

  // ─── 3. BUDI GUNAWAN ─────────────────────────────────────────────────────
  {
    official: {
      name: "Budi Gunawan",
      currentAgency: "Kementerian Koordinator Bidang Polkam",
      currentPosition: "Mantan Menko Polkam (Dicopot September 2025)",
      party: "Non-partisan",
      photoUrl: "https://images.rayyana.id/large/25062021/budigunawan.jpg"
    },
    trackRecords: [
      { position: "Menko Polkam", agency: "Kemenko Polkam", startDate: "2024-10-21", endDate: "2025-09-08" },
      { position: "Kepala BIN", agency: "Badan Intelijen Negara", startDate: "2016-09-09", endDate: "2024-10-21" },
      { position: "Wakapolri", agency: "Polri", startDate: "2015-04-22", endDate: "2016-09-09" },
      { position: "Kepala Polda Bali", agency: "Polri", startDate: "2012-01-01", endDate: "2013-01-01" }
    ],
    news: [
      { title: "Budi Gunawan Dicopot dari Kabinet Merah Putih", content: "Presiden Prabowo mencopot Budi Gunawan dari jabatan Menko Polkam pada 8 September 2025 dalam reshuffle kabinet besar-besaran yang dipicu oleh gelombang unjuk rasa mahasiswa dan buruh. Posisinya kemudian diisi oleh mantan Jenderal TNI Djamari Chaniago.", sentiment: "Negatif", date: "2025-09-08", sourceName: "Al Jazeera", sourceUrl: "https://www.aljazeera.com/news/2025/9/9/indonesian-president-prabowo-replaces-five-ministers-after-deadly-protests" },
      { title: "Budi Gunawan Pimpin Rapat Koordinasi Keamanan Nasional", content: "Saat masih menjabat, Menko Polkam Budi Gunawan mengumpulkan jajaran kementerian untuk merumuskan strategi penanggulangan judi online dan keamanan siber nasional.", sentiment: "Positif", date: "2025-03-12", sourceName: "Polkam", sourceUrl: "https://polkam.go.id/menko-polkam-judi-online-seperti-wabah-atau-penyakit/" }
    ],
    crimes: [
      { type: "Dugaan Rekening Gendut (Tersangka KPK)", description: "Ditetapkan sebagai tersangka kasus transaksi mencurigakan oleh KPK pada Februari 2015, namun status tersangkanya dibatalkan lewat praperadilan di PN Jakarta Selatan. Kasus ini sempat menghambat pencalonannya sebagai Kapolri.", status: "Bebas (Praperadilan)", date: "2015-02-16", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2015/02/16/10353331/Hakim.Kabulkan.Sebagian.Gugatan.Praperadilan.Budi.Gunawan" }
    ]
  },

  // ─── 4. DJAMARI CHANIAGO (PENGGANTI BUDI GUNAWAN) ────────────────────────
  {
    official: {
      name: "Djamari Chaniago",
      currentAgency: "Kementerian Koordinator Bidang Politik dan Keamanan",
      currentPosition: "Menteri Koordinator Bidang Politik dan Keamanan",
      party: "Non-partisan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Menko_Polkam_Djamari_Chainago.png/800px-Menko_Polkam_Djamari_Chainago.png"
    },
    trackRecords: [
      { position: "Menko Polkam", agency: "Kemenko Polkam", startDate: "2025-09-17", endDate: null },
      { position: "Kepala Staf TNI Angkatan Darat (KSAD)", agency: "TNI Angkatan Darat", startDate: "2000-01-01", endDate: "2002-01-01" },
      { position: "Pangdam I/Bukit Barisan", agency: "TNI Angkatan Darat", startDate: "1998-01-01", endDate: "2000-01-01" }
    ],
    news: [
      { title: "Djamari Chaniago Dilantik Sebagai Menko Polkam Baru", content: "Presiden Prabowo melantik mantan Jenderal TNI Djamari Chaniago sebagai Menko Polkam pada 17 September 2025, delapan hari setelah Budi Gunawan dicopot. Pengangkatan ini menarik perhatian karena Djamari dikenal sebagai sosok yang pernah memiliki peran dalam mengakhiri karir militer Prabowo pada 1998.", sentiment: "Netral", date: "2025-09-17", sourceName: "Tempo", sourceUrl: "https://en.tempo.co/read/2049682/djamari-chaniago-sworn-in-as-prabowos-new-coordinating-minister-for-political-and-security-affairs" },
      { title: "Menko Polkam Djamari Perkuat Keamanan Natuna dari Ancaman Lintas Negara", content: "Menko Polkam Djamari Chaniago menginstruksikan aparat TNI dan Polri di Kepulauan Natuna untuk meningkatkan kewaspadaan dalam menjaga kedaulatan nasional dan memerangi ancaman transnasional termasuk penyelundupan narkoba dan mineral ilegal.", sentiment: "Positif", date: "2026-06-15", sourceName: "Antara", sourceUrl: "https://en.antaranews.com/news/421348/indonesia-strengthens-natuna-defense-against-transnational-crimes" }
    ],
    crimes: []
  },

  // ─── 5. YUSRIL IHZA MAHENDRA ─────────────────────────────────────────────
  {
    official: {
      name: "Yusril Ihza Mahendra",
      currentAgency: "Kemenko Hukum, HAM, Imigrasi, dan Pemasyarakatan",
      currentPosition: "Menteri Koordinator Bidang Kumham Imipas",
      party: "PBB",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Yusril_Ihza_Mahendra%2C_medcom_id%2C_01.49.jpg/960px-Yusril_Ihza_Mahendra%2C_medcom_id%2C_01.49.jpg"
    },
    trackRecords: [
      { position: "Menko Kumham Imipas", agency: "Kemenko Kumham Imipas", startDate: "2024-10-21", endDate: null },
      { position: "Ketua Umum PBB", agency: "Partai Bulan Bintang", startDate: "2015-01-01", endDate: "2024-05-18" },
      { position: "Mensesneg", agency: "Kementerian Sekretariat Negara", startDate: "2004-10-21", endDate: "2007-05-09" },
      { position: "Menkumham", agency: "Kementerian Kehakiman dan HAM", startDate: "2001-08-10", endDate: "2004-10-20" }
    ],
    news: [
      { title: "Yusril Koordinir Penyelidikan Kematian Warga Sipil di Papua", content: "Menko Kumham Imipas Yusril Ihza Mahendra dan Komnas HAM mengumumkan penyelidikan bersama atas kematian warga sipil termasuk ibu hamil dalam konflik bersenjata di Papua, menunjukkan komitmen pemerintah terhadap penegakan HAM.", sentiment: "Positif", date: "2026-07-05", sourceName: "Antara", sourceUrl: "https://en.antaranews.com/news/421699/govt-komnas-ham-launch-probe-into-papuan-fatalities" },
      { title: "Yusril Siapkan Reformasi Hukum dan Pemasyarakatan", content: "Menko Yusril Ihza Mahendra menyatakan pemerintah akan memfokuskan perbaikan sistem lembaga pemasyarakatan dan mendorong reformasi hukum yang komprehensif termasuk revisi KUHAP.", sentiment: "Positif", date: "2024-11-20", sourceName: "Ditjenpas", sourceUrl: "https://www.ditjenpas.go.id/kementerian-imigrasi-dan-pemasyarakatan-fokuskan-kinerja-untuk-capai-hasil-optimal-104033" }
    ],
    crimes: [
      { type: "Tersangka Korupsi Sisminbakum (SP3)", description: "Pernah ditetapkan sebagai tersangka kasus Sistem Administrasi Badan Hukum (Sisminbakum) saat menjabat Menkumham. Kasusnya kemudian dihentikan (SP3) oleh Kejaksaan Agung karena dinilai tidak cukup bukti.", status: "SP3 (Dihentikan)", date: "2012-05-31", sourceName: "Hukumonline", sourceUrl: "https://www.hukumonline.com/berita/a/kejagung-hentikan-kasus-sisminbakum-lt4fc76901cd642/" }
    ]
  },

  // ─── 6. AIRLANGGA HARTARTO ────────────────────────────────────────────────
  {
    official: {
      name: "Airlangga Hartarto",
      currentAgency: "Kementerian Koordinator Bidang Perekonomian",
      currentPosition: "Menteri Koordinator Bidang Perekonomian",
      party: "Golkar",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Airlangga_Hartarto_Menko_Perekonomian_2024.jpg"
    },
    trackRecords: [
      { position: "Menko Perekonomian", agency: "Kemenko Perekonomian", startDate: "2019-10-23", endDate: null },
      { position: "Ketua Umum Partai Golkar", agency: "Partai Golkar", startDate: "2017-12-13", endDate: "2024-08-11" },
      { position: "Menteri Perindustrian", agency: "Kementerian Perindustrian", startDate: "2016-07-27", endDate: "2019-10-20" }
    ],
    news: [
      { title: "Airlangga Optimistis Ekonomi Indonesia Rebound di Semester II 2026", content: "Menko Perekonomian Airlangga Hartarto menyatakan optimisme pemulihan ekonomi nasional akan terjadi di paruh kedua 2026, didukung oleh investasi yang masuk dan stabilisasi harga komoditas global.", sentiment: "Positif", date: "2026-07-10", sourceName: "Antara", sourceUrl: "https://en.antaranews.com/news/422116/airlangga-optimistic-of-economic-rebound-in-second-half-of-2026" },
      { title: "Airlangga Kawal Pertumbuhan Ekonomi di Atas 5 Persen", content: "Pemerintah optimis dapat menjaga momentum pertumbuhan ekonomi nasional di tengah gejolak global dengan kebijakan hilirisasi dan peningkatan investasi strategis.", sentiment: "Positif", date: "2025-11-05", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2025/11/05/15595981/menko-airlangga-optimistis-pertumbuhan-ekonomi-sepanjang-2025-capai-52" }
    ],
    crimes: [
      { type: "Dugaan Korupsi Ekspor CPO", description: "Diperiksa oleh Kejaksaan Agung selama belasan jam sebagai saksi dalam kasus dugaan korupsi pemberian izin ekspor minyak sawit mentah (CPO) dan turunannya yang menyebabkan krisis minyak goreng di Indonesia.", status: "Saksi", date: "2023-07-24", sourceName: "Kompas", sourceUrl: "https://www.kompas.com/nasional/read/2023/07/25/10550931/12-jam-airlangga-hartarto-bersaksi-di-pusaran-kasus-korupsi-minyak-goreng" }
    ]
  },

  // ─── 7. AGUS HARIMURTI YUDHOYONO ─────────────────────────────────────────
  {
    official: {
      name: "Agus Harimurti Yudhoyono",
      currentAgency: "Kementerian Koordinator Bidang Infrastruktur",
      currentPosition: "Menko Infrastruktur dan Pembangunan Kewilayahan",
      party: "Demokrat",
      photoUrl: "https://kemenkoinfra.go.id/uploads/post/20250630180319-2025-06-30post180318.jpeg"
    },
    trackRecords: [
      { position: "Menko Infrastruktur dan Pembangunan Kewilayahan", agency: "Kemenko Infrastruktur", startDate: "2024-10-21", endDate: null },
      { position: "Ketua Umum Partai Demokrat", agency: "Partai Demokrat", startDate: "2020-03-15", endDate: null },
      { position: "Menteri ATR/Kepala BPN", agency: "Kementerian ATR/BPN", startDate: "2024-02-21", endDate: "2024-10-20" },
      { position: "Perwira TNI AD (Letnan Kolonel)", agency: "TNI Angkatan Darat", startDate: "2000-01-01", endDate: "2016-03-01" }
    ],
    news: [
      { title: "AHY Resmikan Lima Bendungan Baru Senilai Rp9,7 Triliun", content: "Menko AHY mendampingi Presiden Prabowo meresmikan lima bendungan baru di berbagai wilayah Indonesia dengan total investasi negara Rp9,7 triliun, sebagai bagian dari program penguatan kedaulatan pangan dan energi nasional.", sentiment: "Positif", date: "2026-07-11", sourceName: "Antara", sourceUrl: "https://en.antaranews.com/news/422161/five-new-dams-strengthen-food-energy-self-sufficiency-ahy" },
      { title: "AHY Ditunjuk Prabowo Pimpin Komite Kereta Cepat Jakarta-Bandung", content: "Presiden Prabowo menunjuk Menko Infrastruktur AHY sebagai Ketua Komite Kereta Cepat Jakarta-Bandung untuk mengawal kelanjutan dan optimalisasi operasional Whoosh.", sentiment: "Positif", date: "2026-04-27", sourceName: "Tempo", sourceUrl: "https://en.tempo.co/read/2106036/prabowo-taps-agus-harimurti-as-high-speed-rail-committee-chief" }
    ],
    crimes: []
  },

  // ─── 8. ZULKIFLI HASAN ───────────────────────────────────────────────────
  {
    official: {
      name: "Zulkifli Hasan",
      currentAgency: "Kementerian Koordinator Bidang Pangan",
      currentPosition: "Menteri Koordinator Bidang Pangan",
      party: "PAN",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zulkifli_Hasan_Menko_Pangan_2024.jpg"
    },
    trackRecords: [
      { position: "Menko Pangan", agency: "Kemenko Pangan", startDate: "2024-10-21", endDate: null },
      { position: "Ketua Umum PAN", agency: "Partai Amanat Nasional", startDate: "2015-03-01", endDate: null },
      { position: "Menteri Perdagangan", agency: "Kementerian Perdagangan", startDate: "2022-06-15", endDate: "2024-10-20" },
      { position: "Ketua MPR RI", agency: "MPR RI", startDate: "2014-10-08", endDate: "2019-10-01" },
      { position: "Menteri Kehutanan", agency: "Kementerian Kehutanan", startDate: "2009-10-22", endDate: "2014-10-01" }
    ],
    news: [
      { title: "Zulhas: Indonesia Capai Swasembada Pangan 2025, Lebih Cepat dari Target", content: "Menko Pangan Zulkifli Hasan mengumumkan Indonesia berhasil mencapai swasembada pangan pada 2025, empat tahun lebih cepat dari target pemerintah di 2029, didukung oleh peningkatan produksi beras dan jagung nasional.", sentiment: "Positif", date: "2026-06-27", sourceName: "Zonautara", sourceUrl: "https://zonautara.com/2026/06/27/zulkifli-hasan-bertekad-berantas-tengkulak-dalam-swasembada-protein/" },
      { title: "Zulhas Instruksikan Penjara bagi Pelaku Curang Minyakita", content: "Menko Pangan Zulkifli Hasan mendesak aparat segera menindak dan memenjarakan pihak yang terlibat kasus kecurangan takaran dan pemalsuan label minyak goreng subsidi Minyakita.", sentiment: "Positif", date: "2025-03-10", sourceName: "Harian Jogja", sourceUrl: "https://muckrack.com/rika-anggraeni" }
    ],
    crimes: [
      { type: "Dugaan Suap Alih Fungsi Hutan Riau", description: "Pernah diperiksa KPK sebagai saksi terkait kasus dugaan suap revisi alih fungsi hutan di Provinsi Riau yang melibatkan mantan Gubernur Riau Annas Maamun saat ia menjabat Menteri Kehutanan.", status: "Saksi", date: "2014-11-11", sourceName: "Detik", sourceUrl: "https://news.detik.com/berita/d-2807906/kpk-akan-telisik-peran-zulkifli-hasan-yang-dijadikan-pegangan-annas-maamun" }
    ]
  },

  // ─── 9. PURBAYA YUDHI SADEWA ─────────────────────────────────────────────
  {
    official: {
      name: "Purbaya Yudhi Sadewa",
      currentAgency: "Kementerian Keuangan",
      currentPosition: "Menteri Keuangan",
      party: "Non-partisan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Purbaya_Yudhi_Sadewa%2C_Menteri_Keuangan_%282026%29.jpg"
    },
    trackRecords: [
      { position: "Menteri Keuangan", agency: "Kementerian Keuangan", startDate: "2025-09-08", endDate: null },
      { position: "Ketua Dewan Komisioner LPS", agency: "Lembaga Penjamin Simpanan", startDate: "2020-09-03", endDate: "2025-09-08" },
      { position: "Direktur Utama Danareksa Sekuritas", agency: "PT Danareksa Sekuritas", startDate: "2006-04-01", endDate: "2008-10-31" },
      { position: "Chief Economist", agency: "Danareksa Research Institute", startDate: "2005-07-01", endDate: "2013-03-31" },
      { position: "Senior Economist", agency: "Danareksa Research Institute", startDate: "2000-10-01", endDate: "2005-07-01" },
      { position: "Field Engineer", agency: "Schlumberger Overseas SA", startDate: "1989-01-01", endDate: "1994-12-31" }
    ],
    news: [
      { title: "Menkeu Purbaya: APBN 2025 Terjaga Sehat dan Akuntabel", content: "Menteri Keuangan Purbaya Yudhi Sadewa menyatakan bahwa APBN 2025 merupakan anggaran transisi yang strategis dan berhasil dijaga kesehatannya di tengah tekanan global dan perubahan kebijakan domestik.", sentiment: "Positif", date: "2026-06-01", sourceName: "TVRI", sourceUrl: "https://ekonomi.tvrinews.com/berita/ts2km9b-menkeu-purbaya-apbn-2025-terjaga-sehat-efektif-dan-akuntabel" },
      { title: "Menkeu Purbaya Tegaskan Tidak Toleransi Korupsi di Kemenkeu", content: "Menteri Keuangan Purbaya Yudhi Sadewa memberikan peringatan keras kepada jajaran Kementerian Keuangan setelah KPK menangkap pegawai terkait dugaan korupsi.", sentiment: "Positif", date: "2025-10-22", sourceName: "MetroTV", sourceUrl: "https://www.youtube.com/watch?v=hjQTchPiXiM" },
      { title: "Kontroversi Patriot Merah Putih Bond, Menkeu Tanggapi Risiko Pencucian Uang", content: "Kontroversi muncul karena pemerintah menyatakan sumber dana Patriot Merah Putih Bond tidak akan ditelusuri. Purbaya mengakui adanya kritik bahwa perlindungan hukum dalam instrumen tersebut berpotensi membuka celah penyalahgunaan.", sentiment: "Negatif", date: "2025-12-01", sourceName: "IKPI", sourceUrl: "https://ikpi.or.id/en/menkeu-purbaya-tanggapi-kekhawatiran-risiko-pencucian-uang-di-patriot-merah-putih-bond/" }
    ],
    crimes: []
  },

  // ─── 10. BAHLIL LAHADALIA ─────────────────────────────────────────────────
  {
    official: {
      name: "Bahlil Lahadalia",
      currentAgency: "Kementerian Energi dan Sumber Daya Mineral",
      currentPosition: "Menteri ESDM",
      party: "Golkar",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Bahlil_Lahadalia_Official_Portrait.png/960px-Bahlil_Lahadalia_Official_Portrait.png"
    },
    trackRecords: [
      { position: "Ketua Umum Partai Golkar", agency: "Partai Golkar", startDate: "2024-08-21", endDate: null },
      { position: "Menteri ESDM", agency: "Kementerian ESDM", startDate: "2024-08-19", endDate: null },
      { position: "Menteri Investasi/Kepala BKPM", agency: "Kementerian Investasi", startDate: "2021-04-28", endDate: "2024-08-19" }
    ],
    news: [
      { title: "Bahlil Pastikan Blok Masela Utamakan Tenaga Kerja Lokal Maluku", content: "Menteri ESDM Bahlil Lahadalia menegaskan bahwa operator proyek LNG Abadi Blok Masela di Kepulauan Tanimbar, Maluku, wajib memprioritaskan perekrutan tenaga kerja lokal sebagai bentuk dampak positif bagi masyarakat setempat.", sentiment: "Positif", date: "2026-07-13", sourceName: "Antara", sourceUrl: "https://en.antaranews.com/news/423068/masela-block-project-to-prioritize-hiring-local-workforce-minister" },
      { title: "Kontroversi Gelar Doktor UI Bahlil", content: "Universitas Indonesia menangguhkan gelar doktor Bahlil Lahadalia setelah menuai protes dari kalangan akademisi yang mempertanyakan proses dan substansi disertasinya.", sentiment: "Negatif", date: "2024-11-13", sourceName: "Tirto", sourceUrl: "https://tirto.id/ui-tangguhkan-gelar-doktor-yang-didapat-bahlil-lahadalia-g5Hy" }
    ],
    crimes: [
      { type: "Dugaan Penyalahgunaan Wewenang IUP", description: "Dilaporkan ke KPK oleh Jaringan Advokasi Tambang (JATAM) terkait dugaan korupsi dan penyalahgunaan wewenang dalam pencabutan dan pengaktifan kembali Izin Usaha Pertambangan (IUP) selama menjabat Menteri Investasi.", status: "Dilaporkan", date: "2024-03-19", sourceName: "Tempo", sourceUrl: "https://www.tempo.co/hukum/dilaporkan-jatam-ke-kpk-soal-dugaan-korupsi-izin-tambang-bahlil-saya-enggak-tahu-ya-75887" }
    ]
  },

  // ─── 11. MUHAMMAD TITO KARNAVIAN ─────────────────────────────────────────
  {
    official: {
      name: "Muhammad Tito Karnavian",
      currentAgency: "Kementerian Dalam Negeri",
      currentPosition: "Menteri Dalam Negeri",
      party: "Non-partisan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Mendagri_Tito_Karnavian_2024.jpg"
    },
    trackRecords: [
      { position: "Menteri Dalam Negeri", agency: "Kementerian Dalam Negeri", startDate: "2019-10-23", endDate: null },
      { position: "Kapolri", agency: "Polri", startDate: "2016-07-13", endDate: "2019-10-22" },
      { position: "Kepala BNPT", agency: "Badan Nasional Penanggulangan Terorisme", startDate: "2016-03-16", endDate: "2016-07-13" },
      { position: "Kapolda Metro Jaya", agency: "Polri", startDate: "2015-07-24", endDate: "2016-03-16" }
    ],
    news: [
      { title: "Mendagri Tito Dorong Kepala Desa Masuk Kampus Dukung Asta Cita", content: "Menteri Dalam Negeri Tito Karnavian membuka Program Kepala Desa Masuk Kampus Angkatan II di UI Depok, menegaskan pentingnya penguatan desa untuk menekan urbanisasi dan mendorong pertumbuhan ekonomi daerah.", sentiment: "Positif", date: "2026-07-14", sourceName: "TVRI", sourceUrl: "https://nasional.tvrinews.com/berita/tj29qpp-mendagri-minta-kades-masuk-kampus-dukung-asta-cita-prabowo-bangun-desa-dan-tekan-urbanisasi" },
      { title: "Mendagri Apresiasi DPR Bentuk Panja Perbatasan", content: "Menteri Dalam Negeri Tito Karnavian mengapresiasi dukungan Komisi II DPR RI dalam memperkuat pengelolaan wilayah perbatasan melalui pembentukan panitia kerja (panja) khusus.", sentiment: "Positif", date: "2026-06-01", sourceName: "TVRI", sourceUrl: "https://nasional.tvrinews.com/berita/td21svw-mendagri-apresiasi-dpr-bentuk-panja-perbatasan-dorong-penguatan-kewenangan-bnpp" }
    ],
    crimes: [
      { type: "Dugaan Aliran Dana (Buku Merah)", description: "Nama Tito sempat terseret dalam laporan IndonesiaLeaks terkait 'Buku Merah' skandal impor daging sapi Basuki Hariman. Kepolisian dan KPK menyatakan tidak ada bukti valid atas dugaan tersebut.", status: "Dugaan (Tidak Terbukti)", date: "2018-10-10", sourceName: "BBC Indonesia", sourceUrl: "https://www.bbc.com/indonesia/articles/cn8x77vpx3wo" }
    ]
  },

  // ─── 12. SUGIONO ──────────────────────────────────────────────────────────
  {
    official: {
      name: "Sugiono",
      currentAgency: "Kementerian Luar Negeri",
      currentPosition: "Menteri Luar Negeri Indonesia ke-18",
      party: "Gerindra",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Menteri_Luar_Negeri_Sugiono.jpg"
    },
    trackRecords: [
      { position: "Sekretaris Jenderal Partai Gerindra", agency: "Partai Gerakan Indonesia Raya", startDate: "2025-08-01", endDate: null },
      { position: "Menteri Luar Negeri", agency: "Kementerian Luar Negeri", startDate: "2024-10-21", endDate: null },
      { position: "Wakil Ketua Komisi I DPR RI", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-10-01", endDate: "2024-10-21" },
      { position: "Anggota DPR RI Dapil Jawa Tengah I", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-10-01", endDate: "2024-10-21" },
      { position: "Letnan Satu Infanteri Kopassus", agency: "TNI Angkatan Darat", startDate: "2002-01-01", endDate: "2004-01-01" }
    ],
    news: [
      { title: "Menlu Sugiono dan Jaishankar Perkuat Kerja Sama RI-India", content: "Menteri Luar Negeri Sugiono bertemu Menlu India S. Jaishankar di Jakarta dalam pertemuan Komisi Bersama ke-8 RI-India, membahas penguatan kerja sama pertahanan, keamanan maritim, konektivitas digital dan infrastruktur jelang kunjungan PM Modi.", sentiment: "Positif", date: "2026-06-07", sourceName: "The Hindu", sourceUrl: "https://www.thehindu.com/news/national/external-affairs-minister-jaishankar-meeting-with-indonesia-foreign-minister-sugiono-june-7-2026/article71073134.ece" },
      { title: "Kontroversi Rangkap Jabatan Sugiono: Menlu Sekaligus Sekjen Gerindra", content: "Penunjukan Sugiono sebagai Sekjen Gerindra di tengah jabatannya sebagai Menteri Luar Negeri memicu kekhawatiran soal konflik kepentingan dan dampaknya terhadap netralitas kebijakan luar negeri Indonesia.", sentiment: "Negatif", date: "2025-08-28", sourceName: "Jakarta Post", sourceUrl: "https://www.thejakartapost.com/opinion/2025/08/28/sugionos-dual-role.html" }
    ],
    crimes: []
  },

  // ─── 13. SJAFRIE SJAMSOEDDIN ──────────────────────────────────────────────
  {
    official: {
      name: "Sjafrie Sjamsoeddin",
      currentAgency: "Kementerian Pertahanan",
      currentPosition: "Menteri Pertahanan Indonesia ke-27",
      party: "Non-partisan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Sjafrie_Sjamsoeddin%2C_Menteri_Pertahanan_Indonesia_%282025%29.png"
    },
    trackRecords: [
      { position: "Menteri Pertahanan", agency: "Kementerian Pertahanan", startDate: "2024-10-21", endDate: null },
      { position: "Staf Khusus Menteri Pertahanan", agency: "Kementerian Pertahanan", startDate: "2019-12-30", endDate: "2024-10-21" },
      { position: "Wakil Menteri Pertahanan", agency: "Kementerian Pertahanan", startDate: "2010-01-06", endDate: "2014-10-20" },
      { position: "Sekretaris Jenderal Kementerian Pertahanan", agency: "Kementerian Pertahanan", startDate: "2005-04-15", endDate: "2010-05-21" },
      { position: "Panglima Kodam Jaya", agency: "TNI Angkatan Darat", startDate: "1997-01-01", endDate: "1998-01-01" }
    ],
    news: [
      { title: "Menhan Sjafrie dan Menhan Singapura Luncurkan Alumni Pertahanan RI-Singapura", content: "Menhan Sjafrie Sjamsoeddin bersama Menhan Singapura Chan Chun Sing meluncurkan inisiatif alumni pertahanan Indonesia-Singapura (PERSAHAN) di Jakarta, memperkuat hubungan bilateral kedua negara di bidang keamanan.", sentiment: "Positif", date: "2026-07-14", sourceName: "CNA", sourceUrl: "https://www.channelnewsasia.com/singapore/indonesia-singapore-defence-alumni-initiative-chan-chun-sing-saf-tni-6253141" },
      { title: "Sjafrie Sjamsoeddin, Ajudan Soeharto Kini Gantikan Prabowo di Kemenhan", content: "Sjafrie Sjamsoeddin resmi dilantik sebagai Menteri Pertahanan pada 21 Oktober 2024, menggantikan Prabowo Subianto. Ia merupakan teman seangkatan Prabowo di Akmil 1974 dan mantan ajudan Presiden Soeharto.", sentiment: "Netral", date: "2024-10-21", sourceName: "CNN Indonesia", sourceUrl: "https://www.cnnindonesia.com/nasional/20241021110721-32-1157860/sjafrie-sjamsoeddin-ajudan-soeharto-kini-gantikan-prabowo-di-kemenhan" }
    ],
    crimes: []
  },

  // ─── 14. MEUTYA HAFID ─────────────────────────────────────────────────────
  {
    official: {
      name: "Meutya Hafid",
      currentAgency: "Kementerian Komunikasi dan Digital",
      currentPosition: "Menteri Komunikasi dan Digital Indonesia ke-8",
      party: "Golkar",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Menteri_Komunikasi_dan_Digital_Indonesia_Meutya_Viada_Hafid.jpg"
    },
    trackRecords: [
      { position: "Menteri Komunikasi dan Digital", agency: "Kementerian Komunikasi dan Digital", startDate: "2024-10-21", endDate: null },
      { position: "Ketua Komisi I DPR RI", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-10-01", endDate: "2024-10-21" },
      { position: "Anggota DPR RI Dapil Sumatera Utara I", agency: "Dewan Perwakilan Rakyat RI", startDate: "2010-08-30", endDate: "2024-10-21" },
      { position: "Wartawan dan Presenter", agency: "Metro TV", startDate: "2005-01-01", endDate: "2010-01-01" }
    ],
    news: [
      { title: "Komdigi Blokir 3,7 Juta Situs Judi Online Sejak Oktober 2024", content: "Menteri Komdigi Meutya Hafid mengungkapkan bahwa kementeriannya telah memblokir 3,7 juta situs judi online dan menutup 32.500 rekening bank terkait sejak Oktober 2024 hingga Juli 2026, sebagai bagian strategi komprehensif melawan ekosistem judi online.", sentiment: "Positif", date: "2026-07-14", sourceName: "AGBrief", sourceUrl: "https://agbrief.com/news/indonesia/17/07/2026/indonesia-blocks-3-7m-gambling-sites-closes-32500-bank-accounts/" },
      { title: "Komdigi Blokir Konten Magdalene, Dikritik Mirip Pembredelan Orde Baru", content: "Kementerian Komunikasi dan Digital di bawah Meutya Hafid menuai kritik keras setelah memblokir konten investigasi Magdalene terkait kasus penyiraman air keras oleh anggota TNI. Organisasi masyarakat sipil menilai langkah ini berpotensi melanggar UU Pers.", sentiment: "Negatif", date: "2026-04-09", sourceName: "BBC Indonesia", sourceUrl: "https://www.bbc.com/indonesia/articles/c0mjx7l781go" }
    ],
    crimes: []
  },

  // ─── 15. FADLI ZON ────────────────────────────────────────────────────────
  {
    official: {
      name: "Fadli Zon",
      currentAgency: "Kementerian Kebudayaan",
      currentPosition: "Menteri Kebudayaan Indonesia ke-4",
      party: "Gerindra",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Fadli_Zon%2C_Menteri_Kebudayaan_Indonesia.jpg"
    },
    trackRecords: [
      { position: "Menteri Kebudayaan", agency: "Kementerian Kebudayaan", startDate: "2024-10-21", endDate: null },
      { position: "Ketua KNIU (Komisi Nasional Indonesia untuk UNESCO)", agency: "Kementerian Kebudayaan", startDate: "2026-01-01", endDate: null },
      { position: "Ketua BKSAP DPR RI", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-11-04", endDate: "2024-10-21" },
      { position: "Wakil Ketua DPR RI Bidang Politik dan Keamanan", agency: "Dewan Perwakilan Rakyat RI", startDate: "2014-10-02", endDate: "2019-10-01" },
      { position: "Anggota DPR RI Dapil Jawa Barat V", agency: "Dewan Perwakilan Rakyat RI", startDate: "2014-10-01", endDate: "2024-10-21" }
    ],
    news: [
      { title: "Fadli Zon Pimpin Upaya RI Dirikan Museum Palestina di TMII", content: "Menteri Kebudayaan Fadli Zon menegaskan komitmen Indonesia mendukung rekonstruksi budaya Palestina dalam pertemuan bilateral dengan Menteri Kebudayaan Palestina, termasuk menjajaki pendirian Museum Palestina di TMII Jakarta.", sentiment: "Positif", date: "2026-07-13", sourceName: "Antara", sourceUrl: "https://en.antaranews.com/news/422895/ri-explores-the-establishment-of-palestinian-museum-at-tmii-jakarta" },
      { title: "Kebudayaan Jadi Fondasi Kemandirian Ekonomi Bangsa", content: "Menteri Kebudayaan Fadli Zon menegaskan bahwa kebudayaan harus menjadi bagian penting dalam strategi mewujudkan kemandirian ekonomi nasional, tidak hanya bertumpu pada aspek fiskal dan moneter.", sentiment: "Positif", date: "2026-06-28", sourceName: "TVRI", sourceUrl: "https://nasional.tvrinews.com/berita/tah8fwh-fadli-zon-kebudayaan-jadi-fondasi-kemandirian-ekonomi-bangsa" }
    ],
    crimes: []
  },

  // ─── 16. ABDUL MU'TI ─────────────────────────────────────────────────────
  {
    official: {
      name: "Abdul Mu'ti",
      currentAgency: "Kementerian Pendidikan Dasar dan Menengah",
      currentPosition: "Menteri Pendidikan Dasar dan Menengah Indonesia ke-30",
      party: "Non-partisan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Menteri_pendidikan_indonesia.jpg"
    },
    trackRecords: [
      { position: "Menteri Pendidikan Dasar dan Menengah", agency: "Kementerian Pendidikan Dasar dan Menengah", startDate: "2024-10-21", endDate: null },
      { position: "Sekretaris Umum Pimpinan Pusat Muhammadiyah", agency: "Pimpinan Pusat Muhammadiyah", startDate: "2022-11-20", endDate: null },
      { position: "Guru Besar Bidang Pendidikan Agama Islam", agency: "UIN Syarif Hidayatullah Jakarta", startDate: "2020-09-02", endDate: null },
      { position: "Ketua Badan Standar Nasional Pendidikan (BSNP)", agency: "BSNP", startDate: "2019-01-01", endDate: "2021-01-01" },
      { position: "Ketua Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M)", agency: "BAN-S/M", startDate: "2011-01-01", endDate: "2017-01-01" }
    ],
    news: [
      { title: "Mendikdasmen Luncurkan MPLS RAMAH Tahun Ajaran 2026/2027", content: "Menteri Pendidikan Dasar dan Menengah Abdul Mu'ti secara resmi membuka pelaksanaan MPLS RAMAH (Ramah, Aman, Menyenangkan, dan Berkarakter) Tahun Ajaran 2026/2027 secara nasional dari Kota Malang.", sentiment: "Positif", date: "2026-07-14", sourceName: "TVRI", sourceUrl: "https://nasional.tvrinews.com/berita/t5qelqi-mendikdasmen-mpls-ramah-bangun-budaya-sekolah-aman-dan-bebas-perundungan" },
      { title: "PPDB Resmi Diganti SPMB Mulai 2025", content: "Kemendikdasmen resmi mengganti sistem Penerimaan Peserta Didik Baru (PPDB) menjadi Sistem Penerimaan Murid Baru (SPMB), dengan jalur zonasi yang kontroversial diganti menjadi jalur domisili.", sentiment: "Positif", date: "2025-03-01", sourceName: "Kompas", sourceUrl: "https://www.kompas.id/artikel/en-resmi-ppdb-diganti-spmb-mulai-tahun-ini" },
      { title: "Mendikdasmen Abdul Mu'ti: Pendekatan Deep Learning Diterapkan di Kurikulum Nasional", content: "Menteri Abdul Mu'ti menegaskan pendekatan deep learning melalui tiga prinsip utama — mindfulness, meaningful, dan joyful — akan diterapkan sebagai pendekatan pembelajaran dalam sistem pendidikan nasional.", sentiment: "Positif", date: "2024-12-31", sourceName: "Tempo", sourceUrl: "https://www.tempo.co/politik/mendikdasmen-abdul-mu-ti-pendekatan-deep-learning-akan-diterapkan-di-kurikulum-nasional-1188242" }
    ],
    crimes: []
  },

  // ─── 17. ST BURHANUDDIN ───────────────────────────────────────────────────
  {
    official: {
      name: "ST Burhanuddin",
      currentAgency: "Kejaksaan Agung Republik Indonesia",
      currentPosition: "Jaksa Agung RI",
      party: "Non-partisan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/JAKSAAGUNG%2CSanitiar_Burhanuddin.jpg"
    },
    trackRecords: [
      { position: "Jaksa Agung RI", agency: "Kejaksaan Agung Republik Indonesia", startDate: "2019-10-23", endDate: null },
      { position: "Jaksa Agung Muda Perdata dan Tata Usaha Negara", agency: "Kejaksaan Agung RI", startDate: "2011-01-01", endDate: "2014-12-31" },
      { position: "Kepala Kejaksaan Tinggi Sulawesi Selatan dan Barat", agency: "Kejaksaan Agung RI", startDate: "2010-01-01", endDate: "2011-01-01" },
      { position: "Kepala Kejaksaan Tinggi Maluku Utara", agency: "Kejaksaan Agung RI", startDate: "2008-01-01", endDate: "2009-12-31" }
    ],
    news: [
      { title: "Jaksa Agung Terima Pengunduran Diri Febrie Adriansyah dari Jampidsus", content: "Jaksa Agung ST Burhanuddin menerima pengunduran diri Febrie Adriansyah dari jabatan Jampidsus pada 11 Juli 2026. Posisi Jampidsus langsung diisi oleh pejabat baru untuk menjaga kesinambungan penegakan hukum kasus korupsi.", sentiment: "Netral", date: "2026-07-11", sourceName: "TVRI", sourceUrl: "https://hukum.tvrinews.com/berita/tdh35xn-jaksa-agung-terima-pengunduran-diri-febrie-adriansyah-sebagai-jam-pidsus" },
      { title: "Kapolri dan Jaksa Agung Perkuat Sinergi Penegakan Hukum Pasca Kasus Febrie", content: "Kapolri Listyo Sigit Prabowo menemui Jaksa Agung ST Burhanuddin di Gedung Kejaksaan Agung untuk membahas penguatan koordinasi Polri-Kejaksaan dan memastikan independensi penegakan hukum pasca kasus Jampidsus.", sentiment: "Positif", date: "2026-07-13", sourceName: "TVRI", sourceUrl: "https://nasional.tvrinews.com/berita/tq90mn4-kapolri-dan-jaksa-agung-sepakat-perkuat-sinergi-penegakan-hukum-hingga-daerah" },
      { title: "Jaksa Agung ST Burhanuddin Serahkan Rp11,42 Triliun Hasil Penyelamatan Negara", content: "Presiden Prabowo menyaksikan penyerahan dana hasil penyelamatan keuangan negara sebesar Rp11,42 triliun oleh Jaksa Agung ST Burhanuddin, hasil penagihan denda tindak pidana korupsi.", sentiment: "Positif", date: "2026-04-10", sourceName: "Setneg", sourceUrl: "https://www.setneg.go.id/baca/index/presiden_prabowo_saksikan_penyerahan_rp1142_triliun_dan_ratusan_ribu_hektare_lahan_hasil_penyelamatan_ke_negara" }
    ],
    crimes: []
  },

  // ─── 18. FEBRIE ADRIANSYAH ────────────────────────────────────────────────
  {
    official: {
      name: "Febrie Adriansyah",
      currentAgency: "Kejaksaan Agung Republik Indonesia",
      currentPosition: "Mantan Jampidsus (Mundur 11 Juli 2026)",
      party: "Non-partisan",
      photoUrl: "https://www.kantamedia.com/wp-content/uploads/2026/07/FEBRIE-ADRIANSYAH-MANTAN-JAMPIDUS.jpg",
      isHotFigure: true
    },
    trackRecords: [
      { position: "Jaksa Agung Muda Tindak Pidana Khusus (Jampidsus)", agency: "Kejaksaan Agung Republik Indonesia", startDate: "2022-01-10", endDate: "2026-07-11" },
      { position: "Kepala Kejaksaan Tinggi DKI Jakarta", agency: "Kejaksaan Agung Republik Indonesia", startDate: "2021-07-29", endDate: "2022-01-10" },
      { position: "Direktur Penyidikan Jampidsus", agency: "Kejaksaan Agung Republik Indonesia", startDate: "2019-01-01", endDate: "2021-07-29" },
      { position: "Kepala Kejaksaan Tinggi Nusa Tenggara Timur", agency: "Kejaksaan Agung Republik Indonesia", startDate: "2018-01-01", endDate: "2019-01-01" },
      { position: "Wakil Kepala Kejaksaan Tinggi DKI Jakarta", agency: "Kejaksaan Agung Republik Indonesia", startDate: "2017-01-01", endDate: "2018-01-01" },
      { position: "Kepala Kejaksaan Negeri Bandung", agency: "Kejaksaan Agung Republik Indonesia", startDate: "2013-01-01", endDate: "2015-01-01" }
    ],
    news: [
      { title: "Febrie Adriansyah Ditetapkan Tersangka Korupsi dan TPPU oleh Polri", content: "Kortastipidkor Polri resmi menetapkan mantan Jampidsus Febrie Adriansyah sebagai tersangka dugaan korupsi dan pencucian uang terkait penanganan perkara Asabri, pengadaan batu bara PLN, dan PT Krakatau Steel. Penetapan dilakukan beberapa jam setelah pengunduran dirinya.", sentiment: "Negatif", date: "2026-07-11", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2026/07/12/09394211/3-kasus-korupsi-yang-menjerat-eks-jampidsus-febrie-adriansyah" },
      { title: "Polri Geledah Rumah Jampidsus, Sita 74 Kg Emas dan Uang Ratusan Miliar", content: "Kortastipidkor Polri menggeledah kediaman Febrie Adriansyah di Sentul, Bogor. Penyidik menemukan 74 kilogram emas batangan dan uang tunai dalam mata uang asing dengan nilai diperkirakan mencapai Rp476 miliar.", sentiment: "Negatif", date: "2026-07-08", sourceName: "Detik", sourceUrl: "https://news.detik.com/berita/d-8569182/runutan-penyitaan-uang-miliaran-74-kg-emas-hingga-jampidsus-mundur" },
      { title: "Jampidsus Febrie Adriansyah Diuntit Densus 88, Picu Ketegangan Antar-Lembaga", content: "Nama Febrie Adriansyah menjadi sorotan setelah beredar laporan bahwa ia diuntit anggota Densus 88 Antiteror Polri. Peristiwa ini memicu ketegangan antar-lembaga penegak hukum dan menjadi awal dari rangkaian kontroversi.", sentiment: "Negatif", date: "2024-05-15", sourceName: "Tempo", sourceUrl: "https://www.tempo.co/hukum/profil-jampidsus-febrie-adriansyah-kembali-dilaporkan-ke-kpk-pernah-dikuntit-densus-kekayaan-naik-3-kali-lipat-1219061" }
    ],
    crimes: [
      { type: "Tersangka Korupsi dan TPPU", description: "Ditetapkan sebagai tersangka oleh Kortastipidkor Polri atas dugaan korupsi dan pencucian uang terkait penanganan perkara PT Asabri, pengadaan batu bara PLN, dan PT Krakatau Steel. Barang bukti meliputi 74 kg emas dan uang tunai senilai Rp476 miliar. Presiden Prabowo langsung meminta laporan perkembangan kasus.", status: "Tersangka", date: "2026-07-11", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2026/07/12/09394211/3-kasus-korupsi-yang-menjerat-eks-jampidsus-febrie-adriansyah" },
      { type: "Dugaan Penerimaan Suap Penanganan Perkara", description: "Diduga menerima suap dan gratifikasi dalam penanganan sejumlah perkara korupsi besar termasuk pengadaan batu bara PLN antara 2018–2026. Perkara ini dalam penyidikan Kortastipidkor Polri dan diperkirakan menimbulkan kerugian negara hingga Rp5 triliun.", status: "Dalam Penyidikan", date: "2026-07-08", sourceName: "Jurist", sourceUrl: "https://www.jurist.org/news/2026/07/top-indonesia-anti-corruption-prosecutor-resigns-amid-275m-corruption-allegations/" }
    ]
  }
];

async function clearExistingData() {
  const collections = ["officials", "track_records", "news", "criminal_records"];
  for (const collName of collections) {
    const colRef = collection(db, collName);
    const snapshot = await getDocs(colRef);
    for (const d of snapshot.docs) {
      await deleteDoc(d.ref);
    }
  }
}

async function seed() {
  try {
    console.log("Menghapus data lama...");
    await clearExistingData();
    console.log("Data lama berhasil dihapus.");

    console.log(`Memulai proses seeding data ${realData.length} Pejabat...`);
    for (const item of realData) {
      const docRef = await addDoc(collection(db, "officials"), item.official);
      console.log(`- Ditambahkan pejabat: ${item.official.name}`);

      for (const track of item.trackRecords) {
        await addDoc(collection(db, "track_records"), {
          ...track,
          officialId: docRef.id,
          startDate: new Date(track.startDate),
          endDate: track.endDate ? new Date(track.endDate) : null
        });
      }

      for (const n of item.news) {
        await addDoc(collection(db, "news"), {
          ...n,
          officialId: docRef.id,
          date: new Date(n.date)
        });
      }

      for (const crime of item.crimes) {
        await addDoc(collection(db, "criminal_records"), {
          ...crime,
          officialId: docRef.id,
          date: new Date(crime.date)
        });
      }
    }
    console.log("Seeding selesai 100%!");
    process.exit(0);
  } catch (e) {
    console.error("Error seeding data:", e);
    process.exit(1);
  }
}

seed();
