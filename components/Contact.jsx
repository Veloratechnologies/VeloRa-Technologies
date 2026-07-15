import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Building, Mail, User, MessageSquare, PhoneCall } from 'lucide-react';
import { theme } from '../config/theme';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const servicesList = [
    'Web Development',
    'AI Automation',
    'Business Automation',
    'Custom Software Solutions',
    'CRM / ERP Development',
    'API Integrations / Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.service || !form.message) {
    setStatus({
      submitting: false,
      submitted: false,
      error: "Please fill in all required fields."
    });
    return;
  }

  try {
    setStatus({
      submitting: true,
      submitted: false,
      error: null
    });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (data.success) {
      setStatus({
        submitting: false,
        submitted: true,
        error: null
      });

      setForm({
        name: "",
        email: "",
        company: "",
        service: "",
        message: ""
      });
    } else {
      throw new Error();
    }

  } catch (error) {
    setStatus({
      submitting: false,
      submitted: false,
      error: "Failed to send request. Please try again."
    });
  }
};

  return (
    <section id="contact" className="py-20 bg-bg-white border-t border-border-light relative overflow-hidden">
      {/* Decorative radial blur background */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-light/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Side Content - Text and Details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mt-4 mb-4">
              Let's Build Something Great Together
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              Partner with VeloRa Technologies. Fill out the form, and a technical consulting manager will audit your request and reply with a scheduled calendar invitation within 24 hours.
            </p>
          </div>

          <div className="space-y-6 border-t border-border-light pt-8">
            {/* Contact cards */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-bg-slate-50 border border-border-light text-primary flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Email Consultation</h4>
                <a href={`mailto:${theme.contact.email}`} className="text-sm font-semibold text-primary hover:underline">
                  {theme.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-bg-slate-50 border border-border-light text-primary flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Corporate Line</h4>
                <span className="text-sm font-semibold text-text-secondary">
                  {theme.contact.phone}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-bg-slate-50 border border-border-light text-primary flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Office Location</h4>
                <span className="text-sm text-text-muted leading-tight block">
                  {theme.contact.office}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Container */}
        <div className="lg:col-span-7 bg-bg-slate-50 border border-border-light p-6 md:p-8 rounded-premium shadow-premium">
          <AnimatePresence mode="wait">
            {!status.submitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {status.error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-4 rounded-lg">
                    {status.error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      <User className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Name <span className="text-primary ml-0.5">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border-medium bg-bg-white text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      <Mail className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Email <span className="text-primary ml-0.5">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border-medium bg-bg-white text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company field */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      <Building className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Enterprise Inc."
                      className="w-full px-4 py-3 rounded-lg border border-border-medium bg-bg-white text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    />
                  </div>

                  {/* Service needed field */}
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      Service Needed <span className="text-primary ml-0.5">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border-medium bg-bg-white text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 cursor-pointer"
                    >
                      <option value="" disabled>Select a service</option>
                      {servicesList.map((service, idx) => (
                        <option key={idx} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Project Description <span className="text-primary ml-0.5">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Provide details about your project scope, timeline, and goals..."
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-medium bg-bg-white text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-bg-white font-semibold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {status.submitting ? (
                    <div className="w-5 h-5 border-2 border-bg-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="ml-2 w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12 px-6 flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center animate-bounce mb-2">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Request Received
                </h3>
                <p className="text-sm text-text-muted max-w-sm leading-relaxed">
                  Thank you for reaching out to VeloRa Technologies. Our scheduling algorithm has assigned a technical representative to audit your project goals. You will receive an email within 24 hours.
                </p>
                <button
                  onClick={() => setStatus((prev) => ({ ...prev, submitted: false }))}
                  className="text-xs font-bold text-primary hover:underline mt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
