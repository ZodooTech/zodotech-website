import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, ArrowRight, Activity, Terminal } from 'lucide-react';

interface Stage {
  id: number;
  model: string;
  recordRef: string;
  name: string;
  trigger: string;
  details: string;
  fieldUpdates: { field: string; value: string }[];
}

const STAGES: Stage[] = [
  {
    id: 1,
    model: 'crm.lead',
    recordRef: 'LEAD/2026/0419',
    name: 'Lead Won & Margin Evaluation',
    trigger: 'Automatic qualification trigger',
    details: 'Contract signed for 250x Precision Sensors ($14,500 total). Automated margin audit confirms 34.2% margin rate.',
    fieldUpdates: [
      { field: 'stage_id', value: "'Won' (ID 4)" },
      { field: 'expected_revenue', value: '$14,500.00' },
      { field: 'probability', value: '100%' },
    ],
  },
  {
    id: 2,
    model: 'sale.order',
    recordRef: 'SO-2026-088',
    name: 'Sales Order Confirmation',
    trigger: 'Inherited action_confirm()',
    details: 'Sales Order auto-converted from Lead. Credit limit verified against customer ledger; tier-1 discount rule applied.',
    fieldUpdates: [
      { field: 'state', value: "'sale'" },
      { field: 'partner_id', value: 'Apex Logistics Corp' },
      { field: 'payment_term_id', value: '30 Days Net' },
    ],
  },
  {
    id: 3,
    model: 'stock.picking',
    recordRef: 'WH/OUT/01492',
    name: 'Warehouse Multi-Route Allocation',
    trigger: 'Procurement engine & 3-step routing',
    details: 'Inventory allocated from Main Bay 3. Barcode scan validation generated for pick-pack-ship operations.',
    fieldUpdates: [
      { field: 'state', value: "'assigned' -> 'done'" },
      { field: 'location_id', value: 'WH/Stock/Zone-B' },
      { field: 'carrier_tracking_ref', value: 'TRK-9832140' },
    ],
  },
  {
    id: 4,
    model: 'account.move',
    recordRef: 'INV/2026/0073',
    name: 'QWeb Invoicing & Real-Time Journal',
    trigger: 'Automated invoice cron post',
    details: 'Customer invoice generated, tax breakdown computed, debit accounts receivable and credit product sales ledger posted.',
    fieldUpdates: [
      { field: 'move_type', value: "'out_invoice'" },
      { field: 'state', value: "'posted'" },
      { field: 'amount_total', value: '$14,500.00' },
    ],
  },
  {
    id: 5,
    model: 'account.payment',
    recordRef: 'PAY/2026/0041',
    name: 'Automated Bank Reconciliation',
    trigger: 'Plaid/Stripe API Webhook',
    details: 'Incoming wire matched against open invoice receivable items. Customer balance cleared with zero human entry.',
    fieldUpdates: [
      { field: 'payment_state', value: "'paid'" },
      { field: 'reconciled', value: 'True' },
      { field: 'residual_amount', value: '$0.00' },
    ],
  },
];

export const LiveWorkflowSandbox: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= STAGES.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const resetPipeline = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const activeStage = STAGES[currentStep - 1] || STAGES[0];

  return (
    <div className="bg-[#071A42] text-white rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden">
      {/* Console Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#06122F] border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-300">
            odoo.workflow_engine / automated_pipeline_v17
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-[#0878F9] hover:bg-[#0666d6] text-white rounded-md transition-colors cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${isPlaying ? 'fill-white' : ''}`} />
            <span>{isPlaying ? 'Pause Auto-Run' : 'Simulate Pipeline'}</span>
          </button>
          <button
            onClick={resetPipeline}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Stepper */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00D5F2]" />
            <span>Connected Odoo Process Flow</span>
          </div>

          <div className="space-y-2">
            {STAGES.map((stage) => {
              const isPassed = currentStep > stage.id;
              const isCurrent = currentStep === stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep(stage.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-slate-800/90 border-[#0878F9] shadow-md ring-1 ring-[#0878F9]'
                      : isPassed
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-900/30 border-slate-800/50 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isPassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isCurrent
                          ? 'bg-[#0878F9] text-white shadow'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle className="w-4 h-4" /> : `0${stage.id}`}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white leading-snug">
                        {stage.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {stage.model} · {stage.recordRef}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isCurrent ? 'text-[#00D5F2] translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Technical Inspector & Payload View */}
        <div className="lg:col-span-7 bg-[#06122F] rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-slate-400">Active Record Context:</span>
              <div className="text-base font-bold text-white font-mono flex items-center gap-2">
                <span>{activeStage.recordRef}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-[#00D5F2] font-normal border border-blue-500/30">
                  {activeStage.model}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Step Status:</span>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1 justify-end font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Validated &amp; Executed</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Operational Automation Description
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {activeStage.details}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#0878F9]" />
                <span>Computed Model State Invariants</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">JSON-RPC / ORM In-Memory</span>
            </div>

            <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 border border-slate-800/80 space-y-1.5">
              {activeStage.fieldUpdates.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5">
                  <span className="text-indigo-300">{item.field}</span>
                  <span className="text-emerald-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/70">
            <span>Trigger Mechanism: {activeStage.trigger}</span>
            <button
              onClick={() => {
                if (currentStep < STAGES.length) {
                  setCurrentStep(currentStep + 1);
                } else {
                  setCurrentStep(1);
                }
              }}
              className="text-[#00D5F2] hover:text-white font-medium cursor-pointer inline-flex items-center gap-1"
            >
              <span>{currentStep === STAGES.length ? 'Restart Sandbox' : 'Next Stage'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
