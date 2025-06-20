// src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../services/auth';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(email, password);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('등록되지 않은 이메일입니다.');
      } else if (error.code === 'auth/wrong-password') {
        setError('비밀번호가 올바르지 않습니다.');
      } else if (error.code === 'auth/invalid-email') {
        setError('올바른 이메일 형식을 입력해주세요.');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            <div className="card anniversary-card" style={{ 
              minWidth: '400px',
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              <div className="card-body" style={{ padding: '2.5rem 2rem' }}>
                <div className="text-center mb-5">
                  <img src="/logo.png" alt="365 로고" style={{ width: '140px', height: 'auto', marginBottom: '2rem' }} />
                  <h2 className="mb-3" style={{ fontSize: '2rem', fontWeight: '600' }}>로그인</h2>
                  <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>10주년 기념 프로젝트에 참여하세요</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label fw-medium" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                        이메일 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        style={{ 
                          borderRadius: '0.75rem',
                          padding: '1rem 1.25rem',
                          fontSize: '1rem',
                          border: '2px solid #dee2e6',
                          minHeight: '55px'
                        }}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label fw-medium" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                        비밀번호 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        style={{ 
                          borderRadius: '0.75rem',
                          padding: '1rem 1.25rem',
                          fontSize: '1rem',
                          border: '2px solid #dee2e6',
                          minHeight: '55px'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100"
                      disabled={loading}
                      style={{
                        padding: '1rem 2rem',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        borderRadius: '0.75rem',
                        minHeight: '60px'
                      }}
                    >
                      {loading ? (
                        <div className="d-flex align-items-center justify-content-center">
                          <LoadingSpinner size="sm" color="white" className="me-2" />
                          로그인 중...
                        </div>
                      ) : (
                        '🔑 로그인'
                      )}
                    </Button>
                  </div>
                </form>

                <div className="text-center mt-5">
                  <p className="mb-0 text-muted" style={{ fontSize: '1.1rem' }}>
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className="fw-medium" style={{ color: 'var(--primary-orange)', fontSize: '1.1rem' }}>
                      회원가입
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

export default Login;