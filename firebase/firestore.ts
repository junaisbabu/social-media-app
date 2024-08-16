import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

class FirestoreService {
  addDoc = async <T extends { [key: string]: any }>(col: string, data: T) => {
    const collectionRef = collection(db, col);
    return await addDoc(collectionRef, data); // return: docRef
  };

  getDocRef = (col: string, docId: string) => {
    return doc(collection(db, col), docId); // return: docRef
  };

  getCollectionRef = (col: string) => {
    return collection(db, col); // return: collectionRef
  };

  getDoc = async (col: string, docId: string) => {
    const docRef = this.getDocRef(col, docId);
    return await getDoc(docRef); // return: docSnap
  };

  getDocs = async (col: string) => {
    return await getDocs(collection(db, col)); // return: querySnapshot
  };

  setDoc = async <T extends { [key: string]: any }>(
    col: string,
    docId: string,
    data: T
  ) => {
    const docRef = this.getDocRef(col, docId);
    return await setDoc(docRef, data);
  };

  updateDoc = async <T extends { [key: string]: any }>(
    col: string,
    docId: string,
    data: T
  ) => {
    const docRef = this.getDocRef(col, docId);
    return await updateDoc(docRef, data);
  };
}

export const firestoreService = new FirestoreService();
