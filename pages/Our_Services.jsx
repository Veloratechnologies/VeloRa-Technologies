import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "../components/Footer"
import {
  ArrowRight,
  Globe,
  BrainCircuit,
  Workflow,
  Code2,
  Database,
  Plug,
  CheckCircle2,
  ChevronRight,
  Search,
  Megaphone
} from "lucide-react";

const services = [
  {
    id: "web",
    title: "Enterprise Web Development",
    icon: Globe,
    image: "/web-development.webp",
    description:
      "Build high-performance websites, SaaS products, portals and enterprise platforms that scale with your business.",
    features: [
      "Corporate Websites",
      "Next.js Applications",
      "Admin Dashboards",
      "Customer Portals",
      "SEO Optimization",
      "Performance Optimization",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Tailwind CSS",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    id: "ai",
    title: "AI Automation",
    icon: BrainCircuit,
    image: "/ai-automation.webp",
    description:
      "Transform repetitive business operations using AI copilots, intelligent assistants and workflow automation.",
    features: [
      "AI Chatbots",
      "AI Assistants",
      "Knowledge Base",
      "RAG Systems",
      "Document Intelligence",
    ],
    technologies: [
      "OpenAI",
      "Gemini",
      "Python",
      "LangChain",
      "Node.js",
    ],
  },
  {
    id: "automation",
    title: "Business Automation",
    icon: Workflow,
    image: "/business-automation.webp",
    description:
      "Reduce manual work by automating approvals, operations, customer journeys and internal workflows.",
    features: [
      "Workflow Automation",
      "CRM Automation",
      "Lead Management",
      "Email Automation",
      "Reporting",
      "Notifications",
    ],
    technologies: [
      "Node.js",
      "APIs",
      "Webhooks",
      "Cloud Functions",
    ],
  },
  {
    id: "software",
    title: "Custom Software Development",
    icon: Code2,
    image: "/custom-software.webp",
    description:
      "Design and engineer custom software solutions built specifically for your organization's workflows.",
    features: [
      "ERP Systems",
      "Enterprise Software",
      "Internal Tools",
      "SaaS Platforms",
      "Business Applications",
      "Scalable Architecture",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Docker",
      "AWS",
    ],
  },
  {
    id: "crm",
    title: "CRM & ERP Solutions",
    icon: Database,
    image: "/crm.webp",
    description:
      "Centralize your customer, operations and finance management through modern CRM and ERP systems.",
    features: [
      "Sales CRM",
      "Inventory",
      "Employee Management",
      "Invoices",
      "Reports",
      "Analytics",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node",
      "MongoDB",
      "Postgres",
      "Redis",
    ],
  },
  {
    id: "api",
    title: "API Integration",
    icon: Plug,
    image: "/api.webp",
    description:
      "Connect your applications with secure, scalable API integrations across your entire business ecosystem.",
    features: [
      "REST APIs",
      "Third-party APIs",
      "Authentication",
      "Cloud Integration",
      "Microservices",
    ],
    technologies: [
      "REST",
      "GraphQL",
      "OAuth",
      "JWT",
      "Node.js",
      "AWS",
    ],
  },
  {
    id: "seo",
    title: "SEO & Search Optimization",
    icon: Search,
    image: "/seo.webp",
    description:
      "Increase your online visibility with data-driven SEO strategies that improve search rankings, organic traffic, and long-term digital growth.",
    features: [
      "Technical SEO",
      "Keyword Research",
      "On-Page SEO",
      "Off-Page SEO",
      "Content Optimization",
      "SEO Audits"
    ],
    technologies: [
      "Google Search Console",
      "Google Analytics",
      "Screaming Frog",
      "Schema Markup"
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    image: "/digital-marketing.webp",
    description:
      "Accelerate business growth through performance-driven digital marketing campaigns across search engines, social media, email, and paid advertising.",
    features: [
      "Performance Marketing",
      "Google Ads",
      "Social Media Marketing",
      "Email Marketing",
      "Lead Generation",
      "Conversion Optimization"
    ],
    technologies: [
      "Google Ads",
      "Meta Ads",
      "LinkedIn Ads",
      "Google Analytics"
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function Services() {
  return (
    <>
      <Head>
        <title>
          Enterprise Software Development Services | Velora Technologies
        </title>

        <meta
          name="description"
          content="Velora Technologies provides enterprise web development, AI automation, custom software development, CRM solutions and API integrations for modern businesses."
        />
      </Head>

      <Navbar />

      <main className="bg-white">

        {/* HERO */}

        <section className="relative min-h-[85vh] md:min-h-screen py-20 md:py-32 overflow-hidden flex items-center">

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

            <Image
              src="/What_We_Offer_Hero.webp"
              alt="Velora Technologies providing custom software development, AI automation, web applications, and enterprise digital transformation services"
              fill
              priority
              className="object-cover object-center z-0"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 md:via-white/25 to-transparent"></div>

          <div className="absolute -top-48 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-100 blur-3xl opacity-40"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-xl"
            >

              <span className="inline-flex items-center self-start bg-primary/10 md:bg-white/30 backdrop-blur-xl border border-primary text-primary font-semibold text-[10px] md:text-xs tracking-wider uppercase px-2.5 py-1 md:px-3 md:py-1.5 rounded-full mb-4 md:mb-6 mt-8 md:mt-16">

                OUR SERVICES

              </span> 

              <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-bold tracking-tight leading-[1.2] md:leading-[1.15] text-slate-900">

                Enterprise Technology

                <span className="block text-primary">

                  Solutions Built For Growth

                </span>

              </h1>

              <p className="mt-4 md:mt-8 text-sm md:text-base leading-6 md:leading-9 text-slate-700">

                We help startups, SMEs and enterprises build intelligent
                software products, automate operations, modernize legacy
                systems and accelerate digital transformation through
                cutting-edge technologies.

              </p>

            </motion.div>

          </div>

        </section>

        {/* SERVICES */}

        <section className="py-12 md:py-24">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="text-center max-w-3xl mx-auto">

              <span className="text-primary font-semibold tracking-widest text-xs md:text-base uppercase">

                WHAT WE OFFER

              </span>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 md:mt-5">

                Technology Services That Drive Business Growth

              </h2>

              <p className="mt-3 md:mt-6 text-slate-600 text-sm md:text-lg">

                From enterprise software engineering to AI-powered automation,
                we deliver scalable digital solutions designed around your
                business objectives.

              </p>

            </div>

            <div className="mt-10 md:mt-24 space-y-12 md:space-y-36">

              {services.map((service,index)=>{

                const Icon=service.icon;

                return(

                  <motion.div

                    key={service.id}

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{once:true}}

                    className={`grid grid-cols-2 gap-3 sm:gap-6 lg:gap-16 items-center ${
                      index % 2 !== 0 ? "[&>*:first-child]:order-2" : ""
                    }`}

                  >

                    {/* CONTENT SIDE */}
                    <div>

                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-blue-100 flex items-center justify-center">

                        <Icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary"/>

                      </div>

                      <h3 className="text-sm sm:text-2xl md:text-4xl font-bold mt-2 sm:mt-4 md:mt-8 text-slate-900 leading-snug">

                        {service.title}

                      </h3>

                      <p className="mt-1.5 sm:mt-3 md:mt-6 text-slate-600 text-[11px] sm:text-sm md:text-lg leading-tight sm:leading-relaxed md:leading-8 line-clamp-3 sm:line-clamp-none">

                        {service.description}

                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2.5 md:gap-4 mt-2.5 sm:mt-4 md:mt-10">

                        {service.features.map((item)=>(
                          <div
                            key={item}
                            className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                          >
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary shrink-0"/>

                            <span className="text-[10px] sm:text-xs md:text-base text-slate-700 font-medium truncate">{item}</span>

                          </div>
                        ))}

                      </div>

                      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-3 mt-2.5 sm:mt-4 md:mt-10">

                        {service.technologies.map((tech)=>(
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 md:px-4 md:py-2 rounded-full bg-slate-100 text-[9px] sm:text-[11px] md:text-sm text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}

                      </div>

                    </div>

                    {/* IMAGE SIDE */}
                    <div>

                      <div className="rounded-lg sm:rounded-xl border md:border-2 border-cyan-900 overflow-hidden shadow-md md:shadow-2xl aspect-[4/3] sm:aspect-auto">

                        <Image
                          src={service.image}
                          alt={service.title}
                          width={700}
                          height={500}
                          className="w-full h-full object-cover hover:scale-105 duration-500"
                        />

                      </div>

                    </div>

                  </motion.div>

                )

              })}
            </div>
          </div>
        </section>

        {/* WHY VELORA */}

        <section className="py-12 md:py-24 bg-slate-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="text-center max-w-3xl mx-auto">

              <span className="uppercase tracking-widest text-primary font-semibold text-xs md:text-base">

                WHY CHOOSE VELORA

              </span>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 md:mt-5">

                Engineering Solutions That Create Business Value

              </h2>

              <p className="mt-3 md:mt-6 text-sm md:text-lg text-slate-600">

                We don't just develop software. We solve business challenges through
                technology, automation and scalable digital products.

              </p>

            </div>

            {/* Mobile Grid: 2 columns, Desktop Grid: 3 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 mt-10 md:mt-20">

              {[
                {
                  title:"Business First",
                  desc:"Every solution starts with understanding your business objectives before selecting technologies."
                },
                {
                  title:"Scalable Architecture",
                  desc:"Designed to support growth from startup MVPs to enterprise-scale platforms."
                },
                {
                  title:"Security Focused",
                  desc:"Modern security practices built into every application from day one."
                },
                {
                  title:"Agile Delivery",
                  desc:"Rapid development cycles with complete transparency and continuous feedback."
                },
                {
                  title:"Dedicated Support",
                  desc:"Long-term maintenance, improvements and technical assistance after launch."
                },
                {
                  title:"Future Ready",
                  desc:"Solutions engineered to evolve with changing business requirements."
                }
              ].map((item)=>(

                <motion.div

                  key={item.title}

                  initial={{opacity:0,y:40}}

                  whileInView={{opacity:1,y:0}}

                  viewport={{once:true}}

                  transition={{duration:.5}}

                  className="bg-[#e5e7eb] rounded-2xl md:rounded-3xl p-3.5 sm:p-5 md:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"

                >

                  <div>

                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center">

                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-primary"/>

                    </div>

                    <h3 className="text-sm sm:text-lg md:text-2xl font-semibold mt-3 md:mt-6 text-slate-900">

                      {item.title}

                    </h3>

                    <p className="mt-1.5 md:mt-4 text-[11px] sm:text-xs md:text-base text-slate-600 leading-normal md:leading-8">

                      {item.desc}

                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="relative overflow-hidden py-16 md:py-28 bg-primary">

          <div className="absolute inset-0 bg-slate-100/70 opacity-90"></div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">

            <motion.h2

              initial={{opacity:0,y:30}}

              whileInView={{opacity:1,y:0}}

              viewport={{once:true}}

              transition={{duration:.6}}

              className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight"

            >

              Ready to Build Something Exceptional?

            </motion.h2>

            <p className="mt-4 md:mt-8 text-xs sm:text-base md:text-xl text-blue-100 leading-normal md:leading-9 max-w-3xl mx-auto">

              Whether you're launching a startup, modernizing enterprise
              software or automating business operations, Velora Technologies
              is ready to help you turn your vision into reality.

            </p>

          </div>

        </section>

      </main>

      <Footer/>

    </>

  );

}