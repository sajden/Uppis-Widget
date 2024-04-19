// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP6An4NorfM6D93IhozF6BXdBVF0b8BQ0",
  authDomain: "uppis-908bd.firebaseapp.com",
  projectId: "uppis-908bd",
  storageBucket: "uppis-908bd.appspot.com",
  messagingSenderId: "789849971653",
  appId: "1:789849971653:web:3112f81aa6e644d4adc9ac",
  measurementId: "G-S49D9M7T72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firestore, auth, storage}; // Export needed Firebase services