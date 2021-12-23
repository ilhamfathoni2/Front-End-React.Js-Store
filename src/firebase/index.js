import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBg4WF1jDmdo5l1xIZGkMDLF0re75FpPgY",
  authDomain: "server-image-b7cc9.firebaseapp.com",
  projectId: "server-image-b7cc9",
  storageBucket: "server-image-b7cc9.appspot.com",
  messagingSenderId: "936672417697",
  appId: "1:936672417697:web:d5f7a4927884a8bfe21de0",
  measurementId: "G-94W4XFRLK8",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
