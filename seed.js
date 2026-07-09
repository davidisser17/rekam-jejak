import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const officials = [
  {
    name: "Budi Santoso",
    currentAgency: "Kementerian Keuangan",
    currentPosition: "Direktur Jenderal Pajak",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
  },
  {
    name: "Siti Aminah",
    currentAgency: "Kementerian Kesehatan",
    currentPosition: "Menteri Kesehatan",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  }
];

async function seed() {
  try {
    console.log("Seeding officials...");
    for (const official of officials) {
      const docRef = await addDoc(collection(db, "officials"), official);
      console.log(`Added official ${official.name} with ID: ${docRef.id}`);

      // Add track records
      await addDoc(collection(db, "track_records"), {
        officialId: docRef.id,
        agency: official.currentAgency,
        position: official.currentPosition,
        startDate: new Date("2022-01-01"),
        endDate: null
      });

      // Add dummy news
      await addDoc(collection(db, "news"), {
        officialId: docRef.id,
        title: `Berita tentang ${official.name}`,
        content: `Konten berita mengenai aktivitas ${official.name} di ${official.currentAgency}`,
        sentiment: "Positif",
        date: new Date(),
        sourceName: "Berita Online",
        sourceUrl: "https://google.com"
      });

      // Add dummy criminal record if Budi
      if (official.name === "Budi Santoso") {
        await addDoc(collection(db, "criminal_records"), {
          officialId: docRef.id,
          type: "Tindak Pidana Korupsi",
          description: "Terlibat dalam kasus gratifikasi proyek infrastruktur (Contoh Data).",
          status: "Terpidana",
          date: new Date("2020-08-15"),
          sourceName: "KPK.go.id",
          sourceUrl: "https://kpk.go.id"
        });
      }
    }
    console.log("Seeding complete!");
    process.exit(0);
  } catch (e) {
    console.error("Error seeding data:", e);
    process.exit(1);
  }
}

seed();
