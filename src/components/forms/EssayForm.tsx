// src/components/forms/EssayForm.tsx - Realtime Database 버전
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addEssay, getUserData } from '../../services/database';
import Button from '../common/Button';

const EssayForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  const MAX_CHARS = 2000;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      // Realtime Database에서 사용자 정보 가져오기
      let userName = '익명';
      let userDepartment = '미지정';
      let userPosition = '';
      let userEmail = user.email || '';
      
      try {
        const userData = await getUserData(user.uid);
        if (userData) {
          console.log('Realtime Database userData:', userData);
          userName = userData.name || '익명';
          userDepartment = userData.department || '미지정';
          userPosition = userData.position || '';
          userEmail = userData.email || user.email || '';
        } else {
          console.log('Realtime Database userData 없음');
        }
      } catch (e) { 
        console.error('Realtime Database userData 에러', e); 
      }

      await addEssay({
        userId: user.uid,
        userName,
        userDepartment,
        userPosition,
        userEmail,
        content,
        createdAt: new Date().toISOString()
      });
      
      // Reset form after successful submission
      setContent('');
      setCharCount(0);
      
      // Show success message and navigate back
      alert('성공적으로 제출되었습니다. 참여해주셔서 감사합니다!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting essay:', error);
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
        <label htmlFor="essayContent" className="form-label">
          나에게 광주365재활병원이란?
        </label>
        <textarea
          id="essayContent"
          className="form-control"
          rows={10}
          value={content}
          onChange={handleContentChange}
          placeholder="본원에서 근무하며 느꼈던 것들을 자유롭게 작성해주세요. 사내 복지제도(육아휴직, 동호회, 교육 프로그램 등)에 대한 소감이 있으면 함께 작성해주세요."
          maxLength={MAX_CHARS}
          required
        />
        <div className="mt-2 text-end text-muted">
          <small>{charCount} / {MAX_CHARS} 자</small>
        </div>
      </div>
      
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

export default EssayForm;