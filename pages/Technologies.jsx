'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Database,
  Cloud,
  Code2,
  Sparkles,
  ArrowRight,
  Activity,
  Globe,
  ChevronRight,
  CheckCircle2,
  Server,
  Bot,
  Gauge,
  Lock
} from 'lucide-react';

// ==========================================
// 1. DATA & CONTENT (STRICTLY BUSINESS-FIRST)
// ==========================================

const TECH_CATEGORIES = [
  { id: 'frontend', name: 'Frontend Engineering', icon: Code2 },
  { id: 'backend', name: 'Backend Systems', icon: Server },
  { id: 'database', name: 'Data Architecture', icon: Database },
  { id: 'cloud', name: 'Cloud & Infrastructure', icon: Cloud },
  { id: 'ai', name: 'Enterprise AI', icon: Bot },
];

const FRONTEND_TECHS = [
  {
    name: 'React',
    tagline: 'High-Velocity Customer Portals & Dashboards',
    desc1: 'We engineer zero-latency customer portals, CRM platforms, and operational dashboards built for high-throughput daily enterprise usage.',
    desc2: 'Every interface is tailored to feel as responsive as a native desktop application, reducing user onboarding time and boosting daily productivity.',
    benefits: ['Sub-second UI interactions', 'Seamless desktop & mobile parity', 'Consistent enterprise branding', 'Reduced user friction'],
    useCases: ['SaaS Analytics Dashboards', 'Customer Service Portals', 'Internal Operations Systems'],
    cta: 'Explore React Solutions →',
    stats: '2.4x Speed Increase'
  },
  {
    name: 'Next.js',
    tagline: 'Global Web Engines & Revenue Platforms',
    desc1: 'We construct high-converting marketing engines and SaaS web apps with built-in search engine optimization and global edge distribution.',
    desc2: 'By executing rendering at the network edge, your clients experience instant page loads anywhere on earth, maximizing conversion rates.',
    benefits: ['Top-tier organic search ranking', 'Instant global load speeds', 'Maximum conversion efficiency', 'Built-in security compliance'],
    useCases: ['High-Traffic SaaS Landing Pages', 'E-Commerce Portals', 'Enterprise Software Marketing'],
    cta: 'Explore Next.js Architectures →',
    stats: '+340% Organic Traffic'
  },
  {
    name: 'JavaScript & Tailwind CSS',
    tagline: 'Pixel-Perfect Custom UI Systems',
    desc1: 'We build proprietary design systems and lightweight frontend pipelines that ensure visual consistency across all digital brand touchpoints.',
    desc2: 'Eliminating bloated templates allows your platforms to load instantly while maintaining ultra-modern glassmorphic aesthetics.',
    benefits: ['Handcrafted pixel accuracy', 'Lightweight asset delivery', 'Accessible across all devices', 'Rapid feature deployment'],
    useCases: ['Custom Enterprise Design Systems', 'Interactive Product Demos', 'Responsive Customer Panels'],
    cta: 'View UI Frameworks →',
    stats: '60% Faster Load Times'
  }
];

const BACKEND_TECHS = [
  {
    name: 'Node.js & Express',
    tagline: 'Real-Time Event & API Engine',
    desc1: 'We power real-time transactional platforms, microservices, and live data streaming engines capable of handling concurrent client demands.',
    desc2: 'Designed to handle high concurrent traffic without downtime, keeping your core business services available 24/7/365.',
    benefits: ['High concurrent user handling', 'Instant real-time sync', 'Modular business scalability', 'Microservice compatibility'],
    useCases: ['FinTech Transaction Engines', 'Real-Time Messaging Systems', 'High-Volume Payment APIs'],
    cta: 'Scale Your Backend →',
    stats: '99.99% Uptime SLA'
  },
  {
    name: 'Spring Boot & REST APIs',
    tagline: 'Bank-Grade Enterprise Core',
    desc1: 'We implement mission-critical backend systems for enterprise environments demanding maximum data integrity, auditability, and security.',
    desc2: 'Our API architectures seamlessly connect legacy databases with modern frontends without breaking existing enterprise workflows.',
    benefits: ['Enterprise compliance readiness', 'Strict data encryption standards', 'Seamless legacy system integration', 'Auditable transaction logs'],
    useCases: ['Healthcare Data Hubs', 'Supply Chain Management', 'Enterprise Resource Planning (ERP)'],
    cta: 'Upgrade Core Infrastructure →',
    stats: 'Sub-20ms Response Time'
  }
];

const DATABASE_TECHS = [
  {
    name: 'PostgreSQL & MongoDB',
    tagline: 'High-Concurrency Data Layer',
    desc1: 'We architect fault-tolerant relational and document data layers engineered to store, structure, and query millions of business records.',
    desc2: 'Your operational data remains fully synchronized, secure from unauthorized access, and instantly searchable across all business units.',
    benefits: ['Zero data-loss architecture', 'Sub-millisecond query execution', 'Automated backup recovery', 'Flexible schema evolution'],
    useCases: ['Multi-Tenant SaaS Databases', 'Customer Data Platforms (CDP)', 'Audit & Compliance Logs'],
    cta: 'Optimize Data Architecture →',
    stats: '10M+ Daily Queries'
  },
  {
    name: 'Redis',
    tagline: 'Ultra-Fast In-Memory Acceleration',
    desc1: 'We deploy in-memory caching grids that eliminate database bottlenecks during peak business traffic events.',
    desc2: 'Your users enjoy immediate query results, while your server infrastructure costs drop significantly through efficient resource reuse.',
    benefits: ['Instant session management', 'Drastic infrastructure cost reduction', 'Peak-load buffer protection', 'Real-time leaderboard analytics'],
    useCases: ['High-Speed Session Caching', 'Real-Time Inventory Tracking', 'API Rate-Limiting Protection'],
    cta: 'Accelerate Platform Speed →',
    stats: '< 5ms Cache Response'
  }
];

const CLOUD_TECHS = [
  {
    name: 'AWS & Cloudflare',
    tagline: 'Global Enterprise Resilience & Edge Protection',
    desc1: 'We engineer multi-region cloud infrastructures with automated DDoS protection, edge routing, and automated scaling policies.',
    desc2: 'Your platforms scale automatically during traffic surges while remaining protected from cyber threats and zero-day vulnerabilities.',
    benefits: ['Auto-scaling infrastructure', 'Global DDoS mitigation', 'Reduced cloud overhead', 'Sub-second edge caching'],
    useCases: ['Multi-Region Cloud Deployments', 'Global Edge Content Delivery', 'Disaster Recovery Systems'],
    cta: 'Secure Cloud Footprint →',
    stats: '100% DDoS Mitigation'
  },
  {
    name: 'Docker & GitHub Actions',
    tagline: 'Continuous Delivery & Infrastructure Pipelines',
    desc1: 'We automate software deployment workflows, enabling product teams to release new features safely with zero customer downtime.',
    desc2: 'Containerized deployments ensure that your software behaves identically across testing, staging, and live production environments.',
    benefits: ['Zero-downtime releases', 'Standardized execution environments', 'Automated security checks', 'Rapid rollback capability'],
    useCases: ['Automated CI/CD Pipelines', 'Containerized Microservices', 'Enterprise DevSecOps'],
    cta: 'Automate Deployments →',
    stats: '15-Min Deployment Cycles'
  }
];

const AI_TECHS = [
  {
    name: 'OpenAI, Gemini & LangChain',
    tagline: 'Autonomous AI Agents & Document Intelligence',
    desc1: 'We embed custom AI pipelines into existing business software to automate customer support, document analysis, and decision workflows.',
    desc2: 'Transform unstructured company documents and emails into actionable business insight with minimal human intervention required.',
    benefits: ['80% support automation rate', 'Instant document extraction', 'Private enterprise data isolation', 'Continuous process improvement'],
    useCases: ['Automated Support Copilots', 'Contract & Document Analyzers', 'Custom Enterprise Knowledge Assistants'],
    cta: 'Deploy Custom AI →',
    stats: '80% Workload Automated'
  },
  {
    name: 'Vector Databases & Automation',
    tagline: 'Semantic Enterprise Search & Workflow Automation',
    desc1: 'We integrate semantic vector search layers that allow employees and customers to query complex internal databases using natural language.',
    desc2: 'Unlock institutional knowledge immediately, allowing teams to make faster data-driven decisions without deep SQL experience.',
    benefits: ['Contextual search accuracy', 'Natural language data querying', 'Seamless internal CRM connections', 'Instant retrieval of complex data'],
    useCases: ['Semantic Enterprise Search', 'Internal Knowledge Retrieval', 'Automated Operational Pipelines'],
    cta: 'Integrate Vector Search →',
    stats: '10x Faster Information Access'
  }
];

const FAQS = [
  { q: "How do you select the technical stack for my project?", a: "We analyze your business growth goals, security needs, and scaling roadmap to select technologies that minimize long-term operational costs." },
  { q: "Will our non-technical team be able to manage the platform?", a: "Yes. We design intuitive admin panels and automated operations tools that require zero coding knowledge to manage daily business tasks." },
  { q: "How do you protect enterprise data and intellectual property?", a: "We enforce strict encryption at rest and in transit, private enterprise cloud setups, and full IP ownership transfer upon delivery." },
  { q: "Can you modernize our legacy platform without disrupting existing business?", a: "Yes. We execute parallel cloud migrations and modular API integrations to guarantee zero operational downtime for your existing clients." },
  { q: "What is the typical deployment timeline for a custom platform?", a: "Most enterprise projects deploy their MVP in 6 to 10 weeks, with continuous feature updates delivered via automated CI/CD pipelines." }
];

// ==========================================
// 2. MAIN COMPONENT EXPORT
// ==========================================

export default function Technologies() {
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      
      {/* BACKGROUND GRAPHICS & MESH GRADIENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-[30%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      </div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <Navbar />

        {/* HERO SECTION */}
        <HeroSection />

        {/* TRUST BADGES / METRICS STRIP */}
        <MetricsBanner />

        {/* INTERACTIVE TECH PORTFOLIO SHOWCASE */}
        <section id="technologies" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Enterprise Technology Architecture
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6"
            >
              How We Turn Complex Code into Unfair Business Advantage
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg"
            >
              We don't sell developer frameworks. We deploy carefully selected enterprise technologies that lower your operating costs, delight your clients, and secure your long-term scale.
            </motion.p>
          </div>

          {/* CATEGORY SELECTOR TABS */}
          <div className="flex justify-center mb-16 overflow-x-auto pb-4 scrollbar-none">
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
              {TECH_CATEGORIES.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 rounded-xl shadow-lg shadow-cyan-500/10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="relative z-10">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC TECH SECTIONS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'frontend' && (
                <div className="space-y-24">
                  <TechSectionAlternate data={FRONTEND_TECHS[0]} visualType="dashboard" layout="image-right" />
                  <TechSectionAlternate data={FRONTEND_TECHS[1]} visualType="speed" layout="image-left" />
                  <TechSectionAlternate data={FRONTEND_TECHS[2]} visualType="ui" layout="centered" />
                </div>
              )}

              {activeTab === 'backend' && (
                <div className="space-y-24">
                  <TechSectionAlternate data={BACKEND_TECHS[0]} visualType="api" layout="image-right" />
                  <TechSectionAlternate data={BACKEND_TECHS[1]} visualType="security" layout="image-left" />
                </div>
              )}

              {activeTab === 'database' && (
                <div className="space-y-24">
                  <TechSectionAlternate data={DATABASE_TECHS[0]} visualType="database" layout="image-left" />
                  <TechSectionAlternate data={DATABASE_TECHS[1]} visualType="cache" layout="image-right" />
                </div>
              )}

              {activeTab === 'cloud' && (
                <div className="space-y-24">
                  <TechSectionAlternate data={CLOUD_TECHS[0]} visualType="cloud" layout="image-right" />
                  <TechSectionAlternate data={CLOUD_TECHS[1]} visualType="pipeline" layout="image-left" />
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-24">
                  <TechSectionAlternate data={AI_TECHS[0]} visualType="ai-chat" layout="image-right" />
                  <TechSectionAlternate data={AI_TECHS[1]} visualType="vector" layout="image-left" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* BEFORE / AFTER BUSINESS TRANSFORMATION */}
        <BeforeAfterSection />

        {/* RECENT PROJECT PREVIEWS */}
        <ProjectShowcaseSection />

        {/* FAQ SECTION */}
        <FAQSection />

        {/* FINAL CTA SECTION */}
        <CTASection />

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}

// ==========================================
// 3. NAVBAR
// ==========================================

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">VeloRa</span>
            <span className="text-xs text-cyan-400 block font-mono font-medium -mt-1">TECHNOLOGIES</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#technologies" className="hover:text-cyan-400 transition-colors">Tech Architecture</a>
          <a href="#transformation" className="hover:text-cyan-400 transition-colors">Client Impact</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Live Platforms</a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
        </div>

        <button className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-xs uppercase tracking-wider">
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full group-hover:opacity-90 transition-opacity" />
          <div className="relative px-5 py-2.5 rounded-full bg-slate-950 transition-all duration-300 group-hover:bg-opacity-0">
            <span className="relative z-10 text-white flex items-center gap-2">
              Book Architecture Review <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>
      </div>
    </nav>
  );
}

// ==========================================
// 4. HERO SECTION WITH ANIMATED ENTERPRISE DIAGRAM
// ==========================================

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* HERO COPY */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-slate-300 text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Enterprise-Grade Digital Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Modern Technologies Behind Every{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Successful Digital Product
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            Instead of stitching together fragile templates, VeloRa builds custom enterprise platforms engineered with handpicked, scalable technologies optimized for speed, security, and long-term business valuation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href="#technologies"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2"
            >
              Explore Our Tech Capabilities <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#transformation"
              className="px-8 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white font-semibold text-sm hover:bg-white/[0.08] transition-all text-center"
            >
              View Client Outcomes
            </a>
          </motion.div>

          {/* FLOATING BADGES */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4 flex items-center gap-6 border-t border-white/10 text-slate-400 text-xs font-medium"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> SOC2 Compliant Ops
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> 99.99% Guaranteed SLA
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" /> Private Enterprise Data
            </div>
          </motion.div>
        </div>

        {/* HERO ANIMATED ENTERPRISE DIAGRAM */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px]">
          <div className="relative w-full max-w-lg h-[420px] rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl flex items-center justify-center overflow-hidden">
            
            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/5 to-purple-500/10" />

            {/* CENTRAL CORE NODE */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="z-20 w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-2xl shadow-cyan-500/30"
            >
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex flex-col items-center justify-center p-3 text-center">
                <Zap className="w-8 h-8 text-cyan-400 mb-1 animate-pulse" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">VeloRa Core</span>
              </div>
            </motion.div>

            {/* FLOATING SATELLITE TECH NODES */}
            <FloatingNode
              icon={Bot}
              title="Enterprise AI"
              subtitle="OpenAI / LangChain"
              position="top-6 left-6"
              color="text-purple-400"
              borderColor="border-purple-500/30"
              delay={0}
            />

            <FloatingNode
              icon={Cloud}
              title="Cloud Edge"
              subtitle="AWS / Cloudflare"
              position="top-6 right-6"
              color="text-cyan-400"
              borderColor="border-cyan-500/30"
              delay={1}
            />

            <FloatingNode
              icon={Database}
              title="High-Speed Data"
              subtitle="Postgres / Redis"
              position="bottom-6 left-6"
              color="text-emerald-400"
              borderColor="border-emerald-500/30"
              delay={2}
            />

            <FloatingNode
              icon={Code2}
              title="Modern Portals"
              subtitle="React / Next.js"
              position="bottom-6 right-6"
              color="text-indigo-400"
              borderColor="border-indigo-500/30"
              delay={3}
            />

            {/* SVG CONNECTING ANIMATED DATA LINES */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/15" strokeWidth="1.5" strokeDasharray="4 4">
              <line x1="20%" y1="20%" x2="50%" y2="50%" />
              <line x1="80%" y1="20%" x2="50%" y2="50%" />
              <line x1="20%" y1="80%" x2="50%" y2="50%" />
              <line x1="80%" y1="80%" x2="50%" y2="50%" />
            </svg>

          </div>
        </div>

      </div>
    </section>
  );
}

function FloatingNode({ icon: Icon, title, subtitle, position, color, borderColor, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
      className={`absolute ${position} z-20 bg-slate-900/90 border ${borderColor} backdrop-blur-xl p-3.5 rounded-2xl shadow-xl flex items-center gap-3 w-48`}
    >
      <div className={`p-2 rounded-xl bg-white/[0.05] ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-left overflow-hidden">
        <p className="text-xs font-bold text-white truncate">{title}</p>
        <p className="text-[10px] text-slate-400 font-mono truncate">{subtitle}</p>
      </div>
    </motion.div>
  );
}

// ==========================================
// 5. METRICS STRIP
// ==========================================

function MetricsBanner() {
  const stats = [
    { label: "Average Page Acceleration", value: "3.2x", detail: "Faster than industry benchmarks" },
    { label: "Target Uptime Reliability", value: "99.99%", detail: "Enterprise SLA standard" },
    { label: "Deployment Security Rating", value: "100%", detail: "Automated vulnerability scans" },
    { label: "Average Client ROI Lift", value: "+210%", detail: "In first 12 months post-launch" },
  ];

  return (
    <div className="border-y border-white/10 bg-white/[0.02] backdrop-blur-md my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-1"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                {s.value}
              </p>
              <p className="text-xs font-bold text-white uppercase tracking-wider">{s.label}</p>
              <p className="text-[11px] text-slate-400">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. ALTERNATING TECH SECTION COMPONENT
// ==========================================

function TechSectionAlternate({ data, visualType, layout }) {
  const isCentered = layout === 'centered';
  const isImageLeft = layout === 'image-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`min-h-[60vh] flex items-center justify-center rounded-3xl bg-slate-900/30 border border-white/10 p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl ${
        isCentered ? 'text-center' : ''
      }`}
    >
      {/* GLOW DECORATOR */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className={`grid ${isCentered ? 'grid-cols-1 max-w-3xl mx-auto' : 'lg:grid-cols-12'} gap-12 items-center w-full relative z-10`}>
        
        {/* TEXT CONTENT */}
        <div className={`${isCentered ? '' : 'lg:col-span-6'} ${isImageLeft && !isCentered ? 'lg:order-2' : ''} space-y-6 text-left`}>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
              {data.name}
            </div>
            <span className="text-xs text-slate-400 font-semibold">{data.stats}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {data.tagline}
          </h3>

          <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>{data.desc1}</p>
            <p>{data.desc2}</p>
          </div>

          {/* BUSINESS BENEFITS */}
          <div className="pt-2 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Client Benefits:</p>
            <div className="grid grid-cols-2 gap-2.5">
              {data.benefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EXAMPLE USE CASES */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Where We Deploy This:</p>
            <div className="flex flex-wrap gap-2">
              {data.useCases.map((uc, uIdx) => (
                <span key={uIdx} className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-slate-300">
                  {uc}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              {data.cta}
            </a>
          </div>
        </div>

        {/* VISUAL MOCKUP COMPONENT */}
        {!isCentered && (
          <div className={`lg:col-span-6 ${isImageLeft ? 'lg:order-1' : ''} flex items-center justify-center`}>
            <InteractiveMockup visualType={visualType} />
          </div>
        )}

      </div>
    </motion.div>
  );
}

// ==========================================
// 7. INTERACTIVE VISUAL MOCKUPS
// ==========================================

function InteractiveMockup({ visualType }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-md h-72 rounded-2xl bg-slate-950/80 border border-white/15 p-5 shadow-2xl overflow-hidden flex flex-col justify-between"
    >
      {/* TOP HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          VeloRa Engine v4.2
        </span>
      </div>

      {/* DYNAMIC CONTENT BASED ON VISUAL TYPE */}
      {visualType === 'dashboard' && (
        <div className="space-y-3 my-auto">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Live Customer Activity</span>
            <span className="text-emerald-400 font-mono">+18.4%</span>
          </div>
          <div className="h-16 flex items-end gap-2 pt-2">
            {[40, 65, 45, 90, 75, 100, 85].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex-1 bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-t-sm"
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
          </div>
        </div>
      )}

      {visualType === 'speed' && (
        <div className="my-auto text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <Gauge className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white">99 / 100</p>
            <p className="text-xs text-emerald-400 font-mono mt-1">Lighthouse Performance Score</p>
          </div>
        </div>
      )}

      {visualType === 'api' && (
        <div className="my-auto font-mono text-xs space-y-2">
          <div className="text-emerald-400 flex items-center justify-between bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
            <span>POST /api/v2/transactions</span>
            <span>200 OK (12ms)</span>
          </div>
          <div className="text-cyan-400 flex items-center justify-between bg-cyan-500/10 p-2 rounded border border-cyan-500/20">
            <span>GET /api/v2/analytics</span>
            <span>200 OK (8ms)</span>
          </div>
          <div className="text-indigo-400 flex items-center justify-between bg-indigo-500/10 p-2 rounded border border-indigo-500/20">
            <span>STREAM /api/v2/live-feed</span>
            <span>CONNECTED</span>
          </div>
        </div>
      )}

      {visualType === 'database' && (
        <div className="my-auto space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300">Replication Status</span>
            <span className="text-emerald-400 font-mono">Synchronized</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-white/10">
            <div className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-2.5 rounded-full w-[94%]" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
            <div className="bg-white/[0.03] p-2 rounded">Active Connections: 2,450</div>
            <div className="bg-white/[0.03] p-2 rounded">Latency: 0.8ms</div>
          </div>
        </div>
      )}

      {visualType === 'cloud' && (
        <div className="my-auto text-center space-y-3">
          <div className="flex justify-center gap-4">
            <Globe className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '15s' }} />
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xs text-slate-300 font-medium">Multi-Region Edge Routing Active</p>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
            Zero Attacks Detected
          </span>
        </div>
      )}

      {visualType === 'ai-chat' && (
        <div className="my-auto space-y-2 text-xs">
          <div className="bg-slate-900 p-2.5 rounded-lg border border-white/10 text-slate-300">
            <span className="text-purple-400 font-mono">User:</span> Summarize Q2 Financial Audit
          </div>
          <div className="bg-purple-500/10 p-2.5 rounded-lg border border-purple-500/20 text-purple-200">
            <span className="text-purple-400 font-mono">AI Agent:</span> Revenue increased by 28%. Operational friction dropped 42%.
          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-white/10 pt-2 font-mono">
        <span>STATUS: OPTIMAL</span>
        <span>LATENCY: 4MS</span>
      </div>
    </motion.div>
  );
}

// ==========================================
// 8. BEFORE / AFTER TRANSFORMATION SECTION
// ==========================================

function BeforeAfterSection() {
  return (
    <section id="transformation" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          The Business Impact of Handcrafted Software Architecture
        </h2>
        <p className="text-slate-400 text-base">
          See how transitioning from generic templates to VeloRa's engineered stack changes your bottom line.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* BEFORE CARD */}
        <div className="p-8 rounded-3xl bg-red-950/10 border border-red-500/20 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">
              ✕
            </div>
            <h3 className="text-xl font-bold text-red-200">Generic Template Software</h3>
          </div>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>Slow page loads lead to high customer bounce rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>Fragile plugin dependencies cause frequent unexpected downtime</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>Inability to customize software to unique business workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>High cloud server expenses due to unoptimized database code</span>
            </li>
          </ul>
        </div>

        {/* AFTER CARD */}
        <div className="p-8 rounded-3xl bg-emerald-950/10 border border-emerald-500/30 backdrop-blur-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ✓
            </div>
            <h3 className="text-xl font-bold text-emerald-200">VeloRa Custom Architecture</h3>
          </div>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Instant UI responsiveness drives 3x higher customer conversion</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>99.99% operational uptime backed by multi-region cloud resilience</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>100% custom codebase built precisely around your operational strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Up to 45% reduction in annual cloud hosting bills via optimized caching</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 9. RECENT PROJECT SHOWCASE
// ==========================================

function ProjectShowcaseSection() {
  const projects = [
    { title: "FinTech Customer Portal", tech: "React + Node.js + Postgres", result: "Processed $14M in transaction volume during year one with zero downtime." },
    { title: "Healthcare Operations Hub", tech: "Next.js + Spring Boot + AWS", result: "Reduced patient intake wait times by 62% using automated triage." },
    { title: "Enterprise AI Document Parser", tech: "OpenAI + Vector DB + Redis", result: "Automated 85% of manual invoice verification workflows." },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Engineered Platforms in Production
        </h2>
        <p className="text-slate-400 text-base">
          A preview of real-world enterprise platforms engineered using our core technology stack.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className="p-6 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                {p.tech}
              </span>
              <h3 className="text-xl font-bold text-white pt-2">{p.title}</h3>
              <p className="text-slate-400 text-sm">{p.result}</p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Request Platform Case Study <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 10. FAQ SECTION
// ==========================================

function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-sm">
          Straightforward answers regarding our technology selection and delivery model.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl space-y-2"
          >
            <p className="text-base font-semibold text-white">{faq.q}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 11. CTA SECTION
// ==========================================

function CTASection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 p-1">
        <div className="rounded-[23px] bg-slate-950 p-10 sm:p-16 text-center space-y-8 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Ready to Build a Fast, Scalable Enterprise Platform?
          </h2>

          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Let's review your product roadmap and design a modern technology stack engineered for speed, security, and long-term business valuation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2">
              Schedule Architecture Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            No obligation • 30-Minute Technical Assessment • Guaranteed IP Ownership
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 12. FOOTER
// ==========================================

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-400 text-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-white font-bold tracking-wider">VeloRa Technologies</span>
        </div>
        <p>© {new Date().getFullYear()} VeloRa Technologies. All Rights Reserved. Enterprise Software Architecture.</p>
        <div className="flex items-center gap-6 text-slate-400">
          <a href="#technologies" className="hover:text-white transition-colors">Technologies</a>
          <a href="#transformation" className="hover:text-white transition-colors">Outcomes</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
      </div>
    </footer>
  );
}