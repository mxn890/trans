import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Phone, Menu, X, Plane, Briefcase, Heart, PartyPopper, Bus, Map,
  Search, DollarSign, CheckCircle2, Car, Wifi, Snowflake, Droplet,
  Clock, Shield, UserCheck, Smartphone, Star, MapPin, Calendar,
  ChevronDown, ArrowUp, MessageCircle, Instagram, Facebook, Twitter, Youtube,
  ChevronLeft, ChevronRight, Quote
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Obsidian Rides — Chicago's Premier Luxury Chauffeur Service" },
      { name: "description", content: "Chicago's #1 luxury chauffeur and limo service. Airport transfers, corporate travel, weddings & events. 24/7 availability. Book in 2 minutes." },
      { property: "og:title", content: "Obsidian Rides — Chicago Luxury Chauffeur" },
      { property: "og:description", content: "Professional chauffeurs. Immaculate vehicles. On-time guarantee — every ride, every time." },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium">
      ◆ {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="mt-4">
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">{children}</h2>
      <div className="mt-4 h-[2px] w-[60px] bg-[#C9A84C]" />
    </motion.div>
  );
}

// ───────── NAV ─────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Services", "Fleet", "Pricing", "About", "Areas", "Contact"];
  return (
    <header className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl md:text-2xl text-white tracking-wide flex items-center gap-2">
          <span className="text-[#C9A84C]">◆</span> OBSIDIAN RIDES
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/80 hover:text-[#C9A84C] transition-colors">{l}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:3125550199" className="flex items-center gap-2 text-sm text-white/90 hover:text-[#C9A84C]">
            <Phone size={16} className="text-[#C9A84C]" /> (312) 555-0199
          </a>
          <a href="#quote" className="btn-gold !py-2 !px-5 text-sm">Book Now</a>
        </div>
        <button className="lg:hidden text-white" onClick={() => setOpen(true)}><Menu /></button>
      </div>
      {open && (
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed inset-0 z-[60] flex flex-col p-8 mobile-menu-bg">
          <div className="flex justify-between items-center">
            <span className="font-display text-xl text-white"><span className="text-[#C9A84C]">◆</span> OBSIDIAN</span>
            <button onClick={() => setOpen(false)} className="mobile-menu-close" aria-label="Close menu"><X /></button>
          </div>
          <nav className="flex flex-col gap-6 mt-16">
            {links.map((l, i) => (
                <motion.a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                  className="font-display text-3xl text-white hover:text-[#C9A84C] transition-colors">{l}</motion.a>
            ))}
            <a href="tel:3125550199" className="mt-8 text-white/70 flex items-center gap-2"><Phone size={18} /> (312) 555-0199</a>
            <a href="#quote" onClick={() => setOpen(false)} className="btn-gold mt-4 justify-center">Book Now</a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

// ───────── ANNOUNCEMENT ─────────
function Announcement() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[55] h-9 bg-[#C9A84C] text-black text-[13px] font-medium flex items-center overflow-hidden">
      <div className="hidden md:flex w-full justify-center">
        ✦ Chicago's #1 Luxury Chauffeur Service — Available 24/7 · Call Now: (312) 555-0199 ✦
      </div>
      <div className="md:hidden flex marquee whitespace-nowrap">
        <span className="px-8">✦ Chicago's #1 Luxury Chauffeur Service — Available 24/7 · Call Now: (312) 555-0199 ✦</span>
        <span className="px-8">✦ Chicago's #1 Luxury Chauffeur Service — Available 24/7 · Call Now: (312) 555-0199 ✦</span>
      </div>
    </div>
  );
}

// ───────── HERO ─────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20">
      <div className="absolute inset-0">
        <picture>
          {/* Use the provided hero image placed in `public/assets/hero-limo.jpg` */}
          <source media="(min-width:1024px)" srcSet="/assets/hero-limo.jpg" />
          <source media="(min-width:640px)" srcSet="/assets/hero-limo.jpg" />
          <img src="/assets/hero-limo.jpg" alt="Luxury limousine — premium black exterior and polished finish" className="w-full h-full object-cover" loading="eager" />
        </picture>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.54) 100%)" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="max-w-3xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-xs tracking-[0.25em] uppercase">
            ✦ Chicago's Premier Black Car Service
          </motion.div>
          <motion.h1 variants={fadeUp} className="hero-title text-white mt-6">
            Experience Chicago<br/>in <span className="text-[#C9A84C] italic">Pure Luxury</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/70 mt-6 max-w-xl">
            Professional chauffeurs. Immaculate vehicles. On-time guarantee — every ride, every time.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
            <a href="#quote" className="btn-gold large">Book Your Ride →</a>
            <a href="#fleet" className="btn-outline-gold">View Our Fleet</a>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-sm text-white/70">
            <span className="flex items-center gap-2"><Star className="text-[#C9A84C]" size={16} /> 500+ 5-Star Reviews</span>
            <span className="flex items-center gap-2"><Plane className="text-[#C9A84C]" size={16} /> Flight Tracking</span>
            <span className="flex items-center gap-2"><DollarSign className="text-[#C9A84C]" size={16} /> Fixed Upfront Pricing</span>
            <span className="flex items-center gap-2"><Clock className="text-[#C9A84C]" size={16} /> 24/7 Availability</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ───────── QUOTE FORM ─────────
function QuoteForm() {
  return (
    <Section id="quote" className="relative -mt-24 z-10 px-6 max-w-7xl mx-auto">
      <motion.div variants={fadeUp} className="luxe-card p-6 md:p-8">
        <h3 className="font-display text-2xl md:text-3xl text-white mb-6">Get an Instant Quote</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <Field icon={<MapPin size={16} />} placeholder="Enter pickup address" />
          <Field icon={<MapPin size={16} />} placeholder="Enter destination" />
          <Field icon={<Calendar size={16} />} type="datetime-local" />
          <div className="relative">
            <Car size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]" />
            <select className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-3 text-white text-sm focus:border-[#C9A84C] focus:outline-none appearance-none">
              <option>Business Sedan (1-3)</option>
              <option>Executive SUV (1-7)</option>
              <option>Luxury Sprinter (up to 14)</option>
              <option>Stretch Limo (8-16)</option>
              <option>Party Bus (up to 40)</option>
            </select>
          </div>
          <button className="btn-gold justify-center w-full">Get My Quote →</button>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-xs text-white/50">
          <span>✓ No hidden fees</span><span>✓ Free cancellation</span><span>✓ Instant confirmation</span>
        </div>
      </motion.div>
    </Section>
  );
}
function Field({ icon, placeholder, type = "text" }: { icon: React.ReactNode; placeholder?: string; type?: string }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]">{icon}</span>
      <input type={type} placeholder={placeholder}
        className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-3 text-white text-sm placeholder:text-white/40 focus:border-[#C9A84C] focus:outline-none" />
    </div>
  );
}

// ───────── SERVICES ─────────
const services = [
  { icon: Plane, title: "Airport Transfers", desc: "O'Hare & Midway — real-time flight tracking, meet & greet, zero wait time." },
  { icon: Briefcase, title: "Corporate Travel", desc: "Executive transportation built for professionals who value time and discretion." },
  { icon: Heart, title: "Wedding Limos", desc: "Elegant arrivals and seamless group coordination on your most important day." },
  { icon: PartyPopper, title: "Events & Nights Out", desc: "Concerts, galas, birthdays — arrive together, celebrate in style." },
  { icon: Bus, title: "Group Transportation", desc: "Sprinters and party buses for groups of all sizes across Chicagoland." },
  { icon: Map, title: "Hourly Charter", desc: "Book by the hour — flexible, professional, completely on your schedule." },
];
function Services() {
  return (
    <Section id="services" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center"><Eyebrow>What We Offer</Eyebrow><div className="flex justify-center"><SectionTitle>Services Designed for Every Occasion</SectionTitle></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="luxe-card p-8 group">
              <s.icon className="text-[#C9A84C]" size={36} />
              <h3 className="font-display text-2xl text-white mt-5">{s.title}</h3>
              <p className="text-white/60 mt-3 text-sm leading-relaxed">{s.desc}</p>
              <a href="#" className="inline-block mt-5 text-[#C9A84C] text-sm font-medium group-hover:translate-x-1 transition-transform">Learn More →</a>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ───────── HOW IT WORKS ─────────
const steps = [
  { icon: Search, title: "Enter Your Details", desc: "Pickup, destination, date & vehicle type" },
  { icon: DollarSign, title: "Get Instant Price", desc: "Fixed upfront quote — no surprises" },
  { icon: CheckCircle2, title: "Confirm Booking", desc: "Secure payment online or pay on arrival" },
  { icon: Car, title: "Enjoy the Ride", desc: "Your chauffeur arrives — you relax" },
];
function HowItWorks() {
  return (
    <Section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center"><Eyebrow>Simple Process</Eyebrow><div className="flex justify-center"><SectionTitle>Book Your Ride in 4 Steps</SectionTitle></div></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 relative">
          {steps.map((s, i) => (
            <motion.div key={s.title} variants={fadeUp} className="relative text-center md:text-left">
              <div className="font-display text-[80px] text-[#C9A84C]/15 leading-none absolute -top-4 left-0">0{i+1}</div>
              <div className="relative">
                <s.icon className="text-[#C9A84C]" size={32} />
                <h3 className="font-display text-xl text-white mt-4">{s.title}</h3>
                <p className="text-white/55 text-sm mt-2">{s.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="hidden md:block absolute top-8 -right-4 w-8 border-t border-dashed border-[#C9A84C]/40" />}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ───────── FLEET ─────────
const fleet = [
  { name: "Business Sedan", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600", from: 75, cap: "1–3 Passengers", feats: ["WiFi", "Climate", "Water"] },
  { name: "Executive SUV", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600", from: 95, cap: "1–7 Passengers", feats: ["Spacious", "Leather", "USB"] },
  { name: "VIP Escalade", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600", from: 120, cap: "1–7 Passengers", feats: ["Premium Audio", "Tinted", "Luxury"] },
  { name: "Executive Sprinter", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600", from: 145, cap: "up to 14", feats: ["Group", "Entertainment", "Bar"] },
  { name: "Stretch Limousine", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600", from: 175, cap: "8–16 Passengers", feats: ["Mini Bar", "LED", "Partition"] },
];
function Fleet() {
  return (
    <Section id="fleet" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center"><Eyebrow>Our Fleet</Eyebrow><div className="flex justify-center"><SectionTitle>Choose Your Perfect Vehicle</SectionTitle></div>
          <motion.p variants={fadeUp} className="text-white/55 mt-4 max-w-xl mx-auto">Every vehicle is immaculate, fully insured, and chauffeur-driven.</motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {fleet.map((v) => (
            <motion.div key={v.name} variants={fadeUp} className="luxe-card overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-[#C9A84C] text-black text-xs font-semibold px-3 py-1 rounded-full">{v.cap}</span>
              </div>
              <div className="p-6">
                <div className="text-[#C9A84C] text-sm">Starting from <span className="font-semibold">${v.from}</span></div>
                <h3 className="font-display text-2xl text-white mt-1">{v.name}</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {v.feats.map((f) => <span key={f} className="text-xs text-white/70 border border-white/10 rounded-full px-3 py-1">{f}</span>)}
                </div>
                <button className="btn-outline-gold w-full justify-center mt-5 !py-2 text-sm">Book This Vehicle</button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10"><a href="#" className="btn-gold">View Full Fleet →</a></div>
      </div>
    </Section>
  );
}

// ───────── WHY US ─────────
const whys = [
  { icon: Clock, title: "On-Time Guarantee", desc: "We track your flight and monitor traffic — your chauffeur is always ready before you are." },
  { icon: DollarSign, title: "Fixed Transparent Pricing", desc: "Quote upfront. Pay that amount. No surge pricing. No hidden fees. Ever." },
  { icon: UserCheck, title: "Elite Certified Chauffeurs", desc: "Extensively trained, background-checked, and committed to executive standards." },
  { icon: Shield, title: "Fully Licensed & Insured", desc: "Every vehicle is commercially licensed, insured, and regularly inspected." },
  { icon: Smartphone, title: "Easy Online Booking", desc: "Book in under 2 minutes. Instant SMS + email confirmation sent immediately." },
  { icon: Star, title: "500+ Five-Star Reviews", desc: "Trusted by corporate clients, families, and VIPs across Chicagoland since day one." },
];
function WhyUs() {
  return (
    <Section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 gold-radial" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={fadeUp}>
          <img src="https://images.unsplash.com/photo-1605515298946-d062f2e9da53?w=800" alt="Luxury chauffeur vehicle interior" className="rounded-xl border border-[#C9A84C]/20" />
        </motion.div>
        <div>
          <Eyebrow>The Obsidian Difference</Eyebrow>
          <SectionTitle>Why Chicago Chooses Us</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {whys.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="flex gap-4">
                <w.icon className="text-[#C9A84C] shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-semibold">{w.title}</h4>
                  <p className="text-white/55 text-sm mt-1 leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ───────── AREAS ─────────
const areas = ["O'Hare Airport","Midway Airport","Downtown Chicago","Lincoln Park","River North","Gold Coast","Wicker Park","Evanston","Naperville","Schaumburg","Oak Park","Hyde Park","The Loop","Magnificent Mile","Rosemont","Skokie","Oak Brook","Joliet"];
function Areas() {
  return (
    <Section id="areas" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeUp}>
          <img src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800" alt="Chicago skyline" className="rounded-xl border border-[#C9A84C]/20 grayscale contrast-125" />
        </motion.div>
        <div>
          <Eyebrow>Coverage</Eyebrow>
          <SectionTitle>We Serve All of Chicagoland</SectionTitle>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
            {areas.map((a) => (
              <span key={a} className="text-sm text-[#C9A84C] border border-[#C9A84C]/30 bg-[#C9A84C]/5 rounded-full px-4 py-1.5 hover:bg-[#C9A84C]/15 transition-colors">{a}</span>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/55 text-sm mt-6">Don't see your area? We likely serve it — call us.</motion.p>
          <motion.button variants={fadeUp} className="btn-outline-gold mt-4">Check My Area</motion.button>
        </div>
      </div>
    </Section>
  );
}

// ───────── TESTIMONIALS ─────────
const reviews = [
  { stars: 5, text: "The most professional car service I've used in Chicago. My flight was delayed by 2 hours — they tracked it automatically and my driver was perfectly on time. Will never use anyone else.", name: "Michael T.", role: "Corporate Executive · Chicago, IL" },
  { stars: 5, text: "We booked the Sprinter for our wedding party of 12. Everything was flawless — every car on time, drivers in suits, absolutely immaculate vehicles. Made the day even more special.", name: "Sarah & James W.", role: "Wedding Clients" },
  { stars: 5, text: "Use Obsidian Rides every week for O'Hare transfers. Fixed pricing means no budget surprises and the drivers are always professional. This is exactly what a premium service should feel like.", name: "David R.", role: "Frequent Business Traveler" },
];
function Testimonials() {
  const [idx, setIdx] = useState(0);
  return (
    <Section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center"><Eyebrow>Client Reviews</Eyebrow><div className="flex justify-center"><SectionTitle>What Chicago Says About Us</SectionTitle></div>
          <motion.div variants={fadeUp} className="flex justify-center gap-6 mt-6 text-white/60 text-sm flex-wrap">
            <span>Google ★★★★★</span><span>Yelp ★★★★★</span><span>BBB Accredited</span>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {reviews.map((r, i) => (
            <motion.div key={i} variants={fadeUp} className={`luxe-card p-8 relative ${i === idx ? "md:scale-[1.02]" : ""}`}>
              <Quote className="text-[#C9A84C]/40 absolute top-4 left-4" size={36} />
              <div className="text-[#C9A84C] mt-6">{"★".repeat(r.stars)}</div>
              <p className="text-white/75 mt-4 leading-relaxed text-sm">"{r.text}"</p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-white font-semibold">{r.name}</div>
                <div className="text-white/50 text-xs">{r.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-3 mt-8 md:hidden">
          <button onClick={() => setIdx((i) => (i - 1 + reviews.length) % reviews.length)} className="p-2 border border-[#C9A84C]/40 rounded-full text-[#C9A84C]"><ChevronLeft size={18} /></button>
          <button onClick={() => setIdx((i) => (i + 1) % reviews.length)} className="p-2 border border-[#C9A84C]/40 rounded-full text-[#C9A84C]"><ChevronRight size={18} /></button>
        </div>
      </div>
    </Section>
  );
}

// ───────── STATS ─────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString());
  useEffect(() => { if (inView) animate(mv, to, { duration: 2, ease: "easeOut" }); }, [inView, to, mv]);
  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
}
function Stats() {
  return (
    <section className="py-16 px-6" style={{ background: "linear-gradient(90deg, #0a0a0a 0%, #1a1605 50%, #0a0a0a 100%)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { v: 500, s: "+", l: "Happy Clients" },
          { v: 10, s: "+", l: "Years in Chicago" },
          { v: 50, s: "+", l: "Luxury Vehicles" },
          { v: 24, s: "/7", l: "Always Available" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-display text-5xl md:text-6xl text-[#C9A84C]"><Counter to={s.v} suffix={s.s} /></div>
            <div className="text-white/60 text-sm mt-2 tracking-wider uppercase">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ───────── AIRPORT ─────────
function Airport() {
  const items = [
    "O'Hare (ORD) & Midway (MDW) specialists",
    "Real-time flight tracking — no extra charge",
    "Meet & greet in arrivals hall",
    "Free wait time: 60 min domestic, 90 min international",
    "Fixed flat rates — no surge pricing",
    "Available 24 hours, 365 days a year",
  ];
  return (
    <Section className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeUp}>
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800" alt="Airport transfer" className="rounded-xl border border-[#C9A84C]/20" />
        </motion.div>
        <div>
          <Eyebrow>Airport Transfers</Eyebrow>
          <SectionTitle>Chicago's Most Reliable Airport Service</SectionTitle>
          <ul className="mt-8 space-y-3">
            {items.map((i) => (
              <motion.li key={i} variants={fadeUp} className="flex gap-3 text-white/75">
                <CheckCircle2 className="text-[#C9A84C] shrink-0 mt-0.5" size={20} /><span className="text-sm">{i}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#quote" className="btn-gold">Book Airport Transfer →</a>
            <span className="text-white/55 text-sm">Or call: <span className="text-[#C9A84C]">(312) 555-0199</span></span>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ───────── CTA ─────────
function CTABanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #080808 0%, #1a1605 50%, #080808 100%)" }}>
      <div className="absolute inset-0 gold-radial" />
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="relative max-w-3xl mx-auto text-center">
        <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl text-white">Ready to Ride in <span className="text-[#C9A84C] italic">Style?</span></motion.h2>
        <motion.p variants={fadeUp} className="text-white/65 mt-5">Join 500+ satisfied Chicago clients. Book your ride in under 2 minutes.</motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#quote" className="btn-gold">Book Your Ride Now</a>
          <a href="tel:3125550199" className="btn-outline-gold"><Phone size={16} /> (312) 555-0199</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ───────── FAQ ─────────
const faqs = [
  { q: "How do I book a ride with Obsidian Rides?", a: "Book instantly on our website — enter pickup, destination, date and vehicle. You get instant SMS + email confirmation. Or call/WhatsApp us 24/7." },
  { q: "Do you serve O'Hare and Midway airports?", a: "Yes — both airports are our specialty. We track your flight in real-time and include 60 minutes free wait time for all airport pickups." },
  { q: "Are your prices fixed or do they surge?", a: "All prices are 100% fixed and shown upfront. We never charge surge pricing, ever." },
  { q: "Can I book a vehicle for a group or event?", a: "Absolutely. We have SUVs, Sprinters (up to 14), Stretch Limos (up to 16), and Party Buses (up to 40)." },
  { q: "What is your cancellation policy?", a: "Free cancellation up to 12 hours before your ride. For airport pickups — free reschedule for flight delays." },
  { q: "How do I meet my driver at the airport?", a: "Your chauffeur meets you at baggage claim with a personalized name sign. No need to search." },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center"><Eyebrow>Questions</Eyebrow><div className="flex justify-center"><SectionTitle>Frequently Asked Questions</SectionTitle></div></div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="luxe-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="text-white font-medium">{f.q}</span>
                <ChevronDown className={`text-[#C9A84C] transition-transform ${open === i ? "rotate-180" : ""}`} size={20} />
              </button>
              <motion.div initial={false} animate={{ height: open === i ? "auto" : 0 }} className="overflow-hidden">
                <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed">{f.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ───────── FOOTER ─────────
function Footer() {
  const cols = [
    { title: "Company", items: ["About Us", "Our Story", "Careers", "Blog", "Reviews", "FAQs"] },
    { title: "Services", items: ["Airport Transfers", "Corporate Travel", "Wedding Limos", "Events & Parties", "Hourly Charter", "Group Transport"] },
    { title: "Fleet", items: ["Business Sedan", "Executive SUV", "VIP Escalade", "Luxury Sprinter", "Stretch Limo", "Party Bus"] },
    { title: "Contact", items: ["(312) 555-0199", "info@obsidianrides.com", "WhatsApp Us", "5801 N Northwest Hwy", "Chicago, IL 60631", "Hours: 24/7"] },
  ];
  return (
    <footer id="contact" className="bg-[#080808] border-t border-[#C9A84C]/30 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-white/5">
          <div>
            <div className="font-display text-2xl text-white"><span className="text-[#C9A84C]">◆</span> OBSIDIAN RIDES</div>
            <p className="text-white/50 text-sm mt-2">Chicago's Premier Chauffeur Service</p>
          </div>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((I, i) => (
              <a key={i} href="#" className="p-2 border border-white/10 rounded-full text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"><I size={18} /></a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-[#C9A84C] font-semibold mb-4 text-sm tracking-wider uppercase">{c.title}</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                {c.items.map((i) => <li key={i} className="hover:text-white transition-colors cursor-pointer">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-3 text-white/45 text-xs">
          <div>© 2026 Obsidian Rides. All Rights Reserved. Powered with ❤ in Chicago, IL</div>
          <div className="flex gap-4"><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div>
        </div>
      </div>
    </footer>
  );
}

// ───────── FLOATING ─────────
function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a href="https://wa.me/13125550199" target="_blank" rel="noreferrer" title="Chat with us"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform">
        <MessageCircle size={22} className="text-white" />
      </a>
      {show && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 bg-[#C9A84C] p-3 rounded-full shadow-[0_8px_30px_rgba(201,168,76,0.4)] hover:scale-110 transition-transform">
          <ArrowUp size={20} className="text-black" />
        </button>
      )}
    </>
  );
}

// ───────── PAGE ─────────
function HomePage() {
  return (
    <main className="bg-[#080808] text-white">
      <Announcement />
      <Navbar />
      <Hero />
      <QuoteForm />
      <Services />
      <HowItWorks />
      <Fleet />
      <WhyUs />
      <Areas />
      <Testimonials />
      <Stats />
      <Airport />
      <CTABanner />
      <FAQ />
      <Footer />
      <Floating />
    </main>
  );
}
