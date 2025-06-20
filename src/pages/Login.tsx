// src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../services/auth';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import logo from '../assets/logo.png';

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
          <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5">
            <div className="card anniversary-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <img src={logo} alt="365 로고" style={{ width: '120px', height: 'auto', marginBottom: '1.5rem' }} />
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
                        이메일 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        required
                        disabled={loading}
                        style={{ borderRadius: 'var(--radius-md)' }}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label fw-medium">
                        비밀번호 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
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
                        '🔑 로그인'
                      )}
                    </Button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className="fw-medium" style={{ color: 'var(--primary-orange)' }}>
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