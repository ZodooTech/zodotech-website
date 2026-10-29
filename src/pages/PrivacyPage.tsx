import React from 'react';
import { NavigationPage } from '../types';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
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
          Legal Notice
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071A42] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Effective Date: January 1, 2026 · ZodoTech Engineering Consultancy
        </p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">1. Information We Collect</h2>
          <p>
            We collect personal and business information that you voluntarily provide to us when submitting project inquiries, requesting architecture estimates, or contacting our developers directly. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Your full name and contact information (including business email address and phone number).</li>
            <li>Company details, current ERP infrastructure, and active team size.</li>
            <li>Operational project descriptions, target modules, and technical specifications.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">2. Purpose and Legal Basis for Processing</h2>
          <p>
            We process your information solely for legitimate business purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Evaluating system requirements and formulating technical proposals or Statements of Work.</li>
            <li>Communicating directly with your team regarding scope clarifications and scheduling.</li>
            <li>Maintaining internal records of technical engagements.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">3. Data Transmission &amp; Form Processing</h2>
          <p>
            Submissions through our website inquiry form are routed securely via FormSubmit (an encrypted form processing gateway) to our primary inbox at <span className="font-semibold text-slate-800">odoodeveloper10@gmail.com</span>. We do not sell, rent, or trade your contact information with external marketing brokers or advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">4. Data Retention &amp; Security</h2>
          <p>
            We implement industry-standard security measures to safeguard your communications. Inactive inquiry records are purged periodically unless retained pursuant to an active Master Services Agreement (MSA) or non-disclosure agreement (NDA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#071A42]">5. Your Rights &amp; Inquiries</h2>
          <p>
            You have the right to request access to, correction of, or deletion of any contact information we hold. Direct any inquiries regarding this policy to:
          </p>
          <p className="font-semibold text-slate-800">
            Email: <a href="mailto:odoodeveloper10@gmail.com" className="text-[#0878F9] underline">odoodeveloper10@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};
