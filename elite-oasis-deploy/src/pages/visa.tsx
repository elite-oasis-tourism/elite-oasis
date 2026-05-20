import { useEffect } from "react";
import VisaCard from "@/components/VisaCard";

const visas = [
  { country: "UAE", types: ["Tourist", "Transit", "Business"], processingTime: "2-3 Working Days", priceStart: "AED 350" },
  { country: "Schengen", types: ["Tourist", "Business"], processingTime: "10-15 Working Days", priceStart: "AED 850" },
  { country: "USA", types: ["B1/B2 Tourist", "Business"], processingTime: "Variable", priceStart: "AED 1,200" },
  { country: "UK", types: ["Standard Visitor", "Business"], processingTime: "15-20 Working Days", priceStart: "AED 950" },
  { country: "Canada", types: ["Visitor Visa"], processingTime: "20-30 Working Days", priceStart: "AED 1,100" },
  { country: "Australia", types: ["Visitor (Subclass 600)"], processingTime: "15-25 Working Days", priceStart: "AED 1,050" },
];

export default function Visa() {
  useEffect(() => {
    document.title = "Visa Services | Elite Oasis Tourism";
  }, []);

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Global Visa Services</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Expert assistance for your travel documentation. We ensure a smooth and hassle-free visa application process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((v) => (
            <VisaCard key={v.country} {...v} />
          ))}
        </div>
      </div>
    </div>
  );
}