import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCIgz1uHDpFyPfnFwlDfvkG8fwcmN21IB8",
  authDomain: "city-pulse-d68d4.firebaseapp.com",
  projectId: "city-pulse-d68d4",
  storageBucket: "city-pulse-d68d4.firebasestorage.app",
  messagingSenderId: "623279986666",
  appId: "1:623279986666:web:6ff5f75a8a5c2269e6c493"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);