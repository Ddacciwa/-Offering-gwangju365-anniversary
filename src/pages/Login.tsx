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
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="card anniversary-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  {/* 광주365 로고 */}
                  <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{
                    background: '#1565C0',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    position: 'relative',
                    boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)'
                  }}>
                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }}>
                      <span style={{
                        position: 'relative',
                        zIndex: 2,
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>365</span>
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#FF8F00'
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#7CB342'
                      }} />
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#E0E0E0'
                      }} />
                    </div>
                  </div>
                  <h2 className="mb-2">로그인</h2>
                  <p className="text-muted mb-0">10주년 기념 프로젝트에 참여하세요</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label fw-medium">
                        이메일
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label fw-medium">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                          로그인 중...
                        </div>
                      ) : (
                        '로그인'
                      )}
                    </Button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p className="mb-0 text-muted">
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className="fw-medium" style={{ color: 'var(--primary-blue)' }}>
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