import { Link } from "wouter";
import { SiInstagram, SiTiktok, SiTelegram, SiFacebook } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-primary">Elite Oasis Tourism</h3>
          <p className="text-sm text-secondary-foreground/80 leading-relaxed">
            Your trusted partner for bespoke international holidays, seamless flight bookings, and global visa services. Experience luxury travel redefined.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/"><span className="text-sm hover:text-primary transition-colors cursor-pointer">Home</span></Link></li>
            <li><Link href="/flights"><span className="text-sm hover:text-primary transition-colors cursor-pointer">Flights</span></Link></li>
            <li><Link href="/packages"><span className="text-sm hover:text-primary transition-colors cursor-pointer">Holiday Packages</span></Link></li>
            <li><Link href="/visa"><span className="text-sm hover:text-primary transition-colors cursor-pointer">Visa Services</span></Link></li>
            <li><Link href="/about"><span className="text-sm hover:text-primary transition-colors cursor-pointer">About Us</span></Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-semibold">Contact Us</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/80">
            <li>Shop No. 3, Building Number 2799</li>
            <li>Muwaileh Commercial, Industrial Area</li>
            <li>Sharjah, United Arab Emirates</li>
            <li>
              <a href="mailto:info@eliteoasistourism.com" className="hover:text-primary transition-colors">
                info@eliteoasistourism.com
              </a>
            </li>
            <li>
              <a href="tel:+971564158896" className="hover:text-primary transition-colors">
                +971 564 158 896 
                +971 67451770 (Land lIne)
                Alternate Number : +971 509512527
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-semibold">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com/eliteoasistourism" target="_blank" rel="noreferrer" className="text-[#E4405F] hover:opacity-80 transition-opacity bg-white p-2 rounded-full">
              <SiInstagram className="h-5 w-5" />
            </a>
            <a href="https://tiktok.com/@eliteoasistourism" target="_blank" rel="noreferrer" className="text-black hover:opacity-80 transition-opacity bg-white p-2 rounded-full">
              <SiTiktok className="h-5 w-5" />
            </a>
            <a href="https://t.me/eliteoasistourism" target="_blank" rel="noreferrer" className="text-[#229ED9] hover:opacity-80 transition-opacity bg-white p-2 rounded-full">
              <SiTelegram className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61583695385653" target="_blank" rel="noreferrer" className="text-[#1877F2] hover:opacity-80 transition-opacity bg-white p-2 rounded-full">
              <SiFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-border/10 text-center text-sm text-secondary-foreground/60">
        <p>&copy; {new Date().getFullYear()} Elite Oasis Tourism LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
