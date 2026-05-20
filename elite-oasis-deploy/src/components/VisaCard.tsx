import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Clock, ShieldCheck } from "lucide-react";

interface VisaProps {
  country: string;
  types: string[];
  processingTime: string;
  priceStart: string;
}

export default function VisaCard({ country, types, processingTime, priceStart }: VisaProps) {
  const handleEnquire = () => {
    const text = `Hello, I need information about ${country} visa services.`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-serif text-2xl font-bold text-primary mb-2">{country}</h3>
      <div className="text-2xl font-bold mb-6">{priceStart} <span className="text-sm font-normal text-muted-foreground">starting price</span></div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">Visa Categories</div>
            <div className="text-sm text-muted-foreground">{types.join(", ")}</div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">Processing Time</div>
            <div className="text-sm text-muted-foreground">{processingTime}</div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">High Success Rate</div>
            <div className="text-sm text-muted-foreground">Expert documentation assistance</div>
          </div>
        </div>
      </div>
      
      <Button onClick={handleEnquire} className="w-full">
        Apply Now
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}