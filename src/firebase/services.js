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
  }
];

const dummyTrackRecords = [
  { id: "t1", officialId: "1", agency: "Kementerian Keuangan", position: "Direktur Jenderal Pajak", startDate: "2022-01-10", endDate: null },
  { id: "t2", officialId: "1", agency: "Kementerian Keuangan", position: "Direktur Penerimaan Negara", startDate: "2018-05-01", endDate: "2022-01-09" },
  { id: "t3", officialId: "2", agency: "Kementerian Kesehatan", position: "Menteri Kesehatan", startDate: "2024-10-20", endDate: null },
];

const dummyCriminalRecords = [
  { id: "c1", officialId: "1", type: "Tindak Pidana Korupsi", description: "Terlibat dalam kasus gratifikasi proyek infrastruktur.", status: "Terpidana", date: "2020-08-15", sourceName: "KPK.go.id", sourceUrl: "#" },
  { id: "c2", officialId: "3", type: "Penyalahgunaan Wewenang", description: "Penyalahgunaan dana operasional instansi.", status: "Tersangka", date: "2023-11-05", sourceName: "Portal Hukum", sourceUrl: "#" }
];

const dummyNews = [
  { id: "n1", officialId: "1", title: "Target Penerimaan Pajak Tercapai di Kuartal I", content: "Penerimaan pajak negara mencapai target lebih awal berkat sistem baru yang diterapkan.", sentiment: "Positif", date: "2025-04-15", sourceName: "Berita Nasional", sourceUrl: "#" },
  { id: "n2", officialId: "1", title: "Keluhan Masyarakat Terkait Sistem E-Filing", content: "Beberapa masyarakat mengeluhkan sistem e-filing yang sering down pada akhir bulan.", sentiment: "Negatif", date: "2025-03-20", sourceName: "Kabar Rakyat", sourceUrl: "#" },
  { id: "n3", officialId: "2", title: "Peresmian Rumah Sakit Baru di Daerah Terpencil", content: "Menteri meresmikan fasilitas kesehatan baru untuk menjangkau masyarakat pelosok.", sentiment: "Positif", date: "2025-05-10", sourceName: "Medis Update", sourceUrl: "#" }
];

const isFirebaseConfigured = () => {
  return db !== undefined;
};

// --- API Functions ---

export const getOfficials = async (searchQuery = "") => {
  if (!isFirebaseConfigured()) {
    return dummyOfficials.filter(o => 
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.currentAgency.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
    return officials;
  } catch (error) {
    console.error("Error fetching officials:", error);
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
