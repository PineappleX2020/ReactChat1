// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-fa12c.firebaseapp.com",
  projectId: "reactchat-fa12c",
  storageBucket: "reactchat-fa12c.appspot.com",
  messagingSenderId: "776163657973",
  appId: "1:776163657973:web:e1cf6e12e997ac466c9dbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

