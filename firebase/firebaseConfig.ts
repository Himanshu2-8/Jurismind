// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUCvrz8FkQURnByJYaasiZr_mX78AljKw",
  authDomain: "genaiexchange-67e3a.firebaseapp.com",
  projectId: "genaiexchange-67e3a",
  storageBucket: "genaiexchange-67e3a.firebasestorage.app",
  messagingSenderId: "256390296939",
  appId: "1:256390296939:web:794c6df406469c7f1b882e",
  measurementId: "G-Y8R8GKCYFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);