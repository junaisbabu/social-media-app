// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const analytics = getAnalytics(app);

const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, db };
