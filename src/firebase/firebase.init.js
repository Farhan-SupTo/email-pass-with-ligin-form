// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxr9ItWARevljHiYIRA7Rd1_j9WKVIy7Q",
  authDomain: "email-password-auth-12bb2.firebaseapp.com",
  projectId: "email-password-auth-12bb2",
  storageBucket: "email-password-auth-12bb2.appspot.com",
  messagingSenderId: "887250889417",
  appId: "1:887250889417:web:caf208ebe27cf8ef2efb18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app