// src/components/common/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [userNameLoading, setUserNameLoading] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        setUserNameLoading(true);
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserName(docSnap.data().name);
          } else {
            setUserName(null);
          }
        } catch {
          setUserName(null);
        } finally {
          setUserNameLoading(false);
        }
      } else {
        setUserName(null);
      }
    };
    fetchUserName();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/logo.png" 
            alt="365 로고" 
            style={{ 
              height: '48px', 
              width: '48px', 
              marginRight: '16px', 
              objectFit: 'contain', 
              background: '#fff', 
              borderRadius: '8px',
              padding: '4px'
            }} 
          />
          광주365재활병원 10주년
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/essay">나에게 병원이란?</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/episodes">병원 이모저모</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gratitude">감사 전하기</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dream-hospital">꿈꾸는 병원</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/messages">축하 메시지</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user && (
              <span className="me-3 fw-bold">
                {userNameLoading
                  ? '이름 불러오는 중...'
                  : userName
                    ? `${userName}님 환영합니다.`
                    : user?.email
                      ? `${user.email}님 환영합니다.`
                      : '이름을 불러올 수 없습니다.'}
              </span>
            )}
            {user ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <Link className="btn btn-outline-primary" to="/login">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;