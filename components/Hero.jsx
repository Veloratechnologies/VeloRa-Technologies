import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import CountUp from "react-countup";
import { useMotionValue, useSpring } from "framer-motion";


// import { theme } from '../config/theme';

export default function Hero() {
  // ...................................................................// mouse effect

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleBackgroundMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const moveX = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const moveY = ((e.clientY - rect.top) / rect.height - 0.5) * 40;

    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  const resetBackground = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] },
    },
  };

  return (
    <section
      id="home"
      onMouseMove={handleBackgroundMove}
      onMouseLeave={resetBackground}
      className="relative min-h-screen flex items-start lg:items-center pt-24 lg:pt-28 pb-16 overflow-hidden mesh-grid bg-bg-light"
    >



      {/* .......................................hero section image bottom curve */}
      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">

      </div>
      {/* Animated Background */}




      <motion.div
        className="absolute inset-0 z-0"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        initial={{
          scale: 1,
          opacity: 0,
          filter: "brightness(0.2) blur(8px)",
        }}
        animate={{
          scale: 1.10,
          opacity: 1,
          filter: "brightness(1) blur(0px)",
        }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src="/images/TECHIMAGE.png"
          className="w-full  h-[750px] md:h-full object-cover object-[45%_center]  md:object-center  "
          alt=""
        />

        <motion.div
          className="absolute inset-0 z-[2]"
          animate={{
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(37,99,235,.35), transparent 50%)",
          }}
        />
      </motion.div>
      {/* Background Radial Glow */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Content Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col  text-left"
        >
          {/* Subtle Tagline Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center self-start md:bg-primary/10 bg-white/30  md:bg-transparent backdrop-blur-xl  border border-primary/20 text-primary font-semibold text-xs tracking-wider uppercase px-3  py-1.5 rounded-full mb-6">
            Digital Transformation Partner
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-5xl lg:text-[60px] font-bold tracking-tight text-slate-400 leading-[1.15] "
          >
            Building Smart <span className="text-primary">Digital Solutions</span> for Modern Businesses
          </motion.h1>

          {/* Key Bullet Points */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4  md:mt-6  lg:mt-6 mt-12  mb-20 md:mb-8 max-w-xl">
            <div className="flex items-center space-x-2 md:text-lg text-m text-slate-400 font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Enterprise Grade Security</span>
            </div>
            <div className="flex items-center space-x-2 md:text-lg  text-m  text-slate-400 font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>AI Automation Integration</span>
            </div>
            <div className="flex items-center space-x-2 md:text-lg text-m text-slate-400 font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Scalable Architectures</span>
            </div>
            <div className="flex items-center space-x-2 md:text-lg text-m text-slate-400 font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Dedicated Support</span>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">

            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, '#services')}
              className="inline-flex items-center justify-center text-base font-semibold text-gray-800 bg-slate-400 hover:bg-slate-100 border border-border-medium px-7 py-3.5 rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Services
              <ChevronRight className="ml-1 w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Dashboard / SVG Visual Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Visual Wrapper */}


          {/* Decorative shapes behind */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-xl -z-10" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-light/5 rounded-full blur-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
