import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export default function CafeMinimalistic() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="px-8 py-6 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-lg font-light tracking-[0.2em] text-zinc-900">BLANC</div>
          <div className="hidden md:flex items-center gap-12 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-900 transition-colors">Coffee</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Experience</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Shop</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Contact</a>
          </div>
          <Button variant="outline" className="border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-sm">
            Book Tasting
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-8">Specialty Coffee</p>
            <h1 className="text-4xl md:text-6xl font-light text-zinc-900 mb-8 leading-[1.1]">
              Pure Coffee<br />Experience
            </h1>
            <p className="text-zinc-500 text-lg mb-12 leading-relaxed">
              Single-origin coffees, expertly roasted and brewed. 
              Discover the art of specialty coffee.
            </p>
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800 px-8 py-6">
              Book a Tasting <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div>
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80"
                alt="Pour over coffee - Cafe website template"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-4">01</p>
              <h3 className="text-lg font-light text-zinc-900 mb-4">Brewing Classes</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Learn the art of pour-over, espresso, and cold brew from our expert baristas.</p>
            </div>
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-4">02</p>
              <h3 className="text-lg font-light text-zinc-900 mb-4">Private Tastings</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Curated coffee flights featuring rare single-origins from around the world.</p>
            </div>
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-4">03</p>
              <h3 className="text-lg font-light text-zinc-900 mb-4">Membership</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Monthly beans, exclusive events, and early access to limited releases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-8 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-4">Selection</p>
            <h2 className="text-3xl font-light text-zinc-900">The Menu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-6">Pour Over</p>
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                  <div>
                    <h4 className="text-zinc-900 font-light">Ethiopia Sidamo</h4>
                    <p className="text-zinc-400 text-sm">Blueberry, jasmine, bergamot</p>
                  </div>
                  <span className="text-zinc-500">$7</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                  <div>
                    <h4 className="text-zinc-900 font-light">Guatemala Antigua</h4>
                    <p className="text-zinc-400 text-sm">Chocolate, orange, spice</p>
                  </div>
                  <span className="text-zinc-500">$6</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                  <div>
                    <h4 className="text-zinc-900 font-light">Panama Geisha</h4>
                    <p className="text-zinc-400 text-sm">Tropical, floral, honey</p>
                  </div>
                  <span className="text-zinc-500">$12</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-6">Espresso</p>
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                  <div>
                    <h4 className="text-zinc-900 font-light">Espresso</h4>
                    <p className="text-zinc-400 text-sm">Double shot, house blend</p>
                  </div>
                  <span className="text-zinc-500">$4</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                  <div>
                    <h4 className="text-zinc-900 font-light">Cortado</h4>
                    <p className="text-zinc-400 text-sm">Espresso, steamed milk</p>
                  </div>
                  <span className="text-zinc-500">$5</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                  <div>
                    <h4 className="text-zinc-900 font-light">Flat White</h4>
                    <p className="text-zinc-400 text-sm">Velvety microfoam</p>
                  </div>
                  <span className="text-zinc-500">$6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-6">Experience</p>
          <h2 className="text-3xl font-light text-zinc-900 mb-8">Book Your Private Tasting</h2>
          <p className="text-zinc-500 mb-10">An intimate journey through the world's finest coffees. Limited availability.</p>
          <Button className="bg-zinc-900 text-white hover:bg-zinc-800 px-12 py-6">
            Reserve Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-lg font-light tracking-[0.2em] text-zinc-900 mb-6">BLANC</div>
            <p className="text-zinc-500 text-sm">Pure coffee.<br />Pure experience.</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-4">Hours</p>
            <p className="text-zinc-600 text-sm">Tuesday - Sunday</p>
            <p className="text-zinc-600 text-sm">8:00 AM - 5:00 PM</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-4">Visit</p>
            <p className="text-zinc-600 text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-600" /> 10 White Street, Chicago</p>
            <p className="text-zinc-600 text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-amber-600" /> (555) 111-2222</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
