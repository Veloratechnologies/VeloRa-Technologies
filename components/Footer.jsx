import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
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

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
  };

  return (
    <footer className="bg-bg-slate-100 border-t border-border-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 mb-12 border-b border-border-medium">
        {/* Company Info Block */}
        <div className="lg:col-span-5 space-y-6">
          <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center space-x-2 group w-fit">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary text-bg-white font-bold text-lg tracking-tight">
              {theme.logo.text[0]}
            </div>
            <span className="text-lg font-bold tracking-tight text-text-primary">
              {theme.logo.text}
              <span className="text-primary font-medium ml-1 text-xs bg-primary/10 px-2 py-0.5 rounded-full">
                {theme.logo.subtext}
              </span>
            </span>
          </a>
          <p className="text-sm text-text-muted leading-relaxed max-w-sm">
            VeloRa Technologies is a premier enterprise solutions agency. We specialize in building secure, custom web applications, integrating modern API structures, and automating operational pipelines using cognitive AI agents.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-3.5">
            {Object.entries(theme.socialLinks).map(([name, url]) => {
              const Icon = socialIcons[name] || Github;
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-bg-white border border-border-light text-text-secondary hover:bg-primary hover:text-bg-white hover:border-primary flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label={`VeloRa Technologies on ${name}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Sitemap Navigation Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Company</h4>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links Block */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Solutions</h4>
          <ul className="space-y-2.5">
            {servicesLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Block */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Contact Support</h4>
          <ul className="space-y-3.5">
            <li className="flex items-start space-x-2.5 text-sm text-text-muted">
              <MapPin className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
              <span className="leading-snug">{theme.contact.office}</span>
            </li>
            <li className="flex items-center space-x-2.5 text-sm text-text-muted">
              <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
              <a href={`mailto:${theme.contact.email}`} className="hover:underline hover:text-primary transition-colors">
                {theme.contact.email}
              </a>
            </li>
            <li className="flex items-center space-x-2.5 text-sm text-text-muted font-medium">
              <Phone className="w-4.5 h-4.5 text-primary shrink-0" />
              <span>{theme.contact.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between text-xs text-text-muted space-y-4 md:space-y-0">
        <div>
          &copy; {currentYear} {theme.companyName}. All rights reserved. Managed globally by single theme configurations.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <span className="font-semibold text-text-secondary">{theme.contact.hours}</span>
        </div>
      </div>
    </footer>
  );
}
