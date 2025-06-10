// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase 구성 정보
const firebaseConfig = {
  apiKey: "AIzaSyCq_nY6VbFBh0UegagCrBjVyjbmvmXwEAA",
  authDomain: "rh-10years-offering.firebaseapp.com",
  projectId: "rh-10years-offering",
  storageBucket: "rh-10years-offering.firebasestorage.app",
  messagingSenderId: "556202607427",
  appId: "1:556202607427:web:ca1434b83c54f0169525f6",
  measurementId: "G-M3NVK5QTKM",
  databaseURL: "https://rh-10years-offering-default-rtdb.asia-southeast1.firebasedatabase.app" // 추가
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 서비스 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;