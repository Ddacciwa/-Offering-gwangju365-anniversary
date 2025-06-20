// src/services/auth.ts
import { 
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// 회원가입 함수
export const createUserWithEmailAndPassword = async (
  email: string, 
  password: string, 
  userData: { name: string; department: string; position?: string }
) => {
  const userCredential = await firebaseCreateUser(auth, email, password);
  const user = userCredential.user;
  
  // Firestore에 사용자 정보 저장
  await setDoc(doc(db, 'users', user.uid), {
    ...userData,
    email,
    createdAt: new Date()
  });
  
  return userCredential;
};

// 로그인 함수
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  return await firebaseSignIn(auth, email, password);
};

// 로그아웃 함수
export const signOut = async () => {
  return await firebaseSignOut(auth);
};