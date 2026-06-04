import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { theme } from '@/config/theme';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Contact', href: '#contact' },
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-white/80 backdrop-blur-md border-b border-border-light shadow-navbar py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-bg-white font-bold text-xl tracking-tight transition-transform duration-300 group-hover:scale-105">
            {theme.logo.text[0]}
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary flex items-center">
            {theme.logo.text}
            <span className="text-primary font-medium ml-1 text-sm bg-primary/10 px-2 py-0.5 rounded-full">
              {theme.logo.subtext}
            </span>
          </span>
        </a>

        {/* Desktop Navigation, Theme Toggle, and Consultation CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-8 mr-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-border-light bg-bg-white flex items-center justify-center text-sm shadow-sm hover:bg-bg-slate-100 hover:border-border-medium transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Consultation Button */}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="inline-flex items-center justify-center text-sm font-semibold text-bg-white bg-primary hover:bg-primary-hover px-5 py-2.5 rounded-premium shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Book Consultation
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-text-secondary hover:bg-bg-slate-100 transition-colors"
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
            className="md:hidden bg-bg-white border-b border-border-light overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-base font-medium text-text-secondary hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              
              <hr className="border-border-light my-1" />

              {/* Mobile Theme Toggle row */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-text-secondary">Switch Appearance</span>
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full border border-border-light bg-bg-white flex items-center justify-center text-sm shadow-sm hover:bg-bg-slate-100 hover:border-border-medium transition-all duration-200 active:scale-95 cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
              </div>

              <hr className="border-border-light my-1" />

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="flex items-center justify-center w-full text-base font-semibold text-bg-white bg-primary hover:bg-primary-hover py-3 rounded-premium shadow-sm transition-colors text-center"
              >
                Book Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
