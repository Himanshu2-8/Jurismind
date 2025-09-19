// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJsoCreLMOX0K4H9u3WGmT4KV5h_bmm7E",
  authDomain: "genaiexchangev2.firebaseapp.com",
  projectId: "genaiexchangev2",
  storageBucket: "genaiexchangev2.firebasestorage.app",
  messagingSenderId: "108675308709",
  appId: "1:108675308709:web:270e53d77eb26ff28e814c",
  measurementId: "G-QLMTB2QPBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const { getAnalytics } = await import("firebase/analytics");
    return getAnalytics(app);
  }
  return null;
};