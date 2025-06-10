// src/components/forms/MessageForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addMessage } from '../../services/database';
import Button from '../common/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const MessageForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  // Max character count
  const MAX_CHARS = 100;

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    if (message.trim().length < 1) {
      setError('메시지가 너무 짧습니다. 좀 더 의미 있는 메시지를 작성해주세요.');
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

      await addMessage({
        userId: user.uid,
        userName,
        message,
        createdAt: new Date() as any
      });
      
      // Reset form after successful submission
      setMessage('');
      setCharCount(0);
      
      // Show success message and navigate back
      alert('성공적으로 제출되었습니다. 참여해주셔서 감사합니다!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting message:', error);
      setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // A collection of fonts for the preview
  const previewFonts = [
    'serif',
    'sans-serif',
    'monospace',
    'cursive',
    'fantasy'
  ];
  
  // Randomly select a font for the message preview
  const randomFont = previewFonts[Math.floor(Math.random() * previewFonts.length)];

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="celebrationMessage" className="form-label">축하 메시지</label>
        <input
          type="text"
          className="form-control"
          id="celebrationMessage"
          value={message}
          onChange={handleMessageChange}
          placeholder="10주년을 맞이한 광주365재활병원에 축하 메시지를 남겨주세요"
          maxLength={MAX_CHARS}
          required
        />
        <div className="mt-2 text-end text-muted">
          <small>{charCount} / {MAX_CHARS} 자</small>
        </div>
      </div>
      
      {message.trim() && (
        <div className="mb-4">
          <label className="form-label">미리보기</label>
          <div 
            className="p-4 border rounded bg-light text-center"
            style={{ 
              fontFamily: randomFont, 
              fontSize: '1.5rem',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {message}
          </div>
          <div className="text-center mt-2">
            <small className="text-muted">
              * 실제 캘리그래피 스타일은 제출 후 관리자가 적용합니다.
            </small>
          </div>
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
          메시지 남기기
        </Button>
      </div>
    </form>
  );
};

export default MessageForm;