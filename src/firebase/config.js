import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your actual Firebase configuration
// You can get this from your Firebase Console > Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyCOrQEEqHmFD4p7QmZJNqbOi7X_z2alIfw",
  authDomain: "database-pejabat.firebaseapp.com",
  projectId: "database-pejabat",
  storageBucket: "database-pejabat.firebasestorage.app",
  messagingSenderId: "935762546326",
  appId: "1:935762546326:web:8d0becc2d89b4cdac07cb7"
};

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase is not fully configured yet. App will use dummy data for now.");
}

export { db };
