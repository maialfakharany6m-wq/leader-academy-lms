// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlGMyk7FD9XmVLDMRIM1hnHmd-XMrMXmA",
  authDomain: "lms-platform-a1973.firebaseapp.com",
  projectId: "lms-platform-a1973",
  storageBucket: "lms-platform-a1973.firebasestorage.app",
  messagingSenderId: "717208730166",
  appId: "1:717208730166:web:a08c56b94d92a0c5403697",
  measurementId: "G-J6MJWXSVQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);