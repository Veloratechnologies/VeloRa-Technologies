export const caseStudies = [
  {
    id: "case-erp",
    title: "Global Supply Chain Modernization",
    client: "Apex Logistics Global",
    industry: "Logistics & Supply Chain",
    service: "Custom ERP & API Integrations",
    challenge: "Legacy inventory and order processing workflows led to high operational friction, order fulfillment lags of up to 48 hours, and database synchronization issues across multiple international warehouses.",
    solution: "We designed a bespoke, cloud-native ERP platform built on Next.js and Node.js, integrated via custom REST APIs with warehouse scanning hardware. The application features automated inventory level alerts and real-time order tracking.",
    result: "Fulfillment delays were reduced by 40% within the first 60 days, database entry errors fell by 95%, and the customer support load decreased by 30% due to client-facing self-service portals.",
    stats: [
      { label: "Processing Speed", value: "+40%" },
      { label: "Data Accuracy", value: "99.8%" },
      { label: "Customer Satisfaction", value: "+25%" }
    ]
  },
  {
    id: "case-ai",
    title: "AI-Powered Customer Onboarding",
    client: "Novus Retail Brands",
    industry: "E-Commerce & Retail",
    service: "AI & Business Automation",
    challenge: "High inbound customer request volume during seasonal sales caused lead qualification response bottlenecks, costing the company potential repeat customers due to delayed replies.",
    solution: "Developed an intelligent customer support agent using OpenAI GPT-4 and LangChain, integrated directly into WhatsApp, Slack, and the main web app. The agent handles product questions and qualifies purchase intent before routing warm leads to sales agents.",
    result: "Response time dropped from 4 hours to instantaneous (under 2 seconds). The AI successfully resolved 60% of common customer support requests without human intervention, boosting overall team capacity.",
    stats: [
      { label: "Response Time", value: "<2s" },
      { label: "Automation Rate", value: "60%" },
      { label: "Lead Conversion", value: "+18%" }
    ]
  },
  {
    id: "case-portal",
    title: "Secure Client Onboarding Portal",
    client: "Aether Financial Services",
    industry: "Fintech & Banking",
    service: "Web Applications & Security",
    challenge: "Fintech onboarding for wealth management clients was manually executed via emailed PDFs, leading to slow conversions, security concerns over sensitive data, and drop-offs during registration.",
    solution: "Designed a secure client onboarding application featuring biometrics verification, encrypted drag-and-drop document uploads, progress tracking, and back-office review dashboards.",
    result: "Customer onboarding time dropped from 5 days to 15 minutes. Verification friction was significantly minimized, driving a 35% increase in successfully finalized client profiles.",
    stats: [
      { label: "Onboarding Time", value: "-95%" },
      { label: "Drop-off Rate", value: "-35%" },
      { label: "Compliance Audits", value: "100%" }
    ]
  }
];
