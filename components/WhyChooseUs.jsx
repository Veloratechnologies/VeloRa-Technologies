import { motion } from 'framer-motion';
import { Shield, Cpu, RefreshCw, Layers, Compass, HelpCircle} from 'lucide-react';


export default function WhyChooseUs() {
  const cards = [
    {
      icon: Compass,
      title: "Client-Focused Approach",
      image: "/images/PROFESSIONAL.png",
      subtitle: "Professional Solutions",
      desc: "We align closely with your corporate objectives, translating complex technical processes into clear business outcomes and high-converting workflows."
    },
    {
      icon: Shield,
      title: "Security-First Mindset",
      image:"/images/",
      subtitle: "Secure Development",
      desc: "Rigorous threat modeling, industry-standard authentication methods, and end-to-end data encryption represent the foundation of every line of code we write."
    },
    {
      icon: Cpu,
      title: "Modern Architecture",
      subtitle: "Modern Technologies",
      desc: "Deploying high-speed setups using Next.js, React, and modular APIs to ensure fast loading speeds, clean rendering, and exceptional core web vitals."
    },
    {
      icon: Layers,
      title: "Scalable Systems",
      subtitle: "Scalable Systems",
      desc: "Docker containerization and enterprise database configurations allow your platforms to handle rapid spikes in daily traffic without degradation."
    },
    {
      icon: HelpCircle,
      title: "Reliable Support",
      subtitle: "Long-Term Support",
      desc: "Our commitment doesn't end at launch. We provide on-demand developer support, continuous maintenance, and performance optimization audits."
    },
    {
      icon: RefreshCw,
      title: "Automation Expertise",
      subtitle: "Business-Focused Approach",
      desc: "Maximizing ROI by identifying manual operational bottlenecks and integrating custom NLP AI agents and autonomous scheduling flows."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-20 bg-bg-white border-t border-border-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Commitments
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mt-4 mb-4">
            Why Businesses Choose VeloRa Technologies
          </h2>
          <p className="text-base text-text-muted">
            We operate as an extension of your company, engineering reliable digital products that support operations, build trust, and simplify business management.
          </p>
        </div>

        {/* Elegant Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-black border border-border-light rounded-premium p-6  hover:border-primary/20 hover:shadow-premium transition-all duration-300 group cursor-default"
                whileHover={{ y: -4 }}
                  style={{backgroundImage: `url(${card.image})`,
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",}}
              >
                
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-bg-white border border-border-light flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-bg-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

              <div className="mt-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-5 shadow-xl">

  {/* Subtitle */}
  <span className="text-[10px] font-bold uppercase tracking-[2px] text-blue-200 mb-2 block">
    {card.subtitle}
  </span>

  {/* Title */}
  <h3 className="text-xl font-bold text-white mb-3">
    {card.title}
  </h3>

  {/* Description */}
  <p className="text-sm leading-7 text-white/80">
    {card.desc}
  </p>

</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
