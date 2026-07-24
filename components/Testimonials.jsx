'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react';

// Testimonials data
const testimonialsData = [
  {
    id: 1,
    name: 'Michael',
    company: 'Animal Feed Manufacturing',
    text: "Built a modern business website, managed Facebook marketing campaigns, and improved the company's online presence with local SEO and lead generation strategies.",
  },
  {
    id: 2,
    name: 'Diane',
    company: 'CRM & Business Automation',
    text: 'Developed a custom CRM that captures website and WhatsApp leads instantly, sends automatic replies, and allows teams to manage follow-ups from one dashboard.',
  },
  {
    id: 3,
    name: 'Allison',
    company: 'AI Automation',
    text: 'Created an AI-powered automation platform that handles customer inquiries, appointment scheduling, and workflow automation, reducing manual work and improving response time.',
  },
  {
    id: 4,
    name: 'Robert',
    company: 'Apex Logistics',
    text: 'Top notch experience! The user interface is seamless and the service is reliable for all business needs with instant notifications.',
  },
];

// Stagger Animation Variants (Ek ke baad ek aane ke liye)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Har card 0.25s ke gap me aayega
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function TestimonialSection() {
  const [startIndex, setStartIndex] = useState(0);

  // Carousel Next/Prev (1 step sliding)
  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % (testimonialsData.length - 2));
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? testimonialsData.length - 3 : prev - 1));
  };

  const visibleTestimonials = testimonialsData.slice(startIndex, startIndex + 3);

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-10">
      {/* Main Dark Blue Container - Size Bada Kiya Hai */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-7xl bg-[#002B66] rounded-2xl p-8 md:p-14 shadow-2xl overflow-hidden text-white"
      >
        {/* Top-Left Large Quote Icon */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-3 left-10 w-20 h-20 md:w-24 md:h-24 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <Quote className="w-12 h-12 text-white fill-white rotate-180" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-12">
          
          {/* LEFT SIDE: Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 space-y-5 pr-2"
          >
            <h2 className="pt-8 text-3xl md:text-4xl font-bold leading-tight">
              Real Projects. <br /> Real Projects.
            </h2>
            <p className="text-blue-100/75 text-sm md:text-base leading-relaxed">
              From business websites to AI-powered automation, we build digital solutions that improve efficiency, generate quality leads, and help businesses scale with confidence.
            </p>

            {/* CTA Link */}
            <motion.a
              whileHover={{ x: 6 }}
              href="#"
              className="inline-flex items-center gap-2 text-base font-semibold text-white hover:text-blue-200 transition-colors pt-2"
            >
              Connect now
              <span className="w-6 h-6 bg-[#C53030] rounded-full flex items-center justify-center text-[10px]">
                <Play className="w-3 h-3 fill-white text-white ml-0.5" />
              </span>
            </motion.a>
          </motion.div>

          {/* RIGHT SIDE: 3 Cards Carousel */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            
            {/* Staggered Container for Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={startIndex}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {visibleTestimonials.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    whileHover={{ y: -10 }}
                    className="bg-white text-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between min-h-[320px] p-7 border border-slate-100 group transition-shadow duration-300 hover:shadow-2xl"
                  >
                    {/* Top Portion: Icon + Text */}
                    <div>
                      {/* Mini Quote Icon */}
                      <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                        <Quote className="w-5 h-5 text-white fill-white rotate-180" />
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        "{item.text}"
                      </p>
                    </div>

                    {/* Bottom Portion: Author Info */}
                    <div className="pt-6 border-t border-slate-100 mt-4">
                      <h4 className="font-bold text-base text-slate-900">{item.name}</h4>
                      <p className="text-xs text-blue-600 font-medium italic mt-0.5">{item.company}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Controls Bar (Bottom Arrows & Dots) */}
            <div className="flex items-center justify-between mt-10 pt-2">
              
              {/* Navigation Arrows */}
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ backgroundColor: '#2563EB' }}
                  onClick={prevSlide}
                  className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center text-white transition-colors shadow-md"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ backgroundColor: '#2563EB' }}
                  onClick={nextSlide}
                  className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center text-white transition-colors shadow-md"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {[0, 1].map((dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => setStartIndex(dotIndex)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      startIndex === dotIndex
                        ? 'w-6 bg-white'
                        : 'w-2.5 bg-blue-300/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}