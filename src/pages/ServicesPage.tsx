import React, { useState } from 'react';
import { NavigationPage } from '../types';
import {
  Layers,
  Sliders,
  Code2,
  Share2,
  Zap,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Terminal,
  FileCode,
  Copy,
  Check
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: NavigationPage) => void;
  initialServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'xml' | 'api' | 'security'>('python');
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippets = {
    python: {
      title: 'models/sale_order_custom.py',
      desc: 'Clean Odoo Python class inheritance adding computed multi-currency margin fields and approval checks without mutating base code.',
      code: `# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import UserError

class SaleOrder(models.Model):
    _inherit = 'sale.order'

    custom_margin_rate = fields.Float(
        string="Automated Margin Rate (%)",
        compute="_compute_custom_margin",
        store=True,
        digits=(16, 2),
        help="Evaluates real-time margin against current inventory valuation."
    )
    requires_director_approval = fields.Boolean(
        string="Requires Director Approval",
        compute="_compute_approval_status",
        store=True
    )

    @api.depends('order_line.price_subtotal', 'order_line.purchase_price')
    def _compute_custom_margin(self):
        for order in self:
            total_cost = sum(l.purchase_price * l.product_uom_qty for l in order.order_line)
            if order.amount_untaxed > 0:
                order.custom_margin_rate = ((order.amount_untaxed - total_cost) / order.amount_untaxed) * 100.0
            else:
                order.custom_margin_rate = 0.0

    @api.depends('custom_margin_rate', 'amount_total')
    def _compute_approval_status(self):
        for order in self:
            order.requires_director_approval = order.custom_margin_rate < 15.0 or order.amount_total > 50000.0

    def action_confirm(self):
        for order in self:
            if order.requires_director_approval and not self.env.user.has_group('sales_team.group_sale_manager'):
                raise UserError(_("High-value or sub-15% margin orders require Sales Manager authorization."))
        return super(SaleOrder, self).action_confirm()`,
    },
    xml: {
      title: 'views/sale_order_views.xml',
      desc: 'QWeb/XML view inheritance safely inserting custom fields using robust XPath references.',
      code: `<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <record id="view_order_form_inherit_zodotech" model="ir.ui.view">
        <field name="name">sale.order.form.zodotech.margin</field>
        <field name="model">sale.order</field>
        <field name="inherit_id" ref="sale.view_order_form"/>
        <field name="arch" type="xml">
            <!-- Insert margin indicator in header sheet -->
            <xpath expr="//field[@name='payment_term_id']" position="after">
                <field name="custom_margin_rate" widget="percentage" 
                       decoration-danger="custom_margin_rate &lt; 15" 
                       decoration-success="custom_margin_rate &gt;= 25"/>
                <field name="requires_director_approval" widget="boolean_toggle" 
                       groups="sales_team.group_sale_manager"/>
            </xpath>
        </field>
    </record>
</odoo>`,
    },
    api: {
      title: 'controllers/api_webhook.py',
      desc: 'High-speed REST/JSON-RPC integration endpoint validating HMAC security tokens.',
      code: `# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request, Response
import json
import hmac
import hashlib

class ZodoTechWebhookController(http.Controller):

    @http.route('/api/v1/logistics/dispatch_update', type='json', auth='public', methods=['POST'], csrf=False)
    def update_dispatch_status(self, **kwargs):
        payload = request.get_json_data()
        signature = request.httprequest.headers.get('X-Signature-256')
        
        # Verify secret token HMAC
        secret = request.env['ir.config_parameter'].sudo().get_param('zodotech.api_secret')
        expected = hmac.new(secret.encode(), json.dumps(payload).encode(), hashlib.sha256).hexdigest()
        
        if not hmac.compare_digest(signature or '', expected):
            return {'status': 'error', 'code': 403, 'message': 'Invalid signature'}

        picking_ref = payload.get('tracking_ref')
        picking = request.env['stock.picking'].sudo().search([('carrier_tracking_ref', '=', picking_ref)], limit=1)
        if picking:
            picking.message_post(body=f"Freight Carrier Status Update: {payload.get('status_description')}")
            return {'status': 'success', 'picking_id': picking.id}

        return {'status': 'not_found', 'message': 'Tracking reference not matched'}`,
    },
    security: {
      title: 'security/ir_rule.xml',
      desc: 'Multi-branch & multi-company record rules ensuring users only inspect their authorized records.',
      code: `<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <data noupdate="1">
        <!-- Strict Branch Isolation Rule -->
        <record id="rule_branch_picking_isolation" model="ir.rule">
            <field name="name">Warehouse Stock Picking Branch Isolation</field>
            <field name="model_id" ref="stock.model_stock_picking"/>
            <field name="domain_force">
                ['|', ('branch_id', '=', False), ('branch_id', 'in', user.branch_ids.ids)]
            </field>
            <field name="groups" eval="[(4, ref('stock.group_stock_user'))]"/>
            <field name="perm_read" eval="True"/>
            <field name="perm_write" eval="True"/>
            <field name="perm_create" eval="True"/>
            <field name="perm_unlink" eval="False"/>
        </record>
    </data>
</odoo>`,
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <section className="pt-12 text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
          Engineering Scope
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071A42] tracking-tight">
          Odoo ERP Services Built for Growth
        </h1>
        <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
          From fresh multi-company rollouts to troubleshooting complex legacy databases, we engineer solutions designed around your operational rhythm.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Service 1 */}
        <div id="implementation" className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
                Service 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
                Odoo ERP Implementation
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
                Deploying an ERP requires an accurate alignment between company processes and software configuration. We guide you through requirement analysis, database setup, master data migration, and role configurations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg shrink-0 self-start transition-all cursor-pointer"
            >
              Request Implementation Scope
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Common Operational Friction Addressed
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fragmented standalone software tools that require duplicate manual entries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Inconsistent numbers between sales quotes, warehouse pickings, and accounting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Lack of real-time management dashboards for cash flow, margin, and stock on hand.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Information Useful for Scoping &amp; Quotation
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Current tools in use (e.g., QuickBooks, Excel, legacy ERP), active user count, target modules (Sales, Accounting, Inventory, Manufacturing), and desired go-live timeline.
              </p>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div id="customization" className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
                Service 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
                Odoo Customization &amp; Report Design
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
                When standard views, calculations, or reports don&apos;t align with how your team operates, we modify views, fields, validations, and PDF templates without altering core Odoo source files.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg shrink-0 self-start transition-all cursor-pointer"
            >
              Discuss Customization
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                What is Delivered
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Branded, pixel-accurate QWeb PDF templates for quotes, invoices, delivery notes, and tax slips.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated calculated fields, margin warnings, dynamic discounts, and input validation rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Custom view filters, tree view column arrangements, and search domain presets.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Information Useful for Quotation
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Odoo edition (Community or Enterprise), hosting type (Odoo.sh, On-Premise, VPS), and mockups or annotated screenshots of desired reports or form layouts.
              </p>
            </div>
          </div>
        </div>

        {/* Service 3 */}
        <div id="modules" className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
                Service 03
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
                Custom Module Development
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
                For proprietary business workflows that have no equivalent in standard Odoo, we write self-contained Python and XML addons with dedicated data models, views, and strict security groups.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg shrink-0 self-start transition-all cursor-pointer"
            >
              Specify Custom Addon
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Key Engineering Standards
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Strict adherence to official Odoo developer conventions (<code className="text-xs font-mono">_inherit</code> and clean separation of concerns).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Comprehensive access rights (<code className="text-xs font-mono">ir.model.access.csv</code>) and multi-company record rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Modular code structure that doesn&apos;t break during minor Odoo core updates.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Information Useful for Scoping
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step workflow requirements, inputs, desired outputs, user permissions, and required interactions with standard models (e.g., Sale Order or Stock Move).
              </p>
            </div>
          </div>
        </div>

        {/* Service 4 */}
        <div id="integrations" className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
                Service 04
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
                Third-Party API Integrations
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
                Connect Odoo with your payment processors, freight logistics carriers, e-commerce storefronts, and third-party CRMs via robust REST and JSON-RPC pipelines.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg shrink-0 self-start transition-all cursor-pointer"
            >
              Discuss System Integration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Typical Integrations
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Freight &amp; Courier APIs: Real-time waybill generation, shipping rate queries, and tracking status sync.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Payment Gateways: Webhook-based payment notifications and automated invoice settlement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>E-Commerce sync: Bi-directional stock and order synchronization with Shopify, Amazon, or custom web apps.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Engineering Resilience
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Includes automated retry queues for failed webhooks, request payload encryption, idempotency keys, and comprehensive API activity logs.
              </p>
            </div>
          </div>
        </div>

        {/* Service 5 */}
        <div id="automation" className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
                Service 05
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
                Business Process Automation
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
                Automate routine approvals, alerts, document generation, and status triggers across departments to eliminate repetitive manual steps.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg shrink-0 self-start transition-all cursor-pointer"
            >
              Explore Automation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Automated Workflows
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Scheduled server actions (<code className="text-xs font-mono">ir.cron</code>) for automatic debt follow-ups and inventory reordering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Multi-tier approval workflows triggered by threshold limits on purchase orders and expense claims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated notifications sent via email, SMS, or webhook when orders change state.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Operational Benefit
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prevents order bottlenecks from lingering in unapproved queues and guarantees adherence to corporate compliance policies.
              </p>
            </div>
          </div>
        </div>

        {/* Service 6 */}
        <div id="support" className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#0878F9] bg-blue-50 px-2.5 py-1 rounded inline-block mb-3">
                Service 06
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
                Support, Refactoring &amp; Optimization
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
                Diagnose performance bottlenecks, refactor legacy custom modules, fix workflow deadlocks, and keep your production instance reliable and upgrade-ready.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-lg shrink-0 self-start transition-all cursor-pointer"
            >
              Request System Audit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Audit &amp; Repair Capabilities
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>PostgreSQL query optimization, index creation, and slow query elimination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Code refactoring: migrating brittle monkey patches to standard model inheritance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Resolving dependency conflicts and preparing databases for major version upgrades.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Emergency Triage
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Available for urgent production troubleshooting, deadlock resolution, and backup restoration assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Code Architecture Inspector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071A42] rounded-3xl p-6 sm:p-10 border border-slate-700 text-white shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-[#00D5F2] uppercase tracking-wider block mb-1">
              Engineering Inspection
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Our Clean Addon Architecture
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              Inspect how ZodoTech authors Odoo addons: zero core alterations, strict typing, explicit security rules, and clean decorator patterns.
            </p>
          </div>

          {/* Code Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveCodeTab('python')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                activeCodeTab === 'python'
                  ? 'bg-[#0878F9] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>models/sale_order_custom.py</span>
            </button>

            <button
              onClick={() => setActiveCodeTab('xml')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                activeCodeTab === 'xml'
                  ? 'bg-[#0878F9] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>views/sale_order_views.xml</span>
            </button>

            <button
              onClick={() => setActiveCodeTab('api')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                activeCodeTab === 'api'
                  ? 'bg-[#0878F9] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>controllers/api_webhook.py</span>
            </button>

            <button
              onClick={() => setActiveCodeTab('security')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                activeCodeTab === 'security'
                  ? 'bg-[#0878F9] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>security/ir_rule.xml</span>
            </button>
          </div>

          <div className="bg-[#06122F] rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">{codeSnippets[activeCodeTab].title}</span>
              <button
                onClick={() => handleCopy(codeSnippets[activeCodeTab].code)}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 sm:p-6 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
              <code>{codeSnippets[activeCodeTab].code}</code>
            </pre>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-white">Architecture Note: </span>
              {codeSnippets[activeCodeTab].desc}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-[#071A42] mb-3">
          Ready to Discuss Your Project Requirements?
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Submit your scope inquiry or reach out to our engineering team directly for a candid evaluation.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-7 py-3 text-sm font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Initiate Technical Inquiry</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
