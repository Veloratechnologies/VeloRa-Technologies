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
    <section className="py-20 bg-bg-slate-50 border-t border-border-light relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary mt-4 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-text-muted">
            Find answers to commonly asked questions about our project methodologies, software technology stacks, and maintenance procedures.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={faq.id}
                className="bg-bg-white border border-border-light rounded-premium overflow-hidden transition-all duration-300 shadow-sm hover:border-primary/20"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <span className="text-base font-bold text-text-primary pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-text-muted shrink-0 w-8 h-8 rounded-full bg-bg-slate-50 flex items-center justify-center border border-border-light"
                  >
                    <ChevronDown className="w-4 h-4 text-text-secondary" />
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
                      <div className="px-6 pb-6 pt-1 text-sm text-text-muted leading-relaxed border-t border-border-light/50">
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
