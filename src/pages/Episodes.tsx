// src/pages/Episodes.tsx
import { useState, useEffect } from 'react';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const Episodes = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDraft = async () => {
      if (user) {
        try {
          const draftRef = doc(db, 'drafts', `episodes_${user.uid}`);
          const draftSnap = await getDoc(draftRef);
          
          if (draftSnap.exists()) {
            const draftData = draftSnap.data();
            setContent(draftData.content || '');
          }
        } catch (error) {
          console.error('임시저장 불러오기 실패:', error);
        }
      }
      setIsLoading(false);
    };

    loadDraft();
  }, [user]);

  const saveDraft = async () => {
    if (!user || !content.trim()) return;

    setIsSavingDraft(true);
    try {
      const draftRef = doc(db, 'drafts', `episodes_${user.uid}`);
      await setDoc(draftRef, {
        content: content.trim(),
        updatedAt: new Date(),
        type: 'episodes'
      });
      
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error) {
      console.error('임시저장 실패:', error);
      alert('임시저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'episodes'), {
        content: content.trim(),
        userId: user?.uid,
        userEmail: user?.email,
        createdAt: new Date(),
        type: 'hospital_episodes'
      });

      // 제출 후 임시저장 삭제
      try {
        const draftRef = doc(db, 'drafts', `episodes_${user?.uid}`);
        await setDoc(draftRef, { content: '', updatedAt: new Date() });
      } catch (error) {
        console.error('임시저장 삭제 실패:', error);
      }

      setSubmitSuccess(true);
      setContent('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('제출 실패:', error);
      alert('제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      <Navbar />
      
      <div className="flex-grow-1">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0" style={{
                borderRadius: '20px',
                background: 'white',
                boxShadow: '0 10px 30px rgba(30, 91, 168, 0.1)'
              }}>
                <div className="card-header text-center py-4" style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
                  borderRadius: '20px 20px 0 0',
                  border: 'none'
                }}>
                  <h2 className="card-title mb-0 text-white fw-bold">
                    <i className="fas fa-camera me-2" style={{ color: '#fff' }}></i>
                    병원 이모저모
                  </h2>
                  <p className="text-white-50 mb-0 mt-2">
                    병원에서 있었던 재미있는 에피소드나 특별한 순간들을 공유해주세요
                  </p>
                </div>
                
                <div className="card-body p-4">
                  {submitSuccess && (
                    <div className="alert alert-success d-flex align-items-center mb-4" style={{
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#d4edda'
                    }}>
                      <i className="fas fa-check-circle me-2"></i>
                      재미있는 에피소드를 공유해주셔서 감사합니다!
                    </div>
                  )}

                  {draftSaved && (
                    <div className="alert alert-info d-flex align-items-center mb-4" style={{
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#cce7ff'
                    }}>
                      <i className="fas fa-save me-2"></i>
                      임시저장이 완료되었습니다.
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="content" className="form-label fw-semibold text-dark">
                        <i className="fas fa-smile me-2" style={{ color: '#ff6b6b' }}></i>
                        재미있었던 에피소드를 들려주세요
                      </label>
                      <textarea
                        id="content"
                        className="form-control"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="병원에서 겪었던 재미있는 일, 감동적인 순간, 특별한 기억 등을 자유롭게 작성해주세요..."
                        required
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e9ecef',
                          fontSize: '1.1rem',
                          lineHeight: '1.6',
                          resize: 'vertical',
                          minHeight: '250px'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.border = '2px solid #ff6b6b';
                          e.currentTarget.style.boxShadow = '0 0 0 0.2rem rgba(255, 107, 107, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.border = '2px solid #e9ecef';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      <div className="form-text text-muted mt-2">
                        <i className="fas fa-info-circle me-1"></i>
                        병원 생활 중 기억에 남는 순간들을 편안하게 이야기해주세요.
                      </div>
                    </div>
                    
                    <div className="d-flex gap-3 justify-content-end">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={saveDraft}
                        isLoading={isSavingDraft}
                        disabled={!content.trim() || isSubmitting}
                        className="px-4 py-2"
                        style={{
                          borderRadius: '25px',
                          fontWeight: '600',
                          border: 'none',
                          backgroundColor: '#6c757d',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-save me-2"></i>
                        임시저장
                      </Button>
                      
                      <Button
                        type="submit"
                        variant="danger"
                        isLoading={isSubmitting}
                        disabled={!content.trim() || isSavingDraft}
                        className="px-4 py-2"
                        style={{
                          borderRadius: '25px',
                          fontWeight: '600',
                          border: 'none',
                          backgroundColor: '#ff6b6b',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-paper-plane me-2"></i>
                        제출하기
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted">
                  <i className="fas fa-shield-alt me-2" style={{ color: '#ff6b6b' }}></i>
                  제출된 에피소드는 익명으로 처리되며, 병원의 소중한 추억으로 보관됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Episodes;