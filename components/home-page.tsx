'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
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
  Maximize2
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
  AnimatedWhatsAppButton,
  HorizontalMarquee,
  springQuick,
  springGentle,
  springBouncy
} from '@/components/motion';
import { contact, faqs, gallery, navItems, processSteps, products, reasons, whatsappLink } from '@/lib/site-data';

const TshirtCustomizer = dynamic(() => import('@/components/tshirt-customizer'), {
  ssr: false,
  loading: () => (
    <section className="section-pad grid place-items-center text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="font-brand text-xs font-bold uppercase tracking-[.2em] text-gold">Loading 3D T-Shirt Studio...</p>
      </div>
    </section>
  )
});

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const tickerItems1 = [
    'WEAR FAST',
    'PRINT PREMIUM',
    'GALLE SRI LANKA',
    'DTF PRINTING STUDIO',
    'SINGLE PIECE & BULK ORDERS',
    'HIGH DEFINITION TRANSFERS',
    'CUSTOM APPAREL'
  ];

  const tickerItems2 = [
    'CUSTOM APPAREL',
    'STREETWEAR GRAPHICS',
    'COUPLE TEES',
    'TEAM UNIFORMS',
    'INSTANT WHATSAPP DISPATCH',
    'VIBRANT COLORS'
  ];

  return (
    <>
      <Navbar />
      <main id="home" className="overflow-x-hidden">
        <Hero />
        <HorizontalMarquee items={tickerItems1} speed={24} direction="left" />
        <TshirtCustomizer />
        <FeaturedProducts onPreview={(img) => setSelectedImage(img)} />
        <HorizontalMarquee items={tickerItems2} speed={28} direction="right" />
        <Process />
        <WhyChoose />
        <Gallery onPreview={(img) => setSelectedImage(img)} />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      {/* WhatsApp Sticky Floating Button */}
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 select-none">
        <AnimatedWhatsAppButton
          text="Order"
          message="Hi Driftwear Clo., I want to order a custom T-shirt."
          size="lg"
        />
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-xl"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springQuick}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-carbon p-2 shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/60 p-2 text-white transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:aspect-square sm:rounded-2xl">
              <Image src={selectedImage} alt="Driftwear visual preview" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <span className="font-brand text-xs font-bold uppercase tracking-wider text-gold">
                Driftwear Clo. Visual Spec
              </span>
              <AnimatedWhatsAppButton
                text="Order This Design"
                message="Hi Driftwear Clo., I saw this design in your showcase gallery and want to order."
                size="sm"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

/* ==========================================================================
   HERO SECTION - Clean Luxury Apparel Showcase (Figma Blueprint Overlays Removed)
   ========================================================================== */
function Hero() {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const apparelVariants = [
    {
      name: 'All Eyes On Me Black Tee',
      tag: 'Oversized Streetwear',
      image: '/assets/tshirt_black_oversized.jpg',
      badge: '🔥 Best Seller'
    },
    {
      name: 'Studio White Custom Tee',
      tag: 'Minimal DTF Print',
      image: '/assets/tshirt_white_regular.jpg',
      badge: '✨ Studio Pick'
    },
    {
      name: 'Urban Streetwear Look',
      tag: 'Custom DTF Graphic',
      image: '/assets/Gallery/streetwear_look_01.jpg',
      badge: '💎 Premium Release'
    }
  ];

  const currentVariant = apparelVariants[activeVariantIndex];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#130A18] px-4 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:px-14 lg:pt-24" aria-labelledby="hero-title">
      {/* Background Lighting Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_52%,rgba(168,74,196,.52),transparent_24rem),radial-gradient(circle_at_22%_24%,rgba(200,205,210,.12),transparent_18rem),linear-gradient(105deg,#130A18_0%,#0D0711_48%,#190B20_100%)]" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#A44CC6]/55 blur-3xl sm:right-[2rem] sm:h-[48rem] sm:w-[48rem]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,7,17,.96)_0%,rgba(13,7,17,.78)_36%,rgba(13,7,17,.2)_100%)] lg:bg-[linear-gradient(90deg,rgba(13,7,17,.96)_0%,rgba(13,7,17,.82)_39%,rgba(13,7,17,.12)_100%)]" />

      <motion.div className="shell relative z-10 grid min-h-[calc(100vh-7rem)] content-between gap-8" variants={stagger} initial="hidden" animate="show">
        <div className="grid flex-1 items-center gap-8 pt-4 lg:grid-cols-[.85fr_1.15fr] lg:gap-12 lg:pt-0">
          {/* Left Column Text Content */}
          <div className="relative z-20 max-w-xl">
            <motion.p variants={fadeUp} className="font-brand text-xs font-bold uppercase tracking-[.22em] text-gold">
              OUR VISION
            </motion.p>

            <motion.h1
              id="hero-title"
              variants={fadeUp}
              className="mt-4 font-body text-[clamp(3.5rem,9.5vw,9rem)] font-light uppercase leading-[.82] tracking-normal text-white sm:mt-6"
            >
              WEAR<br />
              YOUR<br />
              VIBE
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-md text-sm font-medium leading-7 text-white/76 sm:mt-7 sm:text-base">
              Custom T-shirts, unique designs, and premium DTF printing made for your style.
            </motion.p>

            {/* Action CTAs */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
              <AnimatedWhatsAppButton
                text="Order Now"
                message="Hi Driftwear Clo., I want to order a custom T-shirt."
                size="md"
              />
              <a
                href="#shop"
                className="font-brand inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 transition hover:text-white sm:text-sm"
              >
                View Designs <ChevronRight size={17} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Clean Premium Garment Showcase (No Figma Blue Borders or Pointer Badges) */}
          <motion.div variants={fadeRight} className="relative z-10 w-full">
            <TiltCard className="relative overflow-hidden rounded-2xl border border-gold/25 bg-white/[0.04] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_40px_rgba(216,180,95,0.15)] backdrop-blur-2xl sm:rounded-[2.2rem] sm:p-6">
              {/* Top Variant Selector Pills */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-brand text-xs font-bold uppercase tracking-[.18em] text-gold">
                  Driftwear Apparel Drop
                </span>

                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
                  {apparelVariants.map((v, idx) => (
                    <button
                      key={v.name}
                      onClick={() => setActiveVariantIndex(idx)}
                      className={`relative rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition ${
                        activeVariantIndex === idx ? 'text-slate-950' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {activeVariantIndex === idx && (
                        <motion.div
                          layoutId="heroCleanVariantPill"
                          transition={springQuick}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-gold via-ambergold to-gold shadow-md"
                        />
                      )}
                      <span className="relative z-10">{v.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Garment Mockup Showcase Card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-carbon sm:aspect-[1.15/1] sm:rounded-2xl">
                <motion.div
                  key={currentVariant.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={springGentle}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentVariant.image}
                    alt={currentVariant.name}
                    fill
                    priority
                    className="object-cover object-center transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                  {/* Floating Badge */}
                  <div className="absolute left-3 top-3 flex flex-col gap-1.5 sm:left-4 sm:top-4">
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-black/60 px-3 py-1 font-brand text-xs font-bold text-gold backdrop-blur-md">
                      <Sparkles size={13} />
                      {currentVariant.badge}
                    </span>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2 rounded-xl border border-white/15 bg-black/70 p-3.5 backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                    <div>
                      <h3 className="font-calista text-lg font-semibold text-white sm:text-2xl">{currentVariant.name}</h3>
                      <p className="font-brand text-xs font-bold uppercase tracking-wider text-gold/80">{currentVariant.tag}</p>
                    </div>
                    <AnimatedWhatsAppButton
                      text="Order Tee"
                      message={`Hi Driftwear Clo., I want to order: ${currentVariant.name}`}
                      size="sm"
                    />
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Stepper Bar */}
        <motion.div variants={fadeUp} className="relative z-30 grid gap-4 pb-2 sm:grid-cols-[auto_1fr_auto] sm:items-center">
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
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mb-8 max-w-4xl sm:mb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title mt-3 text-[clamp(2.6rem,6.5vw,7rem)] text-white">{title}</h2>
      {copy ? <p className="mt-4 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">{copy}</p> : null}
    </motion.div>
  );
}

function FeaturedProducts({ onPreview }: { onPreview: (img: string) => void }) {
  return (
    <section id="shop" className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Shop / Designs" title="Featured T-shirt designs." copy="Modern DTF-ready pieces with a premium streetwear presentation. Prices are confirmed per garment, print size, and quantity." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <motion.div key={product.name} variants={fadeUp}>
              <TiltCard className="group gold-border overflow-hidden rounded-[1.5rem] h-full flex flex-col justify-between">
                <div>
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
                    <h3 className="font-calista mt-2 text-2xl font-semibold text-white sm:text-3xl">{product.name}</h3>
                    <p className="mt-1.5 text-xs text-white/58 sm:text-sm">{product.price}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2">
                  <AnimatedWhatsAppButton
                    text="Order on WhatsApp"
                    message={`Hi Driftwear Clo., I want to order: ${product.name}.`}
                    size="sm"
                    className="w-full"
                  />
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
        <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionTitle eyebrow="Custom DTF Printing" title="From design file to premium apparel." copy="A clean order flow for personal tees, fashion drops, teams, events, and branded clothing." />
          <AnimatedWhatsAppButton
            text="Start DTF Order"
            message="Hi Driftwear Clo., I want to start a DTF printing order."
            size="md"
          />
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
          {processSteps.map(([number, title, copy]) => (
            <motion.div key={number} variants={fadeRight}>
              <TiltCard className="gold-border rounded-[1.5rem] p-5 sm:p-6 h-full">
                <span className="font-brand text-5xl sm:text-6xl text-gold">{number}</span>
                <h3 className="font-calista mt-3 sm:mt-4 text-2xl sm:text-3xl font-semibold text-white">{title}</h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-white/60">{copy}</p>
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
        className="shell overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_20%_20%,rgba(200,205,210,.2),transparent_28rem)] p-5 sm:p-10 lg:p-14"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Why choose Driftwear</p>
            <h2 className="display-title mt-4 text-[clamp(2.5rem,6vw,6.5rem)] text-white">Print studio energy. Fashion brand finish.</h2>
          </div>
          <div className="grid gap-3.5">
            {reasons.map((reason) => (
              <motion.div
                key={reason}
                whileHover={{ scale: 1.02, x: 6 }}
                transition={springQuick}
                className="flex gap-3.5 rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-5 transition hover:border-gold/40"
              >
                <Check className="mt-0.5 shrink-0 text-gold" size={18} />
                <p className="font-lucky m-0 text-xs sm:text-sm text-white/72">{reason}</p>
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
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <motion.div
              key={image}
              variants={fadeUp}
              onClick={() => onPreview(image)}
              className="group relative mb-4 sm:mb-5 cursor-pointer overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-white/10 bg-white/[.04]"
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
              <TiltCard className="gold-border rounded-[1.5rem] p-5 sm:p-6 h-full">
                <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, star) => <Sparkles key={star} size={15} fill="currentColor" />)}</div>
                <p className="font-lucky mt-4 text-lg sm:text-xl italic text-white/70">{quote}</p>
                <p className="font-brand mt-4 text-[10px] sm:text-xs font-bold uppercase tracking-[.18em] text-white/45">Verified order {index + 1}</p>
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
            <motion.article key={question} variants={fadeUp} className="gold-border rounded-[1.25rem] p-5 sm:p-6">
              <h3 className="font-calista text-xl sm:text-2xl font-semibold text-white">{question}</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/62">{answer}</p>
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
        className="shell grid min-w-0 gap-8 overflow-hidden rounded-[2rem] border border-gold/20 bg-gold-radial p-5 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-14"
      >
        <div className="min-w-0">
          <p className="eyebrow">Contact / Order Now</p>
          <h2 className="display-title mt-4 text-[clamp(2.8rem,7vw,8rem)] text-white">Ready to wear your vibe?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">Message Driftwear Clo. with your idea, artwork, T-shirt color, size, and quantity. We will confirm the print details before production.</p>
          <div className="mt-6 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <AnimatedWhatsAppButton
              text="Order on WhatsApp"
              message="Hi Driftwear Clo., I want to place a custom T-shirt order."
              size="md"
            />
            <a href="mailto:nipunsathsara203@gmail.com" className="cta-secondary text-center">Email Us</a>
          </div>
        </div>
        <div className="grid min-w-0 content-center gap-3.5">
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
      <span className="font-lucky min-w-0 break-words text-xs sm:text-sm font-semibold">{text}</span>
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
    <footer className="px-4 pb-8 pt-10 sm:px-8 lg:px-14 xl:px-20">
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
          <div className="absolute inset-x-0 bottom-0 z-0 translate-y-[19%] overflow-hidden whitespace-nowrap text-center font-display text-[clamp(4.5rem,18vw,18rem)] uppercase leading-none text-white/[.09]">
            Driftwear
          </div>

          <div className="relative z-10 flex min-h-[480px] flex-col justify-between p-5 sm:min-h-[560px] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <a href="#home" className="inline-flex items-center gap-3 self-start" aria-label="Driftwear Clo. home">
                <Image src="/assets/logo.png" alt="" width={54} height={54} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gold/30 object-cover" />
                <span className="font-brand text-xl sm:text-2xl uppercase leading-none text-white">Driftwear Clo.</span>
              </a>
              <p className="font-grande max-w-xs text-left text-[11px] font-bold uppercase leading-5 tracking-[.22em] text-gold sm:text-right sm:text-xs">
                Wear fast. Print premium.
              </p>
            </div>

            <div className="grid gap-8 border-y border-white/15 py-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1fr_1fr_1fr_1.15fr]">
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
                <div className="mt-3 space-y-2 text-xs sm:text-sm leading-6 text-white/60">
                  <p>{contact.location}</p>
                  <p>{contact.phone}</p>
                  <p className="break-words">{contact.email}</p>
                </div>
                <div className="mt-5">
                  <AnimatedWhatsAppButton
                    text="Send Message"
                    message="Hi Driftwear Clo., I want to send a design and start an order."
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="font-grande flex flex-col gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Driftwear Clo. All rights reserved.</p>
              <p>Custom T-shirts & DTF printing in Galle, Sri Lanka.</p>
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
      <div className="mt-3 grid gap-2 text-xs sm:text-sm text-white/60">
        {children}
      </div>
    </div>
  );
}
