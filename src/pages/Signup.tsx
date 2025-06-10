import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import PageLayout from '../components/layout/PageLayout';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);
    try {
      // Firebase에 계정 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Firestore에 부가 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        department,
        name,
        email,
        createdAt: new Date()
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout title="회원가입">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">부서</label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">이름</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">이메일</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">비밀번호 확인</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                  >
                    회원가입
                  </Button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/login')}
                >
                  로그인으로 돌아가기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Signup; 