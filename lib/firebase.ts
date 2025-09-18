import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOVZRv8_cUtcaknXX3M_QIPiw9Uw0xQcI",
  authDomain: "egitimkocu-1c3bc.firebaseapp.com",
  projectId: "egitimkocu-1c3bc",
  storageBucket: "egitimkocu-1c3bc.firebasestorage.app",
  messagingSenderId: "1041719331261",
  appId: "1:1041719331261:web:dfb48d830cfeda48cd2ad4",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
