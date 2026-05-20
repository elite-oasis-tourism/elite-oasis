import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, X, ChevronDown } from "lucide-react";
import { airports, type Airport } from "@/lib/airports";

interface AirportComboboxProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  "data-testid"?: string;
}

export default function AirportCombobox({
  placeholder = "City or Airport",
  value,
  onChange,
  id,
  "data-testid": testId,
}: AirportComboboxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Display label for the currently selected airport
  const selectedAirport = airports.find((a) => a.iata === value);
  const displayValue = selectedAirport
    ? `${selectedAirport.city} (${selectedAirport.iata})`
    : "";

  // Filter airports based on query
  const filtered = useCallback((): Airport[] => {
    const q = query.trim().toLowerCase();
    if (!q) return airports.slice(0, 80);
    return airports
      .filter(
        (a) =>
          a.iata.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q)
      )
      .slice(0, 60);
  }, [query]);

  const results = filtered();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keep highlighted item in view
  useEffect(() => {
    if (listRef.current) {
      const item = listRef.current.children[highlighted] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  const handleSelect = (airport: Airport) => {
    onChange(airport.iata);
    setQuery("");
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setHighlighted(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[highlighted]) handleSelect(results[highlighted]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" data-testid={testId}>
      {/* Input */}
      <div
        className={`flex items-center w-full rounded-md border bg-background text-sm transition-colors cursor-text ${
          isOpen ? "border-ring ring-2 ring-ring/30" : "border-input"
        } hover:border-ring/60`}
        onClick={() => {
          setIsOpen(true);
          setHighlighted(0);
          inputRef.current?.focus();
        }}
      >
        <MapPin className="ml-3 h-4 w-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          id={id}
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder={isOpen || !displayValue ? placeholder : ""}
          value={isOpen ? query : displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlighted(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setHighlighted(0);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 px-2 py-2 bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
          data-testid={testId ? `${testId}-input` : undefined}
        />
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="mr-2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label="Clear"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <ChevronDown className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto rounded-lg border border-border bg-popover shadow-xl text-sm"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-muted-foreground text-center">No airports found</li>
          ) : (
            results.map((airport, idx) => (
              <li
                key={`${airport.iata}-${idx}`}
                role="option"
                aria-selected={airport.iata === value}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(airport)}
                onMouseEnter={() => setHighlighted(idx)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                  idx === highlighted
                    ? "bg-primary text-primary-foreground"
                    : airport.iata === value
                    ? "bg-primary/10 text-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <span className={`font-bold text-xs w-9 shrink-0 font-mono ${idx === highlighted ? "text-primary-foreground" : "text-primary"}`}>
                  {airport.iata}
                </span>
                <span className="flex-1 truncate">
                  <span className="font-medium">{airport.city}</span>
                  <span className={`text-xs ml-1 ${idx === highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    — {airport.name}
                  </span>
                </span>
                <span className={`text-xs shrink-0 ${idx === highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {airport.country}
                </span>
              </li>
            ))
          )}
          {results.length === 80 && !query && (
            <li className="px-4 py-2 text-xs text-muted-foreground text-center border-t border-border">
              Type to search all {airports.length} airports worldwide
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
