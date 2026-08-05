"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock3,
  Globe,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Building2,
  Briefcase,
  Code2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    icon: Rocket,
  },
  {
    value: 25,
    suffix: "+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: 10,
    suffix: "+",
    label: "Industries Served",
    icon: Building2,
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    icon: Award,
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Beginning",
    description:
      "Velora Technologies started with a vision to build modern digital solutions that genuinely solve business problems instead of simply delivering software.",
  },
  {
    year: "2025",
    title: "Expanding Services",
    description:
      "We expanded into custom web development, UI/UX design, cloud solutions and enterprise software while growing our technical expertise.",
  },
  {
    year: "present",
    title: "Scaling Businesses",
    description:
      "Helping startups and enterprises transform digitally with scalable applications, automation and performance-driven engineering.",
  },
  {
    year: "Future",
    title: "Global Vision",
    description:
      "Continuing to innovate with AI, cloud technologies and next-generation digital experiences while becoming a trusted global technology partner.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We believe trust is built through transparency, honesty and delivering exactly what we promise.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly explore modern technologies and practical ideas that create measurable business value.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Great products come from strong partnerships between our team and every client we work with.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description:
      "Every solution we build is designed to support long-term business growth and scalability.",
  },
];

const reasons = [
  "Business-focused development approach",
  "Scalable & future-ready architecture",
  "Transparent communication",
  "Modern technology stack",
  "Dedicated post-launch support",
  "Quality-driven engineering process",
];

export default function About_Us() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white text-slate-900 dark:text-white">
        {/* ================= HERO ================= */}
        <section className="relative min-h-[95vh] md:min-h-screen w-full flex items-center justify-center">
          <motion.div
            className="absolute inset-0 z-0"
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
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full ">
              <img
                src="/images/heroImage_AboutUs.png"

                className="h-full w-full object-cover lg:object-center md:object-center object-[55%_center] "
                alt="aboutUs background Image"
              />
            </div>

          </motion.div>

          {/* Content Container */}
          <div className=" mt-24 md:mt-12 px-5 md:px-10 lg:px-12 lg:ml-12  relative z-10 mx-auto flex min-h-screen max-w-7xl items-center ">
            <div className="max-w-3xl lg:mt-12 mt:mt-12 ">
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="  text-5xl sm:text-5xl lg:text-[55px] font-bold tracking-tight text-primary leading-[1.15]"
              >
                Building Digital Excellence Through Innovation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 max-w-2xl md:text-lg text-m text-slate-950 font-medium leading-8 hidden md:block lg:block "
              >
                Velora Technologies empowers businesses with modern software,
                scalable digital solutions, cloud technologies and innovative
                engineering that transforms ambitious ideas into measurable
                business success.
              </motion.p>

              {/* for desktop screen */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="hidden md:grid mt-16 grid-cols-4 gap-6"
              >
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white/60 p-5 backdrop-blur-xl shadow-lg"
                  >
                    <item.icon className="mb-4 h-8 w-8 text-sky-500" />

                    <h3 className="text-3xl font-bold text-slate-700">
                      <CountUp
                        end={item.value}
                        duration={2}
                        suffix={item.suffix}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </h3>

                    <p className="mt-2 text-sm text-slate-700">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
              {/* for mobile screen */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex flex-col gap-4 md:hidden"
              >
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/30 shadow-xl px-4 py-2 w-1/2 "
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50">
                      <item.icon className="h-7 w-7 text-sky-500" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-slate-800">
                        <CountUp
                          end={item.value}
                          duration={2}
                          suffix={item.suffix}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </h3>

                      <p className="text-sm text-slate-600">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>


        {/* ================= DIRECTOR ================= */}

        <section className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Director Card */}
              <div className="lg:col-span-5 relative">
                {/* White Rounded Card */}
                <div className="bg-slate-300 rounded-lg p-8 md:p-12 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center text-center relative z-10">

                  {/* Circular Profile Image */}
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 bg-gray-100 border-4 border-white shadow-sm shrink-0">
                    <Image
                      src="/images/Director_Image.png"
                      alt="Anil Gupta - Director"
                      fill
                      className="object-cover object-top justify-center"
                      sizes="(max-width: 768px) 192px, 224px"
                    />
                  </div>

                  {/* Title & Name */}
                  <span className="text-[#3B82F6] font-medium text-sm tracking-wide mb-1">
                    Our Director
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Anil Gupta
                  </h3>
                </div>

                {/* Floating Glassmorphism Badge */}
                <div className="absolute -bottom-5 left-20 md:left-24 z-20 backdrop-blur-md bg-white/80 border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl px-6 py-4 flex items-center gap-3">
                  <span className="text-gray-900 font-bold text-sm md:text-base">
                    19+ Years Experience
                  </span>
                </div>
              </div>

              {/* Right Column: Content & Bullet Points */}
              <div className="lg:col-span-7 space-y-6">
                {/* Headline */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Our Director
                </h2>

                {/* Body Paragraphs */}
                <p className="text-gray-600 leading-relaxed  md:text-lg text-xs lg:text-lg ">
                  Anil Gupta is the Director of Velora Technologies with over 19 years of experience in building and delivering scalable software solutions, enterprise applications, AI-powered systems, cloud platforms, and digital transformation projects.
                </p>

                <p className="text-gray-600 leading-relaxed md:text-lg text-xs lg:text-lg">
                  His leadership focuses on innovation, quality engineering, client success, and building high-performance technology solutions that help businesses scale efficiently. He believes in creating long-term value through modern technology, strategic thinking, and continuous innovation.
                </p>

                {/* Bullet Points */}
                <div className="pt-2 space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 md:text-lg text-xs lg:text-lg font-medium">
                      19+ Years of Industry Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 md:text-lg text-xs lg:text-lg font-medium">
                      Expert in Scalable Software Architecture
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 md:text-lg text-xs lg:text-lg font-medium">
                      AI & Digital Transformation Leader
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 md:text-lg text-xs lg:text-lg font-medium">
                      Client-First Innovation Approach
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= MISSION & VISION ================= */}

        <section className="relative overflow-hidden py-8 sm:py-12 lg:py-20">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b" />

          <div className="relative mx-auto max-w-5xl px-3 sm:px-5">

            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center">

              <span className="inline-flex rounded-full px-2.5 py-0.5 md:py-2 lg:py-2 text-[10px] sm:text-xs font-semibold text-sky-700 dark:bg-sky-900/30 ">
                Mission & Vision
              </span>

              <h2 className="mt-2 sm:mt-5 text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900">
                Driven by Purpose.
                <span className="text-sky-600"> Focused on Innovation.</span>
              </h2>

              <p className="mt-1.5 sm:mt-4 text-xs sm:text-sm lg:text-base text-white dark:text-slate-400">
                Every solution we build is backed by a clear mission and a long-term
                vision to create measurable business impact.
              </p>

            </div>

            {/* Cards Grid - 2 Columns on Mobile */}
            <div className="mt-6 lg:mt-12 grid grid-cols-2 gap-2.5 sm:gap-4 lg:gap-6">

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .5 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-xl lg:rounded-2xl border-2   p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:shadow-xl hover:scale-110 bg-[#e5e7eb]    flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg lg:rounded-xl bg-blue-100 text-primary">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>

                  <h3 className="mt-2.5 lg:mt-5 text-sm sm:text-lg lg:text-2xl font-bold leading-tight text-slate-900">
                    Our Mission
                  </h3>

                  <p className="mt-1.5 lg:mt-4 text-[10px] sm:text-xs lg:text-[15px] leading-tight sm:leading-relaxed lg:leading-7 text-slate-700 ">
                    Deliver scalable digital solutions that help businesses grow,
                    streamline operations and create exceptional customer experiences.
                  </p>
                </div>

                <div className="mt-3 lg:mt-6 space-y-1.5 sm:space-y-2 lg:space-y-3 text-slate-900">

                  {[
                    "Quality-first engineering",
                    "Scalable software solutions",
                    "Long-term partnerships",
                    "Business-driven innovation",
                  ].map((item) => (

                    <div key={item} className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">

                      <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-6 lg:w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                        <Check className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-sky-600" />
                      </div>

                      <span className="text-[9px] sm:text-xs lg:text-sm font-medium text-slate-800  leading-tight">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .5, delay: .1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-xl lg:rounded-2xl border-2   p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:shadow-xl hover:scale-110 bg-[#e5e7eb]    flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg lg:rounded-xl bg-blue-200 shrink-0 text-primary">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>

                  <h3 className="mt-2.5 lg:mt-5 text-sm sm:text-lg lg:text-2xl font-bold text-slate-900 leading-tight">
                    Our Vision
                  </h3>

                  <p className="mt-1.5 lg:mt-4 text-[10px] sm:text-xs lg:text-[15px] leading-tight sm:leading-relaxed lg:leading-7 text-slate-700">
                    Become a trusted global technology partner recognised for innovation,
                    engineering excellence and sustainable digital transformation.
                  </p>
                </div>

                <div className="mt-3 lg:mt-6 space-y-1.5 sm:space-y-2 lg:space-y-3 ">

                  {[
                    "Global technology leadership",
                    "Future-ready innovation",
                    "Customer-first mindset",
                    "Continuous improvement",
                  ].map((item) => (

                    <div key={item} className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-slate-700 ">

                      <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-6 lg:w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30">
                        <Check className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-cyan-600" />
                      </div>

                      <span className="text-[9px] sm:text-xs lg:text-sm font-medium text-slate-800  leading-tight">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </motion.div>

            </div>

          </div>

        </section>

        {/* ================= JOURNEY ================= */}

        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-primary">
                Our Journey
              </span>

              <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8 dark:text-slate-400">
                Every milestone represents our commitment to continuous
                improvement, innovation and delivering greater value to every
                client.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative mt-14 md:mt-20">

              {/* Vertical Line */}
              <div className="
        absolute
        left-5
        top-0
        h-full
        w-1
        rounded-full
        bg-gradient-to-b
        from-sky-600
        to-cyan-500

        lg:left-1/2
        lg:-translate-x-1/2
      " />

              <div className="space-y-10 md:space-y-16">

                {timeline.map((item, index) => (

                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`
                items-center
              relative
              lg:grid
              lg:grid-cols-2
              lg:gap-12
              lg:items-center
              ${index % 2 !== 0
                        ? "lg:[&>*:first-child]:order-2"
                        : ""
                      }
            `}
                  >
                    {/* Card */}
                    <div
                      className="
                lg:ml-0 md:ml-0 ml-12
                rounded-lg
                border
                // border-slate-200 bg-[#002B66]
                
                p-5
                shadow-lg

                sm:p-6
                md:p-8

              
              "
                    >

                      <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
                        {item.year}
                      </span>

                      <h3 className="mt-2 text-2xl font-bold md:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8 dark:text-slate-400">
                        {item.description}
                      </p>

                    </div>

                    {/* Empty Desktop Column */}
                    <div className="hidden lg:block" />

                    {/* Timeline Icon */}
                    <div
                      className="absolute left-5 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-sky-600 text-white shadow-xl lg:left-1/2 dark:border-slate-950"
                    >
                      <Clock3 className="h-4 w-4 md:h-5 md:w-5" />
                    </div>

                  </motion.div>

                ))}

              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUES ================= */}

        {/* <section className="relative overflow-hidden py-10 lg:py-16">
  
  <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100  " />

  <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
   

    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 lg:text-lg text-sm font-semibold text-primary ">
        Our Core Values
      </span>

     
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 lg:pb-10  lg:pt-8">
        Quality, innovation and client success drive everything we build.
      </p>
    </div>


    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 pb-28">
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.08,
          }}
          whileHover={{
            y: -6,
            scale: 1.03,
          }}
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition-all duration-300 hover:border-sky-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
      

          <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-sky-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />

    

          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg"
          >
            <value.icon className="h-5 w-5" />
          </motion.div>

        

          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            {value.title}
          </h3>


          <p className="mt-2 line-clamp-4 text-xs leading-5 text-slate-600 dark:text-slate-400">
            {value.description}
          </p>


          <div className="mt-4 h-1 w-8 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-300 group-hover:w-14" />
        </motion.div>
      ))}
    </div>
  </div>
</section>
                */}
      </main>

      <Footer />
    </>


  );



}