'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { whatsappLink } from '@/lib/site-data';

export { motion };

// Spring Transition Configs
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 26,
  mass: 1
};

export const springQuick: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 24,
  mass: 0.8
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 340,
  damping: 14,
  mass: 1
};

// Motion Variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: springGentle }
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: springQuick }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: springGentle }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: springGentle }
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
};

// Background Dynamic Color Orbs Component
export function AnimatedColorBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic Floating Color Orb 1 (Gold/Amber Glow) */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -90, 70, 0],
          scale: [1, 1.25, 0.9, 1],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-20 top-1/4 h-[35rem] w-[35rem] rounded-full bg-radial-gold blur-[130px]"
      />

      {/* Dynamic Floating Color Orb 2 (Royal Purple/Magenta Glow) */}
      <motion.div
        animate={{
          x: [0, -100, 70, 0],
          y: [0, 110, -80, 0],
          scale: [1, 1.3, 0.95, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-24 top-1/3 h-[40rem] w-[40rem] rounded-full bg-radial-purple blur-[140px]"
      />

      {/* Dynamic Floating Color Orb 3 (Cyan/Emerald Accents) */}
      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -70, 90, 0],
          scale: [0.9, 1.2, 0.95, 0.9],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/3 bottom-10 h-[30rem] w-[30rem] rounded-full bg-radial-cyan blur-[120px]"
      />
    </div>
  );
}

// Word-by-Word Animated Text Reveal Component
export function AnimatedTextReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springGentle }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block mr-[0.25em] last:mr-0">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Shimmering Text Gradient Title Component
export function ShimmeringTextGradient({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span
      className={`bg-gradient-to-r from-[#FCE182] via-[#E2A63B] to-[#FCE182] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift ${className}`}
    >
      {text}
    </span>
  );
}

// Magnetic Button Wrapper
export function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// 3D Tilt Card Component with Dynamic Glow Spotlight
export function TiltCard({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);

    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d'
      }}
      className={`relative transition-shadow duration-300 ${className}`}
    >
      {/* Dynamic Cursor Light Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(216, 180, 95, 0.18), transparent 80%)`
        }}
      />
      {children}
    </motion.div>
  );
}

// Glowing Animated WhatsApp Order Button
export function AnimatedWhatsAppButton({
  text = 'Order on WhatsApp',
  message = 'Hi Driftwear Clo., I want to place a custom T-shirt order.',
  className = '',
  size = 'md'
}: {
  text?: string;
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const paddingMap = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-3 text-xs sm:text-sm',
    lg: 'px-6 py-3.5 text-sm sm:text-base'
  };

  return (
    <Magnetic>
      <motion.a
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={springQuick}
        className={`relative inline-flex items-center justify-center gap-2.5 rounded-full font-brand font-bold uppercase tracking-[.18em] text-white shadow-lg overflow-hidden group ${paddingMap[size]} ${className}`}
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
        }}
      >
        {/* Pulsating Aura Outer Glow Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#10B981] opacity-70 blur-md transition duration-500 group-hover:opacity-100 animate-pulse" />

        {/* Shimmer Light Reflection Effect */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

        <MessageCircle className="relative z-10 animate-bounce text-white" size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />
        <span className="relative z-10 drop-shadow-sm">{text}</span>
      </motion.a>
    </Magnetic>
  );
}

// Infinite Horizontal Scroll Marquee Ticker
export function HorizontalMarquee({
  items,
  speed = 30,
  direction = 'left'
}: {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
}) {
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/40 py-3.5 backdrop-blur-md select-none">
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="flex w-max items-center gap-8"
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-brand text-xs font-bold uppercase tracking-[.28em] text-white/80 transition hover:text-gold">
              {item}
            </span>
            <Sparkles size={14} className="text-gold shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
