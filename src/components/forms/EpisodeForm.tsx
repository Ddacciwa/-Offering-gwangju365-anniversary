// src/components/forms/EpisodeForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { addEpisode, getUserData } from '../../services/database';
import Button from '../common/Button';

const EpisodeForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [episodeType, setEpisodeType] = useState<'happy' | 'touching'>('happy');
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
    
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Realtime Database에서 사용자 정보 가져오기
      let userName = '익명';
      let userDepartment = '미지정';
      try {
        const userData = await getUserData(user.uid);
        if (userData) {
          userName = userData.name || '익명';
          userDepartment = userData.department || '미지정';
        }
      } catch (e) { console.error('getUserData 에러', e); }

      await addEpisode({
        userId: user.uid,
        userName,
        userDepartment,
        userPosition: '',
        userEmail: user.email || '',
        title,
        content,
        isHappy: episodeType === 'happy',
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
        <label className="form-label fw-medium">에피소드 종류</label>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="episodeType"
                id="happy"
                value="happy"
                checked={episodeType === 'happy'}
                onChange={(e) => setEpisodeType(e.target.value as 'happy')}
              />
              <label className="form-check-label" htmlFor="happy">
                😄 재미있는 에피소드
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="episodeType"
                id="touching"
                value="touching"
                checked={episodeType === 'touching'}
                onChange={(e) => setEpisodeType(e.target.value as 'touching')}
              />
              <label className="form-check-label" htmlFor="touching">
                💝 감동적인 에피소드
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="episodeTitle" className="form-label">
          에피소드 제목
        </label>
        <input
          type="text"
          id="episodeTitle"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="에피소드의 제목을 입력해주세요"
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="episodeContent" className="form-label">
          에피소드 내용
        </label>
        <textarea
          id="episodeContent"
          className="form-control"
          rows={10}
          value={content}
          onChange={handleContentChange}
          placeholder="기억에 남는 에피소드를 상세히 작성해주세요."
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