import React, { useState } from 'react';
import { NavigationPage } from '../types';
import { LiveWorkflowSandbox } from '../components/LiveWorkflowSandbox';
import {
  ArrowRight,
  Layers,
  Sliders,
  Code2,
  Share2,
  Zap,
  Wrench,
  CheckCircle2,
  ChevronDown,
  Search,
  ExternalLink,
  ShieldCheck,
  Building2,
  Users2,
  Package,
  Receipt,
  FileText
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectService?: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectService }) => {
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedModuleCategory, setSelectedModuleCategory] = useState<'core' | 'operations' | 'custom'>('core');

  const faqs = [
    {
      q: 'What is Odoo ERP, and how can it benefit my company?',
      a: 'Odoo is a comprehensive suite of integrated business applications covering CRM, sales, inventory, accounting, purchasing, manufacturing, and HR. Because all applications share a single PostgreSQL database, data flows automatically between departments without double-entry errors.',
      category: 'general',
    },
    {
      q: 'Can Odoo be customized to match our unique workflow?',
      a: 'Yes. Odoo is designed from the ground up for modular inheritance. We adapt models, views, approval tiers, PDF reports, and calculation algorithms strictly using standard Python addon inheritance without touching base source code, ensuring effortless version upgrades.',
      category: 'customization',
    },
    {
      q: 'Can you integrate Odoo with external platforms and logistics providers?',
      a: 'Yes. We build high-throughput connectors using Odoo\'s native JSON-RPC/XML-RPC protocols and custom REST controllers. We frequently integrate freight carriers (FedEx, DHL, custom logistics), payment gateways (Stripe, Adyen), external storefronts (Shopify, WooCommerce), and legacy databases.',
      category: 'integration',
    },
    {
      q: 'Can you work with our existing Odoo implementation and fix broken addons?',
      a: 'Yes. A large share of our work involves auditing existing Odoo databases, refactoring slow queries, fixing buggy custom modules, resolving broken dependencies, and bringing legacy code up to official Odoo development standards.',
      category: 'maintenance',
    },
    {
      q: 'How does a typical project start with ZodoTech?',
      a: 'Every engagement begins with an objective requirement review. You share your existing tools and pain points via our inquiry form or estimator. We evaluate your workflow, clarify details, and provide a clear statement of work with concrete milestones, timelines, and budget expectations.',
      category: 'general',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Subtle radial backdrop glow */}
        <div className="absolute top-0 right-0 w-full max-w-4xl h-96 bg-hero-glow pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Value Proposition Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0878F9] bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-[#00D5F2]" />
                <span>Odoo ERP Architecture &amp; Development</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#071A42] tracking-tight leading-[1.12]">
                Make Your Business Work Smarter with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0878F9] via-[#00D5F2] to-[#8B18F5]">
                  Odoo
                </span>
                .
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                From full-scale ERP implementation and custom module development to business process automation, ZodoTech helps you simplify operations, eliminate manual handoffs, and scale with confidence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 text-base font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('estimator')}
                  className="px-6 py-3.5 text-base font-semibold text-[#071A42] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Architecture Estimator</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Official Odoo inheritance standards</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Upgrade-safe custom addons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transparent milestone delivery</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_odoo_datacenter_1793268529744.jpg"
                  alt="Enterprise Odoo Resource Architecture Operations"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06122F] via-[#06122F]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[11px] font-mono text-[#00D5F2] uppercase tracking-wider block mb-1">
                    Enterprise Operations
                  </span>
                  <p className="text-sm font-semibold text-slate-200">
                    High-reliability ERP architectures connecting inventory, accounting, and sales in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Live Workflow Sandbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
            Interactive System Sandbox
          </span>
          <h2 className="text-3xl font-bold text-[#071A42] tracking-tight">
            See Connected Workflows in Action
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Experience how ZodoTech engineers seamless automated transitions between CRM, Sales, Multi-Warehouse logistics, and Accounting.
          </p>
        </div>
        <LiveWorkflowSandbox />
      </section>

      {/* 3. Operational Realities / Problem Statements */}
      <section className="bg-slate-50/70 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
              Operational Reality
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#071A42] tracking-tight">
              Disconnected Processes Slow Your Business Down.
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              When business software doesn't fit your daily operations, your team wastes critical hours manually bridging the gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-[#071A42] mb-2">
                Repetitive Manual Work
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Teams re-entering data across spreadsheets and disparate tools introduce recurring typing errors, slow customer response times, and duplicate work.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-[#071A42] mb-2">
                Fragmented Business Systems
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sales pipelines, inventory stock levels, and general ledgers operating in silos leave leadership without accurate, real-time margin visibility.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-[#071A42] mb-2">
                Rigid Generic Software
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Off-the-shelf software rarely conforms to proprietary logistics routes, custom pricing tiers, or specific regulatory approval gates.
              </p>
            </div>
          </div>

          <div className="mt-10 p-5 bg-blue-50/60 rounded-xl border border-blue-200/60 text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-[#071A42]">
              Connected ERP systems and carefully designed customizations eliminate operational bottlenecks by letting software support your actual operating model.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities / Services Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#071A42] tracking-tight">
              Technology That Works Around Your Business.
            </h2>
            <p className="text-slate-600 mt-2 text-base max-w-2xl">
              Engineered Odoo solutions developed to improve operational speed, reduce technical debt, and scale seamlessly.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0878F9] hover:text-[#0666d6] cursor-pointer shrink-0"
          >
            <span>View All Services &amp; Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-5 group-hover:bg-[#0878F9] group-hover:text-white transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#071A42] mb-2.5">
                Odoo ERP Implementation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Architecture, database configuration, master data migration, and deployment configured specifically around your operational processes and team roles.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('services');
                onSelectService?.('implementation');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline cursor-pointer pt-3 border-t border-slate-100"
            >
              <span>Explore implementation approach</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-5 group-hover:bg-[#0878F9] group-hover:text-white transition-colors">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#071A42] mb-2.5">
                Odoo Customization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Tailor views, standard form fields, automated validation rules, PDF QWeb reports, and pricing algorithms to match your actual operating policies.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('services');
                onSelectService?.('customization');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline cursor-pointer pt-3 border-t border-slate-100"
            >
              <span>View customization capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-5 group-hover:bg-[#0878F9] group-hover:text-white transition-colors">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#071A42] mb-2.5">
                Custom Module Development
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Build bespoke, modular, and maintainable Odoo addons with dedicated PostgreSQL models, XML views, and security groups for proprietary workflows.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('services');
                onSelectService?.('modules');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline cursor-pointer pt-3 border-t border-slate-100"
            >
              <span>Review addon architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-5 group-hover:bg-[#0878F9] group-hover:text-white transition-colors">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#071A42] mb-2.5">
                Odoo API Integrations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Connect Odoo with third-party web services, payment gateways, freight tracking APIs, customer platforms, and legacy databases via robust data pipelines.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('services');
                onSelectService?.('integrations');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline cursor-pointer pt-3 border-t border-slate-100"
            >
              <span>Explore integration options</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 5 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-5 group-hover:bg-[#0878F9] group-hover:text-white transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#071A42] mb-2.5">
                Business Process Automation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Automate routine approvals, alerts, document generation, and status triggers across departments to eliminate repetitive human oversight.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('services');
                onSelectService?.('automation');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline cursor-pointer pt-3 border-t border-slate-100"
            >
              <span>View automation triggers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 6 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-5 group-hover:bg-[#0878F9] group-hover:text-white transition-colors">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#071A42] mb-2.5">
                Support &amp; Refactoring
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Diagnose performance bottlenecks, refactor legacy custom modules, fix workflow deadlocks, and keep your production instance reliable.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('services');
                onSelectService?.('support');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline cursor-pointer pt-3 border-t border-slate-100"
            >
              <span>Learn about maintenance plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Odoo Core Functional Matrix */}
      <section className="bg-slate-50/80 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
              Functional Coverage
            </span>
            <h2 className="text-3xl font-bold text-[#071A42] tracking-tight">
              Extend Odoo With Solutions Built for Real Workflows
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              We specialize across the entire functional surface of the Odoo ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#071A42] font-bold text-base">
                <Users2 className="w-4 h-4 text-[#0878F9]" />
                <h4>Sales &amp; CRM</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lead qualification stages, automated quotation follow-ups, price lists, multi-currency margins, commission structures.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#071A42] font-bold text-base">
                <Receipt className="w-4 h-4 text-[#0878F9]" />
                <h4>Accounting &amp; Invoicing</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated bank reconciliation, localized tax templates, analytic accounting, audit-ready balance sheet and P&amp;L reports.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#071A42] font-bold text-base">
                <Package className="w-4 h-4 text-[#0878F9]" />
                <h4>Inventory &amp; Warehousing</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-warehouse routing, double-entry inventory tracking, serial &amp; batch numbers, landed cost distribution.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#071A42] font-bold text-base">
                <Building2 className="w-4 h-4 text-[#0878F9]" />
                <h4>Purchasing &amp; Supply</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vendor bill matching, tiered approval hierarchies, reordering rules, vendor evaluations, drop-shipping setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Four-Step Delivery Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
            Structured Delivery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#071A42] tracking-tight">
            From Business Requirements to Working Software.
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            A disciplined, risk-mitigated engineering process engineered to prevent scope creep and guarantee upgrade compatibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 relative">
            <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
              Phase 01
            </span>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">Understand</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We interview key team members, map operational handoffs, examine current pain points, and document objective technical deliverables.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 relative">
            <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
              Phase 02
            </span>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">Design</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We prioritize native Odoo configurations first. We specify custom PostgreSQL models, views, and APIs only where real leverage is gained.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 relative">
            <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
              Phase 03
            </span>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">Develop &amp; Validate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We build clean Python addons, write automated unit tests, and rigorously validate the workflows against your sanitized production test data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 relative">
            <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
              Phase 04
            </span>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">Deliver &amp; Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We deploy seamlessly to your staging and production environments, deliver comprehensive user documentation, and provide post-launch support.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Interactive Architecture Estimator Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#071A42] to-[#0A1C47] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono text-[#00D5F2] uppercase tracking-wider block">
              Self-Service Planning Tool
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Calculate Your Custom Odoo Scope &amp; Architecture
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Select your team size, target deployment environment (Odoo.sh or On-Premise), required business modules, and custom integrations to generate a structured implementation roadmap.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('estimator')}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-xl shadow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Architecture Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
            Clear Answers
          </span>
          <h2 className="text-3xl font-bold text-[#071A42] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Everything you need to know about our technical scope, customization rules, and project delivery.
          </p>

          {/* Quick FAQ Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g. upgrades, API, customization)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0878F9] focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-base font-semibold text-[#071A42] hover:text-[#0878F9] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0878F9]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No questions found matching &quot;{faqSearch}&quot;. You can email us your question directly!
            </div>
          )}
        </div>
      </section>

      {/* 9. Final CTA Conversion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#06122F] rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-mono text-[#00D5F2] uppercase tracking-wider block">
              Start The Conversation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let&apos;s Build a Better Way to Work.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tell us about your business challenges, current Odoo database, or the custom module you want to develop. We&apos;ll analyze your requirements and propose a practical technical roadmap.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 text-sm font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Project Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:odoodeveloper10@gmail.com"
                className="px-7 py-3.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <span>Email Our Team Directly</span>
              </a>
            </div>
            <div className="text-xs text-slate-400 pt-3">
              Direct inbox: <span className="text-[#00D5F2]">odoodeveloper10@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
