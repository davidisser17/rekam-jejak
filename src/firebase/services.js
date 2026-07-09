import { collection, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "./config";

// --- Dummy Data Fallbacks ---
const dummyOfficials = [
  {
    id: "1",
    name: "Budi Santoso",
    currentAgency: "Kementerian Keuangan",
    currentPosition: "Direktur Jenderal Pajak",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
  },
  {
    id: "2",
    name: "Siti Aminah",
    currentAgency: "Kementerian Kesehatan",
    currentPosition: "Menteri Kesehatan",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  },
  {
    id: "3",
    name: "Ahmad Yani",
    currentAgency: "Kementerian Pendidikan",
    currentPosition: "Direktur Pendidikan Dasar",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
  },
  {
    id: "4",
    name: "Sugiono",
    currentAgency: "Kementerian Luar Negeri",
    currentPosition: "Menteri Luar Negeri Indonesia ke-18",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Menteri_Luar_Negeri_Sugiono.jpg"
  },
  {
    id: "5",
    name: "Sjafrie Sjamsoeddin",
    currentAgency: "Kementerian Pertahanan",
    currentPosition: "Menteri Pertahanan Indonesia ke-27",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Sjafrie_Sjamsoeddin%2C_Menteri_Pertahanan_Indonesia_%282025%29.png"
  },
  {
    id: "6",
    name: "Meutya Hafid",
    currentAgency: "Kementerian Komunikasi dan Digital",
    currentPosition: "Menteri Komunikasi dan Digital Indonesia ke-8",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Menteri_Komunikasi_dan_Digital_Indonesia_Meutya_Viada_Hafid.jpg"
  },
  {
    id: "7",
    name: "Fadli Zon",
    currentAgency: "Kementerian Kebudayaan",
    currentPosition: "Menteri Kebudayaan Indonesia ke-4",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Fadli_Zon%2C_Menteri_Kebudayaan_Indonesia.jpg"
  },
  {
    id: "8",
    name: "Abdul Mu'ti",
    currentAgency: "Kementerian Pendidikan Dasar dan Menengah",
    currentPosition: "Menteri Pendidikan Dasar dan Menengah Indonesia ke-30",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Menteri_pendidikan_indonesia.jpg"
  }
];

const dummyTrackRecords = [
  { id: "t1", officialId: "1", agency: "Kementerian Keuangan", position: "Direktur Jenderal Pajak", startDate: "2022-01-10", endDate: null },
  { id: "t2", officialId: "1", agency: "Kementerian Keuangan", position: "Direktur Penerimaan Negara", startDate: "2018-05-01", endDate: "2022-01-09" },
  { id: "t3", officialId: "2", agency: "Kementerian Kesehatan", position: "Menteri Kesehatan", startDate: "2024-10-20", endDate: null },
  { id: "t4", officialId: "4", agency: "Partai Gerakan Indonesia Raya", position: "Sekretaris Jenderal Partai Gerindra", startDate: "2025-08-01", endDate: null },
  { id: "t5", officialId: "4", agency: "Kementerian Luar Negeri", position: "Menteri Luar Negeri", startDate: "2024-10-21", endDate: null },
  { id: "t6", officialId: "4", agency: "Dewan Perwakilan Rakyat RI", position: "Wakil Ketua Komisi I DPR RI", startDate: "2019-10-01", endDate: "2024-10-21" },
  { id: "t7", officialId: "4", agency: "Dewan Perwakilan Rakyat RI", position: "Anggota DPR RI Dapil Jawa Tengah I", startDate: "2019-10-01", endDate: "2024-10-21" },
  { id: "t8", officialId: "4", agency: "TNI Angkatan Darat", position: "Letnan Satu Infanteri Kopassus", startDate: "2002", endDate: "2004" },
  { id: "t9", officialId: "5", agency: "Kementerian Pertahanan", position: "Menteri Pertahanan", startDate: "2024-10-21", endDate: null },
  { id: "t10", officialId: "5", agency: "Kementerian Pertahanan", position: "Wakil Menteri Pertahanan", startDate: "2010-01-06", endDate: "2014-10-20" },
  { id: "t11", officialId: "5", agency: "Kementerian Pertahanan", position: "Sekretaris Jenderal Kementerian Pertahanan", startDate: "2005-04-15", endDate: "2010-05-21" },
  { id: "t12", officialId: "5", agency: "Markas Besar TNI", position: "Kepala Pusat Penerangan TNI", startDate: "2002", endDate: "2005" },
  { id: "t13", officialId: "5", agency: "TNI Angkatan Darat", position: "Panglima Kodam Jaya", startDate: "1997", endDate: "1998" },
  { id: "t14", officialId: "6", agency: "Kementerian Komunikasi dan Digital", position: "Menteri Komunikasi dan Digital", startDate: "2024-10-21", endDate: null },
  { id: "t15", officialId: "6", agency: "Dewan Perwakilan Rakyat RI", position: "Ketua Komisi I DPR RI", startDate: "2019-10-01", endDate: "2024-10-21" },
  { id: "t16", officialId: "6", agency: "Dewan Perwakilan Rakyat RI", position: "Anggota DPR RI Dapil Sumatera Utara I", startDate: "2010-08-30", endDate: "2024-10-21" },
  { id: "t17", officialId: "6", agency: "Metro TV", position: "Wartawan dan Presenter", startDate: "2005", endDate: "2010" },
  { id: "t18", officialId: "7", agency: "Kementerian Kebudayaan", position: "Menteri Kebudayaan", startDate: "2024-10-21", endDate: null },
  { id: "t19", officialId: "7", agency: "Dewan Perwakilan Rakyat RI", position: "Ketua BKSAP DPR RI", startDate: "2019-11-04", endDate: "2024-10-21" },
  { id: "t20", officialId: "7", agency: "Dewan Perwakilan Rakyat RI", position: "Wakil Ketua DPR RI Bidang Politik dan Keamanan", startDate: "2014-10-02", endDate: "2019-10-01" },
  { id: "t21", officialId: "7", agency: "Dewan Perwakilan Rakyat RI", position: "Anggota DPR RI Dapil Jawa Barat V", startDate: "2014-10-01", endDate: "2024-10-21" },
  { id: "t22", officialId: "7", agency: "GOPAC International", position: "President GOPAC (Global Organization of Parliamentarians Against Corruption)", startDate: "2015-10-08", endDate: "2019-10-21" },
  { id: "t23", officialId: "7", agency: "Majelis Permusyawaratan Rakyat RI", position: "Anggota MPR RI", startDate: "1997", endDate: "1999" },
  { id: "t24", officialId: "8", agency: "Kementerian Pendidikan Dasar dan Menengah", position: "Menteri Pendidikan Dasar dan Menengah", startDate: "2024-10-21", endDate: null },
  { id: "t25", officialId: "8", agency: "Pimpinan Pusat Muhammadiyah", position: "Sekretaris Umum Pimpinan Pusat Muhammadiyah", startDate: "2022-11-20", endDate: null },
  { id: "t26", officialId: "8", agency: "UIN Syarif Hidayatullah Jakarta", position: "Guru Besar Bidang Pendidikan Agama Islam", startDate: "2020-09-02", endDate: null },
  { id: "t27", officialId: "8", agency: "BSNP", position: "Ketua Badan Standar Nasional Pendidikan", startDate: "2019", endDate: "2021" },
  { id: "t28", officialId: "8", agency: "BAN-S/M", position: "Ketua Badan Akreditasi Nasional Sekolah/Madrasah", startDate: "2011", endDate: "2017" },
  { id: "t29", officialId: "8", agency: "IAIN Walisongo Semarang", position: "Dosen", startDate: "1993", endDate: "2013" }
];

const dummyCriminalRecords = [
  { id: "c1", officialId: "1", type: "Tindak Pidana Korupsi", description: "Terlibat dalam kasus gratifikasi proyek infrastruktur.", status: "Terpidana", date: "2020-08-15", sourceName: "KPK.go.id", sourceUrl: "#" },
  { id: "c2", officialId: "3", type: "Penyalahgunaan Wewenang", description: "Penyalahgunaan dana operasional instansi.", status: "Tersangka", date: "2023-11-05", sourceName: "Portal Hukum", sourceUrl: "#" }
];

const dummyNews = [
  { id: "n1", officialId: "1", title: "Target Penerimaan Pajak Tercapai di Kuartal I", content: "Penerimaan pajak negara mencapai target lebih awal berkat sistem baru yang diterapkan.", sentiment: "Positif", date: "2025-04-15", sourceName: "Berita Nasional", sourceUrl: "#" },
  { id: "n2", officialId: "1", title: "Keluhan Masyarakat Terkait Sistem E-Filing", content: "Beberapa masyarakat mengeluhkan sistem e-filing yang sering down pada akhir bulan.", sentiment: "Negatif", date: "2025-03-20", sourceName: "Kabar Rakyat", sourceUrl: "#" },
  { id: "n3", officialId: "2", title: "Peresmian Rumah Sakit Baru di Daerah Terpencil", content: "Menteri meresmikan fasilitas kesehatan baru untuk menjangkau masyarakat pelosok.", sentiment: "Positif", date: "2025-05-10", sourceName: "Medis Update", sourceUrl: "#" },
  { id: "n4", officialId: "4", title: "Profil Sugiono, Anak Ideologis Prabowo yang Digadang-gadang Jadi Menlu", content: "Sugiono, kader awal Partai Gerindra sejak 2008 dan lulusan Norwich University Amerika Serikat, digadang menjadi Menteri Luar Negeri. Sebelumnya ia menjabat Wakil Ketua Komisi I DPR RI yang membidangi pertahanan, luar negeri, dan intelijen, serta merupakan Direktur Kampanye Badan Pemenangan Nasional Prabowo-Sandiaga pada Pemilu 2019.", sentiment: "Positif", date: "2024-09-14", sourceName: "Tempo.co", sourceUrl: "https://nasional.tempo.co/read/1916225/profil-sugiono-anak-ideologis-prabowo-yang-digadang-gadang-jadi-menlu" },
  { id: "n5", officialId: "4", title: "Sosok Menteri Luar Negeri Sugiono, Alumnus Berprestasi SMA Taruna Nusantara", content: "Sugiono resmi dilantik menjadi Menteri Luar Negeri ke-18 pada Kabinet Merah Putih. Ia merupakan alumni SMA Taruna Nusantara angkatan V bersama Agus Harimurti Yudhoyono dan memiliki latar belakang militer sebagai mantan perwira Kopassus serta pendidikan di Norwich University bidang Teknik Komputer.", sentiment: "Positif", date: "2024-10-26", sourceName: "Kompas.com", sourceUrl: "https://www.kompas.com/edu/read/2024/10/26/135256871/sosok-menteri-luar-negeri-sugiono-alumnus-berprestasi-sma-taruna-nusantara" },
  { id: "n6", officialId: "5", title: "Sjafrie Sjamsoeddin, Ajudan Soeharto Kini Gantikan Prabowo di Kemenhan", content: "Sjafrie Sjamsoeddin resmi dilantik sebagai Menteri Pertahanan pada 21 Oktober 2024, menggantikan Prabowo Subianto. Ia merupakan teman seangkatan Prabowo di Akmil 1974 dan mantan ajudan Presiden Soeharto. Sjafrie sebelumnya menjabat sebagai Wakil Menteri Pertahanan periode 2010-2014.", sentiment: "Netral", date: "2024-10-21", sourceName: "CNN Indonesia", sourceUrl: "https://www.cnnindonesia.com/nasional/20241021110721-32-1157860/sjafrie-sjamsoeddin-ajudan-soeharto-kini-gantikan-prabowo-di-kemenhan" },
  { id: "n7", officialId: "5", title: "Profil dan Kekayaan Menhan Sjafrie Sjamsoeddin di Kabinet Prabowo-Gibran", content: "Sjafrie Sjamsoeddin lahir di Makassar pada 30 Oktober 1952 dan merupakan lulusan AKABRI 1974. Ia memiliki karier militer panjang di Kopassus, pernah menjabat Pangdam Jaya pada 1997-1998, Sekjen Kemhan 2005-2010, dan Wamenhan 2010-2014 sebelum akhirnya dipercaya sebagai Menteri Pertahanan.", sentiment: "Netral", date: "2024-10-20", sourceName: "Kompas.com", sourceUrl: "https://nasional.kompas.com/read/2024/10/20/22093591/profil-dan-kekayaan-menhan-sjafrie-sjamsoeddin-di-kabinet-prabowo-gibran" },
  { id: "n8", officialId: "6", title: "Komdigi blokir konten Magdalene, serupa pembredelan era Orde Baru", content: "Kementerian Komunikasi dan Digital di bawah Meutya Hafid menuai kritik setelah melakukan pemblokiran terhadap konten Magdalene mengenai hasil investigasi Tim Advokasi untuk Demokrasi terkait penyiraman air keras terhadap Andrie Yunus oleh anggota TNI. Organisasi masyarakat sipil menilai langkah ini berpotensi melanggar UU Pers.", sentiment: "Negatif", date: "2026-04-09", sourceName: "BBC News Indonesia", sourceUrl: "https://www.bbc.com/indonesia/articles/c0mjx7l781go" },
  { id: "n9", officialId: "6", title: "8 Platform Patuhi PP TUNAS, Komdigi Deadline hingga Juni 2026", content: "Menteri Komunikasi dan Digital Meutya Hafid menerbitkan Peraturan Menteri Komdigi Nomor 9 Tahun 2026 sebagai aturan pelaksana PP Nomor 17 Tahun 2025 tentang Tata Kelola Penyelenggaraan Sistem Elektronik dalam Pelindungan Anak (PP TUNAS). Regulasi ini mewajibkan platform digital mematuhi aturan perlindungan anak di ruang digital.", sentiment: "Positif", date: "2026-05-09", sourceName: "SINDOnews", sourceUrl: "https://nasional.sindonews.com/read/1702287/15/8-platform-patuhi-pp-tunas-komdigi-deadline-hingga-juni-2026-1777626345" },
  { id: "n10", officialId: "7", title: "Fadli Zon Jadi Menteri Kebudayaan, Bawa Misi Penulisan Ulang Sejarah Indonesia", content: "Fadli Zon dilantik sebagai Menteri Kebudayaan pada 21 Oktober 2024. Ia merupakan sejarawan yang meraih gelar doktor Ilmu Sejarah dari Universitas Indonesia dan mendirikan Fadli Zon Library. Sebagai Menbud, ia memprakarsai proyek penulisan ulang sejarah Indonesia yang melibatkan lebih dari seratus sejarawan.", sentiment: "Netral", date: "2024-10-21", sourceName: "Detik.com", sourceUrl: "https://news.detik.com/berita/d-7762339/dpr-lantik-anggota-paw-pengganti-fadli-zon-sugiono-ada-jamal-mirdad" },
  { id: "n11", officialId: "7", title: "Fadli Zon Jadi Wakil Presiden Liga Parlemen Dunia untuk Palestina", content: "Fadli Zon ditunjuk sebagai Wakil Presiden Liga Parlemen Dunia untuk Al-Quds (Palestina) dalam Konferensi Liga Parlemen Dunia ketiga di Malaysia. Indonesia dipercaya oleh parlemen 40 negara untuk mengoordinasikan kegiatan parlemen dunia terkait isu Palestina.", sentiment: "Positif", date: "2020-02-10", sourceName: "Tempo.co", sourceUrl: "https://nasional.tempo.co/read/1305486/fadli-zon-jadi-wakil-presiden-liga-parlemen-dunia-untuk-palestina" },
  { id: "n12", officialId: "8", title: "Mendikdasmen Abdul Mu'ti: Pendekatan Deep Learning Akan Diterapkan di Kurikulum Nasional", content: "Menteri Pendidikan Dasar dan Menengah Abdul Mu'ti menegaskan bahwa pendekatan deep learning melalui tiga prinsip utama yaitu mindfulness, meaningful, dan joyful akan diterapkan dalam sistem pendidikan nasional. Ia menegaskan bahwa deep learning adalah pendekatan pembelajaran, bukan pengganti Kurikulum Merdeka yang saat ini berlaku.", sentiment: "Positif", date: "2024-12-31", sourceName: "Tempo.co", sourceUrl: "https://www.tempo.co/politik/mendikdasmen-abdul-mu-ti-pendekatan-deep-learning-akan-diterapkan-di-kurikulum-nasional-1188242" },
  { id: "n13", officialId: "8", title: "Profil Abdul Mu'ti: Tokoh Muhammadiyah yang Kini Pimpin Kemendikdasmen", content: "Abdul Mu'ti, Sekretaris Umum PP Muhammadiyah dan Guru Besar UIN Jakarta, resmi dilantik sebagai Menteri Pendidikan Dasar dan Menengah. Sebelumnya ia pernah menolak tawaran menjadi Wakil Menteri Pendidikan pada 2020 dan dikenal sebagai tokoh muslim moderat yang aktif menyuarakan perdamaian dan pluralisme.", sentiment: "Positif", date: "2024-10-21", sourceName: "Detik.com", sourceUrl: "https://news.detik.com/berita/d-6746463/abdul-muti-jelaskan-soal-krismuha-simpatisan-muhammadiyah-beragama-kristen" }
];

const isFirebaseConfigured = () => {
  return db !== undefined;
};

// --- API Functions ---

export const getOfficials = async (searchQuery = "", ministryFilter = "") => {
  if (!isFirebaseConfigured()) {
    let results = dummyOfficials.filter(o => 
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.currentAgency.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (ministryFilter) {
      results = results.filter(o =>
        o.currentAgency.toLowerCase().includes(ministryFilter.toLowerCase())
      );
    }
    return results;
  }

  try {
    const officialsCol = collection(db, 'officials');
    const snapshot = await getDocs(officialsCol);
    let officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (searchQuery) {
      officials = officials.filter(o => 
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        o.currentAgency.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (ministryFilter) {
      officials = officials.filter(o =>
        o.currentAgency.toLowerCase().includes(ministryFilter.toLowerCase())
      );
    }
    return officials;
  } catch (error) {
    console.error("Error fetching officials:", error);
    return [];
  }
};

export const getMinistries = async () => {
  if (!isFirebaseConfigured()) {
    return [...new Set(dummyOfficials.map(o => o.currentAgency))];
  }

  try {
    const officialsCol = collection(db, 'officials');
    const snapshot = await getDocs(officialsCol);
    const officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [...new Set(officials.map(o => o.currentAgency))];
  } catch (error) {
    console.error("Error fetching ministries:", error);
    return [];
  }
};

export const getOfficialById = async (id) => {
  if (!isFirebaseConfigured()) {
    return dummyOfficials.find(o => o.id === id) || null;
  }

  try {
    const docRef = doc(db, "officials", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching official:", error);
    return null;
  }
};

export const getTrackRecordsByOfficialId = async (officialId) => {
  if (!isFirebaseConfigured()) {
    return dummyTrackRecords
      .filter(t => t.officialId === officialId)
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  }

  try {
    const q = query(
      collection(db, "track_records"), 
      where("officialId", "==", officialId),
      // orderBy("startDate", "desc") // requires index
    );
    const snapshot = await getDocs(q);
    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort client side to avoid needing index immediately
    return records.sort((a, b) => {
      const dateA = a.startDate?.toDate ? a.startDate.toDate() : new Date(a.startDate);
      const dateB = b.startDate?.toDate ? b.startDate.toDate() : new Date(b.startDate);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching track records:", error);
    return [];
  }
};

export const getNewsByOfficialId = async (officialId) => {
  if (!isFirebaseConfigured()) {
    return dummyNews
      .filter(n => n.officialId === officialId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  try {
    const q = query(
      collection(db, "news"), 
      where("officialId", "==", officialId)
    );
    const snapshot = await getDocs(q);
    const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return news.sort((a, b) => {
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const getCriminalRecordsByOfficialId = async (officialId) => {
  if (!isFirebaseConfigured()) {
    return dummyCriminalRecords
      .filter(c => c.officialId === officialId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  try {
    const q = query(
      collection(db, "criminal_records"), 
      where("officialId", "==", officialId)
    );
    const snapshot = await getDocs(q);
    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return records.sort((a, b) => {
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching criminal records:", error);
    return [];
  }
};
