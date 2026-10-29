import React from 'react';
import { NavigationPage } from '../types';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </button>
        <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-1">
          Terms &amp; Disclaimers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071A42] tracking-tight">
          Terms of Use
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Effective Date: January 1, 2026 · ZodoTech Engineering Consultancy
        </p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">1. Informational Purposes &amp; Non-Binding Estimates</h2>
          <p>
            The content, architecture estimators, workflow sandboxes, and technical descriptions provided on this website are for informational and conceptual planning purposes only. Formal software engineering deliverables, timelines, warranties, service level agreements (SLAs), and pricing are established exclusively through executed written Statements of Work (SOW) or Master Services Agreements (MSA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">2. Trademark &amp; Independent Consultancy Notice</h2>
          <p>
            <strong>ZodoTech</strong> and its orbital logo mark are trademarks of ZodoTech. <strong>Odoo</strong> is a registered trademark of Odoo S.A. ZodoTech is an independent software development and business transformation consultancy. Unless expressly stated in writing, no endorsement, official partnership, or sponsorship by Odoo S.A. is implied.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">3. Intellectual Property Rights in Custom Addons</h2>
          <p>
            Unless otherwise stipulated in a client agreement, custom modules developed by ZodoTech conform to standard open-source (LGPL/GPL) or proprietary enterprise licensing as dictated by the target Odoo edition and customer agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, ZodoTech shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, information or planning tools on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">5. Contact Regarding Terms</h2>
          <p>
            Direct any contractual inquiries or notices to: <a href="mailto:odoodeveloper10@gmail.com" className="text-[#0878F9] underline">odoodeveloper10@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
