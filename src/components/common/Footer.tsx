// src/components/common/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-anniversary">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-2 mb-md-0">
              {/* 광주365 실제 로고 */}
              <div className="me-3">
                <img 
                  src="/logo.png" 
                  alt="365 로고" 
                  style={{ 
                    width: '55px', 
                    height: '55px',
                    borderRadius: '20px',
                    background: 'white',
                    padding: '5px'
                  }} 
                />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">광주365재활병원</h6>
                <p className="mb-0 small opacity-75">함께 걸는 10년, 새로운 시작</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-1 small">
              <i className="bi bi-geo-alt-fill me-1"></i>
              광주광역시 광산구 하남마항로 26
            </p>
            <p className="mb-1 small">
              <i className="bi bi-telephone-fill me-1"></i>
              062-950-9577
            </p>
            <p className="mb-0 small opacity-75">
              © 2025 광주365재활병원. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;