'use client';

import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, Check, ChevronRight, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from 'lucide-react';
import Navbar from '@/components/navbar';
import { fadeUp, motion, stagger } from '@/components/motion';
import TshirtCustomizer from '@/components/tshirt-customizer';
import { contact, faqs, gallery, navItems, processSteps, products, reasons, whatsappLink } from '@/lib/site-data';

export default function HomePage() {
  return (
    <>
      <MediaIntro />
      <Navbar />
      <main id="home">
        <Hero />
        <TshirtCustomizer />
        <FeaturedProducts />
        <Process />
        <WhyChoose />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <a
        href={whatsappLink('Hi Driftwear Clo., I want to order a custom T-shirt.')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-obsidian shadow-2xl shadow-black/50 transition hover:scale-105 sm:w-auto sm:px-5"
        aria-label="Sticky WhatsApp order button"
      >
        <MessageCircle size={22} />
        <span className="font-brand ml-2 hidden text-sm font-bold uppercase tracking-[.14em] sm:inline">Order</span>
      </a>
    </>
  );
}

function MediaIntro() {
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (visible || typeof window === 'undefined') return undefined;
    const playedKey = 'driftwear-intro-voice-played';
    if (window.localStorage.getItem(playedKey) === 'true') return undefined;

    const audio = audioRef.current;
    if (!audio) return undefined;

    const markPlayed = () => window.localStorage.setItem(playedKey, 'true');
    const tryPlay = async () => {
      try {
        audio.volume = 0.55;
        await audio.play();
        markPlayed();
      } catch {
        window.addEventListener('pointerdown', tryPlay, { once: true });
        window.addEventListener('keydown', tryPlay, { once: true });
      }
    };

    void tryPlay();

    return () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };
  }, [visible]);

  return (
    <>
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-obsidian"
            aria-label="Driftwear loading screen"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setVisible(false)}
            >
              <source src="/assets/preloader.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(200,205,210,.14),transparent_24rem),linear-gradient(180deg,rgba(7,17,31,.38),rgba(7,17,31,.88))]" />
            <div className="relative z-10 text-center">
              <p className="font-brand text-xs font-bold uppercase tracking-[.42em] text-gold">Driftwear Clo.</p>
              <p className="aida-title mt-4 text-[clamp(3.5rem,11vw,10rem)] text-white">
                <span>Wear</span>
                <span>Your</span>
                <span className="aida-muted">Vibe.</span>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <audio ref={audioRef} src="/assets/voice.mp3" preload="auto" />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-14 lg:pt-24" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(200,205,210,.26),transparent_28rem)]" />
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 blur-sm sm:h-[42rem] sm:w-[42rem]" />
      <motion.div className="shell relative grid min-h-[calc(100vh-6rem)] items-center gap-12 lg:grid-cols-[.95fr_1.05fr]" variants={stagger} initial="hidden" animate="show">
        <div>
          <motion.p variants={fadeUp} className="eyebrow">Sri Lankan custom print studio</motion.p>
          <motion.h1 id="hero-title" variants={fadeUp} className="aida-title mt-6 max-w-4xl text-[clamp(5.5rem,14vw,13.5rem)] text-white">
            <span>Wear</span>
            <span>Your</span>
            <span className="aida-muted">Vibe.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
            Custom T-shirts, unique designs, and premium DTF printing made for your style.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink('Hi Driftwear Clo., I want to order a custom T-shirt.')} className="cta-primary" target="_blank" rel="noreferrer">
              Order Now <ArrowUpRight size={18} />
            </a>
            <a href="#shop" className="cta-secondary">View Designs <ChevronRight size={18} /></a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {['Custom tees', 'DTF prints', 'Bulk orders'].map((item) => (
              <div key={item} className="font-grande gold-border rounded-2xl px-4 py-4 text-center text-xs font-bold uppercase tracking-[.18em] text-white/78">
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-[620px]">
          <div className="absolute inset-8 rounded-full bg-gold/30 blur-[90px]" />
          <div className="font-brand absolute -left-10 top-16 z-10 rounded-full border border-gold/30 bg-black/55 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-gold backdrop-blur-xl">
            Premium DTF
          </div>
          <div className="font-grande absolute -right-2 bottom-20 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-white backdrop-blur-xl">
            Galle, Sri Lanka
          </div>
          <motion.div animate={{ y: [0, -18, 0], rotate: [0, 1.6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-white/[.04] p-4 shadow-gold">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-carbon">
              <video
                className="h-full w-full object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/tshirt_black_oversized.jpg"
                aria-label="Driftwear clothing video preview"
              >
                <source src="/assets/video.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,transparent,rgba(7,17,31,.28)_58%,rgba(7,17,31,.68))]" />
            </div>
          </motion.div>
          <div className="font-grande pointer-events-none absolute -bottom-10 left-0 right-0 text-center text-[clamp(5rem,12vw,9rem)] uppercase leading-none text-white/[.035]">Driftwear</div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mb-10 max-w-4xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title mt-4 text-[clamp(3.2rem,7vw,7rem)] text-white">{title}</h2>
      {copy ? <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">{copy}</p> : null}
    </motion.div>
  );
}

function FeaturedProducts() {
  return (
    <section id="shop" className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Shop / Designs" title="Featured T-shirt designs." copy="Modern DTF-ready pieces with a premium streetwear presentation. Prices are confirmed per garment, print size, and quantity." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <motion.article key={product.name} variants={fadeUp} whileHover={{ rotateX: 4, rotateY: -5, y: -10 }} className="group gold-border overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
                <Image src={product.image} alt={`${product.name} mockup`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </div>
              <div className="p-5">
                <p className="font-grande text-xs font-bold uppercase tracking-[.2em] text-gold">{product.category}</p>
                <h3 className="font-calista mt-3 text-3xl font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-sm text-white/58">{product.price}</p>
                <a href={whatsappLink(`Hi Driftwear Clo., I want to order: ${product.name}.`)} target="_blank" rel="noreferrer" className="cta-secondary mt-5 w-full">
                  Order on WhatsApp
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="dtf" className="section-pad">
      <div className="shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <SectionTitle eyebrow="Custom DTF Printing" title="From design file to premium apparel." copy="A clean order flow for personal tees, fashion drops, teams, events, and branded clothing." />
          <a href={whatsappLink('Hi Driftwear Clo., I want to start a DTF printing order.')} className="cta-primary" target="_blank" rel="noreferrer">Start DTF Order</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {processSteps.map(([number, title, copy]) => (
            <motion.article key={number} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="gold-border rounded-[1.5rem] p-6">
              <span className="font-brand text-6xl text-gold">{number}</span>
              <h3 className="font-calista mt-4 text-3xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section-pad">
      <div className="shell overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_20%_20%,rgba(200,205,210,.2),transparent_28rem)] p-6 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Why choose Driftwear</p>
            <h2 className="display-title mt-4 text-[clamp(3rem,7vw,6.5rem)] text-white">Print studio energy. Fashion brand finish.</h2>
          </div>
          <div className="grid gap-4">
            {reasons.map((reason) => (
              <div key={reason} className="flex gap-4 rounded-2xl border border-white/10 bg-black/35 p-5">
                <Check className="mt-1 shrink-0 text-gold" />
                <p className="font-lucky m-0 text-white/72">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Gallery / Latest Work" title="Real product energy." copy="A visual feed inspired by the current Facebook brand presence, refined into a premium global streetwear look." />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <motion.div key={image} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.04]">
              <Image src={image} alt={`Driftwear gallery item ${index + 1}`} width={800} height={1000} className="w-full object-cover transition duration-700 hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Testimonials" title="Built for people who want clothing with identity." />
        <div className="grid gap-5 md:grid-cols-3">
          {['Clean print quality and the design looked exactly like the mockup.', 'Fast WhatsApp communication and a premium feel for our team tees.', 'The midnight and silver brand style feels unique and bold.'].map((quote, index) => (
            <article key={quote} className="gold-border rounded-[1.5rem] p-6">
              <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, star) => <Sparkles key={star} size={16} fill="currentColor" />)}</div>
              <p className="font-lucky mt-5 text-xl italic text-white/70">{quote}</p>
              <p className="font-brand mt-5 text-xs font-bold uppercase tracking-[.18em] text-white/45">Demo review {index + 1}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="FAQ" title="Before you order." />
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <article key={question} className="gold-border rounded-[1.25rem] p-6">
              <h3 className="font-calista text-2xl font-semibold text-white">{question}</h3>
              <p className="mt-3 text-white/62">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="shell grid min-w-0 gap-8 overflow-hidden rounded-[2rem] border border-gold/20 bg-gold-radial p-4 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-14">
        <div className="min-w-0">
          <p className="eyebrow">Contact / Order Now</p>
          <h2 className="display-title mt-4 text-[clamp(3.5rem,8vw,8rem)] text-white">Ready to wear your vibe?</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">Message Driftwear Clo. with your idea, artwork, T-shirt color, size, and quantity. We will confirm the print details before production.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink('Hi Driftwear Clo., I want to place an order.')} className="cta-primary" target="_blank" rel="noreferrer">Order on WhatsApp</a>
            <a href="mailto:nipunsathsara203@gmail.com" className="cta-secondary">Email Us</a>
          </div>
        </div>
        <div className="grid min-w-0 content-center gap-4">
          <ContactLine icon={<Phone />} text={contact.phone} />
          <ContactLine icon={<Mail />} text={contact.email} />
          <ContactLine icon={<MapPin />} text={contact.location} />
          <ContactLine icon={<Facebook />} text={contact.facebook} />
        </div>
      </div>
    </section>
  );
}

function ContactLine({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/35 p-4 text-white/78 sm:gap-4 sm:p-5">
      <span className="text-gold [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      <span className="font-lucky min-w-0 break-words font-semibold">{text}</span>
    </div>
  );
}

function Footer() {
  const resources = [
    { label: '3D Customizer', href: '#customizer' },
    { label: 'DTF Process', href: '#dtf' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#contact' }
  ];

  const socials = [
    { label: 'Facebook', href: whatsappLink('Hi Driftwear Clo., please send me the official Facebook page link.'), icon: <Facebook size={15} /> },
    { label: 'Instagram', href: whatsappLink('Hi Driftwear Clo., please send me your Instagram page link.'), icon: <Instagram size={15} /> },
    { label: 'WhatsApp', href: whatsappLink('Hi Driftwear Clo., I want to ask about a custom T-shirt order.'), icon: <MessageCircle size={15} /> }
  ];

  return (
    <footer className="px-5 pb-8 pt-10 sm:px-8 lg:px-14 xl:px-20">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#07111F] shadow-[0_32px_100px_rgba(0,0,0,.55)]"
        >
          <Image
            src="/assets/tshirt_printing_press.jpg"
            alt="Driftwear DTF printing studio footer visual"
            fill
            sizes="100vw"
            className="object-cover opacity-[.42]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(200,205,210,.3),transparent_24rem),linear-gradient(180deg,rgba(7,17,31,.18),rgba(7,17,31,.74)_48%,rgba(7,17,31,.96))]" />
          <div className="absolute inset-x-0 bottom-0 z-0 translate-y-[19%] overflow-hidden whitespace-nowrap text-center font-display text-[clamp(5.3rem,18vw,18rem)] uppercase leading-none text-white/[.09]">
            Driftwear
          </div>

          <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-5 sm:min-h-[560px] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <a href="#home" className="inline-flex items-center gap-3 self-start" aria-label="Driftwear Clo. home">
                <Image src="/assets/logo.png" alt="" width={54} height={54} className="h-12 w-12 rounded-full border border-gold/30 object-cover" />
                <span className="font-brand text-2xl uppercase leading-none text-white">Driftwear Clo.</span>
              </a>
              <p className="font-grande max-w-xs text-left text-xs font-bold uppercase leading-5 tracking-[.22em] text-gold sm:text-right">
                Wear fast. Print premium.
              </p>
            </div>

            <div className="grid gap-10 border-y border-white/15 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.15fr]">
              <FooterColumn title="Menu">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="footer-link">{item.label}</a>
                ))}
              </FooterColumn>

              <FooterColumn title="Socials">
                {socials.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="footer-link inline-flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </a>
                ))}
              </FooterColumn>

              <FooterColumn title="Resources">
                {resources.map((item) => (
                  <a key={item.href} href={item.href} className="footer-link">{item.label}</a>
                ))}
              </FooterColumn>

              <div>
                <p className="font-brand text-xs font-bold uppercase tracking-[.22em] text-white">Order Studio</p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-white/60">
                  <p>{contact.location}</p>
                  <p>{contact.phone}</p>
                  <p className="break-words">{contact.email}</p>
                </div>
                <a href={whatsappLink('Hi Driftwear Clo., I want to send a design and start an order.')} target="_blank" rel="noreferrer" className="cta-primary mt-6">
                  <Send size={16} /> Send a message
                </a>
              </div>
            </div>

            <div className="font-grande flex flex-col gap-3 text-xs font-bold uppercase tracking-[.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Driftwear Clo. All rights reserved.</p>
              <p>Custom T-shirts and DTF printing in Galle, Sri Lanka.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-brand text-xs font-bold uppercase tracking-[.22em] text-white">{title}</p>
      <div className="mt-4 grid gap-2 text-sm text-white/60">
        {children}
      </div>
    </div>
  );
}
