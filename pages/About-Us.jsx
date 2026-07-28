"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

const stats = [
    {
        value: "50+",
        label: "Projects Delivered",
        icon: Rocket,
    },
    {
        value: "25+",
        label: "Happy Clients",
        icon: Users,
    },
    {
        value: "10+",
        label: "Industries Served",
        icon: Building2,
    },
    {
        value: "99%",
        label: "Client Satisfaction",
        icon: Award,
    },
];

const timeline = [
    {
        year: "2023",
        title: "The Beginning",
        description:
            "Velora Technologies started with a vision to build modern digital solutions that genuinely solve business problems instead of simply delivering software.",
    },
    {
        year: "2024",
        title: "Expanding Services",
        description:
            "We expanded into custom web development, UI/UX design, cloud solutions and enterprise software while growing our technical expertise.",
    },
    {
        year: "2025",
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

export default function AboutPage() {
    return (
        <>

            <Navbar />

            <main className="overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
                {/* ================= HERO ================= */}
                <section className="relative isolate overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/about/about-hero.webp"
                            alt="Velora Technologies Office"
                            fill
                            priority
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-slate-950/75" />

                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-sky-900/40" />
                    </div>

                    <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-28 lg:px-8">
                        <div className="max-w-3xl">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-5 py-2 text-xs font-medium text-sky-300 backdrop-blur-xl"
                            >
                                <Sparkles className="h-4 w-4" />
                                About Velora Technologies
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="mt-8 text-5xl sm:text-5xl lg:text-[60px] font-bold tracking-tight text-slate-400 leading-[1.15] "
                            >
                                Building
                                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                                    {" "}
                                    Digital Excellence{" "}
                                </span>
                                Through Innovation
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 max-w-2xl md:text-lg text-m text-slate-400 font-medium leading-8"
                            >
                                Velora Technologies empowers businesses with modern software,
                                scalable digital solutions, cloud technologies and innovative
                                engineering that transforms ambitious ideas into measurable
                                business success.
                            </motion.p>

                            {/* <motion.div
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                className="mt-12 flex flex-wrap gap-5"
                            >
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center rounded-xl bg-sky-600 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-sky-700"
                                >
                                    Let's Build Together

                                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href="/services"
                                    className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                                >
                                    Explore Services
                                </Link>
                            </motion.div> */}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
                            >
                                {stats.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                                    >
                                        <item.icon className="mb-4 h-8 w-8 text-sky-400" />

                                        <h3 className="text-3xl font-bold text-white">
                                            {item.value}
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ================= COMPANY INTRO ================= */}

                <section className="py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            <div className="overflow-hidden rounded-[32px] shadow-2xl">
                                <Image
                                    src="/about/company-story.webp"
                                    alt="Velora Team"
                                    width={900}
                                    height={900}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-8 -right-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-sky-100 p-4 text-sky-600 dark:bg-sky-900/30">
                                        <Briefcase className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Trusted by Businesses
                                        </p>

                                        <h4 className="text-3xl font-bold">25+</h4>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="inline-flex rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                Who We Are
                            </span>

                            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                                We create technology that helps businesses grow.
                            </h2>

                            <p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Velora Technologies is a modern technology company focused on
                                delivering premium digital experiences through software
                                engineering, web development, cloud solutions, UI/UX design,
                                automation and emerging technologies.
                            </p>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Every project is driven by innovation, performance, security and
                                long-term scalability. Rather than simply writing code, we solve
                                business challenges with technology that creates measurable value.
                            </p>

                            <div className="mt-10 space-y-5">
                                {[
                                    "Custom software development",
                                    "Enterprise web applications",
                                    "Cloud & DevOps solutions",
                                    "Modern UI/UX experiences",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-sky-600" />

                                        <span className="text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
                {/* ================= MISSION & VISION ================= */}

                <section className="relative overflow-hidden py-24">
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-2">
                            <motion.div
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                whileHover={{ y: -6 }}
                                className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 text-white">
                                    <Target className="h-8 w-8" />
                                </div>

                                <h3 className="mt-8 text-3xl font-bold">Our Mission</h3>

                                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                    To empower businesses with reliable, scalable and innovative
                                    digital solutions that accelerate growth, improve operational
                                    efficiency and create exceptional customer experiences.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "Deliver quality-first digital solutions",
                                        "Create measurable business value",
                                        "Build long-term client partnerships",
                                        "Leverage modern technologies responsibly",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-4">
                                            <Check className="mt-1 h-5 w-5 text-sky-600" />

                                            <span className="text-slate-700 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                whileHover={{ y: -6 }}
                                className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-700 text-white">
                                    <Globe className="h-8 w-8" />
                                </div>

                                <h3 className="mt-8 text-3xl font-bold">Our Vision</h3>

                                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                    To become a globally trusted technology partner recognised for
                                    delivering impactful innovation, engineering excellence and
                                    sustainable digital transformation across industries.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "Global technology leadership",
                                        "Future-ready digital innovation",
                                        "Customer-centric engineering",
                                        "Continuous learning & improvement",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-4">
                                            <Check className="mt-1 h-5 w-5 text-sky-600" />

                                            <span className="text-slate-700 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ================= ACHIEVEMENTS ================= */}

                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                Our Impact
                            </span>

                            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                                Delivering measurable results
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                We believe success is measured not only by completed projects but
                                by the lasting value those solutions create for our clients.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                {
                                    icon: Rocket,
                                    number: "50+",
                                    title: "Projects Completed",
                                },
                                {
                                    icon: Users,
                                    number: "25+",
                                    title: "Satisfied Clients",
                                },
                                {
                                    icon: Workflow,
                                    number: "100%",
                                    title: "Agile Delivery",
                                },
                                {
                                    icon: HeartHandshake,
                                    number: "98%",
                                    title: "Client Retention",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 text-white">
                                        <item.icon className="h-8 w-8" />
                                    </div>

                                    <h3 className="mt-8 text-5xl font-bold text-sky-600">
                                        {item.number}
                                    </h3>

                                    <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
                                        {item.title}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= JOURNEY ================= */}

                <section className="relative py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                Our Journey
                            </span>

                            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                                Growing with innovation
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Every milestone represents our commitment to continuous
                                improvement, innovation and delivering greater value to every
                                client.
                            </p>
                        </div>

                        <div className="relative mt-20">
                            <div className="absolute left-6 top-0 h-full w-1 rounded-full bg-gradient-to-b from-sky-600 to-cyan-500 lg:left-1/2 lg:-translate-x-1/2" />

                            <div className="space-y-16">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={item.year}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        className={`relative grid items-center gap-10 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                                            }`}
                                    >
                                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                                            <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
                                                {item.year}
                                            </span>

                                            <h3 className="mt-3 text-3xl font-bold">
                                                {item.title}
                                            </h3>

                                            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="hidden lg:block" />

                                        <div className="absolute left-6 top-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-sky-600 text-white shadow-xl lg:left-1/2 dark:border-slate-950">
                                            <Clock3 className="h-5 w-5" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* ================= VALUES ================= */}

                <section className="relative overflow-hidden py-24">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/60 to-transparent dark:via-slate-900/30" />

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                Our Core Values
                            </span>

                            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                                The principles behind every solution
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Technology evolves every day, but our commitment to quality,
                                integrity and client success remains constant.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 35 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{ y: -10 }}
                                    className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:border-sky-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-sky-100 blur-3xl transition-transform duration-500 group-hover:scale-125 dark:bg-sky-900/20" />

                                    <div className="relative">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 text-white shadow-lg shadow-sky-500/25">
                                            <value.icon className="h-8 w-8" />
                                        </div>

                                        <h3 className="mt-8 text-2xl font-bold">
                                            {value.title}
                                        </h3>

                                        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                                            {value.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= WHY CHOOSE US ================= */}

                <section className="py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, x: -35 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="inline-flex rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                                Why Choose Velora
                            </span>

                            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                                We build more than software.
                            </h2>

                            <p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-400">
                                Every business is unique. That's why every product we design,
                                develop and deploy is tailored around your goals, users and future
                                growth. Our collaborative approach ensures transparency from
                                planning to deployment and beyond.
                            </p>

                            <div className="mt-10 space-y-6">
                                {reasons.map((reason) => (
                                    <div
                                        key={reason}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
                                            <Check className="h-4 w-4" />
                                        </div>

                                        <span className="pt-1 text-lg text-slate-700 dark:text-slate-300">
                                            {reason}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 35 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            <div className="overflow-hidden rounded-[34px] shadow-2xl">
                                <Image
                                    src="/about/why-choose-us.webp"
                                    alt="Why choose Velora Technologies"
                                    width={900}
                                    height={900}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                }}
                                className="absolute -left-8 top-10 rounded-3xl border border-white/30 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-green-100 p-4 text-green-600 dark:bg-green-900/30">
                                        <TrendingUp className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Success Rate
                                        </p>

                                        <h3 className="text-3xl font-bold">98%</h3>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                }}
                                className="absolute -bottom-8 right-8 rounded-3xl border border-white/30 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-sky-100 p-4 text-sky-600 dark:bg-sky-900/30">
                                        <Code2 className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Modern Stack
                                        </p>

                                        <h3 className="text-3xl font-bold">100%</h3>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ================= CALL TO ACTION ================= */}

                <section className="relative overflow-hidden py-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500" />

                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-4xl font-bold text-white md:text-5xl"
                        >
                            Let's Build Something Exceptional Together
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: 0.15,
                            }}
                            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-sky-100"
                        >
                            Whether you're launching a startup, modernising enterprise systems
                            or building the next big digital product, Velora Technologies is
                            ready to help transform your vision into reality.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: 0.3,
                            }}
                            className="mt-12 flex flex-wrap justify-center gap-5"
                        >
                            <Link
                                href="/contact"
                                className="group inline-flex items-center rounded-xl bg-white px-8 py-4 font-semibold text-sky-700 transition hover:shadow-2xl"
                            >
                                Start Your Project

                                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/services"
                                className="inline-flex items-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
                            >
                                Explore Our Services
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}