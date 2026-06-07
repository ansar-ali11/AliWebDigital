import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners as fallbackBanners } from "@/data/site";
import { listBanners, type BannerDoc } from "@/lib/cms";
import { Reveal } from "./Reveal";

type Item = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  gradient?: string;
  imageUrl?: string;
};

export function BannerCarousel() {
  const [banners, setBanners] = useState<Item[]>(fallbackBanners);
  useEffect(() => {
    listBanners()
      .then((rows: BannerDoc[]) => {
        if (rows.length) setBanners(rows);
      })
      .catch(() => {});
  }, []);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  return (
    <section className="px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40">
              Featured · Showcase
            </p>
            <div className="hidden md:flex items-center gap-2">
              <button
                aria-label="Previous"
                onClick={() => embla?.scrollPrev()}
                className="size-10 grid place-items-center border border-navy/10 hover:bg-navy hover:text-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                aria-label="Next"
                onClick={() => embla?.scrollNext()}
                className="size-10 grid place-items-center border border-navy/10 hover:bg-navy hover:text-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {banners.map((b) => (
              <div
                key={b.id}
                className="relative shrink-0 grow-0 basis-full md:basis-[85%] lg:basis-[78%] aspect-[16/8] md:aspect-[16/7] overflow-hidden"
                style={{
                  background: b.gradient ?? "linear-gradient(135deg, #0a1a3a, #2b7fff)",
                  backgroundImage: b.imageUrl
                    ? `linear-gradient(135deg, rgba(10,26,58,0.7), rgba(10,26,58,0.4)), url(${b.imageUrl})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!b.imageUrl && <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]" />}
                <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                    {b.tag}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="font-display font-bold text-3xl md:text-5xl leading-tight tracking-tight mb-4">
                      {b.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base max-w-md">
                      {b.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {banners.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1 transition-all ${
                selected === i ? "w-10 bg-electric" : "w-5 bg-navy/15 hover:bg-navy/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
