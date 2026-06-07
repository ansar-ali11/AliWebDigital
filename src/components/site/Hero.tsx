import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const ROTATING_WORDS = ["Websites", "Brands", "Dashboards", "Experiences", "Products"];

function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(true);
        setPaused(false);
      }, 1800);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    const current = ROTATING_WORDS[wordIndex];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 80);
    } else if (!deleting && displayed.length === current.length) {
      setPaused(true);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, paused, wordIndex]);

  return (
    <span className="relative inline-block text-electric">
      {displayed}
      <span className="inline-block w-[3px] h-[0.85em] bg-electric ml-1 align-middle animate-blink" />
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative pt-44 pb-32 px-6 overflow-hidden">
      {/* orbs */}
      <div className="pointer-events-none absolute -top-40 -right-32 size-[640px] rounded-full bg-electric/10 blur-[140px] animate-float-orb" />
      <div
        className="pointer-events-none absolute top-1/2 -left-40 size-[520px] rounded-full bg-electric/5 blur-[120px] animate-float-orb"
        style={{ animationDelay: "-6s" }}
      />

      {/* grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0a1a3a 1px, transparent 1px), linear-gradient(to bottom, #0a1a3a 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-navy/10 rounded-full">
            <span className="size-1.5 rounded-full bg-electric animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/70">
              Premium Digital Studio
            </span>
          </span>
        </motion.div>

        {/* headline line 1 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] ...">
            WE CRAFT
          </h1>
        </motion.div>

        {/* headline line 2 — typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] ...">
            <TypewriterWord />
          </h1>
        </motion.div>

        {/* headline line 3 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] ...">
            THAT CONVERT.
          </h1>
        </motion.div>

        {/* divider + description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-col md:flex-row md:items-end gap-8 max-w-5xl"
        >
          <div className="w-px h-16 bg-navy/15 hidden md:block flex-shrink-0" />
          <p className="text-base md:text-lg text-navy/55 leading-relaxed font-light max-w-xl">
            Web development, branding, UI/UX, and digital presence for ambitious
            founders. We turn complex products into elegant, high‑performance
            experiences.
          </p>
        </motion.div>

        {/* CTA buttons + stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-4 items-center"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-8 md:px-10 py-5 bg-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-electric transition-all duration-300 hover:-translate-y-0.5 shadow-xl shadow-navy/10"
          >
            View Projects
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 md:px-10 py-5 border border-navy/15 text-xs font-bold uppercase tracking-widest hover:border-navy hover:bg-navy hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>

          {/* stats */}
          <div className="hidden md:flex items-center gap-8 ml-4 pl-8 border-l border-navy/10">
            {[["50+", "Projects"], ["5★", "Rated"], ["100%", "Satisfaction"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-xl font-black text-navy tracking-tighter">{num}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-navy/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.9s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}