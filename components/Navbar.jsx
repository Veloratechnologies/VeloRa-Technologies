import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { theme } from '../config/theme';
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Services', href: '/Our_Services' },
    { name: 'Technologies', href: '/Technologies' },
    { name: 'About Us', href: '/About_Us' },
    { name: 'Contact Us', href: '/contactUs' }
  ];

  // Function to check if a link is active
  const isActive = (href) => {
    return router.pathname === href;
  };

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Direct page navigation
    if (href.startsWith("/") && !href.includes("#")) {
      router.push(href);
      return;
    }

    // Scroll handling for smooth scroll sections (e.g. #Process)
    const hash = href.includes("#") ? href.split("#")[1] : null;
    if (hash) {
      if (router.pathname !== "/") {
        router.push(href);
        return;
      }
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        const offset = 80; // Navbar height offset
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    // Mobile ke liye padding py-3 se py-2 ki gayi hai (Compact mobile navbar)
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/50 backdrop-blur-md border-b border-border-light shadow-navbar py-2 md:py-3">
      <div className="max-w-7xl mx-auto px-3 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a onClick={(e) => handleScrollTo(e, '/')} className="flex items-center space-x-2 group cursor-pointer">
          <img
            src="/icons/logo1.png"
            alt="VeloRa Technologies icon"
            // Mobile par height h-8 se h-7 ki gayi hai
            className="w-auto h-7 md:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="md:text-3xl lg:text-3xl text-xl font-bold tracking-tight flex items-center text-slate-900 transition-colors duration-300">
            {theme.logo.text}
            <span className="font-medium ml-1 md:text-lg lg:text-lg text-xs rounded-full transition-all duration-300 bg-primary/10 text-primary px-2 py-0.5">
              {theme.logo.subtext}
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const baseClasses = "relative text-sm font-medium transition-all duration-300 px-3 py-1.5 hover:scale-105 cursor-pointer rounded-full";
            const activeClasses = active 
              ? "text-primary bg-primary/5" 
              : "text-slate-800 hover:text-primary";

            return (
              <div key={link.name} className="relative group">
                {link.href.startsWith("/") && !link.href.includes("#") ? (
                  <Link
                    href={link.href}
                    className={`${baseClasses} ${activeClasses}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`${baseClasses} ${activeClasses}`}
                  >
                    {link.name}
                  </a>
                )}
                
                {/* Desktop Active Indicator Line */}
                {active && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-800 transition-colors bg-slate-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-b border-border-light overflow-hidden shadow-inner"
          >
            {/* Thoda compact padding mobile menu ke liye */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    // Mobile highlight logic
                    className={`text-sm w-full rounded-xl text-left px-4 py-2.5 font-semibold transition-colors cursor-pointer flex items-center justify-between
                      ${active 
                        ? "bg-primary/10 text-primary" 
                        : "text-slate-800 hover:bg-slate-50 hover:text-primary"
                      }`}
                  >
                    {link.name}
                    {active && <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}