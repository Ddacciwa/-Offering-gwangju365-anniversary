// src/components/forms/EpisodeForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addEpisode } from '../../services/database';
import Button from '../common/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const EpisodeForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isHappy, setIsHappy] = useState(true); // Default: happy episode
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  // Max character count
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
    
    if (title.trim().length < 5) {
      setError('제목이 너무 짧습니다. 좀 더 구체적으로 작성해주세요.');
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

      await addEpisode({
        userId: user.uid,
        userName,
        title,
        content,
        isHappy,
        createdAt: new Date() as any
      });
      
      // Reset form after successful submission
      setTitle('');
      setContent('');
      setCharCount(0);
      
      // Show success message and navigate back
      alert('성공적으로 제출되었습니다. 참여해주셔서 감사합니다!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting episode:', error);
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
        <label className="form-label">에피소드 유형</label>
        <div className="d-flex">
          <div className="form-check me-4">
            <input
              className="form-check-input"
              type="radio"
              name="episodeType"
              id="happyEpisode"
              checked={isHappy}
              onChange={() => setIsHappy(true)}
            />
            <label className="form-check-label" htmlFor="happyEpisode">
              웃긴 에피소드
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="episodeType"
              id="touchingEpisode"
              checked={!isHappy}
              onChange={() => setIsHappy(false)}
            />
            <label className="form-check-label" htmlFor="touchingEpisode">
              감동적인 에피소드
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="episodeTitle" className="form-label">제목</label>
        <input
          type="text"
          className="form-control"
          id="episodeTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="에피소드 제목을 입력해주세요"
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="episodeContent" className="form-label">내용</label>
        <textarea
          id="episodeContent"
          className="form-control"
          rows={8}
          value={content}
          onChange={handleContentChange}
          placeholder="본원에서 근무하며 겪은 가장 감동적이거나 웃긴 에피소드를 자유롭게 작성해주세요."
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

export default EpisodeForm;