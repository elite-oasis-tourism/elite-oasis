import { useState } from "react";
import { Plane, Package, FileText, MapPin, Calendar, Users, Search, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AirportCombobox from "@/components/AirportCombobox";

const destinations = [
  "Maldives", "Bali", "Dubai", "Thailand", "Turkey", "Europe", "Australia",
  "Canada", "USA", "Singapore", "Malaysia", "Georgia", "Azerbaijan",
  "Seychelles", "New Zealand", "Morocco", "Switzerland", "UK", "Japan", "Sri Lanka",
];

const packageCategories = [
  "Honeymoon", "Luxury", "Adventure", "Family", "Beach", "Cultural", "Day Trip", "City Break",
];

const visaCountries = [
  "UAE", "Schengen (Europe)", "USA", "UK", "Canada", "Australia", "New Zealand",
  "Japan", "China", "Singapore", "Malaysia", "Thailand", "Turkey", "Georgia",
  "Azerbaijan", "Malaysia", "Indonesia (Bali)", "Sri Lanka", "Morocco",
];

const visaTypes = ["Tourist", "Transit", "Business", "Student", "Family Visit"];

const nationalities = [
  "Pakistani", "Indian", "Bangladeshi", "Filipino", "Egyptian", "Nepali",
  "Sri Lankan", "Kenyan", "Nigerian", "Iraqi", "Jordanian", "Yemeni",
  "Sudanese", "Ethiopian", "Other",
];

const umrahTiers = ["Economy (3-Star)", "Standard (4-Star)", "Premium (5-Star)", "VIP Luxury", "Ramadan Special", "Family Package"];
const umrahDurations = ["7 Nights (4N Makkah + 3N Madinah)", "10 Nights (6N Makkah + 4N Madinah)", "12 Nights (7N Makkah + 5N Madinah)", "14 Nights (9N Makkah + 5N Madinah)", "21 Nights"];
const departureCities = ["Sharjah (SHJ)", "Dubai (DXB)", "Abu Dhabi (AUH)"];

export default function HomeSearch() {
  const [activeTab, setActiveTab] = useState<"flights" | "packages" | "visa" | "umrah">("flights");

  // Flights state
  const [tripType, setTripType] = useState("return");
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Adult");
  const [travelClass, setTravelClass] = useState("Economy");

  // Packages state
  const [pkgDestination, setPkgDestination] = useState("");
  const [pkgCategory, setPkgCategory] = useState("");
  const [pkgTravelers, setPkgTravelers] = useState("2 Adults");
  const [pkgDate, setPkgDate] = useState("");

  // Visa state
  const [visaCountry, setVisaCountry] = useState("");
  const [visaType, setVisaType] = useState("");
  const [nationality, setNationality] = useState("");
  const [travelDate, setTravelDate] = useState("");

  // Umrah state
  const [umrahTier, setUmrahTier] = useState("");
  const [umrahDuration, setUmrahDuration] = useState("");
  const [umrahPilgrims, setUmrahPilgrims] = useState("2 Pilgrims");
  const [umrahDeparture, setUmrahDeparture] = useState("");
  const [umrahMonth, setUmrahMonth] = useState("");

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Flight Inquiry:\nType: ${tripType}\nFrom: ${flightFrom}\nTo: ${flightTo}\nDepart: ${departDate}${tripType === "return" ? `\nReturn: ${returnDate}` : ""}\nPassengers: ${passengers}\nClass: ${travelClass}`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handlePackageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Holiday Package Inquiry:\nDestination: ${pkgDestination || "Flexible"}\nCategory: ${pkgCategory || "Any"}\nTravelers: ${pkgTravelers}\nTravel Date: ${pkgDate || "Flexible"}`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleVisaSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Visa Inquiry:\nDestination: ${visaCountry}\nVisa Type: ${visaType || "Tourist"}\nNationality: ${nationality}\nTravel Date: ${travelDate || "Flexible"}`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleUmrahSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Umrah Package Inquiry:\nPackage Tier: ${umrahTier || "Any"}\nDuration: ${umrahDuration || "Flexible"}\nPilgrims: ${umrahPilgrims}\nDeparture: ${umrahDeparture || "Sharjah/Dubai"}\nTravel Month: ${umrahMonth || "Flexible"}\n\nPlease share available packages and pricing. JazakAllah Khair.`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-card/95 backdrop-blur rounded-2xl shadow-2xl max-w-5xl mx-auto border border-border/40 overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-border/50">
        {([
          { id: "flights", label: "Flights", icon: Plane },
          { id: "packages", label: "Packages", icon: Package },
          { id: "umrah", label: "Umrah", icon: Moon },
          { id: "visa", label: "Visa", icon: FileText },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            data-testid={`tab-${id}`}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all ${
              activeTab === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {/* FLIGHTS TAB */}
        {activeTab === "flights" && (
          <form onSubmit={handleFlightSearch}>
            <div className="mb-6">
              <RadioGroup defaultValue="return" onValueChange={setTripType} className="flex gap-6">
                {[["return", "Return"], ["oneway", "One Way"], ["multicity", "Multi City"]].map(([val, lbl]) => (
                  <div key={val} className="flex items-center space-x-2">
                    <RadioGroupItem value={val} id={`trip-${val}`} data-testid={`radio-${val}`} />
                    <Label htmlFor={`trip-${val}`}>{lbl}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="hs-from">From</Label>
                <AirportCombobox
                  id="hs-from"
                  placeholder="Departure City / Airport"
                  value={flightFrom}
                  onChange={setFlightFrom}
                  data-testid="combobox-hs-from"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hs-to">To</Label>
                <AirportCombobox
                  id="hs-to"
                  placeholder="Destination City / Airport"
                  value={flightTo}
                  onChange={setFlightTo}
                  data-testid="combobox-hs-to"
                />
              </div>
              <div className="space-y-2">
                <Label>Depart</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="date"
                    data-testid="input-depart"
                    value={departDate}
                    onChange={e => setDepartDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Return</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="date"
                    data-testid="input-return"
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    disabled={tripType === "oneway"}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-40"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Passengers</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Select defaultValue="1 Adult" onValueChange={setPassengers}>
                    <SelectTrigger className="pl-9" data-testid="select-passengers">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["1 Adult", "2 Adults", "2 Adults + 1 Child", "2 Adults + 2 Children", "Family (4+)", "Group (6+)"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Class</Label>
                <Select defaultValue="Economy" onValueChange={setTravelClass}>
                  <SelectTrigger data-testid="select-class">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Economy", "Premium Economy", "Business", "First Class"].map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" size="lg" className="w-full gap-2" data-testid="button-search-flights">
                  <Search className="h-4 w-4" /> Search Flights
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* PACKAGES TAB */}
        {activeTab === "packages" && (
          <form onSubmit={handlePackageSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Select onValueChange={setPkgDestination}>
                    <SelectTrigger className="pl-9" data-testid="select-pkg-destination">
                      <SelectValue placeholder="Any Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={setPkgCategory}>
                  <SelectTrigger data-testid="select-pkg-category">
                    <SelectValue placeholder="Any Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageCategories.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Travelers</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Select defaultValue="2 Adults" onValueChange={setPkgTravelers}>
                    <SelectTrigger className="pl-9" data-testid="select-pkg-travelers">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["1 Adult", "2 Adults", "2 Adults + 1 Child", "2 Adults + 2 Children", "Family (4+)", "Group (6+)"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Travel Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="month"
                    data-testid="input-pkg-date"
                    value={pkgDate}
                    onChange={e => setPkgDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full gap-2" data-testid="button-search-packages">
              <Search className="h-4 w-4" /> Find Packages
            </Button>
          </form>
        )}

        {/* VISA TAB */}
        {activeTab === "visa" && (
          <form onSubmit={handleVisaSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Visa For</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Select onValueChange={setVisaCountry}>
                    <SelectTrigger className="pl-9" data-testid="select-visa-country">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {visaCountries.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Visa Type</Label>
                <Select onValueChange={setVisaType}>
                  <SelectTrigger data-testid="select-visa-type">
                    <SelectValue placeholder="Tourist" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nationality</Label>
                <Select onValueChange={setNationality}>
                  <SelectTrigger data-testid="select-nationality">
                    <SelectValue placeholder="Your Nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map(n => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Travel Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="month"
                    data-testid="input-visa-date"
                    value={travelDate}
                    onChange={e => setTravelDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full gap-2" data-testid="button-search-visa">
              <Search className="h-4 w-4" /> Check Visa Options
            </Button>
          </form>
        )}

        {/* UMRAH TAB */}
        {activeTab === "umrah" && (
          <form onSubmit={handleUmrahSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Package Tier</Label>
                <Select onValueChange={setUmrahTier}>
                  <SelectTrigger data-testid="select-umrah-tier">
                    <SelectValue placeholder="Any Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {umrahTiers.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Select onValueChange={setUmrahDuration}>
                    <SelectTrigger className="pl-9" data-testid="select-umrah-duration">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {umrahDurations.map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Pilgrims</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Select defaultValue="2 Pilgrims" onValueChange={setUmrahPilgrims}>
                    <SelectTrigger className="pl-9" data-testid="select-umrah-pilgrims">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["1 Pilgrim", "2 Pilgrims", "3 Pilgrims", "4 Pilgrims", "Family (5–8)", "Group (9+)"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Travel Month</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="month"
                    data-testid="input-umrah-month"
                    value={umrahMonth}
                    onChange={e => setUmrahMonth(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Departure City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Select onValueChange={setUmrahDeparture}>
                    <SelectTrigger className="pl-9" data-testid="select-umrah-departure">
                      <SelectValue placeholder="Sharjah / Dubai / Abu Dhabi" />
                    </SelectTrigger>
                    <SelectContent>
                      {departureCities.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-end">
                <Button type="submit" size="lg" className="w-full gap-2 bg-emerald-700 hover:bg-emerald-800 text-white" data-testid="button-search-umrah">
                  <Search className="h-4 w-4" /> Find Umrah Package
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Flights · Visa · Hotels · Ziyarat · 24/7 Support — all included. Departures from Sharjah & Dubai.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
