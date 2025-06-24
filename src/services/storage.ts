// src/services/storage.ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, auth } from './firebase';

/**
 * 이미지 파일을 Firebase Storage에 업로드
 * @param file - 업로드할 파일
 * @param folder - 저장할 폴더 경로 (예: 'dream-hospitals', 'profiles')
 * @param fileName - 파일명 (선택사항, 없으면 자동 생성)
 * @returns 업로드된 파일의 다운로드 URL
 */
export const uploadImage = async (
  file: File, 
  folder: string = 'images',
  fileName?: string
): Promise<string> => {
  try {
    // 파일명 생성 (확장자 포함)
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const finalFileName = fileName || `${timestamp}.${fileExtension}`;
    
    // Storage 참조 생성
    const storageRef = ref(storage, `${folder}/${finalFileName}`);
    
    // 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);
    
    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
};

/**
 * Firebase Storage에서 이미지 삭제
 * @param url - 삭제할 이미지의 URL
 */
export const deleteImage = async (url: string): Promise<void> => {
  try {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('이미지 삭제 실패:', error);
    throw new Error('이미지 삭제에 실패했습니다.');
  }
};

/**
 * 파일 크기 검증 (기본 5MB)
 */
export const validateFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * 이미지 파일 형식 검증
 */
export const validateImageType = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.type);
};