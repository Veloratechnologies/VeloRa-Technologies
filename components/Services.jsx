import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { services } from '@/content/services';

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section id="services" className="py-20 bg-bg-slate-50 border-t border-border-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mt-4 mb-4">
            Advanced Software & Automation Services
          </h2>
          <p className="text-base text-text-muted">
            We deliver enterprise-grade engineering designed to optimize workflows, connect key software infrastructure, and drive measurable revenue growth.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            // Dynamically resolve the Lucide icon matching the name
            const Icon = Icons[service.icon] || Icons.HelpCircle;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="bg-bg-white border border-border-light rounded-premium p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group cursor-default"
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                      {service.category}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-bg-slate-50 text-primary border border-border-light flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:text-bg-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Sub-items */}
                  <div className="border-t border-border-light pt-5 space-y-3.5">
                    {service.items.map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-text-secondary">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-text-muted mt-0.5 leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro interactive CTA in card */}
                <div className="mt-8 pt-4 border-t border-border-light flex items-center text-xs font-bold text-primary group-hover:underline cursor-pointer">
                  <span>Inquire about this service</span>
                  <Icons.ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
