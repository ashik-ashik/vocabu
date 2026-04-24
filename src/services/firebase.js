// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYbKfyBiTamvLeflfH8o_NVat7M8l1Sck",
  authDomain: "my-vocabulary-dictionary-49446.firebaseapp.com",
  projectId: "my-vocabulary-dictionary-49446",
  storageBucket: "my-vocabulary-dictionary-49446.firebasestorage.app",
  messagingSenderId: "428641316644",
  appId: "1:428641316644:web:7fa35578d2942c58708db1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();