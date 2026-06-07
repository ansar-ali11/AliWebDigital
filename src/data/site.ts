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
  { number: "01", title: "Web Development", description: "Custom high-performance sites and apps with modern stacks built for scale." },
  { number: "02", title: "Portfolio Websites", description: "Distinctive personal sites for creators, founders and freelancers." },
  { number: "03", title: "Business Websites", description: "Conversion-driven marketing sites with a refined, trustworthy aesthetic." },
  { number: "04", title: "Admin Panels", description: "Dashboards and internal tools designed for clarity and speed." },
  { number: "05", title: "UI / UX Design", description: "Research-backed product design with motion, polish and craft." },
  { number: "06", title: "Branding", description: "Strategic identity systems that translate across every touchpoint." },
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
    liveUrl: "#",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #2b7fff 100%)",
  },
  {
    id: "p2",
    title: "Aether Dashboard",
    description: "A fintech control plane with realtime analytics and granular permissions.",
    tech: ["React", "Supabase", "Recharts"],
    category: "SaaS",
    year: "2024",
    liveUrl: "#",
    gradient: "linear-gradient(135deg, #061026 0%, #1e3a8a 100%)",
  },
  {
    id: "p3",
    title: "Studio Arkh",
    description: "Portfolio site for an architecture studio — editorial layout, scroll motion.",
    tech: ["Astro", "GSAP", "MDX"],
    category: "Portfolio",
    year: "2023",
    liveUrl: "#",
    gradient: "linear-gradient(135deg, #1e293b 0%, #2b7fff 100%)",
  },
  {
    id: "p4",
    title: "Lumen Wellness",
    description: "DTC brand identity and storefront for a premium wellness label.",
    tech: ["Webflow", "Figma", "Klaviyo"],
    category: "Brand · Web",
    year: "2024",
    liveUrl: "#",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #5b8def 100%)",
  },
  {
    id: "p5",
    title: "Halcyon Travel",
    description: "Booking platform with curated itineraries and immersive trip pages.",
    tech: ["Next.js", "Stripe", "Mapbox"],
    category: "Marketplace",
    year: "2023",
    liveUrl: "#",
    gradient: "linear-gradient(135deg, #082f49 0%, #2b7fff 100%)",
  },
  {
    id: "p6",
    title: "Forge Studio Admin",
    description: "Internal CMS and operations console for a creative production studio.",
    tech: ["React", "tRPC", "Postgres"],
    category: "Admin Panel",
    year: "2024",
    liveUrl: "#",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
  },
];

export const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "60+", label: "Happy Clients" },
  { value: "98%", label: "Client Retention" },
  { value: "12", label: "Industries Served" },
];
