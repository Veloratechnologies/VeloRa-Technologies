import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { theme } from '@/config/theme';

export default function Hero() {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden mesh-grid bg-bg-light">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none premium-gradient-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Subtle Tagline Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center self-start bg-primary/10 border border-primary/20 text-primary font-semibold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full mb-6">
            Digital Transformation Partner
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-text-primary leading-[1.15] mb-6"
          >
            Building Smart <span className="text-primary">Digital Solutions</span> for Modern Businesses
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-muted leading-relaxed mb-8 max-w-xl"
          >
            We help businesses grow through custom web development, AI-powered automation, and scalable software solutions designed for efficiency and long-term success.
          </motion.p>

          {/* Key Bullet Points */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-10 max-w-lg">
            <div className="flex items-center space-x-2 text-sm text-text-secondary font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Enterprise Grade Security</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>AI Automation Integration</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Scalable Architectures</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Dedicated Support</span>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="inline-flex items-center justify-center text-base font-semibold text-bg-white bg-primary hover:bg-primary-hover px-7 py-3.5 rounded-premium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Book Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, '#services')}
              className="inline-flex items-center justify-center text-base font-semibold text-text-secondary bg-bg-white hover:bg-bg-slate-50 border border-border-medium px-7 py-3.5 rounded-premium shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Services
              <ChevronRight className="ml-1 w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Dashboard / SVG Visual Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Visual Wrapper */}
          <div className="relative mx-auto max-w-lg lg:max-w-none rounded-premium bg-bg-white border border-border-light shadow-premium p-4 md:p-6 overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-light">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-border-medium" />
                <span className="w-3 h-3 rounded-full bg-border-medium" />
                <span className="w-3 h-3 rounded-full bg-border-medium" />
              </div>
              <div className="text-[11px] font-mono text-text-muted bg-bg-slate-50 border border-border-light rounded px-2.5 py-0.5">
                https://api.velora.ai/dashboard
              </div>
            </div>

            {/* Dashboard Visual Mock */}
            <div className="space-y-4">
              {/* Header metrics card row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-bg-slate-50 border border-border-light rounded-lg p-3">
                  <div className="text-[10px] text-text-muted font-semibold uppercase tracking-wider mb-1">Efficiency</div>
                  <div className="text-lg font-bold text-text-primary">+82%</div>
                </div>
                <div className="bg-bg-slate-50 border border-border-light rounded-lg p-3">
                  <div className="text-[10px] text-text-muted font-semibold uppercase tracking-wider mb-1">AI Automated</div>
                  <div className="text-lg font-bold text-primary">24/7</div>
                </div>
                <div className="bg-bg-slate-50 border border-border-light rounded-lg p-3">
                  <div className="text-[10px] text-text-muted font-semibold uppercase tracking-wider mb-1">Error Rate</div>
                  <div className="text-lg font-bold text-text-primary">0.02%</div>
                </div>
              </div>

              {/* Graphic SVG diagram representing automation flows */}
              <div className="relative h-48 bg-bg-slate-50 rounded-lg border border-border-light p-3 flex flex-col justify-between overflow-hidden">
                {/* SVG Visual Connectors */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M 50,70 L 150,70 L 150,130 L 250,130"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <motion.path
                    d="M 50,70 L 150,70 L 150,40 L 250,40"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.circle
                    r="4"
                    fill="#2563EB"
                    initial={{ cx: 50, cy: 70 }}
                    animate={{
                      cx: [50, 150, 150, 250],
                      cy: [70, 70, 40, 40]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>

                {/* Simulated Web Nodes */}
                <div className="flex items-center justify-between z-10">
                  <div className="bg-bg-white border border-border-light shadow-sm rounded px-2.5 py-1 text-[11px] font-semibold text-text-primary flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>Inbound Lead</span>
                  </div>
                  <div className="bg-bg-white border border-border-light shadow-sm rounded px-2.5 py-1 text-[11px] font-semibold text-text-primary flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>AI Qualification</span>
                  </div>
                </div>

                <div className="flex items-center justify-end z-10">
                  <div className="bg-bg-white border border-border-light shadow-sm rounded px-2.5 py-1 text-[11px] font-semibold text-text-primary flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
                    <span>CRM Updated</span>
                  </div>
                </div>
              </div>

              {/* Console window */}
              <div className="bg-text-primary text-[11px] font-mono p-3 rounded-lg text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>VeloRa Engine v2.4</span>
                  <span>ONLINE</span>
                </div>
                <div className="text-primary-light">&gt; Initializing neural workflows...</div>
                <div className="text-emerald-400">&gt; Integration status: 100% active</div>
              </div>
            </div>
          </div>

          {/* Decorative shapes behind */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-xl -z-10" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-light/5 rounded-full blur-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
