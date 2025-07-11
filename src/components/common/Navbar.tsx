// src/components/common/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth';
import { useEffect, useState } from 'react';
import { getUserData } from '../../services/database';

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
          const userData = await getUserData(user.uid);
          if (userData) {
            setUserName(userData.name);
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
          <ul className="navbar-nav me-auto" style={{ gap: '0.5rem' }}>
            <li className="nav-item">
              <Link className="nav-link" to="/essay" style={{ padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}>
                나에게 병원이란?
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/episodes" style={{ padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}>
                병원 이모저모
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gratitude" style={{ padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}>
                감사 전하기
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dream-hospital" style={{ padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}>
                꿈꾸는 병원
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/messages" style={{ padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}>
                축하 메시지
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user && (
              <span 
                className="me-2 text-muted"
                style={{ 
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {userNameLoading
                  ? '로딩중...'
                  : userName
                    ? `${userName}님 환영합니다.`
                    : user?.email
                      ? `${user.email}님 환영합니다.`
                      : '환영합니다.'}
              </span>
            )}
            {user ? (
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <Link className="btn btn-outline-primary btn-sm" to="/login">
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