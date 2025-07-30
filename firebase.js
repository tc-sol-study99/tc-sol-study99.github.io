// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";

// ★ここをあなたの Firebase 設定で書き換え
const firebaseConfig = {
  apiKey: "AIzaSyB23tFm4H21IQkxwNIZX6WuVu8jLMMR3vQ",
  authDomain: "intern2025-f7207.firebaseapp.com",
  projectId: "intern2025-f7207",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged, signInWithEmailAndPassword, signOut };
