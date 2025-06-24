// src/services/auth.ts - Realtime Database 버전
import { 
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { ref, set } from 'firebase/database'; // Realtime Database
import { auth, db } from './firebase';

// 회원가입 함수 (Realtime Database)
export const createUserWithEmailAndPassword = async (
  email: string, 
  password: string, 
  userData: { name: string; department: string; position?: string }
) => {
  try {
    // 1. Firebase Authentication에 계정 생성
    const userCredential = await firebaseCreateUser(auth, email, password);
    const user = userCredential.user;
    
    // 2. Realtime Database users 노드에 사용자 정보 저장
    await set(ref(db, `users/${user.uid}`), {
      name: userData.name,
      department: userData.department,
      position: userData.position || '',
      email: email,
      createdAt: new Date().toISOString()
    });
    
    console.log('사용자 정보가 Realtime Database에 저장됨:', user.uid);
    return userCredential;
  } catch (error) {
    console.error('회원가입 중 오류:', error);
    throw error;
  }
};

// 로그인 함수
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  return await firebaseSignIn(auth, email, password);
};

// 로그아웃 함수
export const signOut = async () => {
  return await firebaseSignOut(auth);
};