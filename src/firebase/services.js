import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "./config";

// --- API Functions ---

export const getOfficials = async (searchQuery = "", ministryFilter = []) => {
  const selectedMinistries = Array.isArray(ministryFilter)
    ? ministryFilter
    : ministryFilter ? [ministryFilter] : [];

  const matchesFilters = (official) => (
    selectedMinistries.length === 0 || selectedMinistries.includes(official.currentAgency)
  );

  const officialsCol = collection(db, 'officials');
  const snapshot = await getDocs(officialsCol);
  let officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (searchQuery) {
    officials = officials.filter(o =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.currentAgency.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (selectedMinistries.length > 0) {
    officials = officials.filter(matchesFilters);
  }
  return officials;
};

export const getMinistries = async () => {
  const officialsCol = collection(db, 'officials');
  const snapshot = await getDocs(officialsCol);
  const officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return [...new Set(officials.map(o => o.currentAgency))].sort();
};

export const getHotFigures = async () => {
  const officialsCol = collection(db, 'officials');
  const snapshot = await getDocs(officialsCol);
  const officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return officials.filter(o => o.isHotFigure === true);
};

export const getOfficialById = async (id) => {
  const docRef = doc(db, "officials", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const getTrackRecordsByOfficialId = async (officialId) => {
  const q = query(
    collection(db, "track_records"),
    where("officialId", "==", officialId),
  );
  const snapshot = await getDocs(q);
  const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return records.sort((a, b) => {
    const dateA = a.startDate?.toDate ? a.startDate.toDate() : new Date(a.startDate);
    const dateB = b.startDate?.toDate ? b.startDate.toDate() : new Date(b.startDate);
    return dateB - dateA;
  });
};

export const getNewsByOfficialId = async (officialId) => {
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
};

export const getCriminalRecordsByOfficialId = async (officialId) => {
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
};
