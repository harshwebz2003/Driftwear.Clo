'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
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
  Truck,
  ShieldCheck,
  Zap,
  Ruler,
  Layers,
  Award,
  Navigation,
  ExternalLink
} from 'lucide-react';
import Navbar from '@/components/navbar';
import { SafeErrorBoundary } from '@/components/error-boundary';
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
  AnimatedColorBackground,
  AnimatedTextReveal,
  AnimatedHeroTitle,
  ShimmeringTextGradient,
  springQuick,
  springGentle,
  springBouncy
} from '@/components/motion';
import { contact, faqs, gallery, navItems, processSteps, products, reasons, whatsappLink } from '@/lib/site-data';

const Preloader = dynamic(() => import('@/components/preloader'), { ssr: false });

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
    <div className="animated-color-bg min-h-screen text-white">
      <SafeErrorBoundary>
        <Preloader />
      </SafeErrorBoundary>

      {/* Dynamic Animated Ambient Color Background Orbs */}
      <SafeErrorBoundary>
        <AnimatedColorBackground />
      </SafeErrorBoundary>

      <Navbar />

      <main id="home" className="relative z-10 overflow-x-hidden">
        <Hero />
        <HorizontalMarquee items={tickerItems1} speed={24} direction="left" />
        <SafeErrorBoundary>
          <TshirtCustomizer />
        </SafeErrorBoundary>
        <FeaturedProducts onPreview={(img) => setSelectedImage(img)} />
        <PrintSpecsAndDelivery />
        <HorizontalMarquee items={tickerItems2} speed={28} direction="right" />
        <Process />
        <GarmentSizeGuide />
        <WhyChoose />
        <Gallery onPreview={(img) => setSelectedImage(img)} />
        <Testimonials />
        <FAQ />
        <Contact />
        <LocationMap />
      </main>

      <Footer />

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
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/40 bg-carbon p-2 shadow-2xl sm:rounded-3xl"
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
              <span className="font-brand text-xs font-bold uppercase tracking-wider gold-gradient-text">
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
    </div>
  );
}

/* ==========================================================================
   HERO SECTION - Video Background, Animated Title, Direct Action Order Button
   ========================================================================== */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-14 lg:pt-36 flex items-center justify-center" aria-labelledby="hero-title">
      {/* Background Showcase Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/assets/driftwear-showcase.mp4"
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover opacity-35 filter brightness-85 contrast-110"
        />
        {/* Dark Vignette & Gold Ambient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(6,4,10,0.85)_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06040A] via-transparent to-[#06040A]/80" />
      </div>

      {/* Golden & Purple Ambient Lighting Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,194,66,0.28),transparent_38rem),radial-gradient(circle_at_20%_80%,rgba(168,74,196,0.2),transparent_30rem)] pointer-events-none z-0" />

      {/* Pulsating Gold Light Glow */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-radial-gold blur-[140px] z-0"
      />

      <motion.div className="shell relative z-10 flex flex-col items-center text-center justify-center min-h-[calc(100vh-10rem)]" variants={stagger} initial="hidden" animate="show">
        {/* Centered Layered Gold-Bordered Frosted Glass Card */}
        <motion.div variants={fadeUp} className="relative z-20 w-full max-w-2xl">
          {/* Layer 1: Background Offset Glass Frame */}
          <div className="absolute -inset-3 rounded-[3rem] border border-gold/25 bg-gold/5 backdrop-blur-md translate-y-3 hidden sm:block pointer-events-none" />

          {/* Layer 2: Main Layered Frosted Glass Card */}
          <div className="relative rounded-[2.2rem] sm:rounded-[3rem] gold-gradient-border p-6 sm:p-12 lg:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_70px_rgba(245,194,66,0.25)] backdrop-blur-2xl flex flex-col items-center">
            {/* ANIMATED HERO TITLE: WEAR YOUR VIBE. */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <AnimatedHeroTitle />
            </motion.div>

            {/* ENLARGED LOGO & DRIFTWEAR CLO. BRAND BADGE DIVIDER */}
            <motion.div variants={fadeUp} className="my-7 flex items-center justify-center gap-3 w-full">
              <span className="h-[1px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent to-gold/70" />
              <div className="flex items-center gap-3 rounded-full border border-gold/50 bg-black/70 px-5 py-2.5 shadow-[0_0_30px_rgba(245,194,66,0.4)] backdrop-blur-md">
                <Image
                  src="/assets/logo.png"
                  alt="Driftwear Clo. Logo"
                  width={52}
                  height={52}
                  className="h-11 w-11 sm:h-13 sm:w-13 rounded-full object-cover border border-gold/70 shadow-md"
                />
                <span className="font-brand text-sm sm:text-lg font-extrabold uppercase tracking-[.26em] gold-gradient-text">
                  Driftwear <span className="text-white">Clo.</span>
                </span>
              </div>
              <span className="h-[1px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent to-gold/70" />
            </motion.div>

            {/* Subtitle with Character Entrance Animation */}
            <motion.div variants={fadeUp} className="max-w-md">
              <AnimatedTextReveal text="Custom T-shirts & Premium DTF Printing" className="font-brand text-base sm:text-lg font-medium leading-7 text-white/88" />
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-9">
              <AnimatedWhatsAppButton
                text="Order Now"
                message="Hi Driftwear Clo., I want to order a custom T-shirt."
                size="lg"
              />
              <a
                href="#shop"
                className="font-brand inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-7 py-3.5 text-xs font-bold uppercase tracking-[.18em] text-white transition duration-300 hover:border-gold hover:bg-gold/20 hover:text-gold sm:text-sm shadow-[0_0_20px_rgba(245,194,66,0.25)]"
              >
                View Designs <ArrowRight size={17} />
              </a>
            </motion.div>
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
      <h2 className="display-title mt-3 text-[clamp(2.6rem,6.5vw,7rem)] text-white">
        <AnimatedTextReveal text={title} />
      </h2>
      {copy ? <p className="mt-4 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">{copy}</p> : null}
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
              <TiltCard className="group gold-gradient-border overflow-hidden rounded-[1.5rem] h-full flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
                    <Image src={product.image} alt={`${product.name} mockup`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    <button
                      onClick={() => onPreview(product.image)}
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-black/60 text-white opacity-0 transition duration-300 group-hover:opacity-100"
                      title="Zoom Preview"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  <div className="p-5">
                    <p className="font-grande text-xs font-bold uppercase tracking-[.2em] gold-gradient-text">{product.category}</p>
                    <h3 className="font-calista mt-2 text-2xl font-semibold text-white sm:text-3xl">{product.name}</h3>
                    <p className="mt-1.5 text-xs text-white/60 sm:text-sm">{product.price}</p>
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

/* NEW SECTION: Print Specs, Fabric Quality & Delivery Details */
function PrintSpecsAndDelivery() {
  const specs = [
    {
      icon: <Layers className="text-gold" size={24} />,
      title: 'High DPI DTF Transfers',
      description: 'Ultra-vibrant 1440 DPI Direct-to-Film transfer technology for crisp graphic edges and micro-details.'
    },
    {
      icon: <ShieldCheck className="text-gold" size={24} />,
      title: '50+ Wash Durability',
      description: 'Strengthened polymer ink layer that will not crack, peel, or fade even after 50+ machine washes.'
    },
    {
      icon: <Award className="text-gold" size={24} />,
      title: '240 GSM Heavy Cotton',
      description: '100% Premium combed cotton fabric. Pre-shrunk, soft hand-feel with dense weave construction.'
    },
    {
      icon: <Truck className="text-gold" size={24} />,
      title: 'Islandwide Express Dispatch',
      description: 'Fast 24-hour dispatch in Galle, 48-hour Colombo delivery, and secure islandwide Sri Lanka shipping.'
    }
  ];

  return (
    <section className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Quality Guarantee" title="Unmatched print standards." copy="Built with top-tier industrial DTF printing equipment and premium luxury garments for lasting streetwear quality." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <TiltCard className="gold-gradient-border rounded-[1.5rem] p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-gold/15 shadow-[0_0_15px_rgba(245,194,66,0.25)]">
                    {item.icon}
                  </div>
                  <h3 className="font-calista mt-4 text-xl font-bold text-white sm:text-2xl">{item.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-6 text-white/65">{item.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* NEW SECTION: Interactive Garment Size & Fitting Guide Table */
function GarmentSizeGuide() {
  const sizes = [
    { size: 'S', chest: '38 inches', length: '27 inches', sleeve: '8 inches' },
    { size: 'M', chest: '40 inches', length: '28 inches', sleeve: '8.5 inches' },
    { size: 'L', chest: '42 inches', length: '29 inches', sleeve: '9 inches' },
    { size: 'XL', chest: '44 inches', length: '30 inches', sleeve: '9.5 inches' },
    { size: 'XXL', chest: '46 inches', length: '31 inches', sleeve: '10 inches' }
  ];

  return (
    <section className="section-pad">
      <div className="shell">
        <SectionTitle eyebrow="Sizing & Fit Guide" title="Find your perfect fit." copy="Streetwear oversized cut or classic regular fit. Measure your favorite tee to select the ideal size." />
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="overflow-hidden rounded-[2rem] gold-gradient-border bg-black/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-brand text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 text-gold uppercase tracking-[.18em]">
                  <th className="py-3.5 px-4 font-bold">Size</th>
                  <th className="py-3.5 px-4 font-bold">Chest (Inches)</th>
                  <th className="py-3.5 px-4 font-bold">Length (Inches)</th>
                  <th className="py-3.5 px-4 font-bold">Sleeve (Inches)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/80">
                {sizes.map((row) => (
                  <tr key={row.size} className="transition hover:bg-white/[0.04]">
                    <td className="py-4 px-4 font-bold gold-gradient-text">{row.size}</td>
                    <td className="py-4 px-4">{row.chest}</td>
                    <td className="py-4 px-4">{row.length}</td>
                    <td className="py-4 px-4">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <TiltCard className="gold-gradient-border rounded-[1.5rem] p-5 sm:p-6 h-full">
                <span className="font-brand text-5xl sm:text-6xl gold-gradient-text">{number}</span>
                <h3 className="font-calista mt-3 sm:mt-4 text-2xl sm:text-3xl font-semibold text-white">{title}</h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-white/65">{copy}</p>
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
        className="shell overflow-hidden rounded-[2rem] gold-gradient-border bg-[radial-gradient(circle_at_20%_20%,rgba(245,194,66,0.18),transparent_28rem)] p-5 sm:p-10 lg:p-14"
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
                className="flex gap-3.5 rounded-2xl border border-gold/30 bg-black/40 p-4 sm:p-5 transition hover:border-gold/60"
              >
                <Check className="mt-0.5 shrink-0 text-gold" size={18} />
                <p className="font-lucky m-0 text-xs sm:text-sm text-white/80">{reason}</p>
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
              className="group relative mb-4 sm:mb-5 cursor-pointer overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] gold-gradient-border bg-white/[.04]"
            >
              <Image src={image} alt={`Driftwear gallery item ${index + 1}`} width={800} height={1000} className="w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
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
              <TiltCard className="gold-gradient-border rounded-[1.5rem] p-5 sm:p-6 h-full">
                <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, star) => <Sparkles key={star} size={15} fill="currentColor" />)}</div>
                <p className="font-lucky mt-4 text-lg sm:text-xl italic text-white/80">{quote}</p>
                <p className="font-brand mt-4 text-[10px] sm:text-xs font-bold uppercase tracking-[.18em] gold-gradient-text">Verified order {index + 1}</p>
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
            <motion.article key={question} variants={fadeUp} className="gold-gradient-border rounded-[1.25rem] p-5 sm:p-6">
              <h3 className="font-calista text-xl sm:text-2xl font-semibold text-white">{question}</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/65">{answer}</p>
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
        className="shell grid min-w-0 gap-8 overflow-hidden rounded-[2rem] border border-gold/40 bg-gold-radial p-5 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-14 shadow-[0_20px_80px_rgba(245,194,66,0.18)]"
      >
        <div className="min-w-0">
          <p className="eyebrow">Contact / Order Now</p>
          <h2 className="display-title mt-4 text-[clamp(2.8rem,7vw,8rem)] text-white">Ready to wear your vibe?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Message Driftwear Clo. with your idea, artwork, T-shirt color, size, and quantity. We will confirm the print details before production.</p>
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
      className="flex min-w-0 items-center gap-3 rounded-2xl border border-gold/30 bg-black/40 p-4 text-white/85 sm:gap-4 sm:p-5"
    >
      <span className="text-gold [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      <span className="font-lucky min-w-0 break-words text-xs sm:text-sm font-semibold">{text}</span>
    </motion.div>
  );
}

/* NEW SECTION: Interactive Dark Mode Location Map (Galle, Sri Lanka) */
function LocationMap() {
  return (
    <section className="section-pad pt-0">
      <div className="shell">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[2.8rem] gold-gradient-border bg-[#0B0813]/90 shadow-2xl backdrop-blur-2xl"
        >
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10">
            <div>
              <p className="eyebrow">Studio Location</p>
              <h3 className="font-calista text-2xl sm:text-3xl font-bold text-white mt-1">Visit Driftwear Clo. in Galle</h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">Galle 80000, Southern Province, Sri Lanka</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://maps.google.com/?q=Galle+Sri+Lanka"
                target="_blank"
                rel="noreferrer"
                className="cta-secondary text-xs inline-flex items-center gap-2"
              >
                <Navigation size={15} /> Open in Google Maps <ExternalLink size={13} />
              </a>
              <AnimatedWhatsAppButton
                text="Ask Location"
                message="Hi Driftwear Clo., please share your exact studio location & pickup details in Galle."
                size="sm"
              />
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full min-h-[320px] sm:min-h-[420px] bg-black">
            <iframe
              title="Driftwear Clo. Galle Studio Location Map"
              src="https://maps.google.com/maps?q=Galle%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(125%) opacity(0.85)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Floating Glass Badge Overlay */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 flex items-center gap-3 rounded-2xl border border-gold/40 bg-black/80 p-3.5 sm:p-4 backdrop-blur-xl shadow-2xl max-w-xs sm:max-w-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/50 bg-gold/20 text-gold shadow-[0_0_15px_rgba(245,194,66,0.3)]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-brand text-xs font-bold uppercase tracking-wider text-white">DTF Studio Dispatch</p>
                <p className="text-[11px] text-white/70">Fast 24h Delivery in Galle & 48h Islandwide Sri Lanka</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
          className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-[#07111F] shadow-[0_32px_100px_rgba(0,0,0,.55)]"
        >
          <Image
            src="/assets/tshirt_printing_press.jpg"
            alt="Driftwear DTF printing studio footer visual"
            fill
            sizes="100vw"
            className="object-cover opacity-[.42]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(245,194,66,.3),transparent_24rem),linear-gradient(180deg,rgba(7,17,31,.18),rgba(7,17,31,.74)_48%,rgba(7,17,31,.96))]" />
          <div className="absolute inset-x-0 bottom-0 z-0 translate-y-[19%] overflow-hidden whitespace-nowrap text-center font-display text-[clamp(4.5rem,18vw,18rem)] uppercase leading-none text-white/[.09]">
            Driftwear
          </div>

          <div className="relative z-10 flex min-h-[480px] flex-col justify-between p-5 sm:min-h-[560px] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <a href="#home" className="inline-flex items-center gap-3 self-start" aria-label="Driftwear Clo. home">
                <Image src="/assets/logo.png" alt="" width={54} height={54} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gold/50 object-cover shadow-md" />
                <span className="font-brand text-xl sm:text-2xl uppercase leading-none text-white">Driftwear Clo.</span>
              </a>
              <p className="font-grande max-w-xs text-left text-[11px] font-bold uppercase leading-5 tracking-[.22em] gold-gradient-text sm:text-right sm:text-xs">
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
