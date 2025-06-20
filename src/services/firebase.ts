// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정 (환경변수 또는 직접 설정)
const firebaseConfig = {
  // 실제 프로젝트에서는 환경변수 사용 권장
  apiKey: process.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-auth-domain",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "demo-project-id",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-storage-bucket",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "demo-sender-id",
  appId: process.env.VITE_FIREBASE_APP_ID || "demo-app-id"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Auth와 Firestore 인스턴스 내보내기
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;