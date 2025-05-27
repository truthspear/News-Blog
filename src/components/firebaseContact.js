// firebaseContact.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config for contact form (truth-contact project)
const firebaseConfig = {
  apiKey: "AIzaSyBEeywrvhxqp704dAik-Zm67dcqBDBlxUc",
  authDomain: "truth-contact.firebaseapp.com",
  projectId: "truth-contact",
  storageBucket: "truth-contact.firebasestorage.app",
  messagingSenderId: "163736578778",
  appId: "1:163736578778:web:ec849d2080f68ddf9f53e3",
};

// Initialize Firebase App with a custom name to avoid conflict
const app = initializeApp(firebaseConfig, "contactApp");

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore DB instance
export { db };
