import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { technologyStack } from '../content/technologies';

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="technologies" className="py-12 md:py-28 bg-bg-white border-t border-border-light relative overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 px-3  md:px-4 md:py-1.5 rounded-full inline-block mb-2 md:mb-3">
            Our Technology Stack
          </span>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary mt-1 md:mt-2 mb-2 md:mb-4 leading-tight">
            Built with Scalable, Production-Ready Stacks
          </h2>
          <p className="text-xs md:text-lg text-text-muted leading-relaxed">
            We use modern, industry standard technologies to ensure high reliability, modularity, and lightning-fast web responsiveness.
          </p>
        </div> 

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-2 md:mb-6 border-b border-border-light pb-4 md:pb-8">
          {technologyStack.map((tech, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[8px] sm:text-xs  font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === idx
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105'
                  : 'bg-bg-slate-50 border-border-light text-text-secondary hover:bg-bg-slate-100 hover:text-text-primary'
              }`}
            >
              {tech.category}
            </button>
          ))}
        </div>

        {/* Dynamic Matrix of Technology Cards */}
        <div className="max-w-6xl mx-auto">
          <p className="text-xs md:text-lg text-text-muted text-center italic mb-6 md:mb-10 max-w-2xl mx-auto">
            {technologyStack[activeCategory].description}
          </p>

          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
          >
            {technologyStack[activeCategory].items.map((item, idx) => {
              // Path se spaces trim karein aur check karein ki video hai ya image
              const rawSrc = item.icon || item.image || '';
              const cleanSrc = rawSrc.trim();
              const isVideo = cleanSrc.toLowerCase().endsWith('.mp4');

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-bg-slate-100 border-primary border-2 rounded-md md:rounded-lg p-3 sm:p-5 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:bg-white hover:border-primary/30 hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle top indicator highlight on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 md:h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon / Video Box */}
                  <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full md:rounded-full bg-white border border-border-light flex items-center justify-center mb-2.5 md:mb-6 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300 p-2 sm:p-3 md:p-4 shrink-0">
                    {isVideo ? (
                      <video
                        src={cleanSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-7 h-7 sm:w-10 sm:h-10 md:w-16 md:h-16 object-contain"
                      />
                    ) : (
                      <Image
                        src={cleanSrc}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain group-hover:drop-shadow-md transition-all duration-300"
                      />
                    )}
                  </div>

                  {/* Tech Name */}
                  <h3 className="text-xs sm:text-base md:text-xl font-bold text-text-primary mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight truncate w-full">
                    {item.name}
                  </h3>

                  {/* Level Badge */}
                  <span className="text-[9px] sm:text-xs font-semibold text-text-muted bg-bg-slate-100 border border-border-light px-2 py-0.5 sm:px-3.5 sm:py-1 rounded-full mt-0.5 md:mt-1 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
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