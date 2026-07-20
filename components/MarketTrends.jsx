'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Cloud,
  Lock,
  BarChart3,
  Cpu,
  AppWindow,
  ArrowRight,
  Shield,
  Code2,
  Bot
} from 'lucide-react';

const trendsData = [
  {
    id: 1,
    icon: Code2,
    title: "Custom Software",
    subtitle: "DIGITAL TRANSFORMATION",
    description:
      "Organizations are moving away from one-size-fits-all platforms in favor of custom software tailored to their business processes. Personalized digital solutions improve operational efficiency, customer experience, scalability, and long-term return on technology investments.",
    growth: "+188%",
    metric: "Digital Product Investment",
    shadowColor: "rgba(99, 102, 241, 0.15)",
    image: "Custom_Software.png",
  },
  {
    id: 2,
    icon: Zap,
    title: "AI Workflow Automation",
    subtitle: "INTELLIGENT AUTOMATION",
    description:
      "AI workflow automation is becoming the foundation of modern enterprises. Organizations are replacing repetitive manual processes with intelligent systems that automate operations, accelerate decision-making, improve customer experiences, and significantly reduce operational costs while increasing productivity.",
    growth: "+245%",
    metric: "Enterprise AI Adoption",
    shadowColor: "rgba(59, 130, 246, 0.15)",
    image: "/AI_Workflow_Automation1.png",
  },
  {
    id: 3,
    icon: Cloud,
    title: "Cloud Infrastructure",
    subtitle: "CLOUD MODERNIZATION",
    description:
      "Businesses are accelerating cloud adoption to improve scalability, operational efficiency, and business continuity. Modern cloud-native platforms enable faster deployments, lower infrastructure costs, enhanced security, and seamless collaboration across distributed teams.",
    growth: "+176%",
    metric: "Cloud Migration Growth",
    shadowColor: "rgba(14, 165, 233, 0.15)",
    image: "Cloud_Infrastructure.png",
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Business Intelligence",
    subtitle: "DATA ANALYTICS",
    description:
      "Real-time analytics is transforming executive decision-making. Companies increasingly rely on predictive dashboards, AI-driven reporting, and customer intelligence to identify opportunities, optimize performance, and gain a competitive advantage in rapidly changing markets.",
    growth: "+212%",
    metric: "Data-Driven Decisions",
    shadowColor: "rgba(16, 185, 129, 0.15)",
    image: "Business_Intelligence.png",
  },
  {
    id: 5,
    icon: Shield,
    title: "Zero Trust Security",
    subtitle: "CYBERSECURITY FRAMEWORK",
    description:
      "With cyber threats becoming more sophisticated, enterprises are rapidly adopting Zero Trust Architecture. Continuous identity verification, endpoint protection, and least-privilege access have become essential strategies for protecting sensitive business data and digital infrastructure.",
    growth: "+195%",
    metric: "Cyber Risk Reduction",
    shadowColor: "rgba(239, 68, 68, 0.15)",
    image: "/Zero_Trust_Security.png",
  },
  {
    id: 7,
    icon: Bot,
    title: "Enterprise AI Assistants",
    subtitle: "GENERATIVE AI",
    description:
      "Generative AI is reshaping enterprise productivity by enabling intelligent assistants for customer support, internal knowledge management, sales, and operations. Businesses are leveraging AI copilots to streamline workflows, improve decision-making, and enhance user experiences.",
    growth: "+327%",
    metric: "Generative AI Adoption",
    shadowColor: "rgba(168, 85, 247, 0.15)",
    image: "Enterprise_AI_Assistants.png",
  },
];

export default function MarketTrends() {
  const [stack, setStack] = useState(trendsData);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      cycleStack();
    }, 6000);
    return () => clearInterval(timer);
  }, [stack]);

  const cycleStack = () => {
    setStack((prev) => {
      const copy = [...prev];
      const activeCard = copy.shift();
      copy.push(activeCard);
      return copy;
    });
    setActiveIndex((prev) => (prev + 1) % trendsData.length);
  };

  const activeData = trendsData[activeIndex];
  const ActiveIcon = activeData.icon;

  return (
    <section className="relative w-full py-10 lg:py-0 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden select-none">
      
      {/* Enterprise Subtle Grid Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-50/40 opacity-70 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 p lg:gap-8 items-center">
          
          {/* ==================== LEFT SIDE WRAPPER ==================== */}
          <div className="contents lg:flex lg:col-span-5 lg:flex-col lg:justify-between lg:h-[520px]">
            
            {/* 1. HEADING (Mobile: Order 1) */}
            <div className="order-1 lg:order-none w-full ">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] sm:mt-6">
                Technology Trends <br />
                <span className="bg-clip-text text-primary">
                  Driving Tomorrow
                </span>
              </h2>
            </div>

            {/* 4. CONTENT / DESCRIPTION BOX (Mobile: Order 4) */}
            <div className="order-4 lg:order-none w-full min-h-[140px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3 sm:space-y-4"
                >
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                    <ActiveIcon size={14} className="text-blue-600" />
                    {activeData.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {activeData.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-sm">
                    {activeData.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. GROWTH + PROGRESS INDICATORS (Mobile: Order 3) */}
            <div className="order-3 lg:order-none w-full py-3 space-y-4 max-w-sm">
              <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col"
                  >
                    <span className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900">
                      {activeData.growth}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                      {activeData.metric}
                    </span>
                  </motion.div>
                </AnimatePresence>
                
                <button 
                  onClick={cycleStack}
                  className="p-3 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                >
                  <ArrowRight size={16} className="text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Minimal Line Indicators Loop */}
              <div className="grid grid-cols-6 gap-2">
                {trendsData.map((_, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div 
                      key={index}
                      onClick={() => {
                        if (!isActive) {
                          const steps = (index - activeIndex + trendsData.length) % trendsData.length;
                          let currentStack = [...stack];
                          for(let i=0; i<steps; i++) {
                            const first = currentStack.shift();
                            currentStack.push(first);
                          }
                          setStack(currentStack);
                          setActiveIndex(index);
                        }
                      }}
                      className="h-1 bg-slate-100 rounded-sm overflow-hidden cursor-pointer"
                    >
                      {isActive && (
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          key={activeIndex}
                          transition={{ duration: 6, ease: "linear" }}
                          className="h-full bg-blue-600"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ==================== 2. RIGHT SIDE: IMAGE STACK (Mobile: Order 2) ==================== */}
          <div className="order-2 lg:order-none lg:col-span-7 flex items-center justify-center relative min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] w-full">
            
            {/* Ambient Shadow Box that syncs with card theme color */}
            <div 
              className="absolute w-full max-w-[620px] h-[320px] sm:h-[460px] rounded-sm blur-[60px] transition-all duration-700 pointer-events-none opacity-40"
              style={{ backgroundColor: activeData.shadowColor }}
            />

            <div className="relative w-full max-w-[620px] h-[320px] sm:h-[460px]">
              <AnimatePresence mode="popLayout">
                {stack.map((card, index) => {
                  if (index > 2) return null; // Render top 3 layered frames only
                  
                  const isTop = index === 0;

                  return (
                    <motion.div
                      key={card.id}
                      style={{ zIndex: 10 - index }}
                      layout
                      initial={{ opacity: 0, scale: 0.96, y: 20 }}
                      animate={{
                        opacity: 1 - index * 0.12,
                        scale: 1 - index * 0.03,
                        y: index * 14,
                        rotateX: isTop ? 0 : -2.5,
                      }}
                      exit={{
                        opacity: 0,
                        x: 220,
                        y: -30,
                        scale: 0.92,
                        rotate: 6,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                      }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      onClick={cycleStack}
                      className={`absolute inset-0 rounded-sm border bg-white overflow-hidden select-none transition-colors duration-300 ${
                        isTop 
                          ? 'border-slate-200 shadow-2xl shadow-slate-900/10 cursor-pointer hover:border-slate-300' 
                          : 'border-slate-200/40 pointer-events-none shadow-md'
                      }`}
                    >
                      {/* Full-Bleed High-Res Enterprise Image Canvas */}
                      <div className="relative w-full h-full bg-slate-950 group">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out group-hover:scale-102"
                        />
                        {/* High density premium darkening gradient layer */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />
                        
                        {/* Upper Data Badges inside Canvas */}
                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                          <span className="text-[9px] font-mono tracking-[0.15em] text-white bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
                            {card.subtitle}
                          </span>
                          <span className="text-[9px] font-bold tracking-widest text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
                            MATRIX LAYER 0{card.id}
                          </span>
                        </div>

                        {/* Title overlay integrated at the bottom frame */}
                        <div className="absolute bottom-6 left-6 pointer-events-none">
                          <h4 className="text-xl font-extrabold text-white tracking-tight drop-shadow-sm">
                            {card.title}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}