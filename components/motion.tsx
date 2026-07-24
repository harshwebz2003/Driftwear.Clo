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
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(216, 180, 95, 0.25), transparent 80%)`
        }}
      />
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}

// Animated WhatsApp Order Button
export function AnimatedWhatsAppButton({
  message = 'Hi Driftwear Clo., I want to place a custom T-shirt order.',
  text = 'WhatsApp Order',
  className = '',
  size = 'md'
}: {
  message?: string;
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5 min-h-10',
    md: 'px-6 py-3 text-xs sm:text-sm gap-2 min-h-12',
    lg: 'px-8 py-4 text-sm sm:text-base gap-2.5 min-h-14'
  };

  return (
    <Magnetic>
      <motion.a
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={springBouncy}
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        className={`group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] font-brand font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,211,102,0.7)] ${sizeClasses[size]} ${className}`}
      >
        {/* Pulsating Aura Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 blur-md transition duration-500 group-hover:opacity-80" />

        <span className="relative z-10 flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
          >
            <MessageCircle size={size === 'lg' ? 22 : size === 'md' ? 18 : 15} className="fill-slate-950/20" />
          </motion.span>
          <span>{text}</span>
          <Sparkles size={size === 'lg' ? 16 : 14} className="transition group-hover:rotate-12" />
        </span>
      </motion.a>
    </Magnetic>
  );
}

// Smooth Infinite Horizontal Marquee Component
export function HorizontalMarquee({
  items,
  speed = 25,
  direction = 'left'
}: {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
}) {
  return (
    <div className="relative flex w-full overflow-hidden border-y border-white/10 bg-white/[0.03] py-4 select-none backdrop-blur-md">
      <motion.div
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        className="flex min-w-full shrink-0 items-center justify-around gap-8 whitespace-nowrap"
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="font-brand text-xs font-bold uppercase tracking-[0.28em] text-white/80 sm:text-sm">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-gold/70 shadow-[0_0_10px_rgba(216,180,95,0.8)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
