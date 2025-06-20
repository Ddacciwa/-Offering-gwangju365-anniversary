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
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card anniversary-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  {/* 광주365 로고 - 십자가 + 365 */}
                  <div className="d-inline-block mb-3" style={{
                    position: 'relative',
                    width: '90px',
                    height: '90px'
                  }}>
                    {/* 십자가 배경 */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      background: '#1565C0',
                      borderRadius: '16px',
                      boxShadow: '0 8px 24px rgba(21, 101, 192, 0.3)',
                      clipPath: 'polygon(30% 0%, 70% 0%, 70% 30%, 100% 30%, 100% 70%, 70% 70%, 70% 100%, 30% 100%, 30% 70%, 0% 70%, 0% 30%, 30% 30%)'
                    }} />
                    
                    {/* 365 텍스트 */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      zIndex: 10
                    }}>365</div>
                    
                    {/* 컬러 도트들 */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '18px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#FF8F00'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '18px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#7CB342'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '18px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#E0E0E0'
                    }} />
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
                        placeholder="이메일을 입력하세요"
                        required
                        disabled={loading}
                        style={{ 
                          borderRadius: 'var(--radius-md)',
                          padding: '12px 16px',
                          fontSize: '1rem'
                        }}
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
                        placeholder="비밀번호를 입력하세요"
                        required
                        disabled={loading}
                        style={{ 
                          borderRadius: 'var(--radius-md)',
                          padding: '12px 16px',
                          fontSize: '1rem'
                        }}
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