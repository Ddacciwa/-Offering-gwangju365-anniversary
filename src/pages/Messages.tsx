// src/pages/Messages.tsx
import PageLayout from '../components/layout/PageLayout';
import MessageForm from '../components/forms/MessageForm';

const Messages = () => {
  return (
    <PageLayout title="10주년 축하 메시지">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <p className="card-text mb-4">
                광주365재활병원의 개원 10주년을 기념하여 축하 메시지를 남겨주세요.
                여러분의 메시지는 캘리그래피 스타일로 10주년 기념 자료에 수록됩니다.
              </p>
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Messages;