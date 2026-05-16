import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-44 pb-32 px-6 overflow-hidden">
      {/* soft gradient orbs */}
      <div className="pointer-events-none absolute -top-40 -right-32 size-[640px] rounded-full bg-electric/10 blur-[140px] animate-float-orb" />
      <div className="pointer-events-none absolute top-1/2 -left-40 size-[520px] rounded-full bg-electric/5 blur-[120px] animate-float-orb" style={{ animationDelay: "-6s" }} />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-10 border border-navy/10 rounded-full"
        >
          <span className="size-1.5 rounded-full bg-electric animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/70">
            Premium Digital Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.92] tracking-tighter uppercase max-w-5xl"
        >
          We build modern <span className="text-electric">digital</span> experiences.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 max-w-2xl text-lg md:text-xl text-navy/60 leading-relaxed font-light"
        >
          Web development, branding, UI/UX, and digital presence for ambitious
          founders. We turn complex products into elegant, high‑performance
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-5 bg-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-electric transition-all hover:-translate-y-0.5 shadow-xl shadow-navy/10"
          >
            View Projects
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 md:px-10 py-5 border border-navy/15 text-xs font-bold uppercase tracking-widest hover:border-navy hover:bg-navy hover:text-white transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
