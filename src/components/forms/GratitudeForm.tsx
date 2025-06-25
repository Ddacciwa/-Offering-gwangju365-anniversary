// src/components/forms/GratitudeForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addGratitude, getUserData } from '../../services/database';
import Button from '../common/Button';

const GratitudeForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [toUserName, setToUserName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  const MAX_CHARS = 1000;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    setCharCount(newMessage.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }
    
    if (!toUserName.trim() || !message.trim()) {
      setError('받는 사람과 감사 메시지를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Realtime Database에서 사용자 정보 가져오기
      let fromUserName = '익명';
      let fromUserDepartment = '미지정';
      try {
        const userData = await getUserData(user.uid);
        if (userData) {
          fromUserName = userData.name || '익명';
          fromUserDepartment = userData.department || '미지정';
        }
      } catch (e) { console.error('getUserData 에러', e); }

      await addGratitude({
        fromUserId: user.uid,
        fromUserName,
        fromUserDepartment,
        toUserName: toUserName.trim(),
        message: message.trim(),
        createdAt: new Date() as any
      });
      
      // Reset form after successful submission
      setToUserName('');
      setMessage('');
      setCharCount(0);
      
      // Show success message and navigate back
      alert('성공적으로 제출되었습니다. 참여해주셔서 감사합니다!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting gratitude:', error);
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
        <label htmlFor="toUserName" className="form-label">
          감사를 전하고 싶은 직원의 이름
        </label>
        <input
          type="text"
          id="toUserName"
          className="form-control"
          value={toUserName}
          onChange={(e) => setToUserName(e.target.value)}
          placeholder="예: 김영희 간호사님"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="gratitudeMessage" className="form-label">
          감사 메시지
        </label>
        <textarea
          id="gratitudeMessage"
          className="form-control"
          rows={8}
          value={message}
          onChange={handleMessageChange}
          placeholder="특별한 기억을 선사해주었거나 감사한 일이 있었던 직원에게 따뜻한 감사의 마음을 전해보세요."
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

export default GratitudeForm;