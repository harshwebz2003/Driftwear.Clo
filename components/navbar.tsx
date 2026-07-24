'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Menu, MessageCircle, X, Sparkles } from 'lucide-react';
import { contact, navItems, whatsappLink } from '@/lib/site-data';
import { motion, Magnetic, springQuick, springGentle } from '@/components/motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springGentle}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian/75 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a href="#home" className="group flex items-center gap-3" aria-label="Driftwear Clo. home">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 blur opacity-60 transition duration-300 group-hover:opacity-100" />
            <Image
              src="/assets/logo.png"
              alt="Driftwear Clo. logo"
              width={48}
              height={48}
              className="relative rounded-full border border-gold/30 object-cover"
              priority
            />
          </div>
          <span className="leading-none">
            <span className="font-brand block text-sm font-bold uppercase tracking-[.2em] text-white">Driftwear</span>
            <span className="font-grande block text-xs font-bold uppercase tracking-[.24em] text-gold">Clo.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-brand relative text-xs font-bold uppercase tracking-[.18em] text-white/65 transition hover:text-gold group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Magnetic>
            <a
              href={whatsappLink('Hi Driftwear Clo., I want to order a custom T-shirt.')}
              className="cta-primary relative overflow-hidden group"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              <span>Order Now</span>
              <Sparkles size={14} className="ml-1 text-obsidian transition group-hover:rotate-12" />
            </a>
          </Magnetic>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.06] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={springQuick}
          className="border-t border-white/10 bg-obsidian px-5 py-5 lg:hidden"
        >
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-brand rounded-2xl border border-white/10 bg-white/[.04] px-4 py-4 text-sm font-bold uppercase tracking-[.16em] transition hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsappLink(`Hi Driftwear Clo., I want to place an order. Phone: ${contact.phone}`)}
              className="cta-primary mt-2 justify-center"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Order
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
