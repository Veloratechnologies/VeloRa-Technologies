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
  ArrowRight
} from 'lucide-react';

const trendsData = [
  {
    id: 1,
    icon: Zap,
    title: 'Artificial Intelligence Engine',
    subtitle: 'NEURAL SYSTEM INTEGRATION',
    description: 'Autonomous neural layers executing end-to-end operational workflows at zero-latency.',
    growth: '+240%',
    metric: 'Core Loop Velocity',
    shadowColor: 'rgba(245, 158, 11, 0.15)',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    icon: Cloud,
    title: 'Sovereign Infrastructure Mesh',
    subtitle: 'DECENTRALIZED RESILIENCE',
    description: 'Multi-region failover network matrices guaranteeing total compliance and data sovereignty.',
    growth: '+185%',
    metric: 'Node Residency Matrix',
    shadowColor: 'rgba(59, 130, 246, 0.15)',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    icon: Cpu,
    title: 'Hyper-Autonomous Workflows',
    subtitle: 'SYSTEM DECOUPLING',
    description: 'Replacing historical software legacy with self-optimizing orchestration runtime nodes.',
    growth: '+210%',
    metric: 'Process Friction Drop',
    shadowColor: 'rgba(139, 92, 246, 0.15)',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    icon: Lock,
    title: 'Zero-Trust Protocol Layer',
    subtitle: 'CRYPTOGRAPHIC ASSERTION',
    description: 'Continuous validation protocols applied at the sub-packet infrastructure access vectors.',
    growth: '+195%',
    metric: 'Threat Surface Erasure',
    shadowColor: 'rgba(239, 68, 68, 0.15)',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'Real-Time Telemetry Synthesis',
    subtitle: 'INSIGHT VELOCITY AXIS',
    description: 'Processing ambient data flows to execute macro-market updates ahead of system runtime schedules.',
    growth: '+220%',
    metric: 'Pipeline Throughput',
    shadowColor: 'rgba(16, 185, 129, 0.15)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 6,
    icon: AppWindow,
    title: 'Unified Component Microservice',
    subtitle: 'INTERFACE CONSOLIDATION',
    description: 'Consolidating fractured architectural touchpoints into one core continuous framework.',
    growth: '+175%',
    metric: 'System Debt Recovery',
    shadowColor: 'rgba(236, 72, 153, 0.15)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
  }
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
    <section className="relative w-full py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden select-none">
      
      {/* Enterprise Subtle Grid Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-50/40 opacity-70 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* ==================== LEFT SIDE: PREMIUM SYNCED HUD ==================== */}
          <div className="lg:col-span-5 flex flex-col justify-between h-[520px]">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mt-6">
                  Technology Trends <br />
                  <span className=" bg-clip-text  text-primary">
                    Driving Tomorrow
                  </span>
                </h2>
              </div>

              {/* Dynamic Text Information Box with Clean Crossfade */}
              <div className="min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                      <ActiveIcon size={14} className="text-blue-600" />
                      {activeData.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {activeData.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-sm">
                      {activeData.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Premium Synchronized Progress Bars & Indicators */}
            <div className="space-y-4 max-w-sm">
              <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col"
                  >
                    <span className="text-4xl font-black tracking-tighter text-slate-900">{activeData.growth}</span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">{activeData.metric}</span>
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

          {/* ==================== RIGHT SIDE: MAXI IMAGE STACK WITH DYNAMIC FLIP ==================== */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[580px] w-full">
            
            {/* Ambient Shadow Box that syncs with card theme color */}
            <div 
              className="absolute w-full max-w-[620px] h-[460px] rounded-sm blur-[60px] transition-all duration-700 pointer-events-none opacity-40"
              style={{ backgroundColor: activeData.shadowColor }}
            />

            <div className="relative w-full max-w-[620px] h-[460px]">
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