// src/components/forms/DreamHospitalForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addDream } from '../../services/database';
import Button from '../common/Button';
import ImageUpload from '../ui/ImageUpload';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const DreamHospitalForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vision, setVision] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  // Max character count for the one-line vision
  const MAX_CHARS = 100;

  const handleVisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVision = e.target.value;
    setVision(newVision);
    setCharCount(newVision.length);
  };

  // 이미지 업로드 완료 핸들러
  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
    setError(''); // 이미지 업로드 성공 시 에러 클리어
  };

  // 이미지 제거 핸들러
  const handleImageRemoved = () => {
    setImageUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }
    
    if (vision.trim().length < 1) {
      setError('비전이 너무 짧습니다. 좀 더 구체적으로 작성해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Firestore에서 이름 가져오기
      let userName = '익명';
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log('Firestore userDoc:', data);
          userName = data.name || '익명';
          if (!data.name) {
            console.log('userDoc에 name이 없음:', data);
          }
        } else {
          console.log('Firestore userDoc 없음');
        }
      } catch (e) { 
        console.error('Firestore userDoc 에러', e); 
      }

      await addDream({
        userId: user.uid,
        userName,
        vision,
        imageUrl, // 업로드된 이미지 URL (없으면 빈 문자열)
        createdAt: new Date() as any
      });
      
      // Reset form after successful submission
      setVision('');
      setImageUrl('');
      setCharCount(0);
      
      // Show success message and navigate back
      alert('성공적으로 제출되었습니다. 참여해주셔서 감사합니다!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting dream:', error);
      setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="hospitalVision" className="form-label fw-medium" style={{ fontSize: '1.1rem' }}>
          10년 후 우리 병원의 모습 <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control form-control-lg"
          id="hospitalVision"
          value={vision}
          onChange={handleVisionChange}
          placeholder="한 줄로 10년 후 광주365재활병원의 모습을 상상해보세요"
          maxLength={MAX_CHARS}
          required
          style={{ 
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            fontSize: '1rem',
            border: '2px solid #dee2e6',
            minHeight: '55px'
          }}
        />
        <div className="mt-2 text-end text-muted">
          <small>{charCount} / {MAX_CHARS} 자</small>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="form-label fw-medium" style={{ fontSize: '1.1rem' }}>
          미래 병원 이미지 (선택사항)
        </label>
        <ImageUpload
          onImageUploaded={handleImageUploaded}
          onImageRemoved={handleImageRemoved}
          currentImageUrl={imageUrl}
          folder="dream-hospitals"
          maxSizeMB={10}
          className="w-100"
        />
        <small className="form-text text-muted mt-2">
          10년 후 우리 병원의 모습을 상상한 이미지를 업로드해보세요. (선택사항)<br />
          <span className="text-info">💡 AI 이미지 생성 도구(ChatGPT, DALL-E, Midjourney 등)를 활용하여 그림을 만들어 업로드하셔도 좋습니다.</span>
        </small>
      </div>
      
      <div className="d-flex justify-content-between gap-3 mt-5">
        <Button 
          type="button"
          variant="outline-secondary"
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '0.75rem',
            flex: '1'
          }}
        >
          취소
        </Button>
        <Button 
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '0.75rem',
            flex: '2'
          }}
        >
          제출하기
        </Button>
      </div>
    </form>
  );
};

export default DreamHospitalForm;