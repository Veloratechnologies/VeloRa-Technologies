import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Palette, Code, CheckCircle, Rocket, HeartHandshake } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const icons = [
    Search,
    Compass,
    Palette,
    Code,
    CheckCircle,
    Rocket,
  ];

  const steps = [
    "Discovery",
    "Planning",
    "UI/UX Design",
    "Development",
    "Testing",
    "Deployment",
  ];

  // const steps = [
  //   {
  //     icon: Search,
  //     title: "Discovery",
  //     desc: "Deep research into your business processes, bottleneck assessment, and mapping core system requirements."
  //   },
  //   {
  //     icon: Compass,
  //     title: "Planning",
  //     desc: "Architecting software layout, designing data flows, selecting stacks, and establishing final milestones."
  //   },
  //   {
  //     icon: Palette,
  //     title: "Design",
  //     desc: "Creating interactive, premium, high-fidelity UI wireframes and establishing the visual brand language."
  //   },
  //   {
  //     icon: Code,
  //     title: "Development",
  //     desc: "Writing modular, clean, and optimized code backed by strict security frameworks and database protocols."
  //   },
  //   {
  //     icon: CheckCircle,
  //     title: "Testing",
  //     desc: "Executing automated unit tests, cross-device QA layouts, and load testing to guarantee flawless operation."
  //   },
  //   {
  //     icon: Rocket,
  //     title: "Deployment",
  //     desc: "Containerized deployment to secure cloud server frameworks with automated CI/CD pipelines."
  //   },
  //   {
  //     icon: HeartHandshake,
  //     title: "Support",
  //     desc: "Ongoing performance audits, database maintenance, API updates, and 24/7 server health monitoring."
  //   }
  // ];

  return (

    <section className="py-24 bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="uppercase tracking-widest text-blue-400 font-semibold">

            OUR PROCESS

          </span>

          <h2 className="text-5xl font-bold mt-5">

            From Idea to Deployment

          </h2>

          <p className="mt-6 text-slate-300 max-w-2xl mx-auto">

            Every successful digital product follows a structured development
            process focused on quality, scalability and business outcomes.

          </p>

        </div>

        <div className="relative mt-20">

          {/* Soft Glow */}
          <div className="hidden lg:block absolute left-[8%] right-[8%] top-8 h-5 bg-blue-500/20 blur-xl rounded-full" />

          {/* Gradient Connector */}
          <div className="hidden lg:block absolute left-[8%] right-[8%] top-8 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full" />

          {/* Animated Dot */}
          <motion.div
            className="hidden lg:block absolute top-[24px] left-[8%] w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_25px_#38bdf8]"
            animate={{
              x: [
                "0%",
                "6500%"
              ]
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="grid lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = icons[index];

              return (
                <motion.div
                  key={step}
                  whileHover={{
                    y: -10,
                    transition: { duration: .25 }
                  }}
                  className="text-center"
                >
                  <div
                    className="
                    w-20
                    h-20
                    rounded-full
                    bg-white
                    border-4
                    border-primary
                    mx-auto
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    shadow-blue-500/20
                    transition-all
                    duration-300
                    group-hover:shadow-blue-500/40
                  "
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="mt-6 font-semibold text-lg">
                    {step}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
