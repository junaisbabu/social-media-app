import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

class FirestoreService {
  getDoc = async (col: string, docId: string) => {
    try {
      const docRef = doc(db, col, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
    return null;
  };

  getDocs = async (col: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, col));
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (err) {
      console.error("Error:", err);
    }
    return [];
  };
}

export const firestoreService = new FirestoreService();
