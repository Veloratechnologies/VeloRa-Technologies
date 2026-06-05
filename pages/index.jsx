import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
// import Technologies from '@/components/Technologies';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { theme } from '../config/theme';
import Technologies from '../components/Technologies';


export default function Home() {
  return (
    <>
      <Head>
        <title>{`${theme.companyName} | Enterprise Web Dev & AI Automation`}</title>
        <meta name="description" content="We engineer premium custom web applications, robust CRM/ERP integrations, and advanced business process automation using AI agents for international companies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Web Development, AI Automation, Business Automation, CRM Development, ERP Development, API Integrations, Digital Transformation" />
        <meta name="author" content={theme.companyName} />
        
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content={`${theme.companyName} | Premium Software Engineering`} />
        <meta property="og:description" content="Enterprise custom software, web platforms, and automated workflow agents built for modern companies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://veloratech.com" />
        
        {/* Semantic Structured Data (JSON-LD) for SEO schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              'name': theme.companyName,
              'description': 'Premium enterprise software engineering and AI business process automation.',
              'url': 'https://velortechnologies.in',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': theme.contact.office,
              },
              'telephone': theme.contact.phone,
              'email': theme.contact.email,
              'openingHours': 'Mo-Fr 09:00-18:00',
            }),
          }}
        />
      </Head>

      <div className="relative">
        {/* Sticky Navbar */}
        <Navbar />

        {/* Semantic Page Layout */}
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Trust Building Brands Bar */}
          <TrustedBy />

          {/* Services Section */}
          <Services />

          {/* Why Choose Us Section */}
          <WhyChooseUs />

          {/* Process Section */}
          <Process />

          {/* Technologies Showcase Matrix */}
          {/* <Technologies /> */}
          <Technologies/>

          {/* Case Studies Section */}
          <CaseStudies />

          {/* Testimonial slider Section */}
          <Testimonials />

          {/* FAQ Accordion Section */}
          <FAQ />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
