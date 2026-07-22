import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
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
      "LLM Integration",
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
      "Vector DB",
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
      "Zapier",
      "Make",
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
    image: "/services/custom-software.webp",
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
      "Express",
      "MongoDB",
      "Docker",
      "AWS",
    ],
  },
  {
    id: "crm",
    title: "CRM & ERP Solutions",
    icon: Database,
    image: "/services/crm.webp",
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
    image: "/services/api.webp",
    description:
      "Connect your applications with secure, scalable API integrations across your entire business ecosystem.",
    features: [
      "REST APIs",
      "Payment Gateway",
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

        <section className="relative min-h-screen py-32 overflow-hidden">

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

          <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/25 to-transparent"></div>

          <div className="absolute -top-48 right-0 w-[600px] h-[600px] rounded-full bg-blue-100 blur-3xl opacity-40"></div>

          <div className="relative max-w-7xl mx-auto px-6">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-xl"
            >

              <span className="inline-flex items-center self-start md:bg-primary/10 bg-white/30  md:bg-transparent backdrop-blur-xl  border border-primary text-primary font-semibold text-xs tracking-wider uppercase px-3  py-1.5 rounded-full md:mb-6 md:mt-16">

                OUR SERVICES

              </span> 

              <h1 className="text-5xl sm:text-5xl lg:text-[60px] font-bold tracking-tight leading-[1.15] text-slate-900">

                Enterprise Technology

                <span className="block text-primary">

                  Solutions Built For Growth

                </span>

              </h1>

              <p className="mt-8 text-m leading-9 text-slate-700">

                We help startups, SMEs and enterprises build intelligent
                software products, automate operations, modernize legacy
                systems and accelerate digital transformation through
                cutting-edge technologies.

              </p>

                {/* <div className="mt-10 flex gap-5">

                  <button className="rounded-full bg-primary hover:bg-blue-700 text-white px-8 py-4 font-semibold flex items-center">

                    Book Consultation

                    <ArrowRight className="ml-3 w-5 h-5"/>

                  </button>

                  <button className="rounded-full border border-slate-300 px-8 py-4 font-semibold hover:border-blue-500">

                    Explore Services

                  </button>

                </div> */}

            </motion.div>

          </div>

        </section>

        {/* SERVICES */}

        <section className="py-24">

          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center max-w-3xl mx-auto">

              <span className="text-primary font-semibold tracking-widest uppercase">

                WHAT WE OFFER

              </span>

              <h2 className="text-5xl font-bold mt-5">

                Technology Services That Drive Business Growth

              </h2>

              <p className="mt-6 text-slate-600 text-lg">

                From enterprise software engineering to AI-powered automation,
                we deliver scalable digital solutions designed around your
                business objectives.

              </p>

            </div>

            <div className="mt-24 space-y-36">

              {services.slice(0,3).map((service,index)=>{

                const Icon=service.icon;

                return(

                  <motion.div

                    key={service.id}

                    variants={fadeUp}

                    initial="hidden"

                    whileInView="visible"

                    viewport={{once:true}}

                    className={`grid lg:grid-cols-2 gap-16 items-center ${
                      index%2!==0 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}

                  >

                    <div>

                      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                        <Icon className="w-8 h-8 text-primary"/>

                      </div>

                      <h3 className="text-4xl font-bold mt-8">

                        {service.title}

                      </h3>

                      <p className="mt-6 text-slate-600 text-lg leading-8">

                        {service.description}

                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-10">

                        {service.features.map((item)=>(
                          <div
                            key={item}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary"/>

                            <span>{item}</span>

                          </div>
                        ))}

                      </div>

                      <div className="flex flex-wrap gap-3 mt-10">

                        {service.technologies.map((tech)=>(
                          <span
                            key={tech}
                            className="px-4 py-2 rounded-full bg-slate-100 text-sm"
                          >
                            {tech}
                          </span>
                        ))}

                      </div>

                      <button className="mt-10 flex items-center font-semibold text-primary">

                        Learn More

                        <ChevronRight className="ml-2"/>

                      </button>

                    </div>

                    <div>

                      <div className="rounded-3xl overflow-hidden shadow-2xl">

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

        <section className="py-24 bg-slate-50">

          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center max-w-3xl mx-auto">

              <span className="uppercase tracking-widest text-primary font-semibold">

                WHY CHOOSE VELORA

              </span>

              <h2 className="text-5xl font-bold mt-5">

                Engineering Solutions That Create Business Value

              </h2>

              <p className="mt-6 text-lg text-slate-600">

                We don't just develop software. We solve business challenges through
                technology, automation and scalable digital products.

              </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

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

                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"

                >

                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">

                    <CheckCircle2 className="text-primary"/>

                  </div>

                  <h3 className="text-2xl font-semibold mt-6">

                    {item.title}

                  </h3>

                  <p className="mt-4 text-slate-600 leading-8">

                    {item.desc}

                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>

        {/* REMAINING SERVICES */}

        <section className="py-24">

          <div className="max-w-7xl mx-auto px-6">

            <div className="space-y-36">

              {services.slice(3).map((service,index)=>{

                const Icon=service.icon;

                return(

                  <motion.div

                    key={service.id}

                    initial={{opacity:0,y:60}}

                    whileInView={{opacity:1,y:0}}

                    viewport={{once:true}}

                    transition={{duration:.7}}

                    className={`grid lg:grid-cols-2 gap-16 items-center ${
                      index%2===0 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}

                  >

                    <div>

                      <div className="rounded-3xl overflow-hidden shadow-2xl">

                        <Image

                          src={service.image}

                          alt={service.title}

                          width={700}

                          height={500}

                          className="w-full h-full object-cover hover:scale-105 duration-500"

                        />

                      </div>

                    </div>

                    <div>

                      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                        <Icon className="w-8 h-8 text-primary"/>

                      </div>

                      <h3 className="text-4xl font-bold mt-8">

                        {service.title}

                      </h3>

                      <p className="mt-6 text-lg text-slate-600 leading-8">

                        {service.description}

                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mt-10">

                        {service.features.map((feature)=>(

                          <div

                            key={feature}

                            className="flex items-center gap-3"

                          >

                            <CheckCircle2 className="w-5 h-5 text-primary"/>

                            {feature}

                          </div>

                        ))}

                      </div>

                      <div className="flex flex-wrap gap-3 mt-10">

                        {service.technologies.map((tech)=>(

                          <span

                            key={tech}

                            className="px-4 py-2 rounded-full bg-slate-100 text-sm"

                          >

                            {tech}

                          </span>

                        ))}

                      </div>

                      <button className="mt-10 text-primary font-semibold flex items-center">

                        Learn More

                        <ChevronRight className="ml-2"/>

                      </button>

                    </div>

                  </motion.div>

                )

              })}

            </div>

          </div>

        </section>

        {/* DEVELOPMENT PROCESS */}

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

            <div className="grid lg:grid-cols-6 gap-8 mt-20">

              {[
                "Discovery",
                "Planning",
                "UI/UX Design",
                "Development",
                "Testing",
                "Deployment"
              ].map((step,index)=>(

                <div

                  key={step}

                  className="relative text-center"

                >

                  <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center text-xl font-bold">

                    {index+1}

                  </div>

                  <h3 className="mt-6 font-semibold">

                    {step}

                  </h3>

                </div>

              ))}     
            </div>

          </div>

        </section>

        {/* INDUSTRIES */}

        <section className="py-24">

          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center max-w-3xl mx-auto">

              <span className="uppercase tracking-widest text-primary font-semibold">

                INDUSTRIES WE SERVE

              </span>

              <h2 className="text-5xl font-bold mt-5">

                Technology Solutions Across Industries

              </h2>

              <p className="mt-6 text-lg text-slate-600">

                We build scalable digital products tailored to different
                industries and business models.

              </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

              {[
                "Healthcare",
                "Finance",
                "Education",
                "Real Estate",
                "Retail",
                "Manufacturing",
                "Logistics",
                "Startups"
              ].map((industry)=>(

                <motion.div

                  key={industry}

                  whileHover={{y:-8}}

                  className="rounded-2xl border border-slate-200 p-8 text-center hover:border-blue-500 hover:shadow-xl transition-all"

                >

                  <h3 className="text-xl font-semibold">

                    {industry}

                  </h3>

                </motion.div>

              ))}

            </div>

          </div>

        </section>

        {/* FAQ */}

        <section className="py-24 bg-slate-50">

          <div className="max-w-5xl mx-auto px-6">

            <div className="text-center">

              <span className="uppercase tracking-widest text-primary font-semibold">

                FAQ

              </span>

              <h2 className="text-5xl font-bold mt-5">

                Frequently Asked Questions

              </h2>

            </div>

            <div className="mt-20 space-y-6">

              {[
                {
                  q:"How long does a software project take?",
                  a:"Project timelines depend on complexity. MVPs generally take 4–8 weeks while enterprise platforms may require several months."
                },
                {
                  q:"Can you modernize our existing software?",
                  a:"Yes. We specialize in upgrading legacy applications with modern architecture while minimizing disruption."
                },
                {
                  q:"Do you build AI-powered applications?",
                  a:"Absolutely. We develop AI assistants, chatbots, workflow automation, document intelligence and business AI solutions."
                },
                {
                  q:"Do you provide support after deployment?",
                  a:"Yes. We offer continuous maintenance, feature enhancements, monitoring and technical support."
                }
              ].map((faq)=>(

                <div

                  key={faq.q}

                  className="bg-white rounded-2xl p-8 shadow-sm"

                >

                  <h3 className="text-xl font-semibold">

                    {faq.q}

                  </h3>

                  <p className="mt-4 text-slate-600 leading-8">

                    {faq.a}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="relative overflow-hidden py-28 bg-primary">

          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-primary to-indigo-700 opacity-90"></div>

          <div className="relative max-w-5xl mx-auto px-6 text-center text-white">

            <motion.h2

              initial={{opacity:0,y:30}}

              whileInView={{opacity:1,y:0}}

              viewport={{once:true}}

              transition={{duration:.6}}

              className="text-5xl lg:text-6xl font-bold leading-tight"

            >

              Ready to Build Something Exceptional?

            </motion.h2>

            <p className="mt-8 text-xl text-blue-100 leading-9 max-w-3xl mx-auto">

              Whether you're launching a startup, modernizing enterprise
              software or automating business operations, Velora Technologies
              is ready to help you turn your vision into reality.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all">

                Book Free Consultation

              </button>

              <button className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all">

                View Portfolio

              </button>

            </div>

          </div>

        </section>

      </main>

    </>

  );

}