// src/pages/DreamHospital.tsx
import { useState, useEffect } from 'react';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const DreamHospital = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDraft = async () => {
      if (user) {
        try {
          const draftRef = doc(db, 'drafts', `dream_hospital_${user.uid}`);
          const draftSnap = await getDoc(draftRef);
          
          if (draftSnap.exists()) {
            const draftData = draftSnap.data();
            setContent(draftData.content || '');
            if (draftData.imageUrl) {
              setImagePreview(draftData.imageUrl);
            }
          }
        } catch (error) {
          console.error('임시저장 불러오기 실패:', error);
        }
      }
      setIsLoading(false);
    };

    loadDraft();
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일은 5MB 이하만 업로드 가능합니다.');
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      setImage(file);
      
      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const fileName = `dream_hospital_${user?.uid}_${timestamp}_${file.name}`;
    const imageRef = ref(storage, `dream_hospital_images/${fileName}`);
    
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const saveDraft = async () => {
    if (!user || (!content.trim() && !image && !imagePreview)) return;

    setIsSavingDraft(true);
    try {
      let imageUrl = imagePreview;
      
      // 새로운 이미지가 있으면 업로드
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const draftRef = doc(db, 'drafts', `dream_hospital_${user.uid}`);
      await setDoc(draftRef, {
        content: content.trim(),
        imageUrl: imageUrl || null,
        updatedAt: new Date(),
        type: 'dream_hospital'
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
    
    if (!content.trim() && !image && !imagePreview) {
      alert('내용을 입력하거나 이미지를 첨부해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = imagePreview;
      
      // 새로운 이미지가 있으면 업로드
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // 꿈꾸는 병원 내용 제출
      await addDoc(collection(db, 'dream_hospital'), {
        content: content.trim(),
        imageUrl: imageUrl || null,
        userId: user?.uid,
        userEmail: user?.email,
        createdAt: new Date(),
        type: 'dream_hospital'
      });

      // 제출 후 임시저장 삭제
      try {
        const draftRef = doc(db, 'drafts', `dream_hospital_${user?.uid}`);
        await setDoc(draftRef, { 
          content: '', 
          imageUrl: null, 
          updatedAt: new Date() 
        });
      } catch (error) {
        console.error('임시저장 삭제 실패:', error);
      }

      setSubmitSuccess(true);
      setContent('');
      setImage(null);
      setImagePreview(null);
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
                  background: 'linear-gradient(135deg, #7cb342 0%, #8bc34a 100%)',
                  borderRadius: '20px 20px 0 0',
                  border: 'none'
                }}>
                  <h2 className="card-title mb-0 text-white fw-bold">
                    <i className="fas fa-hospital me-2" style={{ color: '#fff' }}></i>
                    우리가 꿈꾸는 병원
                  </h2>
                  <p className="text-white-50 mb-0 mt-2">
                    미래의 광주365재활병원은 어떤 모습이면 좋을까요?
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
                      소중한 의견을 공유해주셔서 감사합니다!
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
                        <i className="fas fa-lightbulb me-2" style={{ color: '#7cb342' }}></i>
                        꿈꾸는 병원의 모습을 설명해주세요
                      </label>
                      <textarea
                        id="content"
                        className="form-control"
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="미래의 광주365재활병원이 어떤 모습이면 좋을지, 어떤 서비스나 시설이 있으면 좋을지 자유롭게 작성해주세요..."
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e9ecef',
                          fontSize: '1.1rem',
                          lineHeight: '1.6',
                          resize: 'vertical',
                          minHeight: '200px'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.border = '2px solid #7cb342';
                          e.currentTarget.style.boxShadow = '0 0 0 0.2rem rgba(124, 179, 66, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.border = '2px solid #e9ecef';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="image" className="form-label fw-semibold text-dark">
                        <i className="fas fa-image me-2" style={{ color: '#7cb342' }}></i>
                        이미지 첨부 (선택사항)
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e9ecef',
                          padding: '12px'
                        }}
                      />
                      <div className="form-text text-muted mt-2">
                        <i className="fas fa-info-circle me-1"></i>
                        JPG, PNG, GIF 등의 이미지 파일만 업로드 가능합니다. (최대 5MB)
                      </div>

                      {imagePreview && (
                        <div className="mt-3">
                          <div className="position-relative d-inline-block">
                            <img 
                              src={imagePreview} 
                              alt="미리보기" 
                              className="img-thumbnail"
                              style={{
                                maxWidth: '300px',
                                maxHeight: '300px',
                                borderRadius: '12px'
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0"
                              onClick={removeImage}
                              style={{
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                transform: 'translate(50%, -50%)'
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="d-flex gap-3 justify-content-end">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={saveDraft}
                        isLoading={isSavingDraft}
                        disabled={(!content.trim() && !image && !imagePreview) || isSubmitting}
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
                        variant="success"
                        isLoading={isSubmitting}
                        disabled={(!content.trim() && !image && !imagePreview) || isSavingDraft}
                        className="px-4 py-2"
                        style={{
                          borderRadius: '25px',
                          fontWeight: '600',
                          border: 'none',
                          backgroundColor: '#7cb342',
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
                  <i className="fas fa-shield-alt me-2" style={{ color: '#7cb342' }}></i>
                  제출된 내용과 이미지는 익명으로 처리되며, 병원 발전을 위한 소중한 자료로 활용됩니다.
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

export default DreamHospital;