// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

const doCreateUserWithEmailAndPassword = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

const doSignOut = () =>
  signOut(auth);

const doPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

const doPasswordUpdate = (password) =>
  updatePassword(auth.currentUser, password);



export { 
  db, 
  serverTimestamp,
  auth,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  doPasswordReset,
  doPasswordUpdate,
  onAuthStateChanged
 };