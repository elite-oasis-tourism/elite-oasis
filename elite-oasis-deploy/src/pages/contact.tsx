import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Elite Oasis Tourism";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Contact Form Inquiry:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.open(`https://wa.me/971564158896?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Let us help you plan your next luxurious escape. Our experts are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
            <h2 className="font-serif text-2xl font-bold mb-6">Send an Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">How can we help you?</Label>
                <Textarea id="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                Send via WhatsApp
              </Button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl">
              <h2 className="font-serif text-2xl font-bold mb-6 text-primary">Office Details</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-secondary-foreground/80">Shop No. 3, Building Number 2799<br />Muwaileh Commercial, Industrial Area<br />Sharjah, UAE</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Phone & WhatsApp</h3>
                    <a href="tel:+971564158896" className="text-secondary-foreground/80 hover:text-primary transition-colors">+971 564 158 896</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:info@eliteoasistourism.com" className="text-secondary-foreground/80 hover:text-primary transition-colors">info@eliteoasistourism.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-64 border border-border/50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.123!2d55.398!3d25.321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShop+3+Building+2799+Muwaileh+Sharjah!5e0!3m2!1sen!2sae!4v1234567890" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}