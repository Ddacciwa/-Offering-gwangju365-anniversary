// src/components/common/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-light py-4">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="mb-0">
                © {currentYear} 광주365재활병원. 개원 10주년을 축하합니다.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;