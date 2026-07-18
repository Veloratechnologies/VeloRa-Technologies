// import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { theme } from '../config/theme';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Contact', href: '#contact' },
  ];

  const servicesLinks = [
    { name: 'Web Development', href: '#services' },
    { name: 'AI Automation', href: '#services' },
    { name: 'Custom ERP / CRM', href: '#services' },
    { name: 'API Integrations', href: '#services' },
  ];

  // const socialIcons = {
  //   linkedin: Linkedin,
  //   twitter: Twitter,
  //   github: Github,
  // };

  return (
    <footer className="relative bg-gradient-to-b from-[#0033ad] via-[#002b94] to-white pt-28 pb-8 mt-16 overflow-hidden">
      {/* Wave Top Shape SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[90px] text-white fill-current"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 mb-12 border-b border-slate-200 relative z-10">
        
        {/* Company Info Block (Stays White text due to dark blue top area) */}
        <div className="lg:col-span-5 space-y-6">
          <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center space-x-2 group w-fit">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white text-[#0033ad] font-black text-xl tracking-tight shadow-md transition-transform group-hover:scale-105">
              {theme.logo.text[0]}
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {theme.logo.text}
              <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                {theme.logo.subtext}
              </span>
            </span>
          </a>
          <p className="text-sm text-white/90 leading-relaxed max-w-sm">
            VeloRa Technologies is a premier enterprise solutions agency. We specialize in building secure, custom web applications, integrating modern API structures, and automating operational pipelines using cognitive AI agents.
          </p>
          
          {/* Social Icons */}
          {/* <div className="flex space-x-3.5 pt-2">
            {Object.entries(theme.socialLinks).map(([name, url]) => {
              const Icon = socialIcons[name] || FaGithub;
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-[#0033ad] hover:border-white flex items-center justify-center transition-all duration-300 shadow-sm backdrop-blur-sm hover:-translate-y-1"
                  aria-label={`VeloRa Technologies on ${name}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div> */}
        </div>

        {/* Sitemap Navigation Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-white/20 pb-1 w-fit">About us</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links Block */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-white/20 pb-1 w-fit">Industry Solutions</h4>
          <ul className="space-y-3">
            {servicesLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Block (Transitions into lighter background area) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-white/20 pb-1 w-fit">Contact us</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-sm text-slate-100">
              <MapPin className="w-5 h-5 text-white/90 shrink-0 mt-0.5" />
              <span className="leading-snug">{theme.contact.office}</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-slate-200">
              <Mail className="w-5 h-5 text-white/90 shrink-0" />
              <a href={`mailto:${theme.contact.email}`} className="hover:underline hover:text-white transition-colors">
                {theme.contact.email}
              </a>
            </li>
            <li className="flex items-center space-x-3 text-sm text-slate-900 font-bold bg-white/40 px-3 py-2 rounded-xl backdrop-blur-sm w-fit border border-white/30">
              <Phone className="w-5 h-5 text-[#0033ad] shrink-0" />
              <span>{theme.contact.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright row (Fully shifts to light background, text changed to dark gray/slate) */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between text-xs text-slate-600 space-y-4 md:space-y-0 relative z-10 font-medium">
        <div>
          &copy; {currentYear} {theme.companyName}. All rights reserved. Managed globally by single theme configurations.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:underline hover:text-[#0033ad] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:underline hover:text-[#0033ad] transition-colors">Terms of Service</a>
          <span className="font-semibold text-slate-800">{theme.contact.hours}</span>
        </div>
      </div>
    </footer>
  );
}