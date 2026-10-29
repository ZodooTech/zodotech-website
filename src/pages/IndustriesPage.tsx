import React from 'react';
import { NavigationPage } from '../types';
import {
  Truck,
  Factory,
  Briefcase,
  Store,
  Building,
  HeartPulse,
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <section className="pt-12 text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
          Vertical Specialization
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071A42] tracking-tight">
          Solutions for Different Business Environments
        </h1>
        <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
          Every industry operates under distinct commercial, regulatory, and inventory conditions. We tailor Odoo to address your sector&apos;s specific workflow realities.
        </p>
      </section>

      {/* Featured Visual Spotlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Industry 1: Logistics & Freight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0878F9] bg-blue-50 px-3 py-1 rounded-full">
              <Truck className="w-4 h-4" />
              <span>Logistics, Freight &amp; Warehousing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
              Real-Time Container Dispatch &amp; Freight Documentation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Managing freight requires seamless coordination between container manifests, customs clearance checkpoints, driver schedules, and multi-currency billing.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Automated generation of Bills of Lading, shipping manifests, and customs declaration sets.</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Real-time container tracking milestones mapped directly into customer portal views.</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dynamic landed cost allocation across split cargo shipments for true net profit analysis.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Discuss Logistics Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md relative group">
              <img
                src="/src/assets/images/industry_logistics_warehouse_1793268531145.jpg"
                alt="Automated High-Bay Warehouse and Fleet Operations"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06122F]/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-medium text-white">
                  Multi-Route Warehouse Picking &amp; Transport Scheduling System
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry 2: Manufacturing & Assembly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md relative group">
              <img
                src="/src/assets/images/industry_manufacturing_precision_1793268530735.jpg"
                alt="Precision CNC Manufacturing and Engineering Blueprints"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06122F]/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-medium text-white">
                  Work Center Routing, Quality Control &amp; Multi-Level BOM Allocation
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0878F9] bg-blue-50 px-3 py-1 rounded-full">
              <Factory className="w-4 h-4" />
              <span>Precision Manufacturing &amp; Industrial Assembly</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
              Multi-Level BOMs, Work Centers &amp; Scrap Control
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Industrial workshops require accurate tracking of raw material consumption, subcontracted finishing, labor overhead, and strict quality control gates.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Multi-level Bill of Materials (BOM) with automatic component reservation upon sales order confirmation.</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Barcode tablet kiosks on shop floors for direct operator time tracking and scrap recording.</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Automated quality checkpoints preventing defective batches from progressing to final packaging.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Discuss Manufacturing Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Verticals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
            Broader Industry Deployments
          </span>
          <h2 className="text-3xl font-bold text-[#071A42] tracking-tight">
            Tailored Architectural Modules
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trading & Distribution */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">
              Trading &amp; Wholesale Distribution
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              High-volume multi-currency purchasing, tiered discount price lists, automated vendor lead-time recalculations, and split multi-warehouse drop shipping.
            </p>
            <div className="text-xs text-slate-500 font-medium">
              Core Modules: Sales · Purchase · Inventory · Accounting
            </div>
          </div>

          {/* Professional Services */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">
              Professional Services &amp; Consulting
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Milestone delivery tracking, employee billable timesheets, project cost accounting, and automated recurring retainer invoicing.
            </p>
            <div className="text-xs text-slate-500 font-medium">
              Core Modules: Project · Timesheets · Sales · Subscriptions
            </div>
          </div>

          {/* Retail & E-Commerce */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-4">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">
              Retail &amp; Omnichannel E-Commerce
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Unified stock synchronization between physical Point of Sale (POS) terminals, Shopify storefronts, and central warehouse hubs.
            </p>
            <div className="text-xs text-slate-500 font-medium">
              Core Modules: Point of Sale · Inventory · E-Commerce Connectors
            </div>
          </div>

          {/* Real Estate & Leasing */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-4">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">
              Real Estate &amp; Commercial Leasing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Property unit availability rosters, lease contract schedule generation, automated monthly rent invoicing, and maintenance ticket routing.
            </p>
            <div className="text-xs text-slate-500 font-medium">
              Core Modules: Custom Property Addon · Invoicing · Helpdesk
            </div>
          </div>

          {/* Healthcare & Pharma */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878F9] flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#071A42] mb-2">
              Healthcare &amp; Laboratory Operations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Strict lot/batch serial tracking with expiration date alerts, cold-chain storage logging, and full immutable audit trails.
            </p>
            <div className="text-xs text-slate-500 font-medium">
              Core Modules: Inventory (Lot/Serial) · Barcode · Audit Logging
            </div>
          </div>

          {/* Need a Custom Vertical? */}
          <div className="bg-slate-50 p-7 rounded-2xl border border-dashed border-slate-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#071A42] mb-2">
                Have a Unique Industry Model?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We design custom data schemas for non-standard workflows that do not fit into generic SaaS categories.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0878F9] hover:underline cursor-pointer mt-4"
            >
              <span>Schedule a scoping discussion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-10">
          Note: Solution architecture depends on your operational processes, regulatory jurisdiction, and chosen Odoo version.
        </p>
      </section>
    </div>
  );
};
