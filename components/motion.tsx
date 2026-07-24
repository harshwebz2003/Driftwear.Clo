'use client';

import { animate, motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/site-data';

export { motion, AnimatePresence };

// Motion Animation Preset Variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

export const springQuick = { type: 'spring' as const, stiffness: 400, damping: 25 };
export const springGentle = { type: 'spring' as const, stiffness: 200, damping: 20 };
export const springBouncy = { type: 'spring' as const, stiffness: 350, damping: 15 };

// Dynamic Animated Background Color Orbs
export function AnimatedColorBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Orb 1: Gold / Amber Glow */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.25, 0.9, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -left-20 -top-20 h-[38rem] w-[38rem] rounded-full bg-radial-gold opacity-60 blur-[120px]"
      />

      {/* Orb 2: Royal Purple / Magenta Glow */}
      <motion.div
        animate={{
          x: [0, -90, 70, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.15, 0.95, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -right-20 top-[30%] h-[42rem] w-[42rem] rounded-full bg-radial-purple opacity-50 blur-[140px]"
      />

      {/* Orb 3: Golden Cyan / Amber Accent Glow */}
      <motion.div
        animate={{
          x: [0, 60, -70, 0],
          y: [0, -50, 60, 0],
          scale: [1, 1.3, 0.85, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-[-10rem] left-[25%] h-[40rem] w-[40rem] rounded-full bg-radial-cyan opacity-45 blur-[130px]"
      />
    </div>
  );
}

// Staggered Character & Word Animated Title for "WEAR YOUR VIBE."
export function AnimatedHeroTitle() {
  const line1 = "WEAR";
  const line2 = "YOUR";
  const line3 = "VIBE.";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -60 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="font-body font-extrabold uppercase leading-[0.92] tracking-tight text-white select-none"
    >
      {/* Line 1: WEAR */}
      <div className="flex overflow-hidden text-[clamp(3.2rem,6.8vw,5.6rem)]">
        {line1.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            whileHover={{ scale: 1.15, y: -6, color: '#F5C242' }}
            transition={springQuick}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Line 2: YOUR */}
      <div className="flex overflow-hidden text-[clamp(3.2rem,6.8vw,5.6rem)]">
        {line2.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            whileHover={{ scale: 1.15, y: -6, color: '#F5C242' }}
            transition={springQuick}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Line 3: VIBE. */}
      <div className="flex overflow-hidden text-[clamp(3.5rem,7.5vw,6.4rem)] font-body font-extrabold gold-gradient-text">
        {line3.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.15,
              ease: 'easeInOut'
            }}
            whileHover={{ scale: 1.2, rotate: 3 }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// Character-by-Character Staggered Entrance Reveal
export function AnimatedTextReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } }
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springGentle }
          }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Metallic Shimmering Gradient Text
export function ShimmeringTextGradient({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`gold-gradient-text ${className}`}>
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
  message = 'Hi Driftwear Clo., I want to place a custom order.',
  size = 'md',
  className = ''
}: {
  text?: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const paddingMap = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-xs sm:text-sm',
    lg: 'px-8 py-4 text-sm sm:text-base'
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
