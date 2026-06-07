import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0AlqpZxhTrhgqjcIJFNAzMb2whhDwqJ8",
  authDomain: "aliwebdigital-a61fa.firebaseapp.com",
  projectId: "aliwebdigital-a61fa",
  storageBucket: "aliwebdigital-a61fa.firebasestorage.app",
  messagingSenderId: "616514346114",
  appId: "1:616514346114:web:0538ea2d9e565dbde7e89b",
  measurementId: "G-952NEMRN3C",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
