import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { theme } from '../config/theme';
import { useTheme } from '../context/ThemeContext';
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (window.scrollY > 10) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }, 100); // Scroll rukne ke 1 second baad
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Services', href: '/WhatWeOffer' },
    { name: 'Process', href: '/#process' },
    { name: 'Technologies', href: '/#technologies' },
    { name: 'Contact Us', href: '/contactUs' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // Navbar height offset
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage
          ? 'bg-bg-black/80 backdrop-blur-md border-b border-border-light shadow-navbar py-3 '
          : 'bg-transparent  py-2 md:py-5 lg:py-5 backdrop-blur-xl  border-b border-border-light'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="/" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center space-x-2 group">

          <img
            src="/icons/logo1.png"
            alt="VeloRa Technologies icon"
            className=" w-12  h-8 md:h-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-105" />
          <span
            className={` md:text-3xl lg:text-3xl text-xl  font-bold tracking-tight flex items-center transition-colors duration-300  ${isScrolled || !isHomePage
                ? "text-slate-900" : "text-white"}`}
          >
            {theme.logo.text}
            <span
              className={`font-medium ml-1 md:text-lg lg:text-lg text-sm  md:pt-2 lg:pt-2 rounded-full transition-all duration-300 ${isScrolled || !isHomePage
                  ? "bg-primary/10 text-primary"
                  : " text-white"
                }`}
            >
              {theme.logo.subtext}
            </span>
          </span>
        </a>

        {/* Desktop Navigation and Consultation CTA */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${isScrolled || !isHomePage
                    ? "text-slate-800 hover:text-primary"
                    : "text-white hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-sm font-medium transition-colors duration-300 ${isScrolled || !isHomePage
                    ? "text-slate-800 hover:text-primary"
                    : "text-white hover:text-primary"
                  }`}
              >
                {link.name}
              </a>
            )
          )}


          {/* Consultation Button */}
          <Link
            href="/contactUs"
            className="inline-flex items-center justify-center text-sm font-semibold text-bg-white bg-primary hover:bg-primary-hover px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Book Consultation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center  space-x-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 my-4" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden bg-white/10 border-b border-border-light overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col space-y-2 ">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-base  bg-gray-400/50 backdrop-blur-lg w-fit rounded-full text-left pl-5 pr-5 font-medium text-text-secondary hover:text-primary transition-colors py-2"
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
