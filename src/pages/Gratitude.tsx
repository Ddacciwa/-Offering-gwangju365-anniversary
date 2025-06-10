// src/pages/Gratitude.tsx
import PageLayout from '../components/layout/PageLayout';
import GratitudeForm from '../components/forms/GratitudeForm';

const Gratitude = () => {
  return (
    <PageLayout title="감사 전하기">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <p className="card-text mb-4">
                특별한 기억을 선사해주었거나 감사한 일이 있었던 직원에게 감사의 마음을 전해보세요. 여러분의 따뜻한 이야기가 10주년 기념서 제작에 도움이 됩니다.
                <br />
                <span className="text-primary fw-bold">BEST 사연에 채택되신 분에게는 소정의 상품을 드립니다.</span>
              </p>
              <GratitudeForm />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Gratitude;