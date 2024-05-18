// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxeAcNHTgGTTCB9XauClKrpi0SYQv4Z5c",
  authDomain: "screensavvy-8355d.firebaseapp.com",
  projectId: "screensavvy-8355d",
  storageBucket: "screensavvy-8355d.appspot.com",
  messagingSenderId: "97885224617",
  appId: "1:97885224617:web:b9a5c68389b8dcffad73b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db, 'movies');
export const reviewsRef = collection(db, 'reviews');
 
export default app;