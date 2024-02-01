// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqpl7e7pK2U6h3ogY1W_0mmKJbd0yYJLw",
  authDomain: "backend-24632.firebaseapp.com",
  projectId: "backend-24632",
  storageBucket: "backend-24632.appspot.com",
  messagingSenderId: "680798079100",
  appId: "1:680798079100:web:9a389135cc596916a1e1f9",
  measurementId: "G-ST4S468S8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);