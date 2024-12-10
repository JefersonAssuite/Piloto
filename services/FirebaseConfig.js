import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEahurTA0ui_Xq8TtB0q0iJey0strv67U",
    authDomain: "feed-56b79.firebaseapp.com",
    projectId: "feed-56b79",
    storageBucket: "feed-56b79.firebasestorage.app",
    messagingSenderId: "557777012202",
    appId: "1:557777012202:web:4de61aab5a4ada4f8ede93",
    measurementId: "G-CXV7BCTN1C"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);