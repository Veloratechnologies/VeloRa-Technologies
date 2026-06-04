import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, BarChart2 } from 'lucide-react';
import { caseStudies } from '@/content/caseStudies';

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section id="case-studies" className="py-20 bg-bg-slate-50 border-t border-border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mt-4 mb-4">
            Proven Results for Global Clients
          </h2>
          <p className="text-base text-text-muted">
            Explore how we partnered with enterprise companies to automate processes, scale databases, and deploy premium web interfaces.
          </p>
        </div>

        {/* Case Studies Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Controls (Left side) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            {caseStudies.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setActiveCase(idx)}
                className={`text-left p-5 rounded-premium border transition-all duration-300 ${
                  activeCase === idx
                    ? 'bg-bg-white border-primary shadow-premium'
                    : 'bg-transparent border-transparent hover:bg-bg-white/50'
                }`}
              >
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">
                  {project.service}
                </span>
                <h3 className={`text-base font-bold transition-colors ${activeCase === idx ? 'text-primary' : 'text-text-primary'}`}>
                  {project.title}
                </h3>
                <span className="text-xs text-text-muted mt-1 block">
                  {project.client}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed Content Panel (Right side) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-bg-white border border-border-light rounded-premium p-6 md:p-8 shadow-premium"
              >
                {/* Panel Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-border-light">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                      {caseStudies[activeCase].industry}
                    </span>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {caseStudies[activeCase].title}
                    </h3>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <span className="text-sm font-semibold text-text-secondary">
                      Client: {caseStudies[activeCase].client}
                    </span>
                  </div>
                </div>

                {/* Challenge, Solution, Result Stack */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                      Challenge
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {caseStudies[activeCase].challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                      Solution
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {caseStudies[activeCase].solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                      Result
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {caseStudies[activeCase].result}
                    </p>
                  </div>
                </div>

                {/* Statistical Highlights Grid */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border-light">
                  {caseStudies[activeCase].stats.map((stat, idx) => (
                    <div key={idx} className="bg-bg-slate-50 border border-border-light rounded-lg p-4 text-center">
                      <div className="text-xl md:text-2xl font-extrabold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-[10px] md:text-xs text-text-muted mt-1 uppercase font-semibold tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
