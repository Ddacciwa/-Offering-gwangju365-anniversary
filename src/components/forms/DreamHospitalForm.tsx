// src/components/forms/DreamHospitalForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addDream } from '../../services/database';
import Button from '../common/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const DreamHospitalForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vision, setVision] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
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

  // Placeholder function for AI image generation
  // In a real implementation, this would call an AI image generation API
  const generateImage = async () => {
    if (vision.trim().length < 1) {
      setError('비전이 너무 짧습니다. 좀 더 구체적으로 작성해주세요.');
      return;
    }

    setIsGeneratingImage(true);
    setError('');

    try {
      // This is a placeholder - you would replace this with an actual API call
      // For now, we'll just use a placeholder image
      const placeholderImages = [
        'https://via.placeholder.com/500x300?text=미래+병원+이미지',
        'https://via.placeholder.com/500x300?text=건강한+미래',
        'https://via.placeholder.com/500x300?text=환자+중심+병원'
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Select a random placeholder image
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setImageUrl(randomImage);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGeneratingImage(false);
    }
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
      } catch (e) { console.error('Firestore userDoc 에러', e); }

      await addDream({
        userId: user.uid,
        userName,
        vision,
        imageUrl, // This can be empty if no image was generated
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
      
      <div className="mb-3">
        <label htmlFor="hospitalVision" className="form-label">10년 후 우리 병원의 모습</label>
        <input
          type="text"
          className="form-control"
          id="hospitalVision"
          value={vision}
          onChange={handleVisionChange}
          placeholder="한 줄로 10년 후 광주365재활병원의 모습을 상상해보세요"
          maxLength={MAX_CHARS}
          required
        />
        <div className="mt-2 text-end text-muted">
          <small>{charCount} / {MAX_CHARS} 자</small>
        </div>
      </div>
      
      <div className="mb-3">
        <Button
          type="button"
          variant="outline-primary"
          onClick={generateImage}
          isLoading={isGeneratingImage}
          disabled={vision.trim().length < 1}
          className="w-100"
        >
          AI 이미지 생성하기
        </Button>
        <small className="form-text text-muted">
          입력한 비전을 바탕으로, AI가 상상한 미래 병원의 이미지를 생성합니다.
        </small>
      </div>
      
      {imageUrl && (
        <div className="mb-3 text-center">
          <img
            src={imageUrl}
            alt="AI가 생성한 미래 병원 이미지"
            className="img-fluid rounded"
            style={{ maxHeight: '300px' }}
          />
          <p className="mt-2">
            <small className="text-muted">AI가 생성한 이미지입니다.</small>
          </p>
        </div>
      )}
      
      <div className="d-flex justify-content-between">
        <Button 
          type="button"
          variant="outline-secondary"
          onClick={() => navigate('/')}
        >
          취소
        </Button>
        <Button 
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          제출하기
        </Button>
      </div>
    </form>
  );
};

export default DreamHospitalForm;