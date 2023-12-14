// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7HTBjLaa1RqZK4Parow-vWBl9z8bIArk",
  authDomain: "svelte-firebase-b0c85.firebaseapp.com",
  projectId: "svelte-firebase-b0c85",
  storageBucket: "svelte-firebase-b0c85.appspot.com",
  messagingSenderId: "1008739597633",
  appId: "1:1008739597633:web:8463b3953e106bb738b5c0",
  measurementId: "G-N6XRBCQ1T5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);