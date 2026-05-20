import { useEffect, useState } from "react";
import PackageCard from "@/components/PackageCard";

import australiaImg from "@/assets/australia.png";
import canadaImg from "@/assets/canada.png";
import usaImg from "@/assets/usa.png";
import dubaiImg from "@/assets/dubai.png";
import maldivesImg from "@/assets/maldives.png";
import baliImg from "@/assets/bali.png";
import thailandImg from "@/assets/thailand.png";
import turkeyImg from "@/assets/turkey.png";
import europeImg from "@/assets/europe.png";

type Category = "All" | "Honeymoon" | "Luxury" | "Adventure" | "Family" | "Beach" | "Cultural" | "Day Trip" | "City Break";

const packages: { dest: string; image: string; price: string; duration: string; highlights: string[]; category: Category }[] = [
  // Honeymoon
  { dest: "Maldives", image: maldivesImg, price: "AED 6,800", duration: "5 Days", category: "Honeymoon", highlights: ["Overwater Villa", "Private Beach Dinner", "Snorkeling & Diving"] },
  { dest: "Bali", image: baliImg, price: "AED 4,200", duration: "6 Days", category: "Honeymoon", highlights: ["Ubud Jungle Retreat", "Seminyak Sunset Dinner", "Spa Couples Package"] },
  { dest: "Seychelles", image: maldivesImg, price: "AED 8,500", duration: "7 Days", category: "Honeymoon", highlights: ["Private Island Resort", "Catamaran Cruise", "Coral Reef Snorkeling"] },
  { dest: "Turkey — Santorini Style", image: turkeyImg, price: "AED 5,200", duration: "7 Days", category: "Honeymoon", highlights: ["Cappadocia Hot Air Balloon", "Bosphorus Dinner Cruise", "Bodrum Yacht Tour"] },

  // Luxury
  { dest: "Maldives — Ultra", image: maldivesImg, price: "AED 14,500", duration: "7 Days", category: "Luxury", highlights: ["5-Star Overwater Villa", "Butler Service", "Private Seaplane Transfer", "Fine Dining"] },
  { dest: "Europe Grand Tour", image: europeImg, price: "AED 18,000", duration: "15 Days", category: "Luxury", highlights: ["Paris, Rome, Swiss Alps", "Venice Gondola", "Business Class Flights", "5-Star Hotels"] },
  { dest: "Dubai", image: dubaiImg, price: "AED 4,500", duration: "4 Days", category: "Luxury", highlights: ["Burj Al Arab Stay", "Luxury Yacht Tour", "Desert Safari VIP", "Private City Tour"] },
  { dest: "Singapore", image: thailandImg, price: "AED 7,200", duration: "5 Days", category: "Luxury", highlights: ["Marina Bay Sands Infinity Pool", "Michelin Star Dining", "Sentosa Island", "Gardens by the Bay"] },

  // Adventure
  { dest: "Georgia", image: turkeyImg, price: "AED 2,800", duration: "5 Days", category: "Adventure", highlights: ["Kazbegi Trekking", "Caucasus Mountains", "Tbilisi Old Town", "Wine Country Tour"] },
  { dest: "New Zealand", image: australiaImg, price: "AED 12,500", duration: "10 Days", category: "Adventure", highlights: ["Milford Sound", "Queenstown Bungee", "Hobbiton Tour", "Glacier Walk"] },
  { dest: "Azerbaijan", image: europeImg, price: "AED 2,900", duration: "5 Days", category: "Adventure", highlights: ["Mud Volcanoes", "Gobustan National Park", "Flame Towers", "Sheki Mountains"] },
  { dest: "Thailand", image: thailandImg, price: "AED 3,800", duration: "7 Days", category: "Adventure", highlights: ["Phi Phi Islands Diving", "Elephant Sanctuary", "Rock Climbing Krabi", "Street Food Tour"] },

  // Family
  { dest: "Canada", image: canadaImg, price: "AED 9,200", duration: "12 Days", category: "Family", highlights: ["Banff National Park", "Niagara Falls", "Toronto Science Museum", "Whale Watching"] },
  { dest: "USA", image: usaImg, price: "AED 10,500", duration: "14 Days", category: "Family", highlights: ["Universal Studios", "Grand Canyon", "Times Square", "Disneyland California"] },
  { dest: "Malaysia", image: baliImg, price: "AED 3,500", duration: "6 Days", category: "Family", highlights: ["Legoland Johor Bahru", "Petronas Towers", "Langkawi Theme Parks", "Genting Highlands"] },
  { dest: "Turkey", image: turkeyImg, price: "AED 4,500", duration: "6 Days", category: "Family", highlights: ["Istanbul Family Tour", "Aqua Park Bodrum", "Ephesus Ancient City", "Blue Mosque"] },

  // Beach
  { dest: "Maldives — Beach", image: maldivesImg, price: "AED 5,500", duration: "5 Days", category: "Beach", highlights: ["White Sand Beaches", "Bioluminescent Waters", "Water Sports", "Beachfront Resort"] },
  { dest: "Bali Beach", image: baliImg, price: "AED 3,600", duration: "5 Days", category: "Beach", highlights: ["Kuta Beach", "Nusa Penida Snorkeling", "Sunset Surfing", "Beach Club Access"] },
  { dest: "Thailand — Beaches", image: thailandImg, price: "AED 3,200", duration: "6 Days", category: "Beach", highlights: ["Phuket Patong Beach", "Koh Samui", "Ko Phi Phi", "Speedboat Island Hopping"] },
  { dest: "Australia", image: australiaImg, price: "AED 8,500", duration: "10 Days", category: "Beach", highlights: ["Great Barrier Reef", "Gold Coast", "Bondi Beach", "Airlie Beach Sailing"] },

  // Cultural
  { dest: "Japan", image: europeImg, price: "AED 9,800", duration: "10 Days", category: "Cultural", highlights: ["Kyoto Temples", "Mt. Fuji", "Tokyo Districts", "Tea Ceremony Experience"] },
  { dest: "Morocco", image: turkeyImg, price: "AED 4,800", duration: "7 Days", category: "Cultural", highlights: ["Marrakech Medina", "Sahara Desert Camp", "Fes Old City", "Atlas Mountains"] },
  { dest: "Turkey — Heritage", image: turkeyImg, price: "AED 4,200", duration: "7 Days", category: "Cultural", highlights: ["Hagia Sophia", "Ephesus Ruins", "Pamukkale Hot Springs", "Grand Bazaar"] },

  // Day Trip
  { dest: "Dubai — City Day", image: dubaiImg, price: "AED 399", duration: "1 Day", category: "Day Trip", highlights: ["Burj Khalifa Visit", "Gold & Spice Souks", "Dubai Mall & Fountain", "Abra Creek Ride"] },
  { dest: "Sharjah Heritage Day", image: dubaiImg, price: "AED 250", duration: "1 Day", category: "Day Trip", highlights: ["Heritage Area", "Sharjah Museum", "Corniche Walk", "Local Souq"] },
  { dest: "Abu Dhabi Day Trip", image: dubaiImg, price: "AED 299", duration: "1 Day", category: "Day Trip", highlights: ["Sheikh Zayed Mosque", "Ferrari World", "Corniche Beach", "Louvre Abu Dhabi"] },

  // City Break
  { dest: "London", image: europeImg, price: "AED 7,800", duration: "5 Days", category: "City Break", highlights: ["Buckingham Palace", "Tower Bridge", "West End Show", "Premium Shopping"] },
  { dest: "Singapore — City", image: thailandImg, price: "AED 5,500", duration: "4 Days", category: "City Break", highlights: ["Clarke Quay", "Universal Studios", "Marina Bay", "Chinatown & Little India"] },
  { dest: "Dubai Weekend", image: dubaiImg, price: "AED 1,800", duration: "3 Days", category: "City Break", highlights: ["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Luxury Brunch"] },
];

const categories: Category[] = ["All", "Honeymoon", "Luxury", "Adventure", "Family", "Beach", "Cultural", "Day Trip", "City Break"];

export default function Packages() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  useEffect(() => {
    document.title = "Holiday Packages | Elite Oasis Tourism";
  }, []);

  const filtered = activeCategory === "All" ? packages : packages.filter(p => p.category === activeCategory);

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Exclusive Holiday Packages</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Curated experiences for every traveler — from romantic honeymoons to thrilling adventures and luxury escapes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-testid="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              data-testid={`filter-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <PackageCard
              key={`${p.dest}-${p.category}`}
              destination={p.dest}
              image={p.image}
              price={p.price}
              duration={p.duration}
              highlights={p.highlights}
              category={p.category}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            No packages found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
