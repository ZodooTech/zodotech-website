import React from 'react';
import { NavigationPage } from '../types';
import { Shield, GitBranch, Lock, Cpu, ArrowRight, Check, X } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="pt-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
          About ZodoTech
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071A42] tracking-tight">
          Practical Engineering for Real Business Operations
        </h1>
        <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
          We bridge the gap between complex enterprise software and the everyday realities of running a business.
        </p>
      </section>

      {/* Brand Philosophy */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
          Our Brand Philosophy: Build · Customize · Grow
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          At ZodoTech, our mission is grounded in three simple directives: <strong>Build, Customize, and Grow</strong>. We believe technology should eliminate friction rather than create it. When businesses implement an ERP system like Odoo, they often encounter solutions that are either too rigid to accommodate their processes or so overly customized that future upgrades become a costly nightmare.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          We take a balanced, pragmatic approach. We respect the engineering that makes Odoo powerful out of the box, and we write custom code only when it yields genuine operational leverage.
        </p>
      </section>

      {/* Four Engineering Pillars */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
            Non-Negotiables
          </span>
          <h2 className="text-3xl font-bold text-[#071A42] tracking-tight">
            Our Four Engineering Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42]">1. Respect the Core</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We configure native Odoo workflows and settings before writing a single line of custom code. Re-inventing existing standard functionality creates technical debt; leveraging it keeps your ERP lean.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42]">2. Clean Architecture &amp; Inheritance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every custom module is isolated in its own addon package adhering strictly to Odoo <code className="text-xs font-mono">_inherit</code> patterns. We never modify base core files.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42]">3. Security &amp; Access Controls</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Security is not an afterthought. Explicit record rules, user group hierarchies, and multi-company segregation are designed into every custom model from day one.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42]">4. Upgrade-Proof Engineering</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When Odoo releases new major versions (e.g., v16 to v17 or v18), clean addons migrate in days rather than requiring full ground-up rewrites.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison: Ad-hoc vs ZodoTech Standard */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
            The Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42] tracking-tight">
            Ad-Hoc Development vs. ZodoTech Engineering
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Evaluation Dimension</th>
                <th className="py-3 px-4 text-rose-600 font-semibold">Typical Quick-Fix Customization</th>
                <th className="py-3 px-4 text-[#0878F9] font-semibold">ZodoTech Certified Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4 px-4 font-semibold text-slate-800">Core Code Modification</td>
                <td className="py-4 px-4 text-slate-500 flex items-start gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Direct edits to standard addons (breaks on update)</span>
                </td>
                <td className="py-4 px-4 text-slate-700 font-medium">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>100% decoupled custom addons using class inheritance</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-slate-800">Database Indexing &amp; Queries</td>
                <td className="py-4 px-4 text-slate-500 flex items-start gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Unindexed computed fields causing table lock delays</span>
                </td>
                <td className="py-4 px-4 text-slate-700 font-medium">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Explicit index tags, stored compute decorators, query audits</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-slate-800">Security &amp; Model Access</td>
                <td className="py-4 px-4 text-slate-500 flex items-start gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Wildcard or missing access CSV rules</span>
                </td>
                <td className="py-4 px-4 text-slate-700 font-medium">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Strict role-based permissions and multi-company record rules</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-slate-800">Version Migration Readiness</td>
                <td className="py-4 px-4 text-slate-500 flex items-start gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Requires full expensive rewrite each new year</span>
                </td>
                <td className="py-4 px-4 text-slate-700 font-medium">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Smooth, predictable migrations preserving historical data</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-xl mx-auto pt-6">
        <h3 className="text-2xl font-bold text-[#071A42] mb-3">
          Experience the ZodoTech Difference
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Schedule a scoping session with our lead engineers to evaluate your current setup.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-7 py-3 text-sm font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Initiate Project Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
