'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
  Maximize2,
  Layers,
  Zap,
  MousePointer,
  Sliders
} from 'lucide-react';
import Navbar from '@/components/navbar';
import {
  fadeUp,
  fadeInScale,
  fadeLeft,
  fadeRight,
  motion,
  stagger,
  Magnetic,
  TiltCard,
  springQuick,
  springGentle,
  springBouncy
} from '@/components/motion';
import TshirtCustomizer from '@/components/tshirt-customizer';
import { contact, faqs, gallery, navItems, processSteps, products, reasons, whatsappLink } from '@/lib/site-data';

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main id="home">
        <Hero />
        <TshirtCustomizer />
        <FeaturedProducts onPreview={(img) => setSelectedImage(img)} />
        <Process />
        <WhyChoose />
        <Gallery onPreview={(img) => setSelectedImage(img)} />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      {/* WhatsApp Sticky Floating Button */}
      <motion.a
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={springBouncy}
        href={whatsappLink('Hi Driftwear Clo., I want to order a custom T-shirt.')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-obsidian shadow-2xl shadow-emerald-950/80 transition sm:w-auto sm:px-5"
        aria-label="Sticky WhatsApp order button"
      >
        <MessageCircle size={22} />
        <span className="font-brand ml-2 hidden text-sm font-bold uppercase tracking-[.14em] sm:inline">Order</span>
      </motion.a>

      {/* Image Preview Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springQuick}
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-carbon p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/60 p-2 text-white transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-2xl sm:aspect-square">
              <Image src={selectedImage} alt="Driftwear visual preview" fill className="object-cover" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-4">
              <span className="font-brand text-xs font-bold uppercase tracking-wider text-gold">
                Driftwear Clo. Visual Spec
              </span>
              <a
                href={whatsappLink('Hi Driftwear Clo., I saw this design in the gallery and want to order.')}
                target="_blank"
                rel="noreferrer"
                className="cta-primary text-xs"
              >
                Order this design
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

/* ==========================================================================
   HERO SECTION - Figma Animated Design (Video Completely Removed)
   ========================================================================== */
function Hero() {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const apparelVariants = [
    {
      name: 'All Eyes On Me Black Tee',
      tag: 'Oversized Streetwear',
      image: '/assets/tshirt_black_oversized.jpg',
      color: '#121316',
      badge: '🔥 Best Seller'
    },
    {
      name: 'Studio White Custom Tee',
      tag: 'Minimal DTF Print',
      image: '/assets/tshirt_white_regular.jpg',
      color: '#F4F5F7',
      badge: '✨ Studio Pick'
    },
    {
      name: 'Urban Streetwear Look',
      tag: 'Custom DTF Graphic',
      image: '/assets/Gallery/streetwear_look_01.jpg',
      color: '#1C1625',
      badge: '💎 Premium Release'
    }
  ];

  const currentVariant = apparelVariants[activeVariantIndex];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#130A18] px-5 pb-12 pt-28 sm:px-8 lg:px-14 lg:pt-24" aria-labelledby="hero-title">
      {/* Background Lighting Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_52%,rgba(168,74,196,.52),transparent_24rem),radial-gradient(circle_at_22%_24%,rgba(200,205,210,.12),transparent_18rem),linear-gradient(105deg,#130A18_0%,#0D0711_48%,#190B20_100%)]" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-12rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#A44CC6]/55 blur-3xl sm:right-[2rem] sm:h-[48rem] sm:w-[48rem]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,7,17,.96)_0%,rgba(13,7,17,.78)_36%,rgba(13,7,17,.2)_100%)] lg:bg-[linear-gradient(90deg,rgba(13,7,17,.96)_0%,rgba(13,7,17,.82)_39%,rgba(13,7,17,.12)_100%)]" />

      <motion.div className="shell relative z-10 grid min-h-[calc(100vh-7rem)] content-between gap-8" variants={stagger} initial="hidden" animate="show">
        <div className="grid flex-1 items-center gap-12 pt-8 lg:grid-cols-[.85fr_1.15fr] lg:pt-0">
          {/* Left Column Text Content */}
          <div className="relative z-20 max-w-xl">
            <motion.p variants={fadeUp} className="font-brand text-xs font-bold uppercase tracking-[.22em] text-gold">
              OUR VISION
            </motion.p>

            <motion.h1
              id="hero-title"
              variants={fadeUp}
              className="mt-6 font-body text-[clamp(4.2rem,10vw,9rem)] font-light uppercase leading-[.82] tracking-normal text-white"
            >
              WEAR<br />
              YOUR<br />
              VIBE
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-7 max-w-md text-sm font-medium leading-7 text-white/76 sm:text-base">
              Custom T-shirts, unique designs, and premium DTF printing made for your style.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={whatsappLink('Hi Driftwear Clo., I want to order a custom T-shirt.')}
                  className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-white transition hover:border-gold hover:bg-gold hover:text-obsidian shadow-[0_0_30px_rgba(216,180,95,0.2)]"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Order Now"
                >
                  <ArrowUpRight size={22} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <a
                href={whatsappLink('Hi Driftwear Clo., I want to order a custom T-shirt.')}
                target="_blank"
                rel="noreferrer"
                className="font-brand text-sm font-bold text-white transition hover:text-gold"
              >
                Order Now
              </a>
              <a
                href="#shop"
                className="font-brand inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
              >
                View Designs <ChevronRight size={17} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Figma Interactive Prototype Canvas Stage (Replaces Video) */}
          <motion.div variants={fadeUp} className="relative z-10 w-full">
            {/* Figma Selection Outer Frame */}
            <TiltCard className="relative overflow-hidden rounded-[2rem] border-2 border-[#1ABCFE] bg-[#0C0816]/90 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_40px_rgba(26,188,254,0.25)] backdrop-blur-2xl sm:p-7">
              {/* Figma Corner Resize Handles */}
              <div className="absolute -left-1 -top-1 h-3 w-3 border border-white bg-[#1ABCFE]" />
              <div className="absolute -right-1 -top-1 h-3 w-3 border border-white bg-[#1ABCFE]" />
              <div className="absolute -bottom-1 -left-1 h-3 w-3 border border-white bg-[#1ABCFE]" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 border border-white bg-[#1ABCFE]" />

              {/* Top Figma Header Tag Bar */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#1ABCFE] px-2 py-0.5 font-mono text-[10px] font-bold text-slate-950">
                    #Hero_Apparel_Canvas
                  </span>
                  <span className="font-mono text-xs text-white/50">580 × 640 • Smart Animate</span>
                </div>

                {/* Variant Switcher Pills */}
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
                  {apparelVariants.map((v, idx) => (
                    <button
                      key={v.name}
                      onClick={() => setActiveVariantIndex(idx)}
                      className={`relative rounded-full px-3 py-1 text-[11px] font-bold transition ${
                        activeVariantIndex === idx ? 'text-slate-950' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {activeVariantIndex === idx && (
                        <motion.div
                          layoutId="heroVariantPill"
                          transition={springQuick}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-ambergold to-gold shadow-md"
                        />
                      )}
                      <span className="relative z-10">Variant {idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Garment Mockup Showcase Card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#07050E] sm:aspect-[1.1/1]">
                <motion.div
                  key={currentVariant.name}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={springGentle}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentVariant.image}
                    alt={currentVariant.name}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Floating Badges */}
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/60 px-3 py-1 font-mono text-xs font-bold text-gold backdrop-blur-md">
                      <Sparkles size={13} />
                      {currentVariant.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-white/80 bg-black/50 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                      {currentVariant.tag}
                    </span>
                  </div>

                  {/* Simulated Figma Animated Cursor 1 */}
                  <motion.div
                    animate={{
                      x: [40, 180, 100, 40],
                      y: [30, 90, 160, 30]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="pointer-events-none absolute left-0 top-0 z-30"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#A259FF" stroke="#FFF" strokeWidth="1.2">
                      <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" />
                    </svg>
                    <div className="ml-3 -mt-1 rounded-full bg-[#A259FF] px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-md">
                      ✨ Figma Motion
                    </div>
                  </motion.div>

                  {/* Simulated Figma Animated Cursor 2 */}
                  <motion.div
                    animate={{
                      x: [240, 120, 200, 240],
                      y: [180, 240, 100, 180]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="pointer-events-none absolute left-0 top-0 z-30"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1ABCFE" stroke="#FFF" strokeWidth="1.2">
                      <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" />
                    </svg>
                    <div className="ml-3 -mt-1 rounded-full bg-[#1ABCFE] px-2 py-0.5 font-mono text-[9px] font-bold text-slate-950 shadow-md">
                      🎨 AI Studio
                    </div>
                  </motion.div>

                  {/* Bottom Product Info Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/20 bg-black/60 p-3.5 backdrop-blur-xl">
                    <div>
                      <h3 className="font-calista text-xl font-bold text-white">{currentVariant.name}</h3>
                      <p className="font-mono text-xs text-gold">High DPI DTF Print • Galle Studio</p>
                    </div>
                    <a
                      href={whatsappLink(`Hi Driftwear Clo., I want to order variant: ${currentVariant.name}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-primary text-xs px-4 py-2"
                    >
                      Order Tee
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Canvas Footer Specs */}
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-white/50">
                <span>layout: Flex Column (gap: 16px)</span>
                <span className="text-gold">spring(stiffness: 300, damping: 26)</span>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Bottom Pagination Stepper Bar */}
        <motion.div variants={fadeUp} className="relative z-30 grid gap-6 pb-2 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <div className="font-brand text-xs font-bold text-white">01</div>
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className={`h-[3px] rounded-full ${item < 2 ? 'bg-gold' : 'bg-white/24'}`} />
            ))}
          </div>
          <div className="font-brand flex items-center gap-5 text-xs font-bold text-white">
            <span>05</span>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold">
                <ChevronRight size={20} />
              </span>
              <span>Swipe Right</span>
            </div>
          </div>
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

function FeaturedProducts({ onPreview }: { onPreview: (img: string) => void }) {
  return (
    <section id="shop" className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Shop / Designs" title="Featured T-shirt designs." copy="Modern DTF-ready pieces with a premium streetwear presentation. Prices are confirmed per garment, print size, and quantity." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <motion.div key={product.name} variants={fadeUp}>
              <TiltCard className="group gold-border overflow-hidden rounded-[1.5rem]">
                <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
                  <Image src={product.image} alt={`${product.name} mockup`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <button
                    onClick={() => onPreview(product.image)}
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 transition duration-300 group-hover:opacity-100"
                    title="Zoom Preview"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
                <div className="p-5">
                  <p className="font-grande text-xs font-bold uppercase tracking-[.2em] text-gold">{product.category}</p>
                  <h3 className="font-calista mt-3 text-3xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-white/58">{product.price}</p>
                  <Magnetic>
                    <a href={whatsappLink(`Hi Driftwear Clo., I want to order: ${product.name}.`)} target="_blank" rel="noreferrer" className="cta-secondary mt-5 w-full">
                      Order on WhatsApp
                    </a>
                  </Magnetic>
                </div>
              </TiltCard>
            </motion.div>
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
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionTitle eyebrow="Custom DTF Printing" title="From design file to premium apparel." copy="A clean order flow for personal tees, fashion drops, teams, events, and branded clothing." />
          <Magnetic>
            <a href={whatsappLink('Hi Driftwear Clo., I want to start a DTF printing order.')} className="cta-primary" target="_blank" rel="noreferrer">Start DTF Order</a>
          </Magnetic>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
          {processSteps.map(([number, title, copy]) => (
            <motion.div key={number} variants={fadeUp}>
              <TiltCard className="gold-border rounded-[1.5rem] p-6 h-full">
                <span className="font-brand text-6xl text-gold">{number}</span>
                <h3 className="font-calista mt-4 text-3xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{copy}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section-pad">
      <motion.div
        variants={fadeInScale}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="shell overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_20%_20%,rgba(200,205,210,.2),transparent_28rem)] p-6 sm:p-10 lg:p-14"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Why choose Driftwear</p>
            <h2 className="display-title mt-4 text-[clamp(3rem,7vw,6.5rem)] text-white">Print studio energy. Fashion brand finish.</h2>
          </div>
          <div className="grid gap-4">
            {reasons.map((reason) => (
              <motion.div
                key={reason}
                whileHover={{ scale: 1.02, x: 6 }}
                transition={springQuick}
                className="flex gap-4 rounded-2xl border border-white/10 bg-black/35 p-5 transition hover:border-gold/40"
              >
                <Check className="mt-1 shrink-0 text-gold" />
                <p className="font-lucky m-0 text-white/72">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Gallery({ onPreview }: { onPreview: (img: string) => void }) {
  return (
    <section id="gallery" className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Gallery / Latest Work" title="Real product energy." copy="A visual feed inspired by the current Facebook brand presence, refined into a premium global streetwear look." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <motion.div
              key={image}
              variants={fadeUp}
              onClick={() => onPreview(image)}
              className="group relative mb-5 cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.04]"
            >
              <Image src={image} alt={`Driftwear gallery item ${index + 1}`} width={800} height={1000} className="w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  <Maximize2 size={14} /> Preview
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Testimonials" title="Built for people who want clothing with identity." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 md:grid-cols-3">
          {['Clean print quality and the design looked exactly like the mockup.', 'Fast WhatsApp communication and a premium feel for our team tees.', 'The midnight and silver brand style feels unique and bold.'].map((quote, index) => (
            <motion.div key={quote} variants={fadeUp}>
              <TiltCard className="gold-border rounded-[1.5rem] p-6 h-full">
                <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, star) => <Sparkles key={star} size={16} fill="currentColor" />)}</div>
                <p className="font-lucky mt-5 text-xl italic text-white/70">{quote}</p>
                <p className="font-brand mt-5 text-xs font-bold uppercase tracking-[.18em] text-white/45">Verified order {index + 1}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="FAQ" title="Before you order." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 lg:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <motion.article key={question} variants={fadeUp} className="gold-border rounded-[1.25rem] p-6">
              <h3 className="font-calista text-2xl font-semibold text-white">{question}</h3>
              <p className="mt-3 text-white/62">{answer}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad">
      <motion.div
        variants={fadeInScale}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="shell grid min-w-0 gap-8 overflow-hidden rounded-[2rem] border border-gold/20 bg-gold-radial p-4 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-14"
      >
        <div className="min-w-0">
          <p className="eyebrow">Contact / Order Now</p>
          <h2 className="display-title mt-4 text-[clamp(3.5rem,8vw,8rem)] text-white">Ready to wear your vibe?</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">Message Driftwear Clo. with your idea, artwork, T-shirt color, size, and quantity. We will confirm the print details before production.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a href={whatsappLink('Hi Driftwear Clo., I want to place an order.')} className="cta-primary" target="_blank" rel="noreferrer">Order on WhatsApp</a>
            </Magnetic>
            <a href="mailto:nipunsathsara203@gmail.com" className="cta-secondary">Email Us</a>
          </div>
        </div>
        <div className="grid min-w-0 content-center gap-4">
          <ContactLine icon={<Phone />} text={contact.phone} />
          <ContactLine icon={<Mail />} text={contact.email} />
          <ContactLine icon={<MapPin />} text={contact.location} />
          <ContactLine icon={<Facebook />} text={contact.facebook} />
        </div>
      </motion.div>
    </section>
  );
}

function ContactLine({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, x: 4 }}
      transition={springQuick}
      className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/35 p-4 text-white/78 sm:gap-4 sm:p-5"
    >
      <span className="text-gold [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      <span className="font-lucky min-w-0 break-words font-semibold">{text}</span>
    </motion.div>
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
                <Magnetic>
                  <a href={whatsappLink('Hi Driftwear Clo., I want to send a design and start an order.')} target="_blank" rel="noreferrer" className="cta-primary mt-6">
                    <Send size={16} /> Send a message
                  </a>
                </Magnetic>
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
