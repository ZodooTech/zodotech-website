import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2, Copy, Check, Send, Phone, Clock, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  prefillMessage?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ prefillMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    odooVersion: '',
    service: '',
    timeline: '',
    message: prefillMessage || '',
    consent: false,
  });

  useEffect(() => {
    if (prefillMessage) {
      setFormData((prev) => ({ ...prev, message: prefillMessage }));
    }
  }, [prefillMessage]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = 'odoodeveloper10@gmail.com';

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid business email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a primary service area.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters describing your project or requirements.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must acknowledge the Privacy Policy to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('company', formData.company || 'Not Specified');
      formPayload.append('phone', formData.phone || 'Not Specified');
      formPayload.append('odoo_version', formData.odooVersion || 'Not Specified');
      formPayload.append('service', formData.service);
      formPayload.append('timeline', formData.timeline || 'Flexible');
      formPayload.append('message', formData.message);
      formPayload.append('_subject', `New Project Inquiry: ${formData.company || formData.name} - ${formData.service}`);
      formPayload.append('_captcha', 'false');
      formPayload.append('_template', 'table');

      const response = await fetch(`https://formsubmit.co/ajax/${directEmail}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formPayload,
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Service temporarily unavailable');
      }
    } catch (err: any) {
      // In restricted or sandboxed iframe preview environments, FormSubmit may require first-time inbox activation
      // or experience cross-origin blocks. We display a graceful success/fallback message with direct mailto option.
      setStatus('error');
      setErrorMessage(
        'Notice: Direct form delivery encountered a network gateway limitation. Please click below to email your submission directly to odoodeveloper10@gmail.com.'
      );
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="pt-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#0878F9] uppercase tracking-widest block mb-2">
          Direct Technical Engagement
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#071A42] tracking-tight">
          Let&apos;s Talk About Your System
        </h1>
        <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
          Whether you are planning a clean Odoo implementation, extending an existing database, or fixing legacy customizations, we are ready to assist.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Narrative Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#071A42] text-white p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <span className="text-xs font-mono text-[#00D5F2] uppercase tracking-wider block">
              Lead Technical Inbox
            </span>
            <h3 className="text-xl font-bold">Direct Developer Communication</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Skip the sales gatekeepers. You will communicate directly with certified Odoo developers and enterprise architects.
            </p>

            <div className="pt-2 flex items-center justify-between bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-[#00D5F2] truncate pr-2">
                {directEmail}
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${directEmail}?subject=Odoo%20Project%20Inquiry%20from%20Website`}
                className="w-full py-2.5 px-4 text-xs font-bold text-center text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Mail Client</span>
              </a>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-[#071A42] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0878F9]" />
              <span>What Happens After You Submit?</span>
            </h4>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-600 list-decimal pl-4 leading-relaxed">
              <li>
                <strong>Initial Review:</strong> Our technical team examines your module requirements, version compatibility, and timeline within 24 business hours.
              </li>
              <li>
                <strong>Clarification Session:</strong> We arrange a quick technical exploration call or email clarification to define core scope boundaries.
              </li>
              <li>
                <strong>Concrete SOW:</strong> You receive an actionable Statement of Work with transparent milestone schedules, deliverable specs, and fixed pricing.
              </li>
            </ol>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#071A42]">Project Inquiry Form</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fields marked with an asterisk (<span className="text-rose-600">*</span>) are required.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">
                Inquiry Successfully Submitted!
              </h3>
              <p className="text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                Thank you for getting in touch. Your project scope has been dispatched to our engineering team at <span className="font-semibold">{directEmail}</span>. We will review your requirements and follow up promptly.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      phone: '',
                      odooVersion: '',
                      service: '',
                      timeline: '',
                      message: '',
                      consent: false,
                    });
                  }}
                  className="px-5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honey pot for anti-spam */}
              <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  id="fullname"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.name ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-[#0878F9]'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
              </div>

              {/* Business Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business Email <span className="text-rose-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@company.com"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.email ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-[#0878F9]'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
              </div>

              {/* Company & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Nexus Freight Ltd."
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0878F9] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0878F9] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Odoo Version & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Service Needed <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors.service ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-[#0878F9]'
                    }`}
                  >
                    <option value="">-- Please select an area --</option>
                    <option value="ERP Implementation">Full ERP Implementation</option>
                    <option value="Odoo Customization">Odoo Customization &amp; Views</option>
                    <option value="Custom Module Development">Custom Module Development</option>
                    <option value="Third-Party API Integrations">Third-Party API Integrations</option>
                    <option value="Process Automation">Business Process Automation</option>
                    <option value="Troubleshooting & Refactoring">Troubleshooting &amp; Maintenance</option>
                    <option value="General Consultation">Architecture Consultation</option>
                  </select>
                  {errors.service && <p className="text-xs text-rose-600 mt-1">{errors.service}</p>}
                </div>

                <div>
                  <label htmlFor="odooVersion" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Odoo Version / Hosting
                  </label>
                  <input
                    id="odooVersion"
                    type="text"
                    value={formData.odooVersion}
                    onChange={(e) => setFormData({ ...formData, odooVersion: e.target.value })}
                    placeholder="e.g. Odoo 17 Enterprise / Odoo.sh"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0878F9] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Description &amp; Scope <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your current software setup, desired workflows, specific challenges, or modules needed..."
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.message ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' : 'border-slate-200 focus:ring-[#0878F9]'
                  }`}
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-[#0878F9] focus:ring-[#0878F9]"
                  />
                  <span className="text-xs text-slate-600 leading-normal">
                    I understand that the information provided will be used solely to evaluate and respond to this project inquiry in accordance with the Privacy Policy. <span className="text-rose-600">*</span>
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-rose-600 mt-1">{errors.consent}</p>}
              </div>

              {/* Error Notice Box if network/gateway fails */}
              {status === 'error' && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Submission Notice</span>
                  </div>
                  <p>{errorMessage}</p>
                  <div className="pt-1">
                    <a
                      href={`mailto:${directEmail}?subject=${encodeURIComponent(
                        `Project Inquiry: ${formData.company || formData.name} - ${formData.service}`
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nOdoo Version: ${formData.odooVersion}\nService: ${formData.service}\n\nProject Scope:\n${formData.message}`
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-md hover:bg-rose-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Direct via Email</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#0878F9] hover:bg-[#0666d6] disabled:bg-slate-400 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
