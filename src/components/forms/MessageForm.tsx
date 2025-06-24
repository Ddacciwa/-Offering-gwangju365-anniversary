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
  
  const MAX_CHARS = 500;

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
    
    if (!message.trim()) {
      setError('축하 메시지를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Firestore에서 사용자 정보 가져오기 (이름, 부서, 직책, 이메일)
      let userName = '익명';
      let userDepartment = '미지정';
      let userPosition = '';
      let userEmail = user.email || '';
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('Firestore userDoc:', userData);
          userName = userData.name || '익명';
          userDepartment = userData.department || '미지정';
          userPosition = userData.position || '';
          userEmail = userData.email || user.email || '';
        } else {
          console.log('Firestore userDoc 없음');
        }
      } catch (e) { 
        console.error('Firestore userDoc 에러', e); 
      }

      await addMessage({
        userId: user.uid,
        userName,
        userDepartment,
        userPosition, // 직책 추가
        userEmail,    // 이메일 추가
        message: message.trim(),
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

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="celebrationMessage" className="form-label">
          10주년 축하 메시지
        </label>
        <textarea
          id="celebrationMessage"
          className="form-control"
          rows={6}
          value={message}
          onChange={handleMessageChange}
          placeholder="광주365재활병원의 개원 10주년을 축하하는 따뜻한 메시지를 남겨주세요. 여러분의 메시지는 캘리그래피 스타일로 10주년 기념 자료에 수록됩니다."
          maxLength={MAX_CHARS}
          required
        />
        <div className="mt-2 text-end text-muted">
          <small>{charCount} / {MAX_CHARS} 자</small>
        </div>
      </div>

      <div className="alert alert-info">
        <small>
          💡 <strong>팁:</strong> 짧고 인상적인 메시지가 캘리그래피로 표현될 때 더욱 아름답게 보입니다.
        </small>
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

export default MessageForm;