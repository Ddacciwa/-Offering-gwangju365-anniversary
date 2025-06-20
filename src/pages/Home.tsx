// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const sections = [
    {
      id: 'essay',
      title: '나에게 광주365재활병원이란?',
      description: '본원에서 근무하며 느꼈던 것들을 짧은 글로 자유롭게 작성하여 투고해주세요.',
      path: '/essay',
      icon: '✍️',
      color: '#1565C0'
    },
    {
      id: 'episodes',
      title: '병원 이모저모',
      description: '본원에서 근무하며 겪은 가장 감동적인/웃기는 에피소드를 공모하고 공유해요.',
      path: '/episodes',
      icon: '📖',
      color: '#FF8F00'
    },
    {
      id: 'gratitude',
      title: '감사 전하기',
      description: '특별한 기억을 선사해주었거나 감사한 일이 있었던 직원에게 감사의 마음을 전해보세요.',
      path: '/gratitude',
      icon: '💝',
      color: '#7CB342'
    },
    {
      id: 'dream-hospital',
      title: '우리가 꿈꾸는 병원',
      description: '한 줄로 정리한 10년 후 우리 병원의 미래 모습을 함께 그려보아요.',
      path: '/dream-hospital',
      icon: '🌟',
      color: '#1565C0'
    },
    {
      id: 'messages',
      title: '10주년 축하 메시지',
      description: '환자&직원이 함께 만드는 따뜻한 10주년 축하 메시지를 남겨주세요.',
      path: '/messages',
      icon: '🎉',
      color: '#FF8F00'
    }
  ];

  const handleNavigate = (path: string) => {
    if (!user && !loading) {
      navigate('/signup');
    } else {
      navigate(path);
    }
  };

  return (
    <PageLayout 
      title="광주365재활병원 10주년 기념 프로젝트" 
      subtitle="함께 걸어온 10년, 새로운 시작을 위한 특별한 여정"
      showHero
    >
      {/* Welcome Section */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <div className="fade-in-up">
            <h2 className="mb-4">🎉 개원 10주년을 축하합니다!</h2>
            <p className="lead mb-4">
              광주365재활병원이 지역사회와 함께 걸어온 소중한 10년. <br />
              직원 여러분과 함께 만들어가는 특별한 기념 프로젝트에 참여해주세요.
            </p>
            
            {!user && !loading && (
              <div className="fade-in-up-delay-1">
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/signup')}
                  className="btn-anniversary btn-lg px-5 py-3 mb-4"
                >
                  🚀 지금 시작하기
                </Button>
                <p className="small text-muted">
                  회원가입 후 모든 프로젝트에 참여하실 수 있습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {user && (
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div className="card anniversary-card fade-in-up-delay-2" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
              <div className="card-body text-center py-4">
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <h3 className="fw-bold mb-1">10년</h3>
                    <p className="mb-0 opacity-75">함께 걸어온 시간</p>
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0">
                    <h3 className="fw-bold mb-1">365일</h3>
                    <p className="mb-0 opacity-75">변함없는 돌봄</p>
                  </div>
                  <div className="col-md-4">
                    <h3 className="fw-bold mb-1">∞</h3>
                    <p className="mb-0 opacity-75">무한한 가능성</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Sections */}
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="mb-3">💫 참여 프로젝트</h2>
          <p className="lead text-muted mb-5">
            각 프로젝트에 참여하여 소중한 이야기를 함께 만들어가세요.
          </p>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {sections.map((section, index) => (
          <div className="col" key={section.id}>
            <div className={`anniversary-card h-100 fade-in-up-delay-${index % 3 + 1}`}>
              <div className="card-body d-flex flex-column">
                <div className="text-center mb-3">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: `linear-gradient(135deg, ${section.color}20, ${section.color}40)`,
                      fontSize: '2rem'
                    }}
                  >
                    {section.icon}
                  </div>
                </div>
                
                <h5 className="card-title text-center mb-3">{section.title}</h5>
                <p className="card-text flex-grow-1 text-center">{section.description}</p>
                
                <div className="text-center mt-auto">
                  <Button
                    variant="primary"
                    onClick={() => handleNavigate(section.path)}
                    className="btn-anniversary w-100"
                  >
                    {user ? '참여하기' : '회원가입 후 참여'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card anniversary-card text-center" style={{ background: 'var(--gradient-secondary)', color: 'white' }}>
            <div className="card-body py-5">
              <h3 className="mb-3">🌈 함께 만드는 특별한 10주년</h3>
              <p className="lead mb-4 opacity-90">
                여러분의 소중한 이야기와 경험이 모여<br />
                광주365재활병원의 새로운 10년을 만들어갑니다.
              </p>
              {!user && !loading && (
                <Button 
                  variant="outline-light" 
                  onClick={() => navigate('/signup')}
                  className="btn-lg px-5"
                >
                  지금 참여하기
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;