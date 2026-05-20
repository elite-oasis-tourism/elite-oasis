import { useEffect } from "react";
import FlightSearch from "@/components/FlightSearch";

export default function Flights() {
  useEffect(() => {
    document.title = "Book Flights | Elite Oasis Tourism";
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Global Flight Bookings</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Experience seamless air travel. Search and book flights with premium carriers worldwide.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-24">
        <FlightSearch />
      </div>
    </div>
  );
}