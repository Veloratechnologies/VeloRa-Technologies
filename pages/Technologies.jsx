import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  ShieldCheck
} from 'lucide-react';

// ==========================================
// INLINE VECTOR LOGOS FOR ALL INDIVIDUAL TECHS
// ==========================================

const TechLogos = {
  react: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  nextjs: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-900" viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="90" fill="currentColor"/>
      <path d="M149.508 157.52L69.142 54H54V125.97H66.8136V70.3808L137.6 161.3C141.82 160.27 145.81 159.01 149.508 157.52Z" fill="white"/>
      <rect x="115" y="54" width="13" height="72" fill="white"/>
    </svg>
  ),
  tailwind: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
    </svg>
  ),
  nodejs: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.821a1.233 1.233 0 0 0-.616.166L2.348 7.23A1.233 1.233 0 0 0 1.732 8.3v10.4a1.233 1.233 0 0 0 .616 1.069l9.036 5.243a1.233 1.233 0 0 0 1.232 0l9.036-5.243a1.233 1.233 0 0 0 .616-1.069V8.3a1.233 1.233 0 0 0-.616-1.07L12.616 1.98A1.233 1.233 0 0 0 12 1.821z"/>
    </svg>
  ),
  express: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.8 13.6h-1.6l-2.2-3.4-2.2 3.4H8.2l3.1-4.6L8.4 6.4h1.6l2 3.1 2-3.1h1.6l-2.9 4.6 3.1 4.6z"/>
    </svg>
  ),
  springboot: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#6DB33F]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.578 8.016c-.308-.255-3.32-2.616-7.85-2.616-5.833 0-9.845 3.993-9.845 9.774 0 5.378 3.868 9.38 9.48 9.38 5.76 0 8.793-3.666 8.793-3.666l-1.602-1.896s-2.52 2.652-6.57 2.652c-3.606 0-6.19-2.484-6.19-6.31 0-3.957 2.688-6.732 6.84-6.732 2.923 0 5.127 1.344 5.352 1.488l1.592-2.074z"/>
    </svg>
  ),
  postgres: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/>
    </svg>
  ),
  mongodb: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22s-7.5-3.5-7.5-11.5C4.5 5.5 8 2 12 2s7.5 3.5 7.5 8.5C19.5 18.5 12 22 12 22zm0-18c-2.8 0-5 2.5-5 6.5 0 5.5 5 8.5 5 8.5s5-3 5-8.5c0-4-2.2-6.5-5-6.5z"/>
    </svg>
  ),
  redis: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#DC382D]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.2 12.3c0-.6-.3-1.1-.9-1.3L13 7.8c-.6-.2-1.3-.2-1.9 0L3.8 11c-.6.2-.9.7-.9 1.3s.3 1.1.9 1.3l7.3 3.2c.6.2 1.3.2 1.9 0l7.3-3.2c.6-.2.9-.7.9-1.3z"/>
    </svg>
  ),
  aws: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.75 12.82c-.41 0-.75.34-.75.75v1.88c0 1.24-1.01 2.25-2.25 2.25H8.25C7.01 17.7 6 16.69 6 15.45v-1.88c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.88c0 2.07 1.68 3.75 3.75 3.75h7.5c2.07 0 3.75-1.68 3.75-3.75v-1.88c0-.41-.34-.75-.75-.75zM12 3L6.5 8.5h3.75v5.5h3.5V8.5h3.75L12 3z"/>
    </svg>
  ),
  cloudflare: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#F38020]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.2 13.5c0-.4-.1-.8-.3-1.1-.3-.6-.9-1-1.6-1.1-.2 0-.4 0-.6.1-.4-1.8-2-3.1-3.9-3.1-1.6 0-3.1.9-3.7 2.3-.3-.1-.6-.2-.9-.2-1.5 0-2.8 1.1-3.1 2.6C2.8 13.3 1.8 14.7 1.8 16.3c0 2.1 1.7 3.8 3.8 3.8h12.3c2 0 3.7-1.6 3.7-3.6 0-1.6-1.3-3-3.4-3c0 0 0 0 0 0z"/>
    </svg>
  ),
  docker: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 0 0 .186-.186V3.574a.185.185 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .103.082.186.185.186zm-2.954 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H8.075a.185.185 0 0 0-.185.185v1.887c0 .103.083.186.185.186zm0 2.714h2.119a.186.186 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H8.075a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186H5.12a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185z"/>
    </svg>
  ),
  githubactions: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.39-1.305.705-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  openai: (
    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9013 6.0072 6.0072 0 0 0-4.3814-1.9272 6.022 6.022 0 0 0-5.727 4.1481 6.002 6.002 0 0 0-4.0016 2.9023 6.0462 6.0462 0 0 0 .7412 7.0945 5.9847 5.9847 0 0 0 .5157 4.9108 6.0462 6.0462 0 0 0 6.5098 2.9013 6.0072 6.0072 0 0 0 4.3814 1.9272 6.022 6.022 0 0 0 5.727-4.1481 6.002 6.002 0 0 0 4.0016-2.9023 6.0462 6.0462 0 0 0-.7412-7.0945z"/>
    </svg>
  )
};

// ==========================================
// GROUPED TECHNOLOGIES DATA
// ==========================================

const TECH_GROUPS = [
  {
    category: 'Frontend Engineering',
    description: 'High-performance, responsive interfaces & web applications.',
    items: [
      {
        id: 'react',
        name: 'React.js',
        logoKey: 'react',
        badge: 'UI Library',
        definition: 'A premier JavaScript library for engineering interactive, zero-latency user interfaces.',
        benefits: [
          'Instant rendering without full-page reloads',
          'App-like responsive experience on all devices',
          'Modular code for rapid feature scaling'
        ],
        stats: 'Sub-second UI Speed'
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        logoKey: 'nextjs',
        badge: 'Enterprise SSR',
        definition: 'An enterprise React framework offering server-side rendering and edge distribution.',
        benefits: [
          'Top-tier Google SEO search optimization',
          'Global CDN distribution for fast load speeds',
          'Built-in asset & image optimization'
        ],
        stats: '100/100 Lighthouse'
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        logoKey: 'tailwind',
        badge: 'Design System',
        definition: 'A utility-first CSS framework for crafting custom web layouts without bloat.',
        benefits: [
          '60% smaller file size than old CSS frameworks',
          '100% custom brand design systems',
          'Pixel-perfect mobile & desktop alignment'
        ],
        stats: '60% Smaller CSS'
      }
    ]
  },
  {
    category: 'Backend Systems',
    description: 'Scalable server-side engines, APIs, and business logic.',
    items: [
      {
        id: 'nodejs',
        name: 'Node.js',
        logoKey: 'nodejs',
        badge: 'JS Runtime',
        definition: 'An asynchronous JavaScript runtime built for high-concurrency backend services.',
        benefits: [
          'Handles thousands of concurrent connections',
          'Powers real-time data streaming & live feeds',
          'Maintains 99.99% operational uptime'
        ],
        stats: '99.99% Uptime'
      },
      {
        id: 'express',
        name: 'Express.js',
        logoKey: 'express',
        badge: 'API Framework',
        definition: 'A minimalist Node.js web application framework for building fast RESTful APIs.',
        benefits: [
          'Ultra-fast API routing and processing',
          'Seamless microservice & payment integrations',
          'Lightweight footprint with low server cost'
        ],
        stats: '< 10ms API Latency'
      },
      {
        id: 'springboot',
        name: 'Spring Boot',
        logoKey: 'springboot',
        badge: 'Enterprise Java',
        definition: 'A robust Java framework designed for mission-critical enterprise environments requiring high security.',
        benefits: [
          'Bank-grade encryption & data compliance',
          'Strict transaction audit logging',
          'Sub-20ms speed with legacy DB support'
        ],
        stats: 'Bank-Grade Security'
      }
    ]
  },
  {
    category: 'Data Architecture',
    description: 'Fault-tolerant databases and high-speed in-memory caching.',
    items: [
      {
        id: 'postgres',
        name: 'PostgreSQL',
        logoKey: 'postgres',
        badge: 'Relational DB',
        definition: 'An advanced open-source relational database built for strict data integrity.',
        benefits: [
          'ACID compliant for zero transaction loss',
          'Sub-millisecond complex SQL query speed',
          'Automated backups & disaster recovery'
        ],
        stats: 'Zero Data Loss'
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        logoKey: 'mongodb',
        badge: 'NoSQL Document',
        definition: 'A flexible document database designed for high-velocity unstructured data scaling.',
        benefits: [
          'Dynamic schema evolution without downtime',
          'High throughput horizontal data sharding',
          'Ideal for real-time analytics & SaaS logs'
        ],
        stats: 'High Concurrency'
      },
      {
        id: 'redis',
        name: 'Redis Cache',
        logoKey: 'redis',
        badge: 'In-Memory RAM',
        definition: 'An ultra-fast in-memory data store for instant session handling and query acceleration.',
        benefits: [
          'Retrieves cached data under 5 milliseconds',
          'Prevents database crashes during traffic surges',
          'Lowers monthly cloud hosting server bills'
        ],
        stats: '< 5ms Cache Response'
      }
    ]
  },
  {
    category: 'Cloud & Infrastructure',
    description: 'CI/CD deployment pipelines, multi-region cloud, and security shields.',
    items: [
      {
        id: 'aws',
        name: 'Amazon Web Services',
        logoKey: 'aws',
        badge: 'Cloud Host',
        definition: 'Multi-region enterprise cloud infrastructure with automated global scaling.',
        benefits: [
          'Auto-scales server resources during surges',
          'Multi-region redundancy & disaster recovery',
          'Secure cloud compliance & access controls'
        ],
        stats: 'Multi-Region Scale'
      },
      {
        id: 'cloudflare',
        name: 'Cloudflare',
        logoKey: 'cloudflare',
        badge: 'Edge CDN Shield',
        definition: 'A global edge network offering web performance acceleration and DDoS firewall protection.',
        benefits: [
          '100% mitigation against hacker DDoS attacks',
          'Global edge caching for instant loading',
          'SSL security encryption & WAF rules'
        ],
        stats: '100% DDoS Mitigation'
      },
      {
        id: 'docker',
        name: 'Docker',
        logoKey: 'docker',
        badge: 'Containers',
        definition: 'Containerization platform that packages applications and dependencies into isolated environments.',
        benefits: [
          'Identical software execution across servers',
          'Zero-downtime microservice deployments',
          'Lightweight resource usage per container'
        ],
        stats: 'Zero-Downtime'
      },
      {
        id: 'githubactions',
        name: 'GitHub Actions',
        logoKey: 'githubactions',
        badge: 'CI/CD Automation',
        definition: 'Automated continuous integration and deployment pipelines directly from code repositories.',
        benefits: [
          'Automated code vulnerability testing',
          '1-click instant software deployment',
          'Automated regression testing pipelines'
        ],
        stats: '15-Min Deployments'
      }
    ]
  },
  {
    category: 'AI & Automation',
    description: 'Autonomous AI agents, document intelligence, and semantic search.',
    items: [
      {
        id: 'openai',
        name: 'OpenAI & LangChain',
        logoKey: 'openai',
        badge: 'Generative AI',
        definition: 'Advanced AI framework for embedding autonomous agents and copilots into applications.',
        benefits: [
          'Automates 80% of routine support requests',
          'Instant document & PDF text extraction',
          'Private enterprise data isolation'
        ],
        stats: '80% Workload Automated'
      }
    ]
  }
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ==========================================
// MAIN COMPONENT EXPORT AS Technologies
// ==========================================

export default function Technologies() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { id: 'all', label: 'All Stack' },
    { id: 'Frontend Engineering', label: 'Frontend' },
    { id: 'Backend Systems', label: 'Backend' },
    { id: 'Data Architecture', label: 'Database' },
    { id: 'Cloud & Infrastructure', label: 'Cloud Ops' },
    { id: 'AI & Automation', label: 'AI' },
  ];

  const filteredGroups = activeTab === 'all'
    ? TECH_GROUPS
    : TECH_GROUPS.filter(group => group.category === activeTab);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* IMPORTED NAVBAR */}
      <Navbar />

      {/* PAGE ENTRANCE ANIMATION WRAPPER */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative overflow-hidden"
      >
        
        {/* FULL-HEIGHT HERO SECTION (RESTORED TO ORIGINAL FULL HEIGHT) */}
        <section className="relative min-h-screen py-28 md:py-36 flex items-center justify-center overflow-hidden">
          
          {/* FULL-SCREEN HERO BACKGROUND IMAGE */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.5 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/Our_technologies_HeroImage.png"
              alt="Velora Technologies Enterprise Software Architecture"
              fill
              priority
              className="object-cover object-center z-0 opacity-40 md:opacity-50"
            />
          </motion.div>

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 " />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl"
            >
              {/* PILL BADGE */}
              <span className="inline-flex items-center gap-1.5 bg-transparent border  border-blue-300 text-primary font-bold text-[10px] md:text-xs tracking-wider uppercase px-2.5 py-1 md:px-3 md:py-1.5 rounded-full mb-4 md:mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                OUR TECHNOLOGIES
              </span>

              {/* MAIN HEADLINE */}
              <h1 className="px-2 py-3 text-3xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Enterprise Technology
                <span className="block text-primary py-2">
                  Architectures Built For Scale
                </span>
              </h1>

              {/* SUBTITLE */}
              <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-slate-700 font-medium">
                We architect resilient digital products, high-throughput backend engines, intuitive user interfaces, and automated AI pipelines using battle-tested modern enterprise technologies.
              </p>


              {/* TRUST BADGES */}
              <div className="mt-10 pt-6 border-t border-slate-300/80 flex items-center gap-4 sm:gap-6 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" /> Secured
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600 shrink-0" /> Modern 
                </div>
              </div>

            </motion.div>
          </div>

        </section>

        {/* STACK CONTENT SECTION */}
        <section id="stack-content" className="py-12 md:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* FILTER TABS */}
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-14">
            <span className="text font-bold tracking-widest text-[10px] md:text-xs uppercase">
              ENTERPRISE STACK
            </span>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold mt-1 text-slate-900 tracking-tight">
              Handpicked Technologies For Your Growth
            </h2>

            {/* TABS BUTTONS (Sleek Rounded-Full) */}
            <div className="mt-6 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 pt-2 scrollbar-none px-1">
              {categories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`relative px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold transition-all whitespace-nowrap border-2 ${
                      isActive
                        ? 'bg-primary text-white border-slate-500 shadow-sm scale-105 '
                        : 'bg-white text-slate-600 border-blue-200 hover:text-blue-600 hover:border-blue-400 py-2'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GROUPED CARDS DISPLAY */}
          <div className="space-y-12 md:space-y-20">
            <AnimatePresence mode="popLayout">
              {filteredGroups.map((group) => (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 md:space-y-6"
                >
                  
                  {/* CATEGORY TITLE */}
                  <div className="border-b-2 border-blue-200 pb-3 flex flex-row items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {group.category}
                      </h2>
                      <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 mt-0.5">
                        {group.description}
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-primary bg-blue-100/90 px-2.5 py-1 rounded-full border border-blue-300 shrink-0">
                      {group.items.length} Items
                    </span>
                  </div>

                  {/* ANIMATED CARDS GRID - ONLY CARDS HAVE REDUCED ROUNDNESS (rounded-md) */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 "
                  >
                    {group.items.map((tech) => (
                      <motion.div
                        key={tech.id}
                        variants={cardVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-slate-200/50 opacity-90 border-2 border-blue-200/90 rounded-md p-3 sm:p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                      >
                        {/* HOVER GLOW BAR */}
                        <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div>
                          {/* HIGHLIGHTED LOGO CONTAINER & BADGE */}
                          <div className="flex items-start justify-between gap-2 mb-3 md:mb-5">
                            
                            {/* INLINE LOGO BOX */}
                            <motion.div 
                              whileHover={{ scale: 1.1, rotate: 2 }}
                              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md bg-slate-50 border-2 border-blue-200 flex items-center justify-center p-1.5 sm:p-2.5 shadow-sm group-hover:border-blue-600 group-hover:bg-blue-50/60 group-hover:shadow-md transition-all duration-300 shrink-0"
                            >
                              {TechLogos[tech.logoKey]}
                            </motion.div>

                            <div className="flex flex-col items-end gap-1">
                              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-mono font-bold bg-blue-50 text-primary border border-blue-200 truncate">
                                {tech.badge}
                              </span>
                            </div>
                          </div>

                          {/* TECH NAME */}
                          <h3 className="text-xs sm:text-base md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1 truncate">
                            {tech.name}
                          </h3>

                          {/* DEFINITION */}
                          <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 leading-tight sm:leading-relaxed mb-3 md:mb-5 line-clamp-2 sm:line-clamp-none">
                            {tech.definition}
                          </p>
                        </div>

                        {/* CLIENT ADVANTAGE HIGHLIGHT BOX */}
                        <div className="pt-2 md:pt-3 border-t border-slate-100 bg-slate-50/90 group-hover:bg-blue-50/50 -mx-3 -mb-3 sm:-mx-5 sm:-mb-5 md:-mx-6 md:-mb-6 p-2.5 sm:p-4 rounded-b-md transition-colors">
                          <p className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary mb-1">
                               Advantage:
                          </p>
                          <div className="space-y-1">
                            {tech.benefits.map((benefit, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-1 sm:gap-1.5 text-[9px] sm:text-xs text-slate-700 leading-tight">
                                <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />
                                <span className="truncate sm:whitespace-normal">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    ))}
                  </motion.div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </section>

        {/* BOTTOM CTA SECTION */}
        <section id="contact" className="pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 p-[2px] shadow-xl"
          >
            <div className="rounded-[14px] bg-white p-6 sm:p-10 md:p-12 text-center space-y-4 relative overflow-hidden">
              <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
                Ready to Build Your Platform with the Right Stack?
              </h2>

              <p className="text-xs sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Our engineering team will assess your business goals and design a technology architecture optimized for speed, reliability, and cost-efficiency.
              </p>

              <div className="pt-2">
                <a href='/contactUs'>
                <button className="px-6 py-3 rounded-full bg-primary  text-gray-200 font-bold text-xs md:text-sm hover:bg-blue-700/20 hover:text-gray-800 transition-all shadow-md  inline-flex items-center gap-2 group">
                  Schedule Technical Architecture Review <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
                </button>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </motion.main>

      {/* IMPORTED FOOTER */}
      <Footer />
    </>
  );
}