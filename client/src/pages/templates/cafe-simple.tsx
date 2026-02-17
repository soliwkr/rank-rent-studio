import { Button } from "@/components/ui/button";
import { Coffee, MapPin, Phone, Wifi, Clock } from "lucide-react";

export default function CafeSimple() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-xl font-medium text-stone-800">Morning Ritual</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            <a href="#" className="hover:text-amber-700 transition-colors">Menu</a>
            <a href="#" className="hover:text-amber-700 transition-colors">About</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Location</a>
          </div>
          <Button className="bg-amber-700 hover:bg-amber-800 text-white text-sm">
            Order Online
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-700 text-sm font-medium mb-4">Your Neighborhood Coffee Shop</p>
          <h1 className="text-4xl md:text-5xl font-medium text-stone-800 mb-6">
            Your Daily Escape
          </h1>
          <p className="text-lg text-stone-600 mb-10 max-w-xl mx-auto">
            A calm space for great coffee, quiet work, and a moment to breathe.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
              View Menu
            </Button>
            <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">
              Find Us
            </Button>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80"
              alt="Coffee shop interior - Cafe website template"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-medium text-stone-800 mb-2">Quality Coffee</h3>
              <p className="text-stone-600 text-sm">Locally roasted, carefully brewed, always fresh.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-medium text-stone-800 mb-2">Free Wifi</h3>
              <p className="text-stone-600 text-sm">Work remotely with fast, reliable internet.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-medium text-stone-800 mb-2">Mobile Ordering</h3>
              <p className="text-stone-600 text-sm">Skip the line. Order ahead for pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-700 text-sm font-medium mb-2">Simple & Good</p>
            <h2 className="text-2xl font-medium text-stone-800">Our Menu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-amber-700 mb-4 pb-2 border-b border-stone-200">Coffee</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Drip Coffee</span>
                    <p className="text-stone-500 text-xs">House blend</p>
                  </div>
                  <span className="text-amber-700 font-medium">$3.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Latte</span>
                    <p className="text-stone-500 text-xs">Oat milk available</p>
                  </div>
                  <span className="text-amber-700 font-medium">$4.75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Cold Brew</span>
                    <p className="text-stone-500 text-xs">24-hour steeped</p>
                  </div>
                  <span className="text-amber-700 font-medium">$4.50</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-amber-700 mb-4 pb-2 border-b border-stone-200">Tea</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Earl Grey</span>
                    <p className="text-stone-500 text-xs">Bergamot, citrus</p>
                  </div>
                  <span className="text-amber-700 font-medium">$3.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Matcha Latte</span>
                    <p className="text-stone-500 text-xs">Ceremonial grade</p>
                  </div>
                  <span className="text-amber-700 font-medium">$5.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Chai Latte</span>
                    <p className="text-stone-500 text-xs">House-made spice blend</p>
                  </div>
                  <span className="text-amber-700 font-medium">$5.00</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-amber-700 mb-4 pb-2 border-b border-stone-200">Pastries</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Croissant</span>
                  <span className="text-amber-700 font-medium">$4.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Scone</span>
                  <span className="text-amber-700 font-medium">$3.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Banana Bread</span>
                  <span className="text-amber-700 font-medium">$4.00</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-amber-700 mb-4 pb-2 border-b border-stone-200">Light Bites</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Avocado Toast</span>
                  <span className="text-amber-700 font-medium">$9.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Yogurt Parfait</span>
                  <span className="text-amber-700 font-medium">$7.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Egg Sandwich</span>
                  <span className="text-amber-700 font-medium">$8.50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-amber-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-medium text-white mb-4">Join Our Loyalty Program</h2>
          <p className="text-amber-100 mb-8">Every 10th drink is on us. Simple rewards for loyal customers.</p>
          <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50">
            Sign Up Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-stone-800 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-medium mb-4">Morning Ritual</div>
            <p className="text-stone-400 text-sm">Your daily escape for great coffee.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Hours</h4>
            <p className="text-stone-400 text-sm">Mon-Fri: 6am - 6pm</p>
            <p className="text-stone-400 text-sm">Sat-Sun: 7am - 5pm</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Location</h4>
            <p className="text-stone-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 88 Quiet Street, Portland</p>
            <p className="text-stone-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 345-6789</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
