import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/EOT_logo.jpeg";

const navLinks = [
  { name: "Home", ar: "الرئيسية", path: "/" },
  { name: "Flights", ar: "رحلات الطيران", path: "/flights" },
  { name: "Packages", ar: "الباقات", path: "/packages" },
  { name: "Umrah", ar: "العمرة", path: "/umrah" },
  { name: "Visa", ar: "التأشيرات", path: "/visa" },
  { name: "About", ar: "من نحن", path: "/about" },
  { name: "Contact", ar: "اتصل بنا", path: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <img
            src={logoImg}
            alt="Elite Oasis Tourism"
            className="h-14 w-auto cursor-pointer object-contain"
            data-testid="img-logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === link.path ? "text-primary" : "text-foreground"}`}>
                {lang === "en" ? link.name : link.ar}
              </span>
            </Link>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            <span>{lang === "en" ? "AR" : "EN"}</span>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            <span>{lang === "en" ? "AR" : "EN"}</span>
          </Button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="flex flex-col px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors hover:text-primary ${location === link.path ? "text-primary" : "text-foreground"}`}
                >
                  {lang === "en" ? link.name : link.ar}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}