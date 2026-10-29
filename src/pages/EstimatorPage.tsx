import React, { useState } from 'react';
import { NavigationPage } from '../types';
import {
  Server,
  Users,
  Layers,
  Settings,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Cpu,
  Database
} from 'lucide-react';

interface EstimatorPageProps {
  onNavigate: (page: NavigationPage) => void;
  onSetPrefillMessage?: (message: string) => void;
}

export const EstimatorPage: React.FC<EstimatorPageProps> = ({
  onNavigate,
  onSetPrefillMessage,
}) => {
  const [teamSize, setTeamSize] = useState<'1-10' | '11-30' | '31-100' | '100+'>('11-30');
  const [hosting, setHosting] = useState<'odoo_sh' | 'on_premise' | 'cloud_vps'>('odoo_sh');
  const [edition, setEdition] = useState<'enterprise' | 'community'>('enterprise');

  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Sales & CRM',
    'Inventory & Logistics',
    'Accounting & Invoicing',
  ]);

  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([
    'Custom QWeb Reports (Invoices/Delivery Notes)',
    'Automated Approval Gates',
  ]);

  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  const availableModules = [
    { id: 'Sales & CRM', desc: 'Leads, pipeline, automated quotations, price lists' },
    { id: 'Inventory & Logistics', desc: 'Multi-warehouse, barcoding, routing, serial/lot tracking' },
    { id: 'Accounting & Invoicing', desc: 'General ledger, bank reconciliation, local tax compliance' },
    { id: 'Purchasing & Supply', desc: 'Vendor management, 3-way matching, reorder rules' },
    { id: 'Manufacturing (MRP)', desc: 'Work centers, bills of materials, capacity planning' },
    { id: 'Point of Sale (POS)', desc: 'Retail store sync, cash drawer, offline cache support' },
    { id: 'HR & Timesheets', desc: 'Leave tracking, employee records, attendance, payroll' },
    { id: 'Field Service & Helpdesk', desc: 'Task routing, SLA escalations, customer ticket portal' },
  ];

  const availableCustomizations = [
    { id: 'Custom QWeb Reports (Invoices/Delivery Notes)', desc: 'Pixel-perfect PDF layouts with custom legal verbiage' },
    { id: 'Automated Approval Gates', desc: 'Multi-tier management approvals for high-value quotes/bills' },
    { id: 'Third-Party REST / Webhook Integration', desc: 'Direct bridge to payment gateways, Shopify, or freight APIs' },
    { id: 'Legacy Data Migration (Clean Import)', desc: 'Sanitizing and migrating customers, products, and open balances' },
    { id: 'Multi-Company / Multi-Branch Rules', desc: 'Strict record isolation with consolidated corporate accounting' },
  ];

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const toggleCustomization = (id: string) => {
    if (selectedCustomizations.includes(id)) {
      setSelectedCustomizations(selectedCustomizations.filter((c) => c !== id));
    } else {
      setSelectedCustomizations([...selectedCustomizations, id]);
    }
  };

  // Compute calculated metrics
  const moduleCount = selectedModules.length;
  const customCount = selectedCustomizations.length;

  let estimatedWeeks = '3–5 Weeks';
  if (moduleCount > 5 || customCount > 3 || teamSize === '100+') {
    estimatedWeeks = '8–12 Weeks';
  } else if (moduleCount > 3 || customCount > 1 || teamSize === '31-100') {
    estimatedWeeks = '5–8 Weeks';
  }

  let recommendedSpecs = 'Odoo.sh Cloud Platform (Standard Worker Tier)';
  if (hosting === 'on_premise' || hosting === 'cloud_vps') {
    recommendedSpecs =
      teamSize === '100+'
        ? 'Dedicated Cluster (8 vCPU / 32GB RAM + PgBouncer & PostgreSQL Replica)'
        : teamSize === '31-100'
        ? 'Dedicated VPS (4 vCPU / 16GB RAM + NVMe Storage)'
        : 'Dedicated VPS (2 vCPU / 8GB RAM + Ubuntu 22.04 LTS)';
  }

  const generatedBlueprintText = `=== ZodoTech Odoo Architecture Specification ===
Organization Scope:
- Team Size: ${teamSize} users
- Target Edition: Odoo ${edition === 'enterprise' ? 'Enterprise' : 'Community'}
- Preferred Hosting: ${hosting === 'odoo_sh' ? 'Odoo.sh Cloud' : hosting === 'on_premise' ? 'On-Premise Server' : 'Dedicated Cloud VPS'}
- Recommended Infrastructure: ${recommendedSpecs}
- Estimated Timeline: ${estimatedWeeks}

Selected Core Modules (${moduleCount}):
${selectedModules.map((m) => `  * ${m}`).join('\n')}

Specialized Customization Requirements (${customCount}):
${selectedCustomizations.map((c) => `  * ${c}`).join('\n')}

Generated via ZodoTech Interactive Architecture Estimator.`;

  const handleCopyBlueprint = () => {
    navigator.clipboard.writeText(generatedBlueprintText);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2000);
  };

  const handleTransferToContact = () => {
    if (onSetPrefillMessage) {
      onSetPrefillMessage(generatedBlueprintText);
    }
    onNavigate('contact');
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="pt-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
          Architecture &amp; Scope Estimator
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071A42] tracking-tight">
          Configure Your Odoo System Scope
        </h1>
        <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
          Interactive planning tool to estimate modules, hosting architecture, and deployment timeline for your team.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Options Controls */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Organization & Environment */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-[#071A42] font-bold text-lg">
              <Users className="w-5 h-5 text-[#0878F9]" />
              <h3>1. Team Size &amp; Deployment Target</h3>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Active System Users
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['1-10', '11-30', '31-100', '100+'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTeamSize(size)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      teamSize === size
                        ? 'bg-[#0878F9] text-white border-[#0878F9] shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Hosting Environment
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'odoo_sh', label: 'Odoo.sh Cloud' },
                    { id: 'cloud_vps', label: 'Dedicated Cloud VPS' },
                    { id: 'on_premise', label: 'On-Premise Server' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setHosting(item.id as any)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                        hosting === item.id
                          ? 'bg-blue-50/80 border-[#0878F9] text-[#0878F9] font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Odoo Edition
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'enterprise', label: 'Enterprise Edition' },
                    { id: 'community', label: 'Community Edition (Open Source)' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEdition(item.id as any)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                        edition === item.id
                          ? 'bg-blue-50/80 border-[#0878F9] text-[#0878F9] font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Core Modules */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#071A42] font-bold text-lg">
                <Layers className="w-5 h-5 text-[#0878F9]" />
                <h3>2. Core Business Modules Needed</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {selectedModules.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableModules.map((mod) => {
                const isSelected = selectedModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/70 border-[#0878F9] ring-1 ring-[#0878F9]/40'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#071A42]">{mod.id}</span>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-[#0878F9]' : 'text-slate-300'
                        }`}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight">{mod.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Customization Requirements */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#071A42] font-bold text-lg">
                <Settings className="w-5 h-5 text-[#0878F9]" />
                <h3>3. Custom Extensions &amp; Integrations</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {selectedCustomizations.length} selected
              </span>
            </div>

            <div className="space-y-2.5">
              {availableCustomizations.map((cust) => {
                const isSelected = selectedCustomizations.includes(cust.id);
                return (
                  <button
                    key={cust.id}
                    type="button"
                    onClick={() => toggleCustomization(cust.id)}
                    className={`w-full p-3 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50/70 border-[#0878F9] ring-1 ring-[#0878F9]/40'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-[#071A42] mb-0.5">{cust.id}</div>
                      <div className="text-[11px] text-slate-500">{cust.desc}</div>
                    </div>
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ml-3 ${
                        isSelected ? 'text-[#0878F9]' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Synthesis Panel */}
        <div className="lg:col-span-5 sticky top-24 space-y-5">
          <div className="bg-[#071A42] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D5F2] block">
                  Dynamic Scope Synthesis
                </span>
                <h4 className="text-xl font-bold tracking-tight">Architecture Estimate</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Est. Timeline</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {estimatedWeeks}
                </span>
              </div>
            </div>

            {/* Spec breakdown */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0878F9]" />
                  <span>Recommended Host Sizing</span>
                </div>
                <div className="text-slate-200 font-mono text-xs font-semibold">
                  {recommendedSpecs}
                </div>
              </div>

              <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#00D5F2]" />
                  <span>Modules in Scope ({moduleCount})</span>
                </div>
                <div className="text-slate-300 flex flex-wrap gap-1.5">
                  {selectedModules.length > 0 ? (
                    selectedModules.map((m) => (
                      <span
                        key={m}
                        className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300 font-medium"
                      >
                        {m}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">No modules selected yet</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-[#8B18F5]" />
                  <span>Custom Addons &amp; Connectors ({customCount})</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  {selectedCustomizations.length > 0 ? (
                    selectedCustomizations.map((c) => (
                      <div key={c} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D5F2]" />
                        <span>{c}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">Standard configuration only</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleTransferToContact}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Transfer Blueprint to Inquiry Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyBlueprint}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedBlueprint ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Blueprint Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Architecture Blueprint Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              All estimations are subject to formal requirement discovery and statement of work.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
