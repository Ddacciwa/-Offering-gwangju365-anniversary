// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../services/auth';
import Button from '../components/common/Button';
import PageLayout from '../components/layout/PageLayout';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmail(email, password);
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout title="로그인">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">이메일</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">비밀번호</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                  >
                    로그인
                  </Button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/signup')}
                >
                  회원가입
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;