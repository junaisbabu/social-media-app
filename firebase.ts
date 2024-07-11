// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
