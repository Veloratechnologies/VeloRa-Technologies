import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Palette, Code, CheckCircle, Rocket, HeartHandshake } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Search,
      title: "Discovery",
      desc: "Deep research into your business processes, bottleneck assessment, and mapping core system requirements."
    },
    {
      icon: Compass,
      title: "Planning",
      desc: "Architecting software layout, designing data flows, selecting stacks, and establishing final milestones."
    },
    {
      icon: Palette,
      title: "Design",
      desc: "Creating interactive, premium, high-fidelity UI wireframes and establishing the visual brand language."
    },
    {
      icon: Code,
      title: "Development",
      desc: "Writing modular, clean, and optimized code backed by strict security frameworks and database protocols."
    },
    {
      icon: CheckCircle,
      title: "Testing",
      desc: "Executing automated unit tests, cross-device QA layouts, and load testing to guarantee flawless operation."
    },
    {
      icon: Rocket,
      title: "Deployment",
      desc: "Containerized deployment to secure cloud server frameworks with automated CI/CD pipelines."
    },
    {
      icon: HeartHandshake,
      title: "Support",
      desc: "Ongoing performance audits, database maintenance, API updates, and 24/7 server health monitoring."
    }
  ];

  return (
    <section id="process" className="py-20 bg-bg-slate-50 border-t border-border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Method
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mt-4 mb-4">
            How We Deliver Success
          </h2>
          <p className="text-base text-text-muted">
            Our systematic engineering process ensures complete transparency, strict compliance with deadlines, and high-fidelity output.
          </p>
        </div>

        {/* Desktop Connected Horizontal Timeline */}
        <div className="hidden lg:block relative mt-12 mb-16">
          {/* Main Connected Horizontal Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border-medium -translate-y-1/2 -z-10 rounded-full" />
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 -z-10 rounded-full"
            initial={{ width: '0%' }}
            whileInView={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />

          {/* Connected timeline nodes */}
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div key={idx} className="flex flex-col items-center max-w-[120px]">
                  {/* Outer circle */}
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-primary border-primary text-bg-white shadow-md scale-110'
                        : isPast
                        ? 'bg-bg-white border-primary text-primary'
                        : 'bg-bg-white border-border-medium text-text-muted hover:border-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                  <span className={`text-xs font-bold tracking-tight mt-3 text-center transition-colors ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                    0{idx + 1}. {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Step Description Card (Desktop Only) */}
        <div className="hidden lg:block bg-bg-white border border-border-light shadow-premium rounded-premium p-8 max-w-3xl mx-auto text-center min-h-[160px]">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              Step 0{activeStep + 1}
            </span>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              {steps[activeStep].title} Phase
            </h3>
            <p className="text-base text-text-muted leading-relaxed max-w-2xl mx-auto">
              {steps[activeStep].desc}
            </p>
          </motion.div>
        </div>

        {/* Responsive Vertical Layout (Mobile/Tablet Only) */}
        <div className="lg:hidden relative border-l-2 border-border-medium ml-4 space-y-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative pl-8"
              >
                {/* Node icon element */}
                <div className="absolute top-0 -left-6 w-11 h-11 rounded-full bg-bg-white border-2 border-primary text-primary flex items-center justify-center shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content details */}
                <div>
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase block mb-1">
                    Step 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
