// src/services/database.ts
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// 경로 이름
const PATHS = {
  ESSAYS: 'essays',
  EPISODES: 'episodes',
  GRATITUDE: 'gratitude',
  DREAMS: 'dreamHospital',
  MESSAGES: 'messages'
};

// 에세이 타입 (V-5)
export interface Essay {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string; // 부서 정보 추가
  content: string;
  createdAt: number;
}

// 에피소드 타입 (V-6)
export interface Episode {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string; // 부서 정보 추가
  title: string;
  content: string;
  isHappy: boolean; // 웃긴 에피소드는 true, 감동적인 에피소드는 false
  createdAt: number;
}

// 감사 타입 (V-7)
export interface Gratitude {
  id?: string;
  fromUserId: string;
  fromUserName: string;
  fromUserDepartment: string; // 발신자 부서 정보 추가
  toUserName: string;
  message: string;
  createdAt: number;
}

// 꿈꾸는 병원 타입 (IV-3)
export interface Dream {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string; // 부서 정보 추가
  vision: string; // 10년 후 병원 모습을 한 줄로 정리
  imageUrl?: string; // AI가 생성한 이미지 URL (선택적)
  createdAt: number;
}

// 축하 메시지 타입 (IV-4)
export interface Message {
  id?: string;
  userId: string;
  userName: string;
  userDepartment: string; // 부서 정보 추가
  message: string;
  createdAt: number;
}

// 데이터 추가 함수 (Firestore)
export const addData = async <T extends object>(path: string, data: T) => {
  const docRef = await addDoc(collection(db, path), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id };
};

// 데이터 가져오기 함수 (Firestore)
export const getData = async <T>(path: string) => {
  const snapshot = await getDocs(collection(db, path));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
};

// 사용자별 데이터 가져오기 (Firestore)
export const getUserData = async <T>(path: string, userId: string) => {
  const q = query(collection(db, path), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
};

// 특정 추가 함수
export const addEssay = (essay: Essay) => addData(PATHS.ESSAYS, essay);
export const addEpisode = (episode: Episode) => addData(PATHS.EPISODES, episode);
export const addGratitude = (gratitude: Gratitude) => addData(PATHS.GRATITUDE, gratitude);
export const addDream = (dream: Dream) => addData(PATHS.DREAMS, dream);
export const addMessage = (message: Message) => addData(PATHS.MESSAGES, message);

// 특정 데이터 가져오기
export const getAllEssays = () => getData<Essay>(PATHS.ESSAYS);
export const getAllEpisodes = () => getData<Episode>(PATHS.EPISODES);
export const getAllGratitude = () => getData<Gratitude>(PATHS.GRATITUDE);
export const getAllDreams = () => getData<Dream>(PATHS.DREAMS);
export const getAllMessages = () => getData<Message>(PATHS.MESSAGES);