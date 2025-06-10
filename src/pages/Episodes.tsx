// src/pages/Episodes.tsx
import PageLayout from '../components/layout/PageLayout';
import EpisodeForm from '../components/forms/EpisodeForm';

const Episodes = () => {
  return (
    <PageLayout title="병원 이모저모">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <p className="card-text mb-4">
                본원에서 근무하며 겪었던, 기억에 남는 '감동적인 이야기' 또는 '재미있는 에피소드'를 작성해주세요. 여러분의 소중한 이야기가 10주년 기념서 제작에 도움이 됩니다.
                <br />
                <span className="text-primary fw-bold">BEST 사연에 채택되신 분에게는 소정의 상품을 드립니다.</span>
              </p>
              <EpisodeForm />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Episodes;