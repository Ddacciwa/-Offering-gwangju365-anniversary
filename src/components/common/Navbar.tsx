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
    <nav className="navbar navbar-expand-lg" style={{ 
      background: 'linear-gradient(135deg, #1e5ba8 0%, #2b76c9 100%)',
      boxShadow: '0 2px 10px rgba(30, 91, 168, 0.2)',
      borderBottom: '3px solid #7cb342'
    }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center text-white" to="/" style={{
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '1.4rem'
        }}>
          {/* 실제 로고 이미지를 여기에 넣어주세요 */}
          <img 
            src="/365-hospital-logo.png" //
            alt="광주365재활병원 로고" 
            style={{ 
              height: '50px', 
              width: '50px', 
              marginRight: '12px', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.1))'
            }} 
          />
          <span style={{ 
            color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            letterSpacing: '-0.5px'
          }}>
            광주365재활병원 
            <span style={{ 
              color: '#7cb342', 
              fontWeight: '800',
              marginLeft: '8px'
            }}>
              10주년
            </span>
          </span>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{ 
            padding: '6px 10px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        >
          <span style={{
            display: 'block',
            width: '25px',
            height: '3px',
            backgroundColor: '#fff',
            margin: '5px 0',
            borderRadius: '3px',
            transition: 'all 0.3s ease'
          }}></span>
          <span style={{
            display: 'block',
            width: '25px',
            height: '3px',
            backgroundColor: '#fff',
            margin: '5px 0',
            borderRadius: '3px',
            transition: 'all 0.3s ease'
          }}></span>
          <span style={{
            display: 'block',
            width: '25px',
            height: '3px',
            backgroundColor: '#fff',
            margin: '5px 0',
            borderRadius: '3px',
            transition: 'all 0.3s ease'
          }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/essay" style={{
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                나에게 병원이란?
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/episodes" style={{
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '25px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                병원 이모저모
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/gratitude" style={{
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '25px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                감사 전하기
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/dream-hospital" style={{
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '25px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                꿈꾸는 병원
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            {user && (
              <span className="me-3 fw-bold" style={{
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}>
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
              <button 
                className="btn fw-semibold" 
                onClick={handleLogout}
                style={{
                  backgroundColor: '#ff6b6b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff5252';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff6b6b';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
                }}
              >
                로그아웃
              </button>
            ) : (
              <Link 
                className="btn fw-semibold" 
                to="/login"
                style={{
                  backgroundColor: '#7cb342',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(124, 179, 66, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#689f38';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 179, 66, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#7cb342';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 179, 66, 0.3)';
                }}
              >
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