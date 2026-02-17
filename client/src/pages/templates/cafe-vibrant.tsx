import { Button } from "@/components/ui/button";
import { Cake, Coffee, Gift, MapPin, Phone, Clock } from "lucide-react";

export default function CafeVibrant() {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-500">Sunshine Bakery</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-600">
            <a href="#" className="hover:text-orange-500 transition-colors">Menu</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Order Online</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Catering</a>
            <a href="#" className="hover:text-orange-500 transition-colors">About</a>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Order Ahead
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="text-lg">☀️</span> Open 7 Days a Week
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 leading-tight">
              Baked with<br /><span className="text-orange-500">Joy!</span>
            </h1>
            <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
              Fresh pastries, artisan breads, and specialty coffee to brighten your day. Made fresh every morning!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Order for Pickup
              </Button>
              <Button size="lg" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                View Menu
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
                alt="Fresh pastries - Cafe website template"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-zinc-900 px-6 py-3 rounded-xl font-bold shadow-lg">
              Fresh Daily!
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-zinc-900 mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-orange-50 rounded-2xl">
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cake className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Fresh Pastries</h3>
              <p className="text-zinc-600 text-sm">Croissants, muffins, and more baked every morning</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-2xl">
              <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Specialty Coffee</h3>
              <p className="text-zinc-600 text-sm">Locally roasted beans, expertly brewed</p>
            </div>
            <div className="text-center p-6 bg-rose-50 rounded-2xl">
              <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Custom Cakes</h3>
              <p className="text-zinc-600 text-sm">Order your dream cake for any occasion</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-2xl">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Catering</h3>
              <p className="text-zinc-600 text-sm">Breakfast and lunch catering for events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Our Menu</h2>
            <p className="text-zinc-600">Fresh baked goods and specialty drinks</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-orange-500 font-bold text-sm uppercase mb-4">Pastries</div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Butter Croissant</span>
                  <span className="text-orange-500 font-bold">$4.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Almond Croissant</span>
                  <span className="text-orange-500 font-bold">$5.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Blueberry Muffin</span>
                  <span className="text-orange-500 font-bold">$3.75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Cinnamon Roll</span>
                  <span className="text-orange-500 font-bold">$4.25</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-yellow-600 font-bold text-sm uppercase mb-4">Breads</div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Sourdough Loaf</span>
                  <span className="text-yellow-600 font-bold">$8.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Baguette</span>
                  <span className="text-yellow-600 font-bold">$4.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Olive Focaccia</span>
                  <span className="text-yellow-600 font-bold">$7.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Multigrain Loaf</span>
                  <span className="text-yellow-600 font-bold">$7.50</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-rose-500 font-bold text-sm uppercase mb-4">Coffee</div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Latte</span>
                  <span className="text-rose-500 font-bold">$5.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Cappuccino</span>
                  <span className="text-rose-500 font-bold">$4.75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Mocha</span>
                  <span className="text-rose-500 font-bold">$5.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Cold Brew</span>
                  <span className="text-rose-500 font-bold">$5.00</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-amber-600 font-bold text-sm uppercase mb-4">Sandwiches</div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Ham & Cheese</span>
                  <span className="text-amber-600 font-bold">$9.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Turkey Club</span>
                  <span className="text-amber-600 font-bold">$10.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">Veggie Wrap</span>
                  <span className="text-amber-600 font-bold">$8.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800">BLT</span>
                  <span className="text-amber-600 font-bold">$9.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-400 to-yellow-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Order Your Birthday Cake!</h2>
          <p className="text-white/90 mb-8">Custom cakes for birthdays, weddings, and special events. Order 48 hours in advance.</p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
            Start Your Order
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-orange-400 mb-4">Sunshine Bakery</div>
            <p className="text-zinc-400 text-sm">Spreading joy one pastry at a time.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Hours</h4>
            <p className="text-zinc-400 text-sm">Mon-Fri: 6am - 6pm</p>
            <p className="text-zinc-400 text-sm">Sat-Sun: 7am - 5pm</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Find Us</h4>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 555 Sunny Lane, Miami</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
