import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Plane, Globe, Shield, Calendar, Star } from "lucide-react";
import HomeSearch from "@/components/HomeSearch";
import PackageCard from "@/components/PackageCard";
import VisaCard from "@/components/VisaCard";
import { Button } from "@/components/ui/button";

import heroBanner from "@/assets/hero-banner.png";
import maldivesImg from "@/assets/maldives.png";
import europeImg from "@/assets/europe.png";
import dubaiImg from "@/assets/dubai.png";

export default function Home() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  // Track the HTML lang attribute set by Header.tsx to sync local state
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.lang === "ar" || document.documentElement.lang === "en") {
        setLang(document.documentElement.lang as "en" | "ar");
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    setLang((document.documentElement.lang as "en" | "ar") || "en");
    document.title = "Elite Oasis Tourism | Luxury Travel Agency UAE";
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <img src={heroBanner} alt="Luxury Travel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 pt-20 pb-32 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            {lang === "en" ? (
              <>Discover the World in <span className="text-primary">Elegance</span></>
            ) : (
              <>اكتشف العالم <span className="text-primary">بأناقة</span></>
            )}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12"
          >
            {lang === "en" 
              ? "Tailoring bespoke international holidays with seamless flight bookings and global visa services — guided by the UAE’s trusted travel experts."
              : "عطلات دولية مخصصة، حجوزات طيران سلسة، وخدمات تأشيرات عالمية من أبرز وكالات السفر في الإمارات."}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HomeSearch />
          </motion.div>
        </div>
      </section>

      {/* 2. Intro / Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">Why Choose Elite Oasis?</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Based in Sharjah, Elite Oasis Tourism LLC provides a refined, trustworthy, and effortlessly global travel experience. From luxury getaways to essential visa services, we handle every detail with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Global Reach</h3>
              <p className="text-muted-foreground text-sm">Access to exclusive destinations worldwide with curated itineraries.</p>
            </div>
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Trusted Expertise</h3>
              <p className="text-muted-foreground text-sm">Years of experience in the UAE travel sector ensuring peace of mind.</p>
            </div>
            <div className="text-center p-6">
              <Plane className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Premium Flights</h3>
              <p className="text-muted-foreground text-sm">Partnerships with top-tier airlines for the most comfortable journey.</p>
            </div>
            <div className="text-center p-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Bespoke Planning</h3>
              <p className="text-muted-foreground text-sm">Every detail of your trip customized to your unique preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Packages */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Escapes</h2>
              <div className="w-24 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground">Hand-picked luxury itineraries for the discerning traveler.</p>
            </div>
            <Link href="/packages">
              <Button variant="outline" className="mt-6 md:mt-0 gap-2">
                View All Packages <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PackageCard 
              destination="Maldives" 
              image={maldivesImg} 
              price="AED 6,800" 
              duration="5 Days" 
              category="Honeymoon"
              highlights={["Overwater Villa", "Snorkeling", "Private Beach Dinner"]} 
            />
            <PackageCard 
              destination="Europe Grand Tour" 
              image={europeImg} 
              price="AED 18,000" 
              duration="15 Days" 
              category="Luxury"
              highlights={["Paris, Rome, Swiss Alps", "Business Class Flights", "5-Star Hotels"]} 
            />
            <PackageCard 
              destination="Dubai" 
              image={dubaiImg} 
              price="AED 4,500" 
              duration="4 Days" 
              category="Luxury"
              highlights={["Burj Al Arab Stay", "Desert Safari VIP", "Luxury Yacht Tour"]} 
            />
          </div>
        </div>
      </section>

      {/* 4. Visa Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">Visa Services</h2>
              <div className="w-24 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground">Streamlined visa processing for major global destinations.</p>
            </div>
            <Link href="/visa">
              <Button variant="outline" className="mt-6 md:mt-0 gap-2">
                View All Visas <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VisaCard country="UAE" types={["Tourist", "Transit"]} processingTime="2-3 Working Days" priceStart="AED 350" />
            <VisaCard country="Schengen" types={["Tourist", "Business"]} processingTime="10-15 Working Days" priceStart="AED 850" />
            <VisaCard country="USA" types={["B1/B2 Tourist"]} processingTime="Variable" priceStart="AED 1,200" />
          </div>
        </div>
      </section>

      {/* 5. Special Offers / CTA */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Ready for your next luxury escape?</h2>
          <p className="text-lg text-secondary-foreground/80 mb-10 leading-relaxed">
            Contact our travel experts today via WhatsApp to start planning your bespoke itinerary. We're available 24/7 to assist with flights, packages, and visas.
          </p>
          <a href="https://wa.me/971564158896" target="_blank" rel="noreferrer">
            <Button size="lg" className="h-14 px-8 text-lg gap-3">
              <Globe className="h-5 w-5" /> Let's Plan Your Trip
            </Button>
          </a>
        </div>
      </section>
      {/* 6. Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"We had a wonderful experience with Mr. Misbah from Elite Oasis. Our holiday was very well planned with a detailed itinerary for each day. Our stay in all the planned hotels was a great experience too. I would definitely recommend them."</p>
              <div className="font-bold">- Rashida Polan.</div>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"Incredible service. The trips are planned with so much detail! From the locations to the experiences, everything feels unique and effortless. You can tell there’s real passion behind the work. Highly recommended for anyone who wants a smooth, unforgettable travel experience."</p>
              <div className="font-bold">- Mariam bin tarish</div>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"Thank you Misbah Rizvi and Elite Oasis for a truly memorable trip to Sri Lanka. The itinerary was very well planned as per our liking and hotels were a joy.
Thanks you again for making this an amazing experience."</p>
              <div className="font-bold">- Tehzeeb azeemi.</div>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"My family and I recently used their services for our Umrah trip.\nThey organised everything amazingly, from visa to stays to transport as well. We were travelling with our grandmother, so they arranged for great hotels very close to the mosques. (Photos attached of the hotels)\nThey were always available to answer our queries. They planned the itirenary based on our needs, and took care of all our requirements. Highly recommend them."</p>
              <div className="font-bold">- Ayisha Abdul.</div>
             </div>
             <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"We have booked our umrah package with them. It was one of the best packages with full tour plan from Madina to Mecca. Staff is very helpful and professional. Alhamdullilah we were very satisfied. Its a must try place."</p>
              <div className="font-bold">- Arhum Baig.</div>
               </div>
             <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-6">"I recently purchased tickets from this tourism company and had a great experience. Misbah was extremely helpful, gave me the best price available, and patiently answered all my queries and doubts. The entire process was smooth and seamless from start to finish. Highly recommend getting all your travel tickets from here!."</p>
              <div className="font-bold">- Amita Quadros.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
