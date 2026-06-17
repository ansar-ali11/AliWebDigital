export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  gradient: string;
};

export const banners: Banner[] = [
  {
    id: "b1",
    title: "Digital products that feel inevitable",
    subtitle: "Engineering and design that disappears into the experience.",
    tag: "Featured · Studio",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #1f3a8a 60%, #2b7fff 100%)",
  },
  {
    id: "b2",
    title: "Brand systems built to scale",
    subtitle: "Identity, voice and visual language for the next decade.",
    tag: "Branding",
    gradient: "linear-gradient(135deg, #061026 0%, #0a1a3a 50%, #1e3a8a 100%)",
  },
  {
    id: "b3",
    title: "Interfaces obsessed with detail",
    subtitle: "Pixel-perfect UI engineered for performance.",
    tag: "UI · Engineering",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #2b7fff 100%)",
  },
];

export type Service = {
  title: string;
  description: string;
  number: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Custom, responsive websites and web applications built with modern front-end and back-end technologies. We optimize performance, accessibility, and scalability so your site feels fast for customers and easy to manage for you.",
  },
  {
    number: "02",
    title: "Portfolio Websites",
    description:
      "Personal portfolio sites crafted for founders, creatives, and freelancers. Each site is built to showcase work clearly, highlight your brand, and make it easy for prospects to convert.",
  },
  {
    number: "03",
    title: "Business Websites",
    description:
      "Conversion-focused business websites with persuasive messaging, polished design, and SEO-friendly structure. We design each page to turn visitors into qualified leads and trusted customers.",
  },
  {
    number: "04",
    title: "Admin Panels",
    description:
      "Custom dashboards and internal tools designed for clarity and efficiency. We build admin interfaces with clean workflows, real-time data, and strong security patterns.",
  },
  {
    number: "05",
    title: "UI / UX Design",
    description:
      "Research-driven UI/UX design that balances visual polish with intuitive interaction. Every interface is crafted for clear user paths, consistent branding, and high engagement.",
  },
  {
    number: "06",
    title: "Branding",
    description:
      "Brand identity systems that include logo, color, typography, and messaging. We create a visual language that feels premium, memorable, and aligned with your business goals.",
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  year: string;
  liveUrl: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Nova Commerce",
    description: "Headless commerce platform for a minimalist fashion house. 42% conversion lift.",
    tech: ["Next.js", "Shopify", "Tailwind"],
    category: "E‑commerce",
    year: "2024",
    liveUrl: "https://aliwebdigital.com/projects/nova-commerce",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #2b7fff 100%)",
  },
  {
    id: "p2",
    title: "Aether Dashboard",
    description: "A fintech control plane with realtime analytics and granular permissions.",
    tech: ["React", "Supabase", "Recharts"],
    category: "SaaS",
    year: "2024",
    liveUrl: "https://aliwebdigital.com/projects/aether-dashboard",
    gradient: "linear-gradient(135deg, #061026 0%, #1e3a8a 100%)",
  },
  {
    id: "p3",
    title: "Studio Arkh",
    description: "Portfolio site for an architecture studio — editorial layout, scroll motion.",
    tech: ["Astro", "GSAP", "MDX"],
    category: "Portfolio",
    year: "2023",
    liveUrl: "https://aliwebdigital.com/projects/studio-arkh",
    gradient: "linear-gradient(135deg, #1e293b 0%, #2b7fff 100%)",
  },
  {
    id: "p4",
    title: "Lumen Wellness",
    description: "DTC brand identity and storefront for a premium wellness label.",
    tech: ["Webflow", "Figma", "Klaviyo"],
    category: "Brand · Web",
    year: "2024",
    liveUrl: "https://aliwebdigital.com/projects/lumen-wellness",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #5b8def 100%)",
  },
  {
    id: "p5",
    title: "Halcyon Travel",
    description: "Booking platform with curated itineraries and immersive trip pages.",
    tech: ["Next.js", "Stripe", "Mapbox"],
    category: "Marketplace",
    year: "2023",
    liveUrl: "https://aliwebdigital.com/projects/halcyon-travel",
    gradient: "linear-gradient(135deg, #082f49 0%, #2b7fff 100%)",
  },
  {
    id: "p6",
    title: "Forge Studio Admin",
    description: "Internal CMS and operations console for a creative production studio.",
    tech: ["React", "tRPC", "Postgres"],
    category: "Admin Panel",
    year: "2024",
    liveUrl: "https://aliwebdigital.com/projects/forge-studio-admin",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
  },
];

export const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "60+", label: "Happy Clients" },
  { value: "98%", label: "Client Retention" },
  { value: "12", label: "Industries Served" },
];
