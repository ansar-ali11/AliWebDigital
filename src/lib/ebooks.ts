import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export async function getEbooks() {
  const snapshot = await getDocs(
    collection(db, "ebooks")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}