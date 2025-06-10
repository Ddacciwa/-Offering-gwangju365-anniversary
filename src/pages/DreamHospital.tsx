// src/pages/DreamHospital.tsx
import PageLayout from '../components/layout/PageLayout';
import DreamHospitalForm from '../components/forms/DreamHospitalForm';

const DreamHospital = () => {
  return (
    <PageLayout title="우리가 꿈꾸는 병원">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <p className="card-text mb-4">
                한 줄로 정리한 10년 후 우리 병원의 미래 모습을 작성해주세요.
                여러분의 비전을 바탕으로 AI 이미지를 생성할 수 있습니다.
              </p>
              <DreamHospitalForm />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DreamHospital;