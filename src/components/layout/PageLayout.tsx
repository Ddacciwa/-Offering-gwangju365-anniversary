// src/components/layout/PageLayout.tsx
import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showHero?: boolean;
}

const PageLayout = ({ children, title, subtitle, showHero = false }: PageLayoutProps) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container flex-grow-1 my-4">
        {showHero && (
          <div className="row mb-4">
            <div className="col">
              <h1 className="text-center">{title}</h1>
              {subtitle && <p className="text-center">{subtitle}</p>}
              <hr />
            </div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;