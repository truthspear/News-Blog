// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX-PMcRE-9X0UMADzv4qYQH1dPfgIn7GE",
  authDomain: "truth-auth.firebaseapp.com",
  projectId: "truth-auth",
  storageBucket: "truth-auth.firebasestorage.app",
  messagingSenderId: "920061074208",
  appId: "1:920061074208:web:288974db052af36b3f5545",
};


// Initialize Firebase
const App = initializeApp(firebaseConfig);
export const auth = getAuth();
export default App;
