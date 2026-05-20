import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PackageProps {
  destination: string;
  image: string;
  price: string;
  duration: string;
  highlights: string[];
  category?: string;
}

const categoryColors: Record<string, string> = {
  Honeymoon: "bg-pink-500",
  Luxury: "bg-yellow-600",
  Adventure: "bg-orange-500",
  Family: "bg-blue-500",
  Beach: "bg-cyan-500",
  Cultural: "bg-purple-500",
  "Day Trip": "bg-green-500",
  "City Break": "bg-slate-500",
};

export default function PackageCard({ destination, image, price, duration, highlights, category }: PackageProps) {
  const handleEnquire = () => {
    const text = `Hello, I'm interested in the ${destination} ${category ? `(${category}) ` : ""}holiday package (${duration}) starting at ${price}. Please share more details.`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      data-testid={`card-package-${destination}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-border/50"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={destination}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {category && (
          <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[category] ?? "bg-primary"}`}>
            {category}
          </span>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-serif text-2xl font-bold">{destination}</h3>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-4">
          <span className="text-muted-foreground text-sm">Starting from</span>
          <span className="font-bold text-primary text-xl">{price}</span>
        </div>

        <ul className="space-y-2 mb-6">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <Button onClick={handleEnquire} className="w-full group/btn" variant="outline" data-testid={`button-enquire-${destination}`}>
          Enquire on WhatsApp
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
