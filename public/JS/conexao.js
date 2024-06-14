// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUhgYAPLGub-qSC7DciQCO2WndTsaUueA",
  authDomain: "padaria-7f549.firebaseapp.com",
  databaseURL: "https://padaria-7f549-default-rtdb.firebaseio.com",
  projectId: "padaria-7f549",
  storageBucket: "padaria-7f549.appspot.com",
  messagingSenderId: "23223584305",
  appId: "1:23223584305:web:1a19a35f6a7c4244d73710",
  measurementId: "G-7YGBNCEH4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Export the auth object
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut };
