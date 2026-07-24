'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { ArrowUpRight, Check, ChevronRight, Facebook, Mail, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react';
import Navbar from '@/components/navbar';
import { fadeUp, motion, stagger } from '@/components/motion';
import TshirtCustomizer from '@/components/tshirt-customizer';
import { contact, faqs, gallery, processSteps, products, reasons, whatsappLink } from '@/lib/site-data';

export default function HomePage() {
  return (
    <>
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
        <span className="ml-2 hidden text-sm font-black uppercase tracking-[.14em] sm:inline">Order</span>
      </a>
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-14 lg:pt-24" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(246,179,38,.28),transparent_28rem)]" />
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 blur-sm sm:h-[42rem] sm:w-[42rem]" />
      <motion.div className="shell relative grid min-h-[calc(100vh-6rem)] items-center gap-12 lg:grid-cols-[.95fr_1.05fr]" variants={stagger} initial="hidden" animate="show">
        <div>
          <motion.p variants={fadeUp} className="eyebrow">Sri Lankan custom print studio</motion.p>
          <motion.h1 id="hero-title" variants={fadeUp} className="display-title mt-6 max-w-4xl text-[clamp(5rem,13vw,13rem)] text-white">
            Wear Your <span className="text-gold">Vibe.</span>
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
              <div key={item} className="gold-border rounded-2xl px-4 py-4 text-center text-xs font-black uppercase tracking-[.14em] text-white/78">
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-[620px]">
          <div className="absolute inset-8 rounded-full bg-gold/30 blur-[90px]" />
          <div className="absolute -left-10 top-16 z-10 rounded-full border border-gold/30 bg-black/55 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-gold backdrop-blur-xl">
            Premium DTF
          </div>
          <div className="absolute -right-2 bottom-20 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-white backdrop-blur-xl">
            Galle, Sri Lanka
          </div>
          <motion.div animate={{ y: [0, -18, 0], rotate: [0, 1.6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-white/[.04] p-4 shadow-gold">
            <Image src="/assets/tshirt_black_oversized.jpg" alt="Black oversized Driftwear T-shirt mockup" width={900} height={1100} className="aspect-[4/5] rounded-[1.5rem] object-cover object-top" priority />
          </motion.div>
          <div className="pointer-events-none absolute -bottom-10 left-0 right-0 text-center font-display text-[clamp(5rem,12vw,9rem)] uppercase leading-none text-white/[.035]">Driftwear</div>
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
                <p className="text-xs font-black uppercase tracking-[.18em] text-gold">{product.category}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{product.name}</h3>
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
              <span className="font-display text-6xl text-gold">{number}</span>
              <h3 className="mt-4 text-2xl font-black text-white">{title}</h3>
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
      <div className="shell overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_20%_20%,rgba(246,179,38,.2),transparent_28rem)] p-6 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Why choose Driftwear</p>
            <h2 className="display-title mt-4 text-[clamp(3rem,7vw,6.5rem)] text-white">Print studio energy. Fashion brand finish.</h2>
          </div>
          <div className="grid gap-4">
            {reasons.map((reason) => (
              <div key={reason} className="flex gap-4 rounded-2xl border border-white/10 bg-black/35 p-5">
                <Check className="mt-1 shrink-0 text-gold" />
                <p className="m-0 text-white/72">{reason}</p>
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
          {['Clean print quality and the design looked exactly like the mockup.', 'Fast WhatsApp communication and a premium feel for our team tees.', 'The black and gold brand style feels unique and bold.'].map((quote, index) => (
            <article key={quote} className="gold-border rounded-[1.5rem] p-6">
              <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, star) => <Sparkles key={star} size={16} fill="currentColor" />)}</div>
              <p className="mt-5 text-white/70">{quote}</p>
              <p className="mt-5 text-xs font-black uppercase tracking-[.18em] text-white/45">Demo review {index + 1}</p>
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
              <h3 className="text-xl font-black text-white">{question}</h3>
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
      <span className="min-w-0 break-words font-bold">{text}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 sm:px-8 lg:px-14">
      <div className="shell flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-xl font-black uppercase tracking-[.18em] text-white">Driftwear Clo.</p>
          <p className="mt-2 text-white/52">Custom T-shirts, unique designs, and premium DTF printing from Galle, Sri Lanka.</p>
        </div>
        <a href={whatsappLink('Hi Driftwear Clo., I want to order.')} className="cta-secondary" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </footer>
  );
}
