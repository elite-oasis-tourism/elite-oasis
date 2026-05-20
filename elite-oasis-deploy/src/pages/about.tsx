import { useEffect } from "react";
import { Shield, Star, Globe2 } from "lucide-react";
import heroBanner from "@/assets/hero-banner.png"; // Fallback for office image

export default function About() {
  useEffect(() => {
    document.title = "About Us | Elite Oasis Tourism";
  }, []);

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">About Elite Oasis</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-secondary">Crafting Unforgettable Journeys</h2>
            <p className="text-muted-foreground leading-relaxed">
              Based in the heart of Sharjah, Elite Oasis Tourism LLC is a premier travel consultancy dedicated to providing high-end, bespoke travel experiences. We cater to discerning travelers who expect nothing but the best.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are planning a luxurious getaway to the Maldives, a comprehensive European tour, or simply need swift and reliable visa processing, our team of experts is here to ensure every detail is handled with absolute precision.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden h-80 shadow-xl border border-border">
            <img src={heroBanner} alt="Elite Oasis Office" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl border border-border text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold mb-3">Premium Quality</h3>
            <p className="text-muted-foreground text-sm">We partner with the world's finest airlines, hotels, and operators to deliver uncompromised luxury.</p>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold mb-3">Trust & Reliability</h3>
            <p className="text-muted-foreground text-sm">Years of expertise in UAE's travel sector ensuring secure and seamless experiences.</p>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border text-center">
            <Globe2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold mb-3">Global Reach</h3>
            <p className="text-muted-foreground text-sm">From flights to specialized visas, our extensive network spans across all major continents.</p>
          </div>
        </div>
      </div>
    </div>
  );
}