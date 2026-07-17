import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper styles must be imported in your global CSS or layout:
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const SOLUTIONS_DATA = [
  {
    id: 1,
    category: "Digital Transformation",
    title: "Digital Presence Solution",
    story: "In an ecosystem where your digital footprint is your primary storefront, patchwork systems kill credibility. We build unified architectural frameworks that align engineering performance with exceptional user experiences.",
    benefits: ["Customer Trust", "Business Growth", "Visibility"],
    image: "/images/Digital_Presence _Solution.png",
  },
  {
    id: 2,
    category: "Operations Excellence",
    title: "Business Automation Solution",
    story: "Human capital should be spent on strategic innovation, not repetitive operational overhead. Our customized, zero-latency workflows integrate legacy systems to eliminate bottlenecks and human error completely.",
    benefits: ["Automation", "Efficiency", "Save Time", "Productivity"],
    image: "/images/Business_Automation_Solution.png",
  },
  {
    id: 3,
    category: "Market Growth",
    title: "Search Growth Solution",
    story: "Paid acquisition is a melting ice cube. True corporate velocity requires built-in visibility infrastructures that secure domain authority, capture high-intent organic traffic, and lower customer acquisition costs over time.",
    benefits: ["SEO", "Organic Growth", "Traffic", "Visibility"],
    image: "/images/Search_Growth_Solution.png",
  },
  {
    id: 4,
    category: "Revenue Architecture",
    title: "Customer Acquisition Solution",
    story: "Scaling growth demands more than marketing spend; it requires predictive data pipelines. We build full-funnel acquisition mechanisms that systematically turn cold target demographics into loyal, repeat accounts.",
    benefits: ["Marketing", "Leads", "Conversions", "ROI"],
    image: "/images/Customer_Acquisition_Solution.png",
  },
  {
    id: 5,
    category: "Strategic Branding",
    title: "Brand Identity Solution",
    story: "Markets shift, products commoditize, but equity endures. We establish defensible corporate positioning through cohesive brand design rules, establishing market authority that commands a pricing premium.",
    benefits: ["Branding", "Recognition", "Professional Image", "Trust"],
    image: "/images/Brand_Identity_Solution.png",
  }
];

// Card
const SolutionCard = ({ item }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle Mouse Parallax Effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / 15);
    y.set(mouseY / 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-20, 20], [5, -5]);
  const rotateY = useTransform(x, [-20, 20], [-5, 5]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex flex-col justify-between h-[500px] rounded-[7px] border border-slate-300 shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] hover:border-slate-300 overflow-hidden transition-all duration-500 ease-out bg-slate-300 backdrop-blur-3xl  ">
      
      <div >
        {/* Image & Reveal */}
        <div className="relative w-full h-[220] overflow-hidden bg-slate-100 border-b border-slate-100">
          <motion.div 
            initial={{ scale: 1.1, filter: "brightness(0.95)" }}
            whileHover={{ scale: 1.15, filter: "brightness(1.02)" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={item.id <= 3}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 pb-4 transition-all duration-500 hover:scale-105 ease-out ">
          <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-slate-800 mb-3">
            {item.category}
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900   font-sans">
            {item.title}
          </h3>
          <p className="text-[10px] leading-[1.65] text-slate-1000 font-normal line-clamp-4">
            {item.story}
          </p>
        </div>
      </div>

      <div className="p-1 pt-0">
        {/* Benefits */}
        <div className="flex flex-wrap gap-2 mb-8 pl-5">
          {item.benefits.map((benefit, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-full tracking-wide"
            >
              {benefit}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className=" p-3 border-t border-slate-50 flex items-center justify-between text-slate-900 font-medium text-[16px]">
          <span className="relative overflow-hidden group/btn inline-flex items-center">
            <span className="relative px-3 transition-transform duration-300 hover:scale-110">
              Learn More
            </span>
          </span>
          <motion.div
            className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300"
            variants={{
              hover: { x: 4 }
            }}
          >
            <FiArrowRight className="w-4 h-4  transition-transform duration-300 group-hover:translate-x-[2px]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Section
export default function BusinessSolutions() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full py-10 text-slate-900 overflow-visible font-sans select-none antialiased bg-sky-50"
      
    >
      {/* Minimal Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-900" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-slate-900" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-slate-900" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  border border-slate-300 text-[15px] font-bold uppercase tracking-[0.1em]"    style={{color:"#075985"} }>
              <span className="w-1 h-1 rounded-full bg-slate-900 animate-pulse" />
              Business Solutions
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button className="swiper-nav-prev w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-all duration-200 cursor-pointer disabled:opacity-40">
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <button className="swiper-nav-next w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-all duration-200 cursor-pointer disabled:opacity-40">
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Slider Framework Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full relative overflow-visible  "
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Keyboard, A11y]}
            spaceBetween={32}
            loopAdditionalSlides={0}
              slidesPerView={3}
              slidesPerGroup={1}

              loop={true}
              loopFillGroupWithBlank={false}

            speed={1200}

            centeredSlides={false}

            watchOverflow={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }}
            keyboard={{ enabled: true }}
            navigation={{
              prevEl: '.swiper-nav-prev',
              nextEl: '.swiper-nav-next',
            }}
            pagination={{
              el: '.swiper-custom-pagination',
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} custom-bullet"></span>`;
              }
            }}
            breakpoints={{
  0: {
    slidesPerView: 1,
    spaceBetween: 20,
  },

  768: {
    slidesPerView: 2,
    spaceBetween: 24,
  },

  1280: {
    slidesPerView: 3,
    spaceBetween: 32,
  },
}}
            className="overflow-visible"
          >
            {SOLUTIONS_DATA.map((item) => (
              <SwiperSlide key={item.id} className=" pt-4">
                <SolutionCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Container */}
          <div className="swiper-custom-pagination flex justify-center items-center gap-2.5 mt-12 w-full" />
        </motion.div>
      </div>

      {/* Styled Bullet Overrides injection */}
      <style jsx global>{`
        .swiper-custom-pagination .custom-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #cbd5e1 !important;
          opacity: 1 !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .swiper-custom-pagination .swiper-pagination-bullet-active {
          width: 28px;
          background: #0f172a !important;
        }
      `}</style>
    </motion.section>
  );
}