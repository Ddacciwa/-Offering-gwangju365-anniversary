// src/services/database.ts - Realtime Database 버전
import { ref, push, get } from 'firebase/database';
import { db } from './firebase';

// 경로 이름
const PATHS = {
  ESSAYS: 'essays',
  EPISODES: 'episodes',
  GRATITUDE: 'gratitude',
  DREAMS: 'dreamHospital',
  MESSAGES: 'messages',
  USERS: 'users'
};

// 에세이 타입
export interface Essay {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string;
  userPosition: string;
  userEmail: string;
  content: string;
  createdAt: string;
}

// 에피소드 타입
export interface Episode {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string;
  userPosition: string;
  userEmail: string;
  title: string;
  content: string;
  isHappy: boolean;
  createdAt: string;
}

// 감사 타입
export interface Gratitude {
  id?: string;
  fromUserId: string;
  fromUserName: string;
  fromUserDepartment: string;
  fromUserPosition: string;
  fromUserEmail: string;
  toUserName: string;
  message: string;
  createdAt: string;
}

// 꿈꾸는 병원 타입
export interface Dream {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string;
  userPosition: string;
  userEmail: string;
  vision: string;
  imageUrl?: string;
  createdAt: string;
}

// 축하 메시지 타입
export interface Message {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string;
  userPosition: string;
  userEmail: string;
  message: string;
  createdAt: string;
}

// 사용자 타입
export interface User {
  name: string;
  department: string;
  position: string;
  email: string;
  createdAt: string;
}

// 데이터 추가 함수 (Realtime Database)
export const addData = async <T extends object>(path: string, data: T) => {
  const dataRef = ref(db, path);
  const newRef = await push(dataRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return { id: newRef.key };
};

// 사용자 정보 가져오기 함수 (Realtime Database)
export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const userRef = ref(db, `${PATHS.USERS}/${userId}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      return snapshot.val() as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// 특정 추가 함수
export const addEssay = (essay: Omit<Essay, 'id'>) => addData(PATHS.ESSAYS, essay);
export const addEpisode = (episode: Omit<Episode, 'id'>) => addData(PATHS.EPISODES, episode);
export const addGratitude = (gratitude: Omit<Gratitude, 'id'>) => addData(PATHS.GRATITUDE, gratitude);
export const addDream = (dream: Omit<Dream, 'id'>) => addData(PATHS.DREAMS, dream);
export const addMessage = (message: Omit<Message, 'id'>) => addData(PATHS.MESSAGES, message);