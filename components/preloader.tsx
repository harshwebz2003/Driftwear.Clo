'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { springQuick } from '@/components/motion';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if preloader was already shown in this session
    const shown = typeof window !== 'undefined' ? sessionStorage.getItem('driftwear_preloaded') : null;
    if (shown === 'true') {
      setLoading(false);
      onComplete?.();
      return;
    }

    // Progress timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    // Auto dismiss preloader after 3.2 seconds max
    const timer = setTimeout(() => {
      finishPreloader();
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const finishPreloader = () => {
    sessionStorage.setItem('driftwear_preloaded', 'true');
    setLoading(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="driftwear-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#06040A] p-6 sm:p-10 select-none overflow-hidden"
        >
          {/* Background Showcase Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={videoRef}
              src="/assets/driftwear-showcase.mp4"
              autoPlay
              muted
              playsInline
              loop
              onEnded={finishPreloader}
              className="h-full w-full object-cover opacity-50 filter brightness-90 contrast-110"
            />
            {/* Dark Vignette & Gold Atmospheric Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(6,4,10,0.85)_80%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06040A] via-transparent to-[#06040A]/80" />
          </div>

          {/* Top Preloader Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold/10 p-0.5 shadow-[0_0_20px_rgba(216,180,95,0.4)]">
                <Image src="/assets/logo.png" alt="Driftwear Logo" width={32} height={32} className="rounded-full object-cover" />
              </div>
              <span className="font-brand text-sm font-bold uppercase tracking-[.24em] text-white">
                Driftwear <span className="text-gold">Clo.</span>
              </span>
            </div>

            <button
              onClick={finishPreloader}
              className="font-brand inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-white/80 backdrop-blur-md transition hover:border-gold hover:text-gold"
            >
              Skip Intro <ChevronRight size={14} />
            </button>
          </div>

          {/* Center Brand Title */}
          <div className="relative z-10 mx-auto text-center max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-brand text-xs font-bold uppercase tracking-[.36em] text-gold"
            >
              DTF PRINTING STUDIO • GALLE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-body mt-3 text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white"
            >
              WEAR YOUR <span className="bg-gradient-to-r from-[#FCE182] via-[#E2A63B] to-[#B07B1D] bg-clip-text text-transparent">VIBE</span>
            </motion.h2>
          </div>

          {/* Bottom Loading Progress Bar */}
          <div className="relative z-10 mx-auto w-full max-w-md">
            <div className="mb-2 flex items-center justify-between font-brand text-[10px] font-bold uppercase tracking-[.22em] text-white/60">
              <span>Loading Studio Experience</span>
              <span className="text-gold">{progress}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold via-ambergold to-gold shadow-[0_0_12px_rgba(216,180,95,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
