// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXy-pFtXih3rqUJ-_2jL1WPYg8ah8TQis",
  authDomain: "survey-68ab4.firebaseapp.com",
  projectId: "survey-68ab4",
  storageBucket: "survey-68ab4.appspot.com",
  messagingSenderId: "130233343547",
  appId: "1:130233343547:web:6435a5072fd6d08ae4061e",
  measurementId: "G-H3VB1PSGM3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default getFirestore()