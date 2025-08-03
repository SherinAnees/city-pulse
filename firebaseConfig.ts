import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCd2t0B2A7za823I2Hj1HgbX23T2NCM6w0",
  authDomain: "city-pulse-93213.firebaseapp.com",
  projectId: "city-pulse-93213",
  storageBucket: "city-pulse-93213.firebasestorage.app",
  messagingSenderId: "1049378130571",
  appId: "1:1049378130571:web:991ab244bdc3cb875ba28e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);