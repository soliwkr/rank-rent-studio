import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, Star, ChevronRight } from "lucide-react";

export default function RestaurantBold() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-400">Ember & Oak</div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-emerald-400 transition-colors">Menu</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Reservations</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Private Dining</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Book a Table
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80')",
            filter: "brightness(0.6)"
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-emerald-400 uppercase tracking-[0.3em] text-sm mb-4">Premium Steakhouse</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium Cuts.<br />Bold Flavors.
          </h1>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Experience the art of dry-aged steaks, crafted with precision and served with passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
              Reserve Your Table
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              View Menu
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 rotate-90 text-emerald-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-zinc-800 rounded-lg">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prime Selection</h3>
              <p className="text-zinc-400">USDA Prime cuts, dry-aged for 28+ days for exceptional flavor.</p>
            </div>
            <div className="text-center p-8 border border-zinc-800 rounded-lg">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Open Late</h3>
              <p className="text-zinc-400">Serving dinner until midnight, seven days a week.</p>
            </div>
            <div className="text-center p-8 border border-zinc-800 rounded-lg">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Private Events</h3>
              <p className="text-zinc-400">Exclusive dining rooms for your special occasions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm mb-2">Our Selection</p>
            <h2 className="text-3xl md:text-4xl font-bold">The Menu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Starters */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-emerald-400 border-b border-zinc-800 pb-2">Starters</h3>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Wagyu Beef Tartare</h4>
                  <p className="text-zinc-400 text-sm">Quail egg, capers, shallots, house-made chips</p>
                </div>
                <span className="text-emerald-400 font-bold">$28</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Jumbo Lump Crab Cake</h4>
                  <p className="text-zinc-400 text-sm">Remoulade sauce, micro greens</p>
                </div>
                <span className="text-emerald-400 font-bold">$24</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">French Onion Soup</h4>
                  <p className="text-zinc-400 text-sm">Gruyère crouton, caramelized onions</p>
                </div>
                <span className="text-emerald-400 font-bold">$16</span>
              </div>
            </div>
            {/* Steaks */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-emerald-400 border-b border-zinc-800 pb-2">Prime Steaks</h3>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Filet Mignon 8oz</h4>
                  <p className="text-zinc-400 text-sm">The most tender cut, 28-day dry aged</p>
                </div>
                <span className="text-emerald-400 font-bold">$62</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">NY Strip 14oz</h4>
                  <p className="text-zinc-400 text-sm">Bold flavor, perfect marbling</p>
                </div>
                <span className="text-emerald-400 font-bold">$58</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Bone-In Ribeye 20oz</h4>
                  <p className="text-zinc-400 text-sm">Rich, buttery, our signature cut</p>
                </div>
                <span className="text-emerald-400 font-bold">$78</span>
              </div>
            </div>
            {/* Sides */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-emerald-400 border-b border-zinc-800 pb-2">Sides</h3>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Truffle Mac & Cheese</h4>
                  <p className="text-zinc-400 text-sm">Black truffle, aged cheddar</p>
                </div>
                <span className="text-emerald-400 font-bold">$18</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Creamed Spinach</h4>
                  <p className="text-zinc-400 text-sm">Classic steakhouse style</p>
                </div>
                <span className="text-emerald-400 font-bold">$14</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Loaded Baked Potato</h4>
                  <p className="text-zinc-400 text-sm">Bacon, sour cream, chives</p>
                </div>
                <span className="text-emerald-400 font-bold">$12</span>
              </div>
            </div>
            {/* Desserts */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-emerald-400 border-b border-zinc-800 pb-2">Desserts</h3>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">New York Cheesecake</h4>
                  <p className="text-zinc-400 text-sm">Berry compote, whipped cream</p>
                </div>
                <span className="text-emerald-400 font-bold">$14</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Chocolate Lava Cake</h4>
                  <p className="text-zinc-400 text-sm">Vanilla bean ice cream</p>
                </div>
                <span className="text-emerald-400 font-bold">$16</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Crème Brûlée</h4>
                  <p className="text-zinc-400 text-sm">Madagascar vanilla, caramelized sugar</p>
                </div>
                <span className="text-emerald-400 font-bold">$12</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-emerald-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for an Unforgettable Experience?</h2>
          <p className="text-emerald-100/80 mb-8">Reserve your table today and discover why we're the city's premier steakhouse.</p>
          <Button size="lg" className="bg-white text-emerald-900 hover:bg-zinc-100 px-8">
            Make a Reservation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-emerald-400 mb-4">Ember & Oak</div>
            <p className="text-zinc-400 text-sm">Premium steakhouse experience in the heart of the city.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-zinc-400 text-sm">Mon-Thu: 5pm - 11pm</p>
            <p className="text-zinc-400 text-sm">Fri-Sat: 5pm - 12am</p>
            <p className="text-zinc-400 text-sm">Sun: 4pm - 10pm</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Main Street, NYC</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
