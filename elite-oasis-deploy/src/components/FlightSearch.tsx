import { useState } from "react";
import { Search, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AirportCombobox from "@/components/AirportCombobox";

export default function FlightSearch() {
  const [tripType, setTripType] = useState("return");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Adult");
  const [travelClass, setTravelClass] = useState("Economy");

  const fromLabel = from ? from : "not specified";
  const toLabel = to ? to : "not specified";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Flight Inquiry:\nType: ${tripType}\nFrom: ${fromLabel}\nTo: ${toLabel}\nDepart: ${departDate}${tripType === "return" ? `\nReturn: ${returnDate}` : ""}\nPassengers: ${passengers}\nClass: ${travelClass}`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-card p-6 md:p-8 rounded-xl shadow-xl max-w-5xl mx-auto border border-border/50">
      <form onSubmit={handleSearch}>
        {/* Trip type */}
        <div className="mb-6">
          <RadioGroup defaultValue="return" onValueChange={setTripType} className="flex gap-6">
            {[["return", "Return"], ["oneway", "One Way"], ["multicity", "Multi City"]].map(([val, lbl]) => (
              <div key={val} className="flex items-center space-x-2">
                <RadioGroupItem value={val} id={`fs-${val}`} data-testid={`radio-fs-${val}`} />
                <Label htmlFor={`fs-${val}`}>{lbl}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Airport + Date row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="fs-from">From</Label>
            <AirportCombobox
              id="fs-from"
              placeholder="Departure City / Airport"
              value={from}
              onChange={setFrom}
              data-testid="combobox-from"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fs-to">To</Label>
            <AirportCombobox
              id="fs-to"
              placeholder="Destination City / Airport"
              value={to}
              onChange={setTo}
              data-testid="combobox-to"
            />
          </div>

          <div className="space-y-2">
            <Label>Depart</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                className="pl-9"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                data-testid="input-fs-depart"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Return</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                className="pl-9"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={tripType === "oneway"}
                data-testid="input-fs-return"
              />
            </div>
          </div>
        </div>

        {/* Passengers, class, search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Passengers</Label>
            <div className="relative">
              <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Select defaultValue="1 Adult" onValueChange={setPassengers}>
                <SelectTrigger className="pl-9" data-testid="select-fs-passengers">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["1 Adult", "2 Adults", "2 Adults + 1 Child", "2 Adults + 2 Children", "Family (4+)", "Group (6+)"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Class</Label>
            <Select defaultValue="Economy" onValueChange={setTravelClass}>
              <SelectTrigger data-testid="select-fs-class">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Economy", "Premium Economy", "Business", "First Class"].map((v) => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button type="submit" className="w-full gap-2" data-testid="button-fs-search">
              <Search className="h-4 w-4" /> Search Flights
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
