import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyB_3OhdAHyzt0jNmiqxUXnaLjsXPGVu5bk",
//   authDomain: "bo-tai.firebaseapp.com",
//   projectId: "bo-tai",
//   storageBucket: "bo-tai.firebasestorage.app",
//   messagingSenderId: "184202658004",
//   appId: "1:184202658004:web:b783e2834c9a12e0e23b41"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBEGOee5V-A1JPEDFM0qDHvZ35BzSi36j8",
  authDomain: "bo-tai-5d1e7.firebaseapp.com",
  projectId: "bo-tai-5d1e7",
  storageBucket: "bo-tai-5d1e7.firebasestorage.app",
  messagingSenderId: "588688238045",
  appId: "1:588688238045:web:3b6e62db2320e33db30234",
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);