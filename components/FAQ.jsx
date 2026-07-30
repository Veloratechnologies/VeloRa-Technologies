import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../content/faq';

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20 bg-bg-slate-50 border-t border-border-light relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            FAQ
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-primary mt-2 md:mt-4 mb-2 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed">
            Find answers to commonly asked questions about our project methodologies, software technology stacks, and maintenance procedures.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-2.5 md:space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={faq.id}
                className="bg-bg-white border border-border-light rounded-lg md:rounded-premium overflow-hidden transition-all duration-300 shadow-sm hover:border-primary/20"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 py-3.5 md:px-6 md:py-5 flex items-center justify-between text-left focus:outline-none gap-3"
                  aria-expanded={isExpanded}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-text-primary leading-snug">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-text-muted shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-bg-slate-50 flex items-center justify-center border border-border-light"
                  >
                    <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-secondary" />
                  </motion.span>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4 pt-2 md:px-6 md:pb-6 md:pt-1 text-xs md:text-sm text-text-muted leading-relaxed border-t border-border-light/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}