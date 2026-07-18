import { useState } from 'react';
import { motion } from 'framer-motion';

import { technologyStack } from '../content/technologies';


export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState(0);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section id="technologies" className="py-20 bg-bg-white border-t border-border-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Technology Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mt-4 mb-4">
            Built with Scalable, Production-Ready Stacks
          </h2>
          <p className="text-base text-text-muted">
            We use modern, industry standard technologies to ensure high reliability, modularity, and lightning-fast web responsiveness.
          </p>
        </div> 

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-border-light pb-6">
          {technologyStack.map((tech, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === idx
                  ? 'bg-primary border-primary text-bg-white shadow-sm'
                  : 'bg-bg-slate-50 border-border-light text-text-secondary hover:bg-bg-slate-100'
              }`}
            >
              {tech.category}
            </button>
          ))}
        </div>

        {/* Dynamic Matrix of Technology Cards */}
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-text-muted text-center italic mb-8">
            {technologyStack[activeCategory].description}
          </p>

          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {technologyStack[activeCategory].items.map((item, idx) => {
             
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="bg-bg-slate-50 border border-border-light rounded-premium p-5 flex flex-col items-center justify-center text-center shadow-sm hover:bg-bg-white hover:border-primary/20 hover:shadow-premium transition-all duration-300 group cursor-default"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-20 h-20 rounded-full bg-bg-white border border-border-light flex items-center justify-center mb-4">

    <video
  src={item.icon}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="w-12 h-12 object-contain"
/>

</div>
                  <h4 className="text-sm font-bold text-text-primary mb-1">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-text-muted font-medium bg-bg-slate-100 border border-border-light px-2.5 py-0.5 rounded-full mt-1 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {item.level}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
