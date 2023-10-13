// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkRcNi4n-NBTkYTrb5zmrGryF0DK3Ureg",
  authDomain: "lab06-dddd2.firebaseapp.com",
  projectId: "lab06-dddd2",
  storageBucket: "lab06-dddd2.appspot.com",
  messagingSenderId: "346023476519",
  appId: "1:346023476519:web:7af8128a263291676b3d02",

};

initializeApp(firebaseConfig)
// Initialize Firebase
export const database = getFirestore()
