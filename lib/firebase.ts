// lib/firebase.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD8WysCi7pKw_Z5RbZjQQNVBfZ-Ya78luA",
  authDomain: "codepro-c7d95.firebaseapp.com",
  projectId: "codepro-c7d95",
  storageBucket: "codepro-c7d95.firebasestorage.app",
  messagingSenderId: "945224552419",
  appId: "1:945224552419:web:05703142edc6f636f81ad6"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
