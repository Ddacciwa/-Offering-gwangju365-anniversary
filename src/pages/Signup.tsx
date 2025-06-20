// src/pages/Signup.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '../services/auth';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    position: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.department) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(
        formData.email, 
        formData.password, 
        {
          name: formData.name,
          department: formData.department,
          position: formData.position
        }
      );
      navigate('/');
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/invalid-email') {
        setError('올바른 이메일 형식을 입력해주세요.');
      } else if (error.code === 'auth/weak-password') {
        setError('비밀번호가 너무 약합니다. 더 강한 비밀번호를 사용해주세요.');
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5">
            <div className="card anniversary-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <img src="/logo.png" alt="365 로고" style={{ width: '120px', height: 'auto', marginBottom: '1.5rem' }} />
                  <h2 className="mb-2">회원가입</h2>
                  <p className="text-muted mb-0">10주년 기념 프로젝트에 참여하세요</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-medium">
                        이름 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="department" className="form-label fw-medium">
                        부서 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="position" className="form-label fw-medium">
                        직책/직위
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label fw-medium">
                        이메일 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label fw-medium">
                        비밀번호 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="confirmPassword" className="form-label fw-medium">
                        비밀번호 확인 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="d-flex align-items-center justify-content-center">
                          <LoadingSpinner size="sm" color="white" className="me-2" />
                          가입 중...
                        </div>
                      ) : (
                        '🚀 회원가입 완료'
                      )}
                    </Button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    이미 계정이 있으신가요?{' '}
                    <Link to="/login" className="fw-medium" style={{ color: 'var(--primary-orange)' }}>
                      로그인
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;