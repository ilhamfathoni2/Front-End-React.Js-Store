// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg4WF1jDmdo5l1xIZGkMDLF0re75FpPgY",
  authDomain: "server-image-b7cc9.firebaseapp.com",
  projectId: "server-image-b7cc9",
  storageBucket: "server-image-b7cc9.appspot.com",
  messagingSenderId: "936672417697",
  appId: "1:936672417697:web:d5f7a4927884a8bfe21de0",
  measurementId: "G-94W4XFRLK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
