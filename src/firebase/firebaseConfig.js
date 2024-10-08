// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Nếu bạn sử dụng Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app); // Khởi tạo Firestore

export { app, db };
