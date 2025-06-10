// src/services/auth.ts
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';

// 이메일과 비밀번호로 회원가입
export const registerWithEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// 이메일과 비밀번호로 로그인
export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google로 로그인
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// 로그아웃
export const signOut = async () => {
  return firebaseSignOut(auth);
};

// 현재 사용자 가져오기
export const getCurrentUser = () => {
  return auth.currentUser;
};