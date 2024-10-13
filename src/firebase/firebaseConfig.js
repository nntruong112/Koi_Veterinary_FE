import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASN-xv5ShqNhBxKBhIBdM7Jmy8V5bL-jE",
  authDomain: "koihealthservicecenter.firebaseapp.com",
  projectId: "koihealthservicecenter",
  storageBucket: "koihealthservicecenter.appspot.com",
  messagingSenderId: "606445354071",
  appId: "1:606445354071:web:3d2584ec9e1a2f652ef712",
  measurementId: "G-9Z433CJ15R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
