import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, CheckCircle, ArrowRight, Phone, Moon, Tent, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Shared Types ─── */
interface PilgrimPackage {
  tier: string;
  tierColor: string;
  subtitle: string;
  price: string;
  duration: string;
  makkahNights: number;
  madinahNights: number;
  makkahHotel: string;
  madinahHotel: string;
  hotelStars: number;
  distanceFromHaram: string;
  includes: string[];
  highlights: string[];
  badge?: string;
}

/* ─── Umrah Packages ─── */
const umrahPackages: PilgrimPackage[] = [
  {
    tier: "Economy",
    tierColor: "bg-slate-500",
    subtitle: "Comfortable & Affordable",
    price: "AED 2,499",
    duration: "7 Nights",
    makkahNights: 4,
    madinahNights: 3,
    makkahHotel: "Al Marwa / Ajyad Makarem",
    madinahHotel: "Al Ansar Golden / Rawda",
    hotelStars: 3,
    distanceFromHaram: "500–800m",
    badge: "Most Popular",
    includes: ["Return Airfare (SAR)", "Umrah Visa", "Group Transport", "Guided Ziyarat"],
    highlights: ["4 Nights Makkah · 3 Nights Madinah", "3-Star Hotel", "Group Bus Transport", "Licensed Umrah Guide"],
  },
  {
    tier: "Standard",
    tierColor: "bg-blue-600",
    subtitle: "Balanced Comfort & Value",
    price: "AED 3,899",
    duration: "10 Nights",
    makkahNights: 6,
    madinahNights: 4,
    makkahHotel: "Hilton Suites / Marriott Al Mohbas",
    madinahHotel: "Dar Al Iman Royal / Anwar Al Madinah",
    hotelStars: 4,
    distanceFromHaram: "200–400m",
    includes: ["Return Airfare", "Umrah Visa", "Private AC Transport", "Breakfast Daily", "Guided Ziyarat"],
    highlights: ["6 Nights Makkah · 4 Nights Madinah", "4-Star Hotel", "Private Transport", "Breakfast Included"],
  },
  {
    tier: "Premium",
    tierColor: "bg-primary",
    subtitle: "Elevated Spiritual Experience",
    price: "AED 5,999",
    duration: "12 Nights",
    makkahNights: 7,
    madinahNights: 5,
    makkahHotel: "Hilton Towers / Conrad Makkah",
    madinahHotel: "Oberoi / Anwar Al Madinah Mövenpick",
    hotelStars: 5,
    distanceFromHaram: "50–150m",
    badge: "Best Value",
    includes: ["Business Class Option", "Umrah Visa", "VIP Private Transport", "Full Board Meals", "Exclusive Ziyarat", "Dedicated Group Leader"],
    highlights: ["7 Nights Makkah · 5 Nights Madinah", "5-Star Hotel", "Haram-View Rooms", "Full Board Meals"],
  },
  {
    tier: "VIP Luxury",
    tierColor: "bg-yellow-700",
    subtitle: "Ultimate Pilgrimage in Grandeur",
    price: "AED 9,500",
    duration: "14 Nights",
    makkahNights: 9,
    madinahNights: 5,
    makkahHotel: "Raffles Makkah Palace / Al Marwa Rayhaan",
    madinahHotel: "The Oberoi Madinah",
    hotelStars: 5,
    distanceFromHaram: "Steps from Haram",
    includes: ["Business Class Flights", "Umrah Visa", "Private Luxury Vehicle", "All Meals", "Personal Guide", "Ziyarat Tour", "24/7 Concierge"],
    highlights: ["9 Nights Makkah · 5 Nights Madinah", "Luxury 5-Star Clock Tower Area", "Kaaba View Rooms", "Personal Umrah Guide"],
  },
  {
    tier: "Ramadan Special",
    tierColor: "bg-emerald-700",
    subtitle: "Last 10 Nights of Ramadan",
    price: "AED 7,800",
    duration: "12 Nights",
    makkahNights: 10,
    madinahNights: 2,
    makkahHotel: "Pullman ZamZam / Swissôtel",
    madinahHotel: "Madinah Hilton",
    hotelStars: 5,
    distanceFromHaram: "100m",
    badge: "Limited Seats",
    includes: ["Return Flights", "Umrah Visa", "Private Transport", "Suhoor & Iftar Daily", "Laylatul Qadr Guidance", "Taraweeh Assistance"],
    highlights: ["Last 10 Nights of Ramadan", "Laylatul Qadr Package", "Suhoor & Iftar Included", "Prime Tower Location"],
  },
  {
    tier: "Family",
    tierColor: "bg-purple-600",
    subtitle: "Perfect for Families",
    price: "AED 3,200",
    duration: "10 Nights",
    makkahNights: 6,
    madinahNights: 4,
    makkahHotel: "Makkah Clock Tower Hotel",
    madinahHotel: "Rawda Al Madinah",
    hotelStars: 4,
    distanceFromHaram: "300m",
    includes: ["Return Airfare", "Umrah Visa for All", "Family Room", "Breakfast Daily", "Child-Friendly Ziyarat"],
    highlights: ["Family Rooms Available", "Child-Friendly Guide", "6N Makkah · 4N Madinah", "Breakfast Included"],
  },
];

/* ─── Hajj 2026 Packages ─── */
interface HajjPackage {
  tier: string;
  tierColor: string;
  subtitle: string;
  price: string;
  totalDays: number;
  makkahNights: number;
  madinahNights: number;
  minaArrangement: string;
  makkahHotel: string;
  madinahHotel: string;
  hotelStars: number;
  distanceFromHaram: string;
  includes: string[];
  highlights: string[];
  badge?: string;
  groupSize?: string;
}

const hajjPackages: HajjPackage[] = [
  {
    tier: "Economy Hajj",
    tierColor: "bg-slate-600",
    subtitle: "Group — Government Quota",
    price: "AED 14,500",
    totalDays: 21,
    makkahNights: 12,
    madinahNights: 8,
    minaArrangement: "Shared Aziziyah Tents",
    makkahHotel: "Al Safwah Royal Orchid / Ajyad Makarem",
    madinahHotel: "Rawda Al Madinah / Al Ansar",
    hotelStars: 3,
    distanceFromHaram: "500m–1km",
    badge: "Most Popular",
    groupSize: "40–50 Pilgrims",
    includes: ["Return Airfare", "Hajj Visa", "Mina Tent (Aziziyah)", "Group Bus Transport", "Arafat & Muzdalifah", "Guided Rituals", "Qurbani Arrangement"],
    highlights: ["21 Days Total", "12N Makkah · 8N Madinah", "Mina Tent Included", "Group of 40–50 Pilgrims"],
  },
  {
    tier: "Standard Hajj",
    tierColor: "bg-blue-700",
    subtitle: "Small Group — 4-Star Comfort",
    price: "AED 19,500",
    totalDays: 23,
    makkahNights: 13,
    madinahNights: 8,
    minaArrangement: "Mina Camp (AC Tents)",
    makkahHotel: "Hilton Suites / Marriott Makkah",
    madinahHotel: "Anwar Al Madinah / Dar Al Iman",
    hotelStars: 4,
    distanceFromHaram: "300–500m",
    groupSize: "20–30 Pilgrims",
    includes: ["Return Airfare", "Hajj Visa", "AC Mina Tents", "Private Group Transport", "Arafat Ground Arrangement", "Muzdalifah Overnight", "Full-Board Meals", "Ziyarat Tours", "Qurbani"],
    highlights: ["23 Days Total", "4-Star Hotels", "AC Mina Tents", "Small Group (20–30)"],
  },
  {
    tier: "Premium Hajj",
    tierColor: "bg-primary",
    subtitle: "Exclusive — 5-Star All Inclusive",
    price: "AED 28,000",
    totalDays: 25,
    makkahNights: 15,
    madinahNights: 8,
    minaArrangement: "Premium VIP Mina Tents (Maktabi)",
    makkahHotel: "Conrad Makkah / Hilton Towers",
    madinahHotel: "Oberoi Madinah / Mövenpick Anwar",
    hotelStars: 5,
    distanceFromHaram: "100–200m",
    badge: "Best Value",
    groupSize: "Max 15 Pilgrims",
    includes: ["Business Class Option", "Hajj Visa", "VIP Mina Tents", "Private AC Coach", "Dedicated Aalim (Scholar)", "All Meals — Full Board", "Exclusive Ziyarat", "Qurbani", "Ihram Kit", "Pre-Hajj Seminar UAE"],
    highlights: ["25 Days Total", "5-Star Haram-Facing Rooms", "Exclusive Group (Max 15)", "Dedicated Scholar Guide"],
  },
  {
    tier: "VIP Luxury Hajj",
    tierColor: "bg-yellow-700",
    subtitle: "Ultra Private — White Glove Service",
    price: "AED 45,000",
    totalDays: 28,
    makkahNights: 18,
    madinahNights: 8,
    minaArrangement: "Luxury Private Mina Suite",
    makkahHotel: "Raffles Makkah Palace / Al Marwa Rayhaan",
    madinahHotel: "The Oberoi Madinah",
    hotelStars: 5,
    distanceFromHaram: "Steps from Haram",
    badge: "Limited — 8 Seats",
    groupSize: "Private (up to 8)",
    includes: ["Business Class Flights", "Hajj Visa", "Private Mina Suite", "Luxury Vehicle (Dedicated)", "Personal Scholar & Guide", "All Meals (Michelin Chefs)", "Medical Concierge", "Qurbani Premium", "Ihram & Gift Set", "Pre & Post Hajj Support"],
    highlights: ["28 Days Total", "Kaaba View Rooms", "Private Mina Suite", "Personal Scholar + Doctor"],
  },
  {
    tier: "Ladies-Only Hajj",
    tierColor: "bg-rose-600",
    subtitle: "Female-Guided Group Package",
    price: "AED 16,500",
    totalDays: 21,
    makkahNights: 12,
    madinahNights: 8,
    minaArrangement: "Ladies-Only Mina Section",
    makkahHotel: "Hilton Suites / Mövenpick Hajar",
    madinahHotel: "Oberoi Madinah / Anwar",
    hotelStars: 4,
    distanceFromHaram: "300m",
    badge: "Sisters Only",
    groupSize: "10–20 Sisters",
    includes: ["Return Airfare", "Hajj Visa", "Female Mutawwifa Guide", "Ladies Mina Camp Section", "All Meals", "Ziyarat with Female Guide", "Qurbani", "24/7 Female Coordinator"],
    highlights: ["Female Scholars & Guides Only", "4-Star Hotels", "Ladies-Only Mina Section", "Fully Supervised Group"],
  },
  {
    tier: "Senior & Wheelchair",
    tierColor: "bg-teal-600",
    subtitle: "Accessible — Extra Care & Support",
    price: "AED 22,000",
    totalDays: 23,
    makkahNights: 13,
    madinahNights: 8,
    minaArrangement: "Accessible Mina Tents (Ground Level)",
    makkahHotel: "Conrad Makkah / Hilton Towers",
    madinahHotel: "Anwar Al Madinah Mövenpick",
    hotelStars: 5,
    distanceFromHaram: "200m (wheelchair accessible route)",
    includes: ["Return Airfare", "Hajj Visa", "Wheelchair Assistance", "Dedicated Carer", "Priority Boarding", "All Meals", "Medical Team On-Call", "Accessible Tents", "Tawaf Wheelchair Service"],
    highlights: ["Dedicated Carers Provided", "5-Star Accessible Rooms", "Medical Team On-Ground", "Priority Ritual Access"],
  },
];

/* ─── Shared Why Choose Us ─── */
const whyChooseUs = [
  { icon: CheckCircle, title: "Licensed Operator", desc: "Fully compliant with the Saudi Ministry of Hajj & Umrah regulations." },
  { icon: Star, title: "15+ Years Experience", desc: "Thousands of satisfied pilgrims guided by our dedicated team." },
  { icon: MapPin, title: "Hand-Picked Hotels", desc: "Hotels vetted for proximity, quality, and Haram accessibility." },
  { icon: Phone, title: "24/7 On-Ground Support", desc: "Your coordinator is with you every step — in Makkah and Madinah." },
];

/* ─── Sub-components ─── */
function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 text-primary fill-primary" />
      ))}
    </span>
  );
}

function UmrahCard({ pkg }: { pkg: PilgrimPackage }) {
  const handleEnquire = () => {
    const text = `Umrah Package Inquiry:\nPackage: ${pkg.tier} (${pkg.duration})\nMakkah Hotel: ${pkg.makkahHotel} (${pkg.makkahNights}N)\nMadinah Hotel: ${pkg.madinahHotel} (${pkg.madinahNights}N)\nStarting from: ${pkg.price}\n\nPlease provide availability and details.`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      data-testid={`card-umrah-${pkg.tier}`}
      className="bg-card rounded-2xl border border-border/50 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
    >
      <div className={`${pkg.tierColor} px-6 py-5 relative`}>
        {pkg.badge && (
          <span className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
            {pkg.badge}
          </span>
        )}
        <p className="text-white/80 text-xs font-medium uppercase tracking-widest mb-1">{pkg.subtitle}</p>
        <h3 className="font-serif text-2xl font-bold text-white">{pkg.tier}</h3>
        <div className="flex items-center gap-3 mt-2">
          <StarRating count={pkg.hotelStars} />
          <span className="text-white/70 text-xs">{pkg.distanceFromHaram} from Haram</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/50">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">{pkg.price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-semibold text-foreground">{pkg.duration}</p>
            <p className="text-xs text-muted-foreground">{pkg.makkahNights}N Makkah · {pkg.madinahNights}N Madinah</p>
          </div>
        </div>
        <div className="mb-4 space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div><span className="font-semibold text-foreground/80">Makkah:</span>{" "}<span className="text-muted-foreground">{pkg.makkahHotel}</span></div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div><span className="font-semibold text-foreground/80">Madinah:</span>{" "}<span className="text-muted-foreground">{pkg.madinahHotel}</span></div>
          </div>
        </div>
        <ul className="space-y-1.5 mb-5">
          {pkg.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />{h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pkg.includes.map((inc) => (
            <span key={inc} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">{inc}</span>
          ))}
        </div>
        <div className="mt-auto">
          <Button onClick={handleEnquire} className="w-full group/btn" data-testid={`button-enquire-umrah-${pkg.tier}`}>
            Enquire on WhatsApp
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function HajjCard({ pkg }: { pkg: HajjPackage }) {
  const handleEnquire = () => {
    const text = `Hajj 2026 Package Inquiry:\nPackage: ${pkg.tier} (${pkg.totalDays} Days)\nMakkah Hotel: ${pkg.makkahHotel} (${pkg.makkahNights}N)\nMadinah Hotel: ${pkg.madinahHotel} (${pkg.madinahNights}N)\nMina: ${pkg.minaArrangement}\nGroup Size: ${pkg.groupSize || "TBD"}\nStarting from: ${pkg.price}\n\nPlease provide full details and registration info. JazakAllah Khair.`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      data-testid={`card-hajj-${pkg.tier}`}
      className="bg-card rounded-2xl border border-border/50 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
    >
      <div className={`${pkg.tierColor} px-6 py-5 relative`}>
        {pkg.badge && (
          <span className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
            {pkg.badge}
          </span>
        )}
        <p className="text-white/80 text-xs font-medium uppercase tracking-widest mb-1">{pkg.subtitle}</p>
        <h3 className="font-serif text-xl font-bold text-white">{pkg.tier}</h3>
        <div className="flex items-center gap-3 mt-2">
          <StarRating count={pkg.hotelStars} />
          {pkg.groupSize && <span className="text-white/70 text-xs flex items-center gap-1"><Users className="h-3 w-3" />{pkg.groupSize}</span>}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">{pkg.price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Duration</p>
            <p className="font-semibold text-foreground">{pkg.totalDays} Days</p>
            <p className="text-xs text-muted-foreground">{pkg.makkahNights}N Makkah · {pkg.madinahNights}N Madinah</p>
          </div>
        </div>
        {/* Hotels */}
        <div className="mb-3 space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div><span className="font-semibold text-foreground/80">Makkah:</span>{" "}<span className="text-muted-foreground">{pkg.makkahHotel}</span></div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div><span className="font-semibold text-foreground/80">Madinah:</span>{" "}<span className="text-muted-foreground">{pkg.madinahHotel}</span></div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Tent className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div><span className="font-semibold text-foreground/80">Mina:</span>{" "}<span className="text-muted-foreground">{pkg.minaArrangement}</span></div>
          </div>
        </div>
        {/* Highlights */}
        <ul className="space-y-1.5 mb-4">
          {pkg.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />{h}
            </li>
          ))}
        </ul>
        {/* Includes tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pkg.includes.map((inc) => (
            <span key={inc} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">{inc}</span>
          ))}
        </div>
        <div className="mt-auto">
          <Button onClick={handleEnquire} className="w-full group/btn" data-testid={`button-enquire-hajj-${pkg.tier}`}>
            Register Interest on WhatsApp
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page Component ─── */
export default function Umrah() {
  const [activeTab, setActiveTab] = useState<"umrah" | "hajj">("umrah");

  useEffect(() => {
    document.title = activeTab === "hajj"
      ? "Hajj 2026 Packages | Elite Oasis Tourism LLC — Sharjah UAE"
      : "Umrah Packages | Elite Oasis Tourism LLC — Sharjah UAE";
  }, [activeTab]);

  const handleCustomEnquiry = () => {
    const subject = activeTab === "hajj" ? "Hajj 2026" : "Umrah";
    const text = `Assalamu Alaikum, I'm interested in a ${subject} package from Elite Oasis Tourism. Please share available options and pricing.`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero ── */}
      <section className="relative py-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Blessed Journeys to the Holy Land</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-secondary-foreground mb-4">
              Umrah & <span className="text-primary">Hajj 2026</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed">
              From year-round Umrah journeys to fully managed Hajj 1447 group packages — departing from Sharjah & Dubai with flights, visas, hand-picked hotels, Mina accommodation, and guided rituals all included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="h-14 px-8 gap-2" onClick={handleCustomEnquiry} data-testid="button-pilgrim-enquiry">
                Enquire on WhatsApp
              </Button>
              <a href="tel:+971564158896">
                <Button size="lg" variant="outline" className="h-14 px-8 gap-2 border-secondary-foreground/30 text-secondary-foreground hover:text-foreground" data-testid="button-pilgrim-call">
                  <Phone className="h-4 w-4" /> Call Us Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Info Strip ── */}
      <section className="bg-primary/10 border-y border-primary/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-foreground/80">
            {["Flights from Sharjah & Dubai", "Visa Included", "Licensed Operator", "Group & Private Options", "Year-Round Umrah Departures", "Hajj 1447 (2026) Registration Open"].map(item => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Switcher ── */}
      <section className="py-16">
        <div className="container mx-auto px-4">

          {/* Tab Buttons */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl border border-border bg-muted p-1.5 gap-1">
              <button
                data-testid="tab-umrah"
                onClick={() => setActiveTab("umrah")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "umrah"
                    ? "bg-card shadow-md text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Moon className="h-4 w-4" />
                Umrah Packages
                <span className="bg-primary/15 text-primary text-xs px-2 py-0.5 rounded-full font-bold">Year-Round</span>
              </button>
              <button
                data-testid="tab-hajj"
                onClick={() => setActiveTab("hajj")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "hajj"
                    ? "bg-card shadow-md text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Tent className="h-4 w-4" />
                Hajj 2026 Packages
                <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-200">Hajj 1447</span>
              </button>
            </div>
          </div>

          {/* ── Umrah Section ── */}
          <AnimatePresence mode="wait">
            {activeTab === "umrah" && (
              <motion.div
                key="umrah"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Our Umrah Packages</h2>
                  <div className="w-24 h-1 bg-primary mx-auto mb-6" />
                  <p className="text-muted-foreground max-w-xl mx-auto">Every package is carefully assembled for a spiritually fulfilling and comfortable journey to the holy cities. Available year-round.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {umrahPackages.map(pkg => <UmrahCard key={pkg.tier} pkg={pkg} />)}
                </div>
              </motion.div>
            )}

            {/* ── Hajj Section ── */}
            {activeTab === "hajj" && (
              <motion.div
                key="hajj"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                {/* Hajj 2026 Alert Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 flex items-start gap-4 max-w-3xl mx-auto">
                  <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-800 mb-1">Hajj 1447 / 2026 — Registration Now Open</p>
                    <p className="text-sm text-amber-700">Hajj 2026 is expected around <strong>late May / early June 2026</strong>. Seats are extremely limited under the Saudi quota system. We strongly recommend registering your interest as early as possible to secure your place.</p>
                  </div>
                </div>

                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Hajj 2026 Group Packages</h2>
                  <div className="w-24 h-1 bg-primary mx-auto mb-6" />
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Complete, fully managed Hajj packages including flights, Makkah & Madinah hotels, Mina tent accommodation, Arafat & Muzdalifah arrangements, guided rituals, and Qurbani — all from Sharjah & Dubai.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {hajjPackages.map(pkg => <HajjCard key={pkg.tier} pkg={pkg} />)}
                </div>

                {/* Hajj Ritual Checklist */}
                <div className="bg-secondary/5 border border-border rounded-2xl p-8 max-w-4xl mx-auto">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">What Every Hajj Package Covers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Return flights from Sharjah / Dubai to Jeddah",
                      "Saudi Arabia Hajj Visa (Official Quota)",
                      "Hotel accommodation in Makkah (pre & post Hajj)",
                      "Hotel accommodation in Madinah",
                      "Mina Tent Accommodation (8–13 Dhul Hijja)",
                      "Arafat ground arrangement (9 Dhul Hijja)",
                      "Muzdalifah overnight stay (9–10 Dhul Hijja)",
                      "Jamaraat (Stoning of Devil) escort & safety guidance",
                      "Tawaf al-Ifadah & Sa'i guidance",
                      "Makkah–Madinah intercity transport",
                      "Airport transfers (Jeddah & Madinah)",
                      "Qurbani (sacrifice) arrangement",
                      "Licensed Hajj scholar/guide throughout",
                      "24/7 on-ground emergency support",
                    ].map(item => (
                      <div key={item} className="flex items-center gap-3 bg-card border border-border/50 rounded-xl p-3">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-foreground/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-secondary/5 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Why Book with Elite Oasis?</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
                <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            {activeTab === "hajj" ? "Secure Your Hajj 2026 Seat Today" : "Ready to Begin Your Sacred Journey?"}
          </h2>
          <p className="text-secondary-foreground/80 mb-10 text-lg">
            {activeTab === "hajj"
              ? "Hajj 2026 seats fill extremely fast. Contact our specialists now to register your interest, begin documentation, and lock in your package before it's too late."
              : "Our Umrah specialists are available 7 days a week to help you choose the right package, prepare your documents, and ensure a blessed and seamless pilgrimage."}
          </p>
          <Button size="lg" className="h-14 px-10 text-lg" onClick={handleCustomEnquiry} data-testid="button-pilgrim-cta">
            {activeTab === "hajj" ? "Register for Hajj 2026 on WhatsApp" : "Start Planning on WhatsApp"}
          </Button>
        </div>
      </section>
    </div>
  );
}
