import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export default function BarMinimalistic() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-serif">
      {/* Navigation */}
      <nav className="px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl tracking-widest text-amber-400">ONYX</div>
          <div className="hidden md:flex items-center gap-12 text-sm tracking-wider">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Menu</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Experience</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Events</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>
          <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 tracking-wider text-sm">
            Reserve
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 tracking-[0.3em] text-xs uppercase mb-8">Cocktail Bar</p>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[1.1] font-light">
              Refined<br />Drinking Culture
            </h1>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-md">
              Where craftsmanship meets sophistication. Each cocktail tells a story of precision and artistry.
            </p>
            <Button className="bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 px-8 py-6 tracking-wider">
              Book Experience <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"
                alt="Craft cocktail - Bar website template"
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

      {/* Experiences Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <p className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">01</p>
              <h3 className="text-xl mb-4 font-light">Tasting Flights</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Curated selections of our signature creations, designed to take you on a journey.</p>
            </div>
            <div>
              <p className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">02</p>
              <h3 className="text-xl mb-4 font-light">Sommelier Sessions</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Private consultations with our spirits experts. Discover your perfect pour.</p>
            </div>
            <div>
              <p className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">03</p>
              <h3 className="text-xl mb-4 font-light">Corporate Events</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Elegant space for intimate gatherings. Bespoke menus available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 tracking-[0.3em] text-xs uppercase mb-4">Curated Selection</p>
            <h2 className="text-3xl md:text-4xl font-light">The Menu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-amber-400 tracking-[0.2em] text-xs uppercase mb-6">Signature Cocktails</p>
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div>
                    <h4 className="font-light">The Onyx</h4>
                    <p className="text-zinc-500 text-sm">Mezcal, amaro, citrus, activated charcoal</p>
                  </div>
                  <span className="text-zinc-400">$19</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div>
                    <h4 className="font-light">Velvet Hour</h4>
                    <p className="text-zinc-500 text-sm">Japanese whisky, sherry, fig, bitters</p>
                  </div>
                  <span className="text-zinc-400">$22</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div>
                    <h4 className="font-light">Smoke & Mirrors</h4>
                    <p className="text-zinc-500 text-sm">Scotch, honey, lemon, rosemary smoke</p>
                  </div>
                  <span className="text-zinc-400">$20</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-amber-400 tracking-[0.2em] text-xs uppercase mb-6">Rare Spirits</p>
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div>
                    <h4 className="font-light">Hibiki 21</h4>
                    <p className="text-zinc-500 text-sm">Japanese blended whisky</p>
                  </div>
                  <span className="text-zinc-400">$85</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div>
                    <h4 className="font-light">Rémy Martin Louis XIII</h4>
                    <p className="text-zinc-500 text-sm">Grande Champagne cognac</p>
                  </div>
                  <span className="text-zinc-400">$200</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                  <div>
                    <h4 className="font-light">Macallan 25</h4>
                    <p className="text-zinc-500 text-sm">Speyside single malt</p>
                  </div>
                  <span className="text-zinc-400">$150</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 border-t border-zinc-800">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-400 tracking-[0.3em] text-xs uppercase mb-6">Experience</p>
          <h2 className="text-3xl md:text-4xl font-light mb-8">Reservations Open</h2>
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 px-12 py-6 tracking-wider">
            Book Your Table
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-xl tracking-widest text-amber-400 mb-6">ONYX</div>
            <p className="text-zinc-500 text-sm">Where every drink<br />is an experience.</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-4">Hours</p>
            <p className="text-zinc-400 text-sm">Tuesday - Saturday</p>
            <p className="text-zinc-400 text-sm">6:00 PM - 2:00 AM</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-4">Location</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /> 55 Dark Lane, NYC</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> (555) 999-ONYX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
