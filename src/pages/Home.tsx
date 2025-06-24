// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e5ba8 0%, #2b76c9 50%, #7cb342 100%)',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(124,179,66,0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `
        }}></div>
        
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="text-white mb-5">
                <h1 className="display-3 fw-bold mb-4" style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  lineHeight: '1.2'
                }}>
                  <span style={{ color: '#7cb342' }}>광주365재활병원</span>
                  <br />
                  <span style={{ fontSize: '0.8em' }}>개원 10주년</span>
                </h1>
                <p className="lead mb-4" style={{
                  fontSize: '1.3rem',
                  textShadow: '0 1px 5px rgba(0,0,0,0.2)',
                  lineHeight: '1.6'
                }}>
                  10년간 함께해주신 모든 분들께 감사드리며,<br />
                  여러분의 소중한 이야기와 추억을 나눠주세요.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link 
                    to="/essay" 
                    className="btn btn-lg fw-semibold"
                    style={{
                      backgroundColor: '#7cb342',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '30px',
                      padding: '12px 30px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(124,179,66,0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,179,66,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(124,179,66,0.3)';
                    }}
                  >
                    <i className="fas fa-pen-fancy me-2"></i>
                    이야기 시작하기
                  </Link>
                  <Link 
                    to="/episodes" 
                    className="btn btn-outline-light btn-lg fw-semibold"
                    style={{
                      borderRadius: '30px',
                      padding: '12px 30px',
                      textDecoration: 'none',
                      borderWidth: '2px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fas fa-camera me-2"></i>
                    추억 둘러보기
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '30px',
                padding: '60px 40px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {/* 실제 로고 자리 */}
                <div style={{
                  width: '200px',
                  height: '200px',
                  margin: '0 auto 30px',
                  background: 'white',
                  borderRadius: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  border: '4px solid rgba(255,255,255,0.3)'
                }}>
                  {/* 여기에 실제 365 로고 이미지를 넣어주세요 */}
                  <img 
                    src="/path/to/365-hospital-logo.png" 
                    alt="광주365재활병원 로고" 
                    style={{ 
                      width: '160px', 
                      height: '160px', 
                      objectFit: 'contain' 
                    }} 
                  />
                </div>
                <h3 className="text-white fw-bold mb-3" style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  함께 만들어가는 10주년
                </h3>
                <p className="text-white-50" style={{
                  fontSize: '1.1rem',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}>
                  여러분의 소중한 목소리가<br />
                  우리 병원의 미래를 만듭니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ color: '#1e5ba8' }}>
              참여하기
            </h2>
            <p className="lead text-muted">
              다양한 방법으로 10주년 기념에 함께해주세요
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <Link to="/essay" style={{ textDecoration: 'none' }}>
                <div className="card h-100 border-0 shadow-sm" style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(30,91,168,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e5ba8, #2b76c9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-heart fa-2x text-white"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3" style={{ color: '#1e5ba8' }}>
                      나에게 병원이란?
                    </h5>
                    <p className="card-text text-muted">
                      병원이 나에게 어떤 의미인지 솔직한 이야기를 들려주세요.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3">
              <Link to="/episodes" style={{ textDecoration: 'none' }}>
                <div className="card h-100 border-0 shadow-sm" style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255,107,107,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-camera fa-2x text-white"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3" style={{ color: '#ff6b6b' }}>
                      병원 이모저모
                    </h5>
                    <p className="card-text text-muted">
                      병원에서 있었던 재미있는 에피소드나 특별한 순간들을 공유해주세요.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3">
              <Link to="/gratitude" style={{ textDecoration: 'none' }}>
                <div className="card h-100 border-0 shadow-sm" style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255,193,7,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ffc107, #ffcd39)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-hands fa-2x text-dark"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3" style={{ color: '#ffc107' }}>
                      감사 전하기
                    </h5>
                    <p className="card-text text-muted">
                      병원 가족들에게 전하고 싶은 감사의 마음을 표현해주세요.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3">
              <Link to="/dream-hospital" style={{ textDecoration: 'none' }}>
                <div className="card h-100 border-0 shadow-sm" style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(124,179,66,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7cb342, #8bc34a)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="fas fa-hospital fa-2x text-white"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3" style={{ color: '#7cb342' }}>
                      꿈꾸는 병원
                    </h5>
                    <p className="card-text text-muted">
                      미래의 병원이 어떤 모습이면 좋을지 상상해서 들려주세요.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #1e5ba8 0%, #2b76c9 100%)'
      }}>
        <div className="container">
          <div className="row text-center text-white">
            <div className="col-md-3 mb-4">
              <div>
                <h3 className="display-4 fw-bold mb-2" style={{ color: '#7cb342' }}>10</h3>
                <p className="mb-0 fs-5">개원 주년</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div>
                <h3 className="display-4 fw-bold mb-2" style={{ color: '#7cb342' }}>365</h3>
                <p className="mb-0 fs-5">매일 함께</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div>
                <h3 className="display-4 fw-bold mb-2" style={{ color: '#7cb342' }}>∞</h3>
                <p className="mb-0 fs-5">무한한 관심</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div>
                <h3 className="display-4 fw-bold mb-2" style={{ color: '#7cb342' }}>❤️</h3>
                <p className="mb-0 fs-5">따뜻한 마음</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;