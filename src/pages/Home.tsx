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
      description: '본원에서 근무하며 느꼈던 것들을 짧은 글로 자유롭게 작성하여 투고',
      path: '/essay'
    },
    {
      id: 'episodes',
      title: '병원 이모저모',
      description: '본원에서 근무하며 겪은 가장 감동적인/웃기는 에피소드를 공모하고 공유',
      path: '/episodes'
    },
    {
      id: 'gratitude',
      title: '감사 전하기',
      description: '특별한 기억을 선사해주었거나 감사한 일이 있었던 직원에게 감사의 마음을 전하는 글',
      path: '/gratitude'
    },
    {
      id: 'dream-hospital',
      title: '우리가 꿈꾸는 병원',
      description: '한 줄로 정리한 10년 후 우리 병원의 미래 모습을 설문',
      path: '/dream-hospital'
    },
    {
      id: 'messages',
      title: '10주년 축하 메시지',
      description: '환자&직원이 함께 만드는 10주년 축하 메시지 모음',
      path: '/messages'
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
    <PageLayout title="광주365재활병원 10주년 기념 프로젝트">
      <div className="row mb-4">
        <div className="col text-center">
          <p className="lead">
            광주365재활병원 개원 10주년을 맞아 직원들과 함께하는 특별한 프로젝트입니다.
          </p>
          {!user && !loading && (
            <div className="mt-4">
              <Button 
                variant="primary" 
                onClick={() => navigate('/signup')}
                className="px-4 py-2"
              >
                회원가입하여 시작하기
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4 mt-3">
        {sections.map((section) => (
          <div className="col" key={section.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{section.title}</h5>
                <p className="card-text">{section.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0 text-end">
                <Button
                  variant="primary"
                  onClick={() => handleNavigate(section.path)}
                >
                  참여하기
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;