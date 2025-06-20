# 광주365재활병원 10주년 기념 프로젝트

🎉 **함께 걸어온 10년, 새로운 시작을 위한 특별한 여정**

## 프로젝트 소개

광주365재활병원 개원 10주년을 맞아 직원들과 함께하는 특별한 기념 프로젝트입니다. 병원에서 근무하며 쌓아온 소중한 이야기와 경험을 공유하고, 함께 꿈꾸는 미래를 그려보는 의미 있는 시간을 만들어갑니다.

## 🌟 참여 프로젝트

### 1. ✍️ 나에게 광주365재활병원이란?
- 본원에서 근무하며 느꼈던 것들을 짧은 글로 자유롭게 작성
- 개인적인 경험과 소감을 진솔하게 표현

### 2. 📖 병원 이모저모
- 근무하며 겪은 가장 감동적인/웃기는 에피소드 공모
- 동료들과 함께 나누고 싶은 특별한 순간들

### 3. 💝 감사 전하기
- 특별한 기억을 선사해주었던 동료에게 감사 인사
- 따뜻한 마음을 전하는 소통의 장

### 4. 🌟 우리가 꿈꾸는 병원
- 10년 후 우리 병원의 미래 모습 설문
- 함께 만들어가고 싶은 비전 공유

### 5. 🎉 10주년 축하 메시지
- 환자&직원이 함께 만드는 축하 메시지
- 10주년을 기념하는 따뜻한 메시지 모음

## 🚀 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **Backend**: Firebase (Authentication & Firestore)
- **Routing**: React Router DOM v6
- **Icons**: Bootstrap Icons
- **Fonts**: Pretendard (한글 최적화)

## 🎨 디자인 시스템

### 브랜드 컬러
- **Primary Blue**: #1565C0 (신뢰, 전문성)
- **Secondary Orange**: #FF8F00 (활력, 따뜻함)
- **Accent Green**: #7CB342 (성장, 희망)
- **Light Gray**: #F5F5F5 (깔끔함)
- **Dark Gray**: #424242 (가독성)

### 디자인 원칙
- **접근성**: 모든 사용자가 쉽게 사용할 수 있는 인터페이스
- **반응형**: 데스크톱, 태블릿, 모바일 모든 기기 지원
- **직관성**: 명확하고 이해하기 쉬운 UI/UX
- **브랜딩**: 병원의 정체성을 반영한 따뜻하고 전문적인 디자인

## 📱 주요 기능

### 인증 시스템
- Firebase Authentication을 통한 안전한 로그인/회원가입
- 이메일 기반 인증
- 자동 로그인 상태 유지

### 보호된 라우팅
- 로그인된 사용자만 프로젝트 참여 가능
- 미로그인 시 자동으로 회원가입 페이지로 이동

### 반응형 디자인
- 모바일 우선 설계
- Bootstrap 그리드 시스템 활용
- 다양한 화면 크기 최적화

### 사용자 경험
- 부드러운 애니메이션 효과
- 로딩 상태 표시
- 직관적인 내비게이션
- 접근성 준수

## 🛠 개발 환경 설정

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/Ddacciwa/-Offering-gwangju365-anniversary.git
cd -Offering-gwangju365-anniversary

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 환경 변수 설정

`.env` 파일을 생성하고 Firebase 설정을 추가하세요:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트
│   └── ui/              # UI 컴포넌트
├── pages/               # 페이지 컴포넌트
├── hooks/               # 커스텀 훅
├── services/            # 외부 서비스 (Firebase 등)
├── styles/              # 스타일 파일
├── types/               # TypeScript 타입 정의
└── utils/               # 유틸리티 함수
```

## 🎯 향후 계획

- [ ] 관리자 대시보드 추가
- [ ] 실시간 알림 기능
- [ ] 사진/파일 첨부 기능
- [ ] 댓글 및 좋아요 시스템
- [ ] 통계 및 분석 기능
- [ ] 모바일 앱 개발

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 광주365재활병원의 내부 프로젝트입니다.

## 📞 문의

**광주365재활병원**
- 주소: 광주광역시 서구 상무대로 312
- 전화: 062-717-0365
- 웹사이트: [광주365재활병원](http://www.gj365.co.kr)

---

*함께 걸어온 10년, 새로운 시작을 위한 특별한 여정에 함께해주세요! 🎉*