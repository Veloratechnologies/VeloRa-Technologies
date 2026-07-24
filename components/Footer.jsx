import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

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

  return (
    /* Exact Image Gradient: Deep Royal Blue to Indigo/Purple */
    <footer className="w-full bg-gradient-to-r from-[#075985] via-[#002B66] to-[#1D4ED8] text-white pt-14 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          
          {/* Brand & Socials Column */}
          <div className="lg:col-span-5 space-y-5">
            <a 
              href="#home" 
              onClick={(e) => handleScrollTo(e, '#home')} 
              className="flex items-center space-x-2 group w-fit"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white text-[#1d4ed8] font-black text-xl shadow-md">
                V
              </div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                VeloRa
                <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  Technologies
                </span>
              </span>
            </a>

            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              VeloRa Technologies is a premier enterprise solutions agency specializing in custom web applications, API integrations, and modern AI automation pipelines.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-1">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90">NAVIGATION</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-sm text-white/80 hover:text-white transition-colors block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90">SERVICES</h4>
            <ul className="space-y-2.5">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-sm text-white/80 hover:text-white transition-colors block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90">CONTACT</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="leading-snug">Noida Sector 63 G/10</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:team@veloratechnologies.in" className="hover:text-white transition-colors">
                  team@veloratechnologies.in
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>+91 91984-27611 | +91 84290- 08091</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <p>© {currentYear} VeloRa Technologies. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}