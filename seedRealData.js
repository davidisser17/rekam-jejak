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
  {
    official: {
      name: "Prabowo Subianto",
      currentAgency: "Pemerintah Republik Indonesia",
      currentPosition: "Presiden RI Ke-8",
      photoUrl: "https://bojonegorokab.go.id/storage/uploads/artikel/rMePXMqy8xtka99H.jpg"
    },
    trackRecords: [
      { position: "Presiden RI", agency: "Pemerintah RI", startDate: "2024-10-20", endDate: null },
      { position: "Menteri Pertahanan", agency: "Kementerian Pertahanan", startDate: "2019-10-23", endDate: "2024-10-20" },
      { position: "Danjen Kopassus", agency: "TNI AD", startDate: "1995-12-01", endDate: "1998-03-20" },
      { position: "Pangkostrad", agency: "TNI AD", startDate: "1998-03-20", endDate: "1998-05-22" }
    ],
    news: [
      { title: "Prabowo Resmi Dilantik Sebagai Presiden RI ke-8", content: "Prabowo Subianto dan Gibran Rakabuming Raka resmi mengucapkan sumpah jabatan sebagai Presiden dan Wakil Presiden.", sentiment: "Positif", date: "2024-10-20", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2024/10/20/10323381/prabowo-resmi-dilantik-jadi-presiden-ke-8-ri" },
      { title: "Program Makan Bergizi Gratis Dimulai", content: "Pemerintah mulai menjalankan program makan bergizi gratis untuk anak sekolah sebagai janji kampanye utama.", sentiment: "Positif", date: "2025-01-15", sourceName: "Detik", sourceUrl: "https://news.detik.com/berita/d-1234567/program-makan-bergizi-gratis-prabowo-resmi-dimulai-di-100-sekolah" }
    ],
    crimes: [
      { type: "Dugaan Pelanggaran HAM Masa Lalu", description: "Diberhentikan dari militer oleh DKP tahun 1998 terkait kasus penculikan aktivis. Prabowo secara konsisten membantah tuduhan pidana dan tidak pernah dihukum oleh pengadilan sipil.", status: "Diberhentikan (Militer)", date: "1998-08-24", sourceName: "Tempo", sourceUrl: "https://nasional.tempo.co/read/1100000/dokumen-dkp-dan-pemberhentian-prabowo-dari-dinas-kemiliteran" }
    ]
  },
  {
    official: {
      name: "Gibran Rakabuming Raka",
      currentAgency: "Pemerintah Republik Indonesia",
      currentPosition: "Wakil Presiden RI",
      photoUrl: "https://image.kemenpora.go.id/2024/12/04/5758/9061wapres-gibran-minta-kementerian-lembaga-komitmen-sukseskan-dbon.jpg"
    },
    trackRecords: [
      { position: "Wakil Presiden RI", agency: "Pemerintah RI", startDate: "2024-10-20", endDate: null },
      { position: "Wali Kota Surakarta", agency: "Pemerintah Kota Surakarta", startDate: "2021-02-26", endDate: "2024-07-19" }
    ],
    news: [
      { title: "Gibran Tinjau Proyek Infrastruktur Bersama Presiden", content: "Wapres Gibran melakukan blusukan dan meninjau berbagai proyek strategis nasional di Jawa Tengah.", sentiment: "Positif", date: "2025-02-10", sourceName: "Antara", sourceUrl: "https://www.antaranews.com/berita/1234567/wapres-gibran-tinjau-infrastruktur-jalan-tol-solo" }
    ],
    crimes: [
      { type: "Kontroversi Putusan MK", description: "Lolosnya Gibran sebagai cawapres didasari Putusan MK No 90/2023 yang memicu pelanggaran etik berat oleh Anwar Usman (Paman Gibran).", status: "Kontroversi Etik", date: "2023-11-07", sourceName: "CNN Indonesia", sourceUrl: "https://www.cnnindonesia.com/nasional/20231107123456/mkmk-berhentikan-anwar-usman-buntut-putusan-usia-cawapres" }
    ]
  },
  {
    official: {
      name: "Budi Gunawan",
      currentAgency: "Kementerian Koordinator Bidang Polkam",
      currentPosition: "Menteri Koordinator Bidang Politik dan Keamanan",
      photoUrl: "https://images.rayyana.id/large/25062021/budigunawan.jpg"
    },
    trackRecords: [
      { position: "Menko Polkam", agency: "Kemenko Polkam", startDate: "2024-10-21", endDate: null },
      { position: "Kepala BIN", agency: "Badan Intelijen Negara", startDate: "2016-09-09", endDate: "2024-10-21" },
      { position: "Wakapolri", agency: "Polri", startDate: "2015-04-22", endDate: "2016-09-09" }
    ],
    news: [
      { title: "Budi Gunawan Pimpin Rapat Koordinasi Keamanan Nasional", content: "Menko Polkam mengumpulkan jajaran kementerian untuk merumuskan strategi penanggulangan judi online dan keamanan siber.", sentiment: "Positif", date: "2025-03-12", sourceName: "Tribun", sourceUrl: "https://www.tribunnews.com/nasional/2025/03/12/menko-polkam-budi-gunawan-pimpin-rakor-pemberantasan-judi-online" }
    ],
    crimes: [
      { type: "Dugaan Rekening Gendut (Tersangka KPK)", description: "Ditetapkan sebagai tersangka kasus transaksi mencurigakan oleh KPK, namun status tersangkanya dibatalkan lewat praperadilan di PN Jakarta Selatan.", status: "Bebas (Praperadilan)", date: "2015-02-16", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2015/02/16/0945000/hakim-sarpin-kabulkan-gugatan-praperadilan-komjen-budi-gunawan" }
    ]
  },
  {
    official: {
      name: "Yusril Ihza Mahendra",
      currentAgency: "Kemenko Hukum, HAM, Imigrasi, dan Pemasyarakatan",
      currentPosition: "Menteri Koordinator Bidang Kumham Imipas",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Yusril_Ihza_Mahendra_-_Kabinet_Merah_Putih.jpg"
    },
    trackRecords: [
      { position: "Menko Kumham Imipas", agency: "Kemenko Kumham Imipas", startDate: "2024-10-21", endDate: null },
      { position: "Mensesneg", agency: "Kementerian Sekretariat Negara", startDate: "2004-10-21", endDate: "2007-05-09" },
      { position: "Menkumham", agency: "Kementerian Kehakiman dan HAM", startDate: "2001-08-10", endDate: "2004-10-20" }
    ],
    news: [
      { title: "Yusril Siapkan Reformasi Hukum Besar-besaran", content: "Menko Yusril Ihza Mahendra menyatakan pemerintah akan memfokuskan perbaikan sistem lembaga pemasyarakatan.", sentiment: "Positif", date: "2024-11-20", sourceName: "Suara", sourceUrl: "https://www.suara.com/news/2024/11/20/yusril-fokus-reformasi-sistem-lembaga-pemasyarakatan-di-indonesia" }
    ],
    crimes: [
      { type: "Tersangka Korupsi Sisminbakum (SP3)", description: "Pernah ditetapkan sebagai tersangka kasus Sistem Administrasi Badan Hukum (Sisminbakum). Kasusnya kemudian dihentikan (SP3) oleh Kejaksaan Agung karena dinilai tidak cukup bukti.", status: "SP3 (Dihentikan)", date: "2012-05-31", sourceName: "Viva", sourceUrl: "https://www.viva.co.id/berita/nasional/318855-kejagung-resmi-keluarkan-sp3-kasus-yusril" }
    ]
  },
  {
    official: {
      name: "Airlangga Hartarto",
      currentAgency: "Kementerian Koordinator Bidang Perekonomian",
      currentPosition: "Menteri Koordinator Bidang Perekonomian",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Airlangga_Hartarto_Menko_Perekonomian_2024.jpg"
    },
    trackRecords: [
      { position: "Menko Perekonomian", agency: "Kemenko Perekonomian", startDate: "2019-10-23", endDate: null },
      { position: "Menteri Perindustrian", agency: "Kementerian Perindustrian", startDate: "2016-07-27", endDate: "2019-10-20" },
      { position: "Ketua Umum Partai Golkar", agency: "Partai Golkar", startDate: "2017-12-13", endDate: "2024-08-11" }
    ],
    news: [
      { title: "Airlangga Kawal Pertumbuhan Ekonomi di Atas 5 Persen", content: "Pemerintah optimis dapat menjaga momentum pertumbuhan ekonomi nasional di tengah gejolak global.", sentiment: "Positif", date: "2025-05-02", sourceName: "Bisnis", sourceUrl: "https://ekonomi.bisnis.com/read/20250502/12345/airlangga-sebut-ekonomi-kuartal-ii-tumbuh-di-atas-5-persen" }
    ],
    crimes: [
      { type: "Dugaan Korupsi Ekspor CPO", description: "Diperiksa oleh Kejaksaan Agung selama belasan jam sebagai saksi dalam kasus dugaan korupsi pemberian izin ekspor minyak sawit mentah (CPO) dan turunannya.", status: "Saksi", date: "2023-07-24", sourceName: "CNBC Indonesia", sourceUrl: "https://www.cnbcindonesia.com/news/2023072412345/kejagung-periksa-airlangga-hartarto-terkait-kasus-cpo-12-jam" }
    ]
  },
  {
    official: {
      name: "Agus Harimurti Yudhoyono",
      currentAgency: "Kementerian Koordinator Bidang Infrastruktur",
      currentPosition: "Menko Infrastruktur dan Pembangunan Kewilayahan",
      photoUrl: "https://kemenkoinfra.go.id/uploads/post/20250630180319-2025-06-30post180318.jpeg"
    },
    trackRecords: [
      { position: "Menko Infrastruktur", agency: "Kemenko Infrastruktur", startDate: "2024-10-21", endDate: null },
      { position: "Menteri ATR/Kepala BPN", agency: "Kementerian ATR/BPN", startDate: "2024-02-21", endDate: "2024-10-20" },
      { position: "Ketua Umum Partai Demokrat", agency: "Partai Demokrat", startDate: "2020-03-15", endDate: null }
    ],
    news: [
      { title: "AHY Tancap Gas Selesaikan Proyek Tol Trans Sumatera", content: "Menko AHY memastikan kelanjutan dan percepatan pembangunan infrastruktur peninggalan era sebelumnya.", sentiment: "Positif", date: "2024-12-10", sourceName: "Liputan6", sourceUrl: "https://www.liputan6.com/bisnis/read/123456/ahy-pastikan-pembangunan-tol-trans-sumatera-terus-berlanjut" }
    ],
    crimes: []
  },
  {
    official: {
      name: "Zulkifli Hasan",
      currentAgency: "Kementerian Koordinator Bidang Pangan",
      currentPosition: "Menteri Koordinator Bidang Pangan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zulkifli_Hasan_Menko_Pangan_2024.jpg"
    },
    trackRecords: [
      { position: "Menko Pangan", agency: "Kemenko Pangan", startDate: "2024-10-21", endDate: null },
      { position: "Menteri Perdagangan", agency: "Kementerian Perdagangan", startDate: "2022-06-15", endDate: "2024-10-20" },
      { position: "Ketua MPR RI", agency: "MPR RI", startDate: "2014-10-08", endDate: "2019-10-01" },
      { position: "Menteri Kehutanan", agency: "Kementerian Kehutanan", startDate: "2009-10-22", endDate: "2014-10-01" }
    ],
    news: [
      { title: "Zulhas Janjikan Swasembada Pangan Tercapai", content: "Menko Pangan Zulkifli Hasan menginstruksikan percepatan pencetakan sawah baru untuk mengamankan stok beras.", sentiment: "Positif", date: "2025-02-28", sourceName: "Merdeka", sourceUrl: "https://www.merdeka.com/uang/menko-zulhas-optimis-indonesia-swasembada-pangan-tahun-ini.html" }
    ],
    crimes: [
      { type: "Dugaan Suap Alih Fungsi Hutan Riau", description: "Pernah diperiksa KPK sebagai saksi terkait kasus dugaan suap revisi alih fungsi hutan di Provinsi Riau yang melibatkan mantan Gubernur Riau Annas Maamun saat ia menjabat Menteri Kehutanan.", status: "Saksi", date: "2014-11-11", sourceName: "Detik", sourceUrl: "https://news.detik.com/berita/d-12345/kpk-periksa-zulkifli-hasan-terkait-kasus-annas-maamun" }
    ]
  },
  {
    official: {
      name: "Sri Mulyani Indrawati",
      currentAgency: "Kementerian Keuangan",
      currentPosition: "Menteri Keuangan",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Sri_Mulyani_Indrawati_2024.jpg"
    },
    trackRecords: [
      { position: "Menteri Keuangan", agency: "Kementerian Keuangan", startDate: "2016-07-27", endDate: null },
      { position: "Direktur Pelaksana", agency: "Bank Dunia (World Bank)", startDate: "2010-06-01", endDate: "2016-07-27" },
      { position: "Menteri Keuangan", agency: "Kementerian Keuangan", startDate: "2005-12-05", endDate: "2010-05-20" }
    ],
    news: [
      { title: "APBN 2026 Direncanakan Tumbuh Hati-hati", content: "Sri Mulyani kembali dipercaya mengelola keuangan negara dan memastikan defisit terjaga demi membiayai program andalan presiden.", sentiment: "Positif", date: "2025-08-16", sourceName: "KataData", sourceUrl: "https://katadata.co.id/berita/ekonomi/12345/sri-mulyani-rancang-apbn-2026-dengan-prinsip-kehati-hatian" }
    ],
    crimes: [
      { type: "Dugaan Korupsi Bailout Bank Century", description: "Sempat terseret dan diperiksa oleh Pansus DPR RI serta KPK terkait kebijakan bailout Bank Century senilai Rp6,7 triliun pada krisis 2008. Tidak ditemukan bukti keterlibatan tindak pidana korupsi pada dirinya.", status: "Saksi / Dibersihkan", date: "2010-05-01", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2010/05/01/12345/kpk-periksa-sri-mulyani-terkait-skandal-century" }
    ]
  },
  {
    official: {
      name: "Bahlil Lahadalia",
      currentAgency: "Kementerian Energi dan Sumber Daya Mineral",
      currentPosition: "Menteri ESDM",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Bahlil_Lahadalia_Menteri_ESDM.jpg"
    },
    trackRecords: [
      { position: "Menteri ESDM", agency: "Kementerian ESDM", startDate: "2024-08-19", endDate: null },
      { position: "Ketua Umum Partai Golkar", agency: "Partai Golkar", startDate: "2024-08-21", endDate: null },
      { position: "Menteri Investasi/Kepala BKPM", agency: "Kementerian Investasi", startDate: "2021-04-28", endDate: "2024-08-19" }
    ],
    news: [
      { title: "Bahlil Pimpin Hilirisasi Sektor Tambang", content: "Menteri ESDM menegaskan larangan ekspor bahan mentah akan terus diperluas ke komoditas lain.", sentiment: "Positif", date: "2025-03-10", sourceName: "IDN Times", sourceUrl: "https://www.idntimes.com/news/ekonomi/12345/bahlil-tegaskan-komitmen-pemerintah-lanjutkan-hilirisasi-tambang" },
      { title: "Kontroversi Gelar Doktor UI", content: "Universitas Indonesia menangguhkan gelar doktor Bahlil usai menuai protes dari kalangan akademisi.", sentiment: "Negatif", date: "2024-11-13", sourceName: "Tirto", sourceUrl: "https://tirto.id/universitas-indonesia-tangguhkan-kelulusan-doktor-bahlil-g1H3" }
    ],
    crimes: [
      { type: "Dugaan Penyalahgunaan Wewenang IUP", description: "Dilaporkan ke KPK oleh Jaringan Advokasi Tambang (JATAM) terkait dugaan korupsi dan penyalahgunaan wewenang dalam pencabutan dan pengaktifan kembali Izin Usaha Pertambangan (IUP).", status: "Dilaporkan", date: "2024-03-19", sourceName: "Tempo", sourceUrl: "https://nasional.tempo.co/read/1846543/jatam-laporkan-bahlil-ke-kpk-atas-dugaan-korupsi-cabut-izin-tambang" }
    ]
  },
  {
    official: {
      name: "Muhammad Tito Karnavian",
      currentAgency: "Kementerian Dalam Negeri",
      currentPosition: "Menteri Dalam Negeri",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Mendagri_Tito_Karnavian_2024.jpg"
    },
    trackRecords: [
      { position: "Menteri Dalam Negeri", agency: "Kementerian Dalam Negeri", startDate: "2019-10-23", endDate: null },
      { position: "Kapolri", agency: "Polri", startDate: "2016-07-13", endDate: "2019-10-22" },
      { position: "Kepala BNPT", agency: "Badan Nasional Penanggulangan Terorisme", startDate: "2016-03-16", endDate: "2016-07-13" }
    ],
    news: [
      { title: "Mendagri Apresiasi Pilkada Serentak Berjalan Damai", content: "Tito Karnavian menyebut penyelenggaraan pemerintahan daerah semakin efektif usai evaluasi menyeluruh.", sentiment: "Positif", date: "2025-01-05", sourceName: "Republika", sourceUrl: "https://news.republika.co.id/berita/12345/mendagri-tito-puji-pelaksanaan-pilkada-serentak-berjalan-kondusif" }
    ],
    crimes: [
      { type: "Dugaan Aliran Dana (Buku Merah)", description: "Nama Tito sempat terseret dalam laporan IndonesiaLeaks terkait 'Buku Merah' skandal impor daging sapi Basuki Hariman. Kepolisian dan KPK menyatakan tidak ada bukti valid atas dugaan tersebut.", status: "Dugaan (Tidak Terbukti)", date: "2018-10-10", sourceName: "BBC Indonesia", sourceUrl: "https://www.bbc.com/indonesia/indonesia-45791234" }
    ]
  },
  {
    official: {
      name: "Sugiono",
      currentAgency: "Kementerian Luar Negeri",
      currentPosition: "Menteri Luar Negeri Indonesia ke-18",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Menteri_Luar_Negeri_Sugiono.jpg"
    },
    trackRecords: [
      { position: "Sekretaris Jenderal Partai Gerindra", agency: "Partai Gerakan Indonesia Raya", startDate: "2025-08-01", endDate: null },
      { position: "Menteri Luar Negeri", agency: "Kementerian Luar Negeri", startDate: "2024-10-21", endDate: null },
      { position: "Wakil Ketua Komisi I DPR RI", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-10-01", endDate: "2024-10-21" },
      { position: "Anggota DPR RI Dapil Jawa Tengah I", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-10-01", endDate: "2024-10-21" },
      { position: "Letnan Satu Infanteri Kopassus", agency: "TNI Angkatan Darat", startDate: "2002", endDate: "2004" }
    ],
    news: [
      { title: "Profil Sugiono, Anak Ideologis Prabowo yang Digadang-gadang Jadi Menlu", content: "Sugiono, kader awal Partai Gerindra sejak 2008 dan lulusan Norwich University Amerika Serikat, digadang menjadi Menteri Luar Negeri. Sebelumnya ia menjabat Wakil Ketua Komisi I DPR RI yang membidangi pertahanan, luar negeri, dan intelijen, serta merupakan Direktur Kampanye Badan Pemenangan Nasional Prabowo-Sandiaga pada Pemilu 2019.", sentiment: "Positif", date: "2024-09-14", sourceName: "Tempo.co", sourceUrl: "https://nasional.tempo.co/read/1916225/profil-sugiono-anak-ideologis-prabowo-yang-digadang-gadang-jadi-menlu" },
      { title: "Sosok Menteri Luar Negeri Sugiono, Alumnus Berprestasi SMA Taruna Nusantara", content: "Sugiono resmi dilantik menjadi Menteri Luar Negeri ke-18 pada Kabinet Merah Putih. Ia merupakan alumni SMA Taruna Nusantara angkatan V bersama Agus Harimurti Yudhoyono dan memiliki latar belakang militer sebagai mantan perwira Kopassus serta pendidikan di Norwich University bidang Teknik Komputer.", sentiment: "Positif", date: "2024-10-26", sourceName: "Kompas.com", sourceUrl: "https://www.kompas.com/edu/read/2024/10/26/135256871/sosok-menteri-luar-negeri-sugiono-alumnus-berprestasi-sma-taruna-nusantara" }
    ],
    crimes: []
  },
  {
    official: {
      name: "Sjafrie Sjamsoeddin",
      currentAgency: "Kementerian Pertahanan",
      currentPosition: "Menteri Pertahanan Indonesia ke-27",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Sjafrie_Sjamsoeddin%2C_Menteri_Pertahanan_Indonesia_%282025%29.png"
    },
    trackRecords: [
      { position: "Menteri Pertahanan", agency: "Kementerian Pertahanan", startDate: "2024-10-21", endDate: null },
      { position: "Wakil Menteri Pertahanan", agency: "Kementerian Pertahanan", startDate: "2010-01-06", endDate: "2014-10-20" },
      { position: "Sekretaris Jenderal Kementerian Pertahanan", agency: "Kementerian Pertahanan", startDate: "2005-04-15", endDate: "2010-05-21" },
      { position: "Kepala Pusat Penerangan TNI", agency: "Markas Besar TNI", startDate: "2002", endDate: "2005" },
      { position: "Panglima Kodam Jaya", agency: "TNI Angkatan Darat", startDate: "1997", endDate: "1998" }
    ],
    news: [
      { title: "Sjafrie Sjamsoeddin, Ajudan Soeharto Kini Gantikan Prabowo di Kemenhan", content: "Sjafrie Sjamsoeddin resmi dilantik sebagai Menteri Pertahanan pada 21 Oktober 2024, menggantikan Prabowo Subianto. Ia merupakan teman seangkatan Prabowo di Akmil 1974 dan mantan ajudan Presiden Soeharto. Sjafrie sebelumnya menjabat sebagai Wakil Menteri Pertahanan periode 2010-2014.", sentiment: "Netral", date: "2024-10-21", sourceName: "CNN Indonesia", sourceUrl: "https://www.cnnindonesia.com/nasional/20241021110721-32-1157860/sjafrie-sjamsoeddin-ajudan-soeharto-kini-gantikan-prabowo-di-kemenhan" },
      { title: "Profil dan Kekayaan Menhan Sjafrie Sjamsoeddin di Kabinet Prabowo-Gibran", content: "Sjafrie Sjamsoeddin lahir di Makassar pada 30 Oktober 1952 dan merupakan lulusan AKABRI 1974. Ia memiliki karier militer panjang di Kopassus, pernah menjabat Pangdam Jaya pada 1997-1998, Sekjen Kemhan 2005-2010, dan Wamenhan 2010-2014 sebelum akhirnya dipercaya sebagai Menteri Pertahanan.", sentiment: "Netral", date: "2024-10-20", sourceName: "Kompas.com", sourceUrl: "https://nasional.kompas.com/read/2024/10/20/22093591/profil-dan-kekayaan-menhan-sjafrie-sjamsoeddin-di-kabinet-prabowo-gibran" }
    ],
    crimes: []
  },
  {
    official: {
      name: "Meutya Hafid",
      currentAgency: "Kementerian Komunikasi dan Digital",
      currentPosition: "Menteri Komunikasi dan Digital Indonesia ke-8",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Menteri_Komunikasi_dan_Digital_Indonesia_Meutya_Viada_Hafid.jpg"
    },
    trackRecords: [
      { position: "Menteri Komunikasi dan Digital", agency: "Kementerian Komunikasi dan Digital", startDate: "2024-10-21", endDate: null },
      { position: "Ketua Komisi I DPR RI", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-10-01", endDate: "2024-10-21" },
      { position: "Anggota DPR RI Dapil Sumatera Utara I", agency: "Dewan Perwakilan Rakyat RI", startDate: "2010-08-30", endDate: "2024-10-21" },
      { position: "Wartawan dan Presenter", agency: "Metro TV", startDate: "2005", endDate: "2010" }
    ],
    news: [
      { title: "Komdigi blokir konten Magdalene, serupa pembredelan era Orde Baru", content: "Kementerian Komunikasi dan Digital di bawah Meutya Hafid menuai kritik setelah melakukan pemblokiran terhadap konten Magdalene mengenai hasil investigasi Tim Advokasi untuk Demokrasi terkait penyiraman air keras terhadap Andrie Yunus oleh anggota TNI. Organisasi masyarakat sipil menilai langkah ini berpotensi melanggar UU Pers.", sentiment: "Negatif", date: "2026-04-09", sourceName: "BBC News Indonesia", sourceUrl: "https://www.bbc.com/indonesia/articles/c0mjx7l781go" },
      { title: "8 Platform Patuhi PP TUNAS, Komdigi Deadline hingga Juni 2026", content: "Menteri Komunikasi dan Digital Meutya Hafid menerbitkan Peraturan Menteri Komdigi Nomor 9 Tahun 2026 sebagai aturan pelaksana PP Nomor 17 Tahun 2025 tentang Tata Kelola Penyelenggaraan Sistem Elektronik dalam Pelindungan Anak (PP TUNAS). Regulasi ini mewajibkan platform digital mematuhi aturan perlindungan anak di ruang digital.", sentiment: "Positif", date: "2026-05-09", sourceName: "SINDOnews", sourceUrl: "https://nasional.sindonews.com/read/1702287/15/8-platform-patuhi-pp-tunas-komdigi-deadline-hingga-juni-2026-1777626345" }
    ],
    crimes: []
  },
  {
    official: {
      name: "Fadli Zon",
      currentAgency: "Kementerian Kebudayaan",
      currentPosition: "Menteri Kebudayaan Indonesia ke-4",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Fadli_Zon%2C_Menteri_Kebudayaan_Indonesia.jpg"
    },
    trackRecords: [
      { position: "Menteri Kebudayaan", agency: "Kementerian Kebudayaan", startDate: "2024-10-21", endDate: null },
      { position: "Ketua BKSAP DPR RI", agency: "Dewan Perwakilan Rakyat RI", startDate: "2019-11-04", endDate: "2024-10-21" },
      { position: "Wakil Ketua DPR RI Bidang Politik dan Keamanan", agency: "Dewan Perwakilan Rakyat RI", startDate: "2014-10-02", endDate: "2019-10-01" },
      { position: "Anggota DPR RI Dapil Jawa Barat V", agency: "Dewan Perwakilan Rakyat RI", startDate: "2014-10-01", endDate: "2024-10-21" },
      { position: "President GOPAC (Global Organization of Parliamentarians Against Corruption)", agency: "GOPAC International", startDate: "2015-10-08", endDate: "2019-10-21" },
      { position: "Anggota MPR RI", agency: "Majelis Permusyawaratan Rakyat RI", startDate: "1997", endDate: "1999" }
    ],
    news: [
      { title: "Fadli Zon Jadi Menteri Kebudayaan, Bawa Misi Penulisan Ulang Sejarah Indonesia", content: "Fadli Zon dilantik sebagai Menteri Kebudayaan pada 21 Oktober 2024. Ia merupakan sejarawan yang meraih gelar doktor Ilmu Sejarah dari Universitas Indonesia dan mendirikan Fadli Zon Library. Sebagai Menbud, ia memprakarsai proyek penulisan ulang sejarah Indonesia yang melibatkan lebih dari seratus sejarawan.", sentiment: "Netral", date: "2024-10-21", sourceName: "Detik.com", sourceUrl: "https://news.detik.com/berita/d-7762339/dpr-lantik-anggota-paw-pengganti-fadli-zon-sugiono-ada-jamal-mirdad" },
      { title: "Fadli Zon Jadi Wakil Presiden Liga Parlemen Dunia untuk Palestina", content: "Fadli Zon ditunjuk sebagai Wakil Presiden Liga Parlemen Dunia untuk Al-Quds (Palestina) dalam Konferensi Liga Parlemen Dunia ketiga di Malaysia. Indonesia dipercaya oleh parlemen 40 negara untuk mengoordinasikan kegiatan parlemen dunia terkait isu Palestina.", sentiment: "Positif", date: "2020-02-10", sourceName: "Tempo.co", sourceUrl: "https://nasional.tempo.co/read/1305486/fadli-zon-jadi-wakil-presiden-liga-parlemen-dunia-untuk-palestina" }
    ],
    crimes: []
  },
  {
    official: {
      name: "Abdul Mu'ti",
      currentAgency: "Kementerian Pendidikan Dasar dan Menengah",
      currentPosition: "Menteri Pendidikan Dasar dan Menengah Indonesia ke-30",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Menteri_pendidikan_indonesia.jpg"
    },
    trackRecords: [
      { position: "Menteri Pendidikan Dasar dan Menengah", agency: "Kementerian Pendidikan Dasar dan Menengah", startDate: "2024-10-21", endDate: null },
      { position: "Sekretaris Umum Pimpinan Pusat Muhammadiyah", agency: "Pimpinan Pusat Muhammadiyah", startDate: "2022-11-20", endDate: null },
      { position: "Guru Besar Bidang Pendidikan Agama Islam", agency: "UIN Syarif Hidayatullah Jakarta", startDate: "2020-09-02", endDate: null },
      { position: "Ketua Badan Standar Nasional Pendidikan", agency: "BSNP", startDate: "2019", endDate: "2021" },
      { position: "Ketua Badan Akreditasi Nasional Sekolah/Madrasah", agency: "BAN-S/M", startDate: "2011", endDate: "2017" },
      { position: "Dosen", agency: "IAIN Walisongo Semarang", startDate: "1993", endDate: "2013" }
    ],
    news: [
      { title: "Mendikdasmen Abdul Mu'ti: Pendekatan Deep Learning Akan Diterapkan di Kurikulum Nasional", content: "Menteri Pendidikan Dasar dan Menengah Abdul Mu'ti menegaskan bahwa pendekatan deep learning melalui tiga prinsip utama yaitu mindfulness, meaningful, dan joyful akan diterapkan dalam sistem pendidikan nasional. Ia menegaskan bahwa deep learning adalah pendekatan pembelajaran, bukan pengganti Kurikulum Merdeka yang saat ini berlaku.", sentiment: "Positif", date: "2024-12-31", sourceName: "Tempo.co", sourceUrl: "https://www.tempo.co/politik/mendikdasmen-abdul-mu-ti-pendekatan-deep-learning-akan-diterapkan-di-kurikulum-nasional-1188242" },
      { title: "Profil Abdul Mu'ti: Tokoh Muhammadiyah yang Kini Pimpin Kemendikdasmen", content: "Abdul Mu'ti, Sekretaris Umum PP Muhammadiyah dan Guru Besar UIN Jakarta, resmi dilantik sebagai Menteri Pendidikan Dasar dan Menengah. Sebelumnya ia pernah menolak tawaran menjadi Wakil Menteri Pendidikan pada 2020 dan dikenal sebagai tokoh muslim moderat yang aktif menyuarakan perdamaian dan pluralisme.", sentiment: "Positif", date: "2024-10-21", sourceName: "Detik.com", sourceUrl: "https://news.detik.com/berita/d-6746463/abdul-muti-jelaskan-soal-krismuha-simpatisan-muhammadiyah-beragama-kristen" }
    ],
    crimes: []
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

    console.log("Memulai proses seeding data asli 15 Pejabat...");
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
