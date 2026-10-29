/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationPage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { EstimatorPage } from './pages/EstimatorPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [prefillMessage, setPrefillMessage] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();

  // Synchronize with URL hash for navigation & direct bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'industries', 'estimator', 'about', 'contact', 'privacy', 'terms'].includes(hash)) {
        setCurrentPage(hash as NavigationPage);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('services');
    setTimeout(() => {
      const el = document.getElementById(serviceId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#101B35] font-sans antialiased selection:bg-[#0878F9]/20 selection:text-[#071A42]">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0878F9] focus:text-white focus:rounded-md focus:shadow-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Announcement Bar */}
      <aside className="bg-[#06122F] text-slate-300 text-xs py-2 px-4 border-b border-slate-800 text-center flex items-center justify-center gap-2">
        <span className="text-slate-400">Practical Odoo ERP solutions for growing businesses.</span>
        <button
          onClick={() => handleNavigate('services')}
          className="text-[#00D5F2] hover:text-white font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Explore our capabilities</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </aside>

      {/* Primary 3-Zone Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onSelectService={handleSelectService} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} initialServiceId={selectedServiceId} />
        )}
        {currentPage === 'industries' && (
          <IndustriesPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'estimator' && (
          <EstimatorPage
            onNavigate={handleNavigate}
            onSetPrefillMessage={(msg) => setPrefillMessage(msg)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'contact' && (
          <ContactPage prefillMessage={prefillMessage} />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'terms' && (
          <TermsPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'notfound' && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
