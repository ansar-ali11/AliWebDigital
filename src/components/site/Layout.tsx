import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { Toaster } from "sonner";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-navy flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-20 size-[480px] rounded-full bg-electric/10 blur-[120px] animate-float-orb" />
      <div className="relative max-w-7xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-6">
          {eyebrow}
        </p>
        <h1 className="font-display font-bold text-5xl md:text-7xl leading-[0.95] tracking-tighter uppercase max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-navy/60 leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
