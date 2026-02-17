import { Button } from "@/components/ui/button";
import { Coffee, Clock, MapPin, Phone, ShoppingBag } from "lucide-react";

export default function CafeBold() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black text-emerald-400">ROAST REVOLUTION</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-emerald-400 transition-colors">Coffee</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Shop Beans</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Locations</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">About</a>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
            Order Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-zinc-950" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80')"
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-block bg-emerald-500 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider mb-6">
            Specialty Coffee Roasters
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            COFFEE WITH<br />CHARACTER
          </h1>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Small-batch roasted. Bold flavors. Ethically sourced from farms around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8">
              Shop Beans
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Find a Location
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-zinc-800 rounded-xl bg-zinc-900/50">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Single Origin</h3>
              <p className="text-zinc-400">Unique beans from specific farms, each with its own story.</p>
            </div>
            <div className="text-center p-8 border border-zinc-800 rounded-xl bg-zinc-900/50">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Subscriptions</h3>
              <p className="text-zinc-400">Fresh beans delivered to your door. Never run out.</p>
            </div>
            <div className="text-center p-8 border border-zinc-800 rounded-xl bg-zinc-900/50">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Roasted Fresh</h3>
              <p className="text-zinc-400">Every batch roasted within 48 hours of shipping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-emerald-500 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider mb-4">
              The Menu
            </div>
            <h2 className="text-3xl md:text-4xl font-black">FUEL YOUR DAY</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/50">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 uppercase tracking-wider">Espresso Drinks</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Americano</h4>
                    <p className="text-zinc-500 text-sm">Double shot, hot water</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$4.00</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Latte</h4>
                    <p className="text-zinc-500 text-sm">Espresso, steamed milk</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$5.50</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Cortado</h4>
                    <p className="text-zinc-500 text-sm">Equal parts espresso and milk</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$4.75</span>
                </div>
              </div>
            </div>
            <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/50">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 uppercase tracking-wider">Pour Over</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Ethiopia Yirgacheffe</h4>
                    <p className="text-zinc-500 text-sm">Floral, citrus, bright</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$6.00</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Colombia Huila</h4>
                    <p className="text-zinc-500 text-sm">Chocolate, caramel, nutty</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$5.50</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Kenya AA</h4>
                    <p className="text-zinc-500 text-sm">Berry, wine, complex</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$6.50</span>
                </div>
              </div>
            </div>
            <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/50">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 uppercase tracking-wider">Food</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Avocado Toast</h4>
                    <p className="text-zinc-500 text-sm">Sourdough, poached egg</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$12.00</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Breakfast Burrito</h4>
                    <p className="text-zinc-500 text-sm">Eggs, cheese, chorizo</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$11.00</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">Açaí Bowl</h4>
                    <p className="text-zinc-500 text-sm">Granola, fresh fruit, honey</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$13.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">JOIN THE REVOLUTION</h2>
          <p className="text-emerald-100 mb-8">Subscribe and get 20% off your first order + free shipping.</p>
          <Button size="lg" className="bg-zinc-950 text-white hover:bg-zinc-800 font-bold px-8">
            Start Subscription
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-black text-emerald-400 mb-4">ROAST REVOLUTION</div>
            <p className="text-zinc-400 text-sm">Bold coffee for bold people.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Cafe Hours</h4>
            <p className="text-zinc-400 text-sm">Mon-Fri: 6am - 7pm</p>
            <p className="text-zinc-400 text-sm">Sat-Sun: 7am - 6pm</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 321 Industrial Way, Brooklyn</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 789-0123</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
