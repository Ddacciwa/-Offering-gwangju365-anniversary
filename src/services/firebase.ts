// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCq_nY6VbFBh0UegagCrBjVyjbmvmXwEAA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rh-10years-offering.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://rh-10years-offering-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rh-10years-offering",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rh-10years-offering.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "556202607427",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:556202607427:web:ca1434b83c54f0169525f6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-M3NVK5QTKM"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;