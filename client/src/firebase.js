// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5fI6zo08Xe4vD5-cLdVHnSbNqP2ohNFI",
  authDomain: "saige-f81ba.firebaseapp.com",
  projectId: "saige-f81ba",
  storageBucket: "saige-f81ba.appspot.com",
  messagingSenderId: "376035199462",
  appId: "1:376035199462:web:4286b41fdbb61a7400ae27",
  measurementId: "G-W0F6P2SYM1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
