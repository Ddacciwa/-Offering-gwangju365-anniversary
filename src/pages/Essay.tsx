// src/pages/Essay.tsx
import PageLayout from "../components/layout/PageLayout";
import EssayForm from "../components/forms/EssayForm";

const Essay = () => {
  return (
    <PageLayout title="나에게 광주365재활병원이란?">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <p className="card-text mb-4">
                본원에서 근무하며 느꼈던 긍정적인 부분 혹은 변화들을 A4 0.5~1p 분량 정도의 짧은 글로 자유롭게 작성하여 투고해주세요.
                특히 사내 복지제도(육아휴직, 동호회, 교육 프로그램 등)에 관련된 소감이 있으면 함께 작성해주시면 좋을 것 같습니다.
                <br />
                <span className="text-primary fw-bold">BEST 사연에 채택되신 분에게는 소정의 상품을 드립니다.</span>
              </p>
              <EssayForm />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Essay;