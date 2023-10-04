import {getFirestore} from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK2xuSQ9IRvPZOaQQFA3QoQQj6nNfyA1g",
  authDomain: "moeez-s-to-do-app.firebaseapp.com",
  projectId: "moeez-s-to-do-app",
  storageBucket: "moeez-s-to-do-app.appspot.com",
  messagingSenderId: "749529986048",
  appId: "1:749529986048:web:ec8984b7e90fb54c7614e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()
export default db //this will allow us to use the database anywhere from the application
