import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzEnP7nUoKNRhTEXSOommmLrq2jjk2EfA",
  authDomain: "social-media-app-61942.firebaseapp.com",
  projectId: "social-media-app-61942",
  storageBucket: "social-media-app-61942.appspot.com",
  messagingSenderId: "541606342388",
  appId: "1:541606342388:web:17e2351f27af60770db8a1",
  measurementId: "G-ETEPV7NJEV",
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export const storage = getStorage(app);

export { auth, googleAuthProvider, db };
