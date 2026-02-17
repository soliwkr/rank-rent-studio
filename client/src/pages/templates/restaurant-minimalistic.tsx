import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export default function RestaurantMinimalistic() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-serif">
      {/* Navigation */}
      <nav className="px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl tracking-widest text-amber-400">NOIR</div>
          <div className="hidden md:flex items-center gap-12 text-sm tracking-wider">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Experience</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Menu</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Chef</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>
          <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 tracking-wider text-sm">
            Reservations
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 tracking-[0.3em] text-xs uppercase mb-8">Fine Dining Experience</p>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[1.1] font-light">
              Elegance in<br />Every Detail
            </h1>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-md">
              A culinary journey where artistry meets precision. Each dish tells a story of craftsmanship and passion.
            </p>
            <Button className="bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 px-8 py-6 tracking-wider">
              Reserve Experience <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Fine dining plate - Restaurant website template"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-amber-400/30" />
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="border-t border-zinc-800" />
      </div>

      {/* Experience Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <p className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">01</p>
              <h3 className="text-xl mb-4 font-light">Tasting Menu</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Eight courses of seasonal inspiration, crafted daily by Chef Laurent.</p>
            </div>
            <div>
              <p className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">02</p>
              <h3 className="text-xl mb-4 font-light">Chef's Table</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">An intimate experience at the heart of our kitchen. Limited to six guests.</p>
            </div>
            <div>
              <p className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">03</p>
              <h3 className="text-xl mb-4 font-light">Wine Pairing</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Curated selections from our sommelier to complement each course.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 tracking-[0.3em] text-xs uppercase mb-4">Culinary Excellence</p>
            <h2 className="text-3xl md:text-4xl font-light">Tasting Menu</h2>
          </div>
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-amber-400 tracking-[0.2em] text-xs uppercase mb-2">First Course</p>
                <h3 className="text-2xl font-light mb-3">Amuse-Bouche</h3>
                <p className="text-zinc-500 leading-relaxed">A delicate composition of seasonal ingredients, designed to awaken the palate for the journey ahead.</p>
              </div>
              <div className="text-right">
                <span className="text-zinc-600 text-sm tracking-wider">Included</span>
              </div>
            </div>
            <div className="border-t border-zinc-800/50" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-amber-400 tracking-[0.2em] text-xs uppercase mb-2">Second Course</p>
                <h3 className="text-2xl font-light mb-3">Hokkaido Scallop</h3>
                <p className="text-zinc-500 leading-relaxed">Seared to perfection, cauliflower purée, golden raisin, aged balsamic reduction.</p>
              </div>
              <div className="text-right">
                <span className="text-zinc-600 text-sm tracking-wider">Included</span>
              </div>
            </div>
            <div className="border-t border-zinc-800/50" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-amber-400 tracking-[0.2em] text-xs uppercase mb-2">Main Course</p>
                <h3 className="text-2xl font-light mb-3">Wagyu A5 Tenderloin</h3>
                <p className="text-zinc-500 leading-relaxed">Japanese wagyu, bone marrow butter, black truffle, seasonal root vegetables.</p>
              </div>
              <div className="text-right">
                <span className="text-zinc-600 text-sm tracking-wider">+$45 Supplement</span>
              </div>
            </div>
            <div className="border-t border-zinc-800/50" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-amber-400 tracking-[0.2em] text-xs uppercase mb-2">Dessert</p>
                <h3 className="text-2xl font-light mb-3">Dark Chocolate Sphere</h3>
                <p className="text-zinc-500 leading-relaxed">Valrhona chocolate, passion fruit curd, gold leaf, tableside presentation.</p>
              </div>
              <div className="text-right">
                <span className="text-zinc-600 text-sm tracking-wider">Included</span>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-zinc-500 text-sm mb-2">8-Course Tasting Menu</p>
            <p className="text-3xl font-light text-amber-400">$195 per guest</p>
            <p className="text-zinc-600 text-sm mt-2">Wine pairing available +$95</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 border-t border-zinc-800">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-400 tracking-[0.3em] text-xs uppercase mb-6">Begin Your Journey</p>
          <h2 className="text-3xl md:text-4xl font-light mb-8">Reservations Now Open</h2>
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 px-12 py-6 tracking-wider">
            Book Your Table
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-xl tracking-widest text-amber-400 mb-6">NOIR</div>
            <p className="text-zinc-500 text-sm">Where culinary artistry<br />meets timeless elegance.</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-4">Service Hours</p>
            <p className="text-zinc-400 text-sm">Wednesday - Sunday</p>
            <p className="text-zinc-400 text-sm">6:00 PM - 11:00 PM</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-4">Location</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /> 1 Park Avenue, NYC</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> (555) 000-0001</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
