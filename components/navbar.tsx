'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { navItems } from '@/lib/site-data';
import { motion, AnimatedWhatsAppButton, springQuick, springGentle } from '@/components/motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springGentle}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    >
      {/* Floating Capsule Bar as seen in Image 1 */}
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-full border border-gold/30 bg-[#0A0712]/80 px-4 sm:px-6 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(216,180,95,0.15)] backdrop-blur-2xl">
        {/* Brand Logo */}
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Driftwear Clo. home">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-gold/10 shadow-[0_0_15px_rgba(216,180,95,0.3)] transition duration-300 group-hover:scale-105">
            <Image
              src="/assets/logo.png"
              alt="Driftwear Clo. logo"
              width={34}
              height={34}
              className="rounded-full object-cover"
              priority
            />
          </div>
          <span className="leading-none">
            <span className="font-brand block text-xs font-bold uppercase tracking-[.18em] text-white sm:text-sm">
              Driftwear <span className="text-gold">Clo.</span>
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-brand relative text-xs font-bold uppercase tracking-[.18em] text-white/75 transition hover:text-gold group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Header Actions (Cart, Profile, WhatsApp) */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-gold hover:text-gold"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={17} />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-obsidian">
              0
            </span>
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition hover:border-gold hover:text-gold"
            aria-label="User Account"
          >
            <User size={17} />
          </button>

          <AnimatedWhatsAppButton
            text="Order Now"
            message="Hi Driftwear Clo., I want to place a custom T-shirt order."
            size="sm"
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Fully Responsive Mobile Navigation Drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={springQuick}
          className="mx-auto mt-2 max-w-[1320px] overflow-hidden rounded-3xl border border-gold/30 bg-[#0A0712]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-brand rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[.16em] text-white/90 transition hover:bg-white/10 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between gap-3">
              <AnimatedWhatsAppButton
                text="Order on WhatsApp"
                message="Hi Driftwear Clo., I want to place a custom T-shirt order from mobile."
                size="sm"
                className="w-full"
              />
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
