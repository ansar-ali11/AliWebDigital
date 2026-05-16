import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroSplash() {
  const [show, setShow] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleEnd = () => {
      setTimeout(() => setShow(false), 100);
    };

    v.addEventListener("ended", handleEnd);
    const fallback = setTimeout(handleEnd, 2000);

    return () => {
      v.removeEventListener("ended", handleEnd);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy overflow-hidden"
        >
          {/* top curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-navy origin-top z-10"
            exit={{ scaleY: 1.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* bottom curtain */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-navy origin-bottom z-10"
            exit={{ scaleY: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ambient glow */}
          <motion.div
            className="pointer-events-none absolute size-[600px] rounded-full bg-electric/15 blur-[140px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* video */}
          <motion.video
            ref={videoRef}
            src="src/assets/Intro.mp4"
            autoPlay
            muted
            playsInline
            className="relative z-20 max-w-[80vw] max-h-[80vh] w-auto h-auto"
            style={{
              filter: "invert(1) hue-rotate(180deg) contrast(1.05)",
              mixBlendMode: "screen",
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}