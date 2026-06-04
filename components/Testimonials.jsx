import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/content/testimonials';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Optional auto-play
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-bg-white border-t border-border-light relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Client Success
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary mt-4">
            Trusted by Leaders in Digital Transformation
          </h2>
          {/* Subtle Demo Indicator */}
          <span className="text-[10px] text-text-muted mt-1.5 inline-block bg-bg-slate-100 border border-border-light px-2.5 py-0.5 rounded-full uppercase tracking-widest font-semibold">
            Demonstration Success Reviews
          </span>
        </div>

        {/* Testimonial Slider Panel */}
        <div className="relative bg-bg-slate-50 border border-border-light rounded-premium p-8 md:p-12 shadow-sm min-h-[300px] flex flex-col justify-between">
          <Quote className="absolute top-1 left-8 w-12 h-12 text-primary/10 -z-1" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex-grow flex flex-col justify-center"
            >
              {/* Quote text */}
              <p className="text-base md:text-lg text-text-secondary italic leading-relaxed mb-6 font-medium">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Author & details */}
              <div>
                <h4 className="text-base font-bold text-text-primary">
                  {testimonials[current].author}
                </h4>
                <p className="text-xs text-text-muted mt-1 font-semibold">
                  {testimonials[current].role} at <span className="text-primary">{testimonials[current].company}</span>
                </p>
                <span className="text-[10px] text-text-muted font-medium">
                  {testimonials[current].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls section */}
          <div className="flex items-center justify-between border-t border-border-light pt-6 mt-8">
            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-6 bg-primary' : 'bg-border-medium hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-border-light bg-bg-white flex items-center justify-center text-text-secondary hover:bg-bg-slate-50 hover:text-primary transition-all duration-200 shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-border-light bg-bg-white flex items-center justify-center text-text-secondary hover:bg-bg-slate-50 hover:text-primary transition-all duration-200 shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
