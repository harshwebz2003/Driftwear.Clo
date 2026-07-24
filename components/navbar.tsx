'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/lib/site-data';
import { motion, AnimatedWhatsAppButton, springQuick, springGentle } from '@/components/motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springGentle}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0712]/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-4 sm:px-8 lg:px-14">
        {/* Brand Logo */}
        <a href="#home" className="group flex items-center gap-2.5 sm:gap-3" aria-label="Driftwear Clo. home">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 blur opacity-60 transition duration-300 group-hover:opacity-100" />
            <Image
              src="/assets/logo.png"
              alt="Driftwear Clo. logo"
              width={44}
              height={44}
              className="relative rounded-full border border-gold/40 object-cover sm:h-12 sm:w-12"
              priority
            />
          </div>
          <span className="leading-none">
            <span className="font-brand block text-xs font-bold uppercase tracking-[.2em] text-white sm:text-sm">
              Driftwear
            </span>
            <span className="font-grande block text-[10px] font-bold uppercase tracking-[.24em] text-gold sm:text-xs">
              Clo. Studio
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-brand relative text-xs font-bold uppercase tracking-[.18em] text-white/70 transition hover:text-gold group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Animated WhatsApp Order Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <AnimatedWhatsAppButton
            text="WhatsApp Order"
            message="Hi Driftwear Clo., I want to place a custom T-shirt order."
            size="sm"
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Fully Responsive Mobile Navigation Drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={springQuick}
          className="border-t border-white/10 bg-[#0A0712] px-4 py-5 lg:hidden"
        >
          <nav className="grid gap-2.5" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-brand rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-white/90 transition hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10">
              <AnimatedWhatsAppButton
                text="Order on WhatsApp"
                message="Hi Driftwear Clo., I want to place a custom T-shirt order from mobile."
                size="md"
                className="w-full"
              />
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
