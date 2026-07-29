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
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/50 backdrop-blur-md border-b border-border-light shadow-navbar py-3">
      <div className="max-w-7xl mx-auto px-3 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a onClick={(e) => handleScrollTo(e, '/')} className="flex items-center space-x-2 group cursor-pointer">
          <img
            src="/icons/logo1.png"
            alt="VeloRa Technologies icon"
            className="w-12 h-8 md:h-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="md:text-3xl lg:text-3xl text-xl font-bold tracking-tight flex items-center text-slate-900 transition-colors duration-300">
            {theme.logo.text}
            <span className="font-medium ml-1 md:text-lg lg:text-lg text-sm rounded-full transition-all duration-300 bg-primary/10 text-primary px-2 py-0.5">
              {theme.logo.subtext}
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) =>
            link.href.startsWith("/") && !link.href.includes("#") ? (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-800 hover:text-primary transition-all duration-300 px-2 py-1 hover:scale-105"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium text-slate-800 hover:text-primary transition-all duration-300 px-2 py-1 hover:scale-105 cursor-pointer"
              >
                {link.name}
              </a>
            )
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden bg-white/20 backdrop-blur-md border-b border-border-light overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-base bg-white/50 backdrop-blur-lg w-fit rounded-full text-left px-5 py-2 font-medium text-slate-800 hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}