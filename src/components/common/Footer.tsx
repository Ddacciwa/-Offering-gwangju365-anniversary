// src/components/common/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-anniversary">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-2 mb-md-0">
              {/* 광주365 로고 */}
              <div className="d-flex align-items-center justify-content-center me-3" style={{
                background: 'white',
                color: '#1565C0',
                fontWeight: 'bold',
                fontSize: '1rem',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}>
                  <span style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>365</span>
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#FF8F00'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#7CB342'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#E0E0E0'
                  }} />
                </div>
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
              광주광역시 서구 상무대로 312
            </p>
            <p className="mb-1 small">
              <i className="bi bi-telephone-fill me-1"></i>
              062-717-0365
            </p>
            <p className="mb-0 small opacity-75">
              © 2024 광주365재활병원. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;