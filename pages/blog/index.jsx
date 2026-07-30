import React, { useState } from "react";
import Link from "next/link";

// Backup image in case external network/Unsplash fails
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800";

const CATEGORIES = [
  "All Insights",
  "AI Automation",
  "Web Development",
  "CRM",
  "SEO",
  "Business Automation",
];

const FEATURED_ARTICLE = {
  id: "featured-1",
  slug: "/blog/ai-powered-business",
  category: "AI Automation",
  badge: "Featured Guide",
  readTime: "5 min read",
  publishedAt: "July 28, 2026",
  title: "How AI Automation Is Transforming Modern Business Operations",
  description:
    "Discover how early-stage and growing enterprises deploy AI copilots, custom knowledge bases, and multi-agent workflows to streamline operations and save hundreds of manual hours.",
  highlights: [
    "Instant 24/7 lead capture and query handling",
    "Zero-code integration with existing CRM databases",
    "60% reduction in routine operational tasks"
  ],
  tags: ["OpenAI", "LangChain", "Python", "RAG Systems", "Node.js"],
  // HD AI Tech Image URL Updated
  image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
};

const ARTICLES = [
  {
    id: "art-1",
    slug: "/blog/business-automation",
    category: "Business Automation",
    badge: "Workflow Ops",
    readTime: "4 min read",
    title: "5 High-Impact Business Automation Strategies for 2026",
    description:
      "Eliminate data silos between your custom software, cloud CRMs, and payment gateways with lightweight event-driven workflows.",
    highlights: [
      "Real-time database sync across platforms",
      "Automated invoice & onboarding triggers",
      "Minimal maintenance overhead"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    date: "Jul 24, 2026",
  },
  {
    id: "art-2",
    slug: "/blog/web-development",
    category: "Web Development",
    badge: "Enterprise SSR",
    readTime: "5 min read",
    title: "Next.js & Modern Web Architecture: Building Sub-100ms Portals",
    description:
      "A complete technical breakdown of server components, edge caching, and Tailwind CSS design systems for zero-latency web apps.",
    highlights: [
      "App-like responsive experience on all devices",
      "Pixel-perfect mobile & desktop alignment",
      "Top-tier Google SEO optimization"
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    date: "Jul 21, 2026",
  },
  {
    id: "art-3",
    slug: "/blog/crm-development",
    category: "CRM",
    badge: "Custom SaaS",
    readTime: "4 min read",
    title: "Custom CRM Development vs. Off-The-Shelf Platforms",
    description:
      "Why growing startups are switching from bloated monthly SaaS subscriptions to tailored custom CRM builds built for rapid scale.",
    highlights: [
      "100% ownership of business data & logic",
      "Custom pipeline stages for sales teams",
      "Lower long-term total cost of ownership"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "Jul 18, 2026",
  },
  {
    id: "art-4",
    slug: "/blog/seo-for-business",
    category: "SEO",
    badge: "Growth Strategy",
    readTime: "6 min read",
    title: "SEO for Business: Capturing High-Intent B2B Organic Traffic",
    description:
      "Practical search engine optimization tactics to rank your technical services for keywords that convert visitors into paying clients.",
    highlights: [
      "Semantic keyword clustering techniques",
      "Technical Core Web Vitals optimization",
      "High-authority content structuring"
    ],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=800",
    date: "Jul 15, 2026",
  },
  {
    id: "art-5",
    slug: "/blog/ai-workflow",
    category: "AI Automation",
    badge: "LLM Integration",
    readTime: "5 min read",
    title: "Integrating AI Workflows into Existing Web & Mobile Apps",
    description:
      "How to securely connect OpenAI and Gemini APIs to your existing codebase without rewriting your entire backend infrastructure.",
    highlights: [
      "Secure API key management & rate limits",
      "Context-aware AI assistants & chatbots",
      "Sub-second streaming API responses"
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800",
    date: "Jul 11, 2026",
  },
  {
    id: "art-6",
    slug: "/blog/web-development",
    category: "Web Development",
    badge: "UI / UX System",
    readTime: "4 min read",
    title: "Designing Scalable UI Design Systems with Tailwind CSS",
    description:
      "Keep your code clean, modular, and easy to maintain across large engineering teams using utility-first CSS design systems.",
    highlights: [
      "60% smaller CSS bundle file size",
      "Consistent brand colors & component styles",
      "Modular code for fast feature scaling"
    ],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    date: "Jul 05, 2026",
  },
];

export default function VeloraBlogLanding() {
  const [selectedCategory, setSelectedCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === "All Insights" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-[#0c4a6e] leading-none">
                  VeloRa
                </span>
                <span className="text-[10px] font-semibold text-[#0284c7] tracking-wider">
                  Technologies
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-[#0c4a6e] transition-colors">Home</Link>
            <Link href="/Our_Services" className="hover:text-[#0c4a6e] transition-colors">Our Services</Link>
            <Link href="/Technologies" className="hover:text-[#0c4a6e] transition-colors">Technologies</Link>
            <Link href="/About_Us" className="hover:text-[#0c4a6e] transition-colors">About Us</Link>
            <Link href="/contactUs" className="hover:text-[#0c4a6e] transition-colors">Contact Us</Link>
            <Link href="/blog" className="text-[#0c4a6e] border-b-2 border-[#0c4a6e] pb-1 font-bold">Blogs</Link>
          </nav>

          <div>
            <Link
              href="/contactUs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0c4a6e] hover:bg-[#07334e] transition-colors shadow-sm"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* TOP CATEGORY FILTER PILLS */}
        <section className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#0c4a6e] text-white shadow-sm scale-105"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-[#0c4a6e] hover:text-[#0c4a6e]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-full shadow-sm p-1 focus-within:border-[#0c4a6e] focus-within:ring-1 focus-within:ring-[#0c4a6e]">
              <svg className="w-4 h-4 text-slate-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search blog topics or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-xs font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="px-3 text-[11px] font-bold text-slate-400 hover:text-slate-700">
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* SECTION HEADER */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200/80">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0284c7] flex items-center gap-1 mb-1">
              <span>&lt;/&gt;</span> DIGITAL TRANSFORMATION & INSIGHTS
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c4a6e] tracking-tight">
              Technology Trends Driving Tomorrow
            </h1>
          </div>
          <span className="text-xs font-mono font-semibold text-[#0c4a6e] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full hidden sm:inline-block">
            {filteredArticles.length} Articles
          </span>
        </div>

        {/* FEATURED BLOG CARD */}
        {selectedCategory === "All Insights" && !searchQuery && (
          <section className="mb-14">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden grid lg:grid-cols-12 gap-0 hover:shadow-md transition-shadow">
              
              {/* Image Section with Fixed HD AI Image */}
              <Link href={FEATURED_ARTICLE.slug} className="lg:col-span-6 relative block min-h-[300px] bg-slate-100 overflow-hidden">
                <img
                  src={FEATURED_ARTICLE.image}
                  alt=""
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#0c4a6e] text-white text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-md uppercase">
                  {FEATURED_ARTICLE.badge}
                </div>
              </Link>

              {/* Details Section */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/40">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                    <span className="text-[#0284c7] font-bold">{FEATURED_ARTICLE.category}</span>
                    <span>•</span>
                    <span>{FEATURED_ARTICLE.readTime}</span>
                  </div>

                  <Link href={FEATURED_ARTICLE.slug}>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c4a6e] leading-snug mb-3 hover:text-[#0284c7] transition-colors">
                      {FEATURED_ARTICLE.title}
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {FEATURED_ARTICLE.description}
                  </p>

                  {/* Advantage Bullet Points */}
                  <div className="space-y-1.5 mb-6">
                    {FEATURED_ARTICLE.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <svg className="w-4 h-4 text-[#0284c7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Chips Bottom Bar */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {FEATURED_ARTICLE.tags.map((tag, i) => (
                      <span key={i} className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={FEATURED_ARTICLE.slug}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-[#0c4a6e] hover:bg-[#0c4a6e] hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ARTICLES GRID */}
        <section>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm font-medium">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All Insights");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-[#0c4a6e] underline"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-[#f4f8fc] rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-[#0284c7]/50 hover:shadow-md transition-all"
                >
                  {/* Top Portion: Image & Content */}
                  <div>
                    {/* Image Container */}
                    <Link href={article.slug} className="relative block h-44 bg-slate-200 overflow-hidden">
                      <img
                        src={article.image}
                        alt=""
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full">
                        {article.badge}
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-2">
                        <span className="text-[#0284c7] font-bold">{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>

                      <Link href={article.slug}>
                        <h3 className="text-lg font-bold text-[#0c4a6e] leading-snug mb-2 group-hover:text-[#0284c7] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM SECTION: "KEY TAKEAWAYS" BOX */}
                  <div className="bg-white p-4 border-t border-slate-200/80 m-3 mt-0 rounded-xl">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0c4a6e] mb-2">
                      KEY TAKEAWAYS:
                    </div>
                    
                    <div className="space-y-1.5 mb-4">
                      {article.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <svg className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={article.slug}
                      className="inline-flex items-center justify-between w-full pt-2 border-t border-slate-100 text-xs font-bold text-[#0c4a6e] hover:text-[#0284c7] transition-colors"
                    >
                      <span>Read Article</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>

                </article>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-[#0c4a6e]">VeloRa</span>
            <span className="text-[10px] text-slate-400">| Engineering & Digital Transformation</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Velora Technologies. All rights reserved.</p>
          <div className="flex gap-4 font-semibold text-slate-600">
            <Link href="/privacy" className="hover:text-[#0c4a6e]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#0c4a6e]">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}