'use client';

import Image from 'next/image';
import { Menu, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { contact, navItems, whatsappLink } from '@/lib/site-data';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a href="#home" className="flex items-center gap-3" aria-label="Driftwear Clo. home">
          <Image src="/assets/logo.png" alt="Driftwear Clo. logo" width={48} height={48} className="rounded-full border border-gold/30 object-cover" priority />
          <span className="leading-none">
            <span className="block text-sm font-bold uppercase tracking-[.2em] text-white">Driftwear</span>
            <span className="block text-xs font-bold uppercase tracking-[.24em] text-gold">Clo.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-xs font-bold uppercase tracking-[.18em] text-white/65 transition hover:text-gold">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={whatsappLink('Hi Driftwear Clo., I want to order a custom T-shirt.')} className="cta-primary" target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> Order Now
          </a>
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

      {open ? (
        <div className="border-t border-white/10 bg-obsidian px-5 py-5 lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-4 text-sm font-bold uppercase tracking-[.16em]">
                {item.label}
              </a>
            ))}
            <a href={whatsappLink(`Hi Driftwear Clo., I want to place an order. Phone: ${contact.phone}`)} className="cta-primary mt-2" target="_blank" rel="noreferrer">
              WhatsApp Order
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
