import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Send, CheckCircle2, Building, Mail, User, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
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
    <section id="contact" className="relative min-h-screen w-full flex items-center justify-center pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden -mt-20 md:-mt-24">
      <motion.div
            className="absolute inset-0 z-0"
            initial={{
              scale: 1,
              opacity: 0,
              filter: "brightness(0.2) blur(8px)",
            }}
            animate={{
              scale: 1.10,
              opacity: 1,
              filter: "brightness(1) blur(0px)",
            }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
      {/* 100% FULL COVERAGE BACKGROUND HERO IMAGE (STARTS FROM VERY TOP CEILING) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/contact_us_hero_image.png"
          alt="Contact Us Hero Background"
          fill
          priority
          className="object-cover object-center w-full h-full pointer-events-none"
        />
        {/* Subtle Light Gradient Overlay for High Contrast Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30 md:via-white/75 md:to-transparent z-0" />
      </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* LEFT SIDE: ANIMATED TEXT & DETAILS */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5 space-y-6 md:space-y-8"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mt-3 mb-3 leading-tight">
              Let's Build Something Great Together
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed font-medium max-w-lg">
              Partner with VeloRa Technologies. Fill out the form, and a technical consulting manager will audit your request and reply with a scheduled calendar invitation within 24 hours.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6 border-t border-slate-300/80 pt-6">
            
            {/* EMAIL CARD */}
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start space-x-3 md:space-x-4 group"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary transition-colors">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-primary">Email Consultation</h4>
                <a href={`mailto:${theme.contact.email}`} className="text-xs md:text-sm font-bold text-primary hover:underline block truncate">
                  {theme.contact.email}
                </a>
              </div>
            </motion.div>

            {/* PHONE CARD */}
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start space-x-3 md:space-x-4 group"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary transition-colors">
                <PhoneCall className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-primary">Corporate Line</h4>
                <span className="text-xs md:text-sm font-bold text-text-secondary block">
                  {theme.contact.phone}
                </span>
              </div>
            </motion.div>

            {/* LOCATION CARD */}
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start space-x-3 md:space-x-4 group"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary transition-colors">
                <Building className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-primary">Office Location</h4>
                <span className="text-xs md:text-sm font-semibold text-text-muted leading-tight block">
                  {theme.contact.office}
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* RIGHT SIDE: GLASSMORPHIC FORM */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 bg-white/85 backdrop-blur-xl border-2 border-white/60 p-5 sm:p-7 md:p-9 rounded-2xl md:rounded-3xl shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!status.submitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 md:space-y-5"
              >
                {status.error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3.5 rounded-xl">
                    {status.error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      <User className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Name <span className="text-primary ml-0.5">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-300/80 bg-white/90 text-xs md:text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      <Mail className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Email <span className="text-primary ml-0.5">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Example@company.com"
                      required
                      className="w-full px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-300/80 bg-white/90 text-xs md:text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company field */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      <Building className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Enterprise Inc."
                      className="w-full px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-300/80 bg-white/90 text-xs md:text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
                    />
                  </div>

                  {/* Service needed field */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                      Service Needed <span className="text-primary ml-0.5">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-300/80 bg-white/90 text-xs md:text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm cursor-pointer"
                    >
                      <option value="" disabled>Select a service</option>
                      {servicesList.map((service, idx) => (
                        <option key={idx} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center">
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-text-muted" /> Project Description <span className="text-primary ml-0.5">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3.5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Provide details about your project scope, timeline, and goals..."
                    required
                    className="w-full px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-slate-300/80 bg-white/90 text-xs md:text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none shadow-sm"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status.submitting}
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-bold py-3 md:py-3.5 px-6 text-xs md:text-sm rounded-full shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-10 px-6 flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center animate-bounce mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Request Received
                </h3>
                <p className="text-xs md:text-sm text-text-muted max-w-sm leading-relaxed">
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
        </motion.div>

      </div>
    </section>
  );
}