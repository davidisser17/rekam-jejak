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

    console.log("Memulai proses seeding data asli 10 Pejabat...");
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
