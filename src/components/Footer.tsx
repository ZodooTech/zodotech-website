import React from 'react';
import { BrandLogo } from './BrandLogo';
import { NavigationPage } from '../types';
import { Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06122F] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <BrandLogo variant="light" size="md" showTagline />
            </button>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Specialized Odoo ERP implementations, custom addons development, robust third-party system integrations, and business process automation engineered for sustained operational stability.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#00D5F2]" />
              <span>Official Odoo inheritance standards &amp; upgrade-safe code</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Services Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('industries')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Industry Verticals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('estimator')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Architecture Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  About ZodoTech
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 text-left"
                >
                  Odoo ERP Implementation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 text-left"
                >
                  Custom Module Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 text-left"
                >
                  Workflow Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 text-left"
                >
                  REST / JSON-RPC Integrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 text-left"
                >
                  Legacy Code Refactoring
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Direct developer inquiries &amp; RFP submissions:
            </p>
            <a
              href="mailto:odoodeveloper10@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-[#00D5F2] hover:text-white transition-colors font-medium break-all"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>odoodeveloper10@gmail.com</span>
            </a>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleNav('contact')}
                className="inline-flex items-center gap-1.5 text-xs text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Submit RFP Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} ZodoTech. All rights reserved. Odoo is a trademark of Odoo S.A.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
