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
                AI 도구로 
                미래 병원 이미지를 생성하여 업로드하시면 더욱 창의적인 비전을 표현할 수 있습니다.
                <br />
                <span className="text-primary fw-bold">BEST 사연에 채택되신 분에게는 소정의 상품을 드립니다.</span>
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