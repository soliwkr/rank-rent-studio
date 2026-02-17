import { Button } from "@/components/ui/button";
import { Leaf, Clock, MapPin, Phone, Heart } from "lucide-react";

export default function RestaurantSimple() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold text-stone-800">The Garden Table</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            <a href="#" className="hover:text-amber-700 transition-colors">Menu</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Our Story</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Reservations</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Contact</a>
          </div>
          <Button className="bg-amber-700 hover:bg-amber-800 text-white">
            Book a Table
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-6">
              <Leaf className="w-4 h-4" /> Farm to Table
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-stone-800 mb-6 leading-tight">
              Farm Fresh,<br />Simply Served
            </h1>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              We believe in honest cooking. Fresh ingredients from local farms, simple preparations that let the flavors shine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
                Reserve a Table
              </Button>
              <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100">
                View Menu
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
                alt="Fresh salad - Restaurant website template"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">100% Organic</p>
                  <p className="text-sm text-stone-500">Locally sourced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Seasonal Menu</h3>
              <p className="text-stone-600">Our menu changes with the seasons, ensuring the freshest ingredients on your plate.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Easy Reservations</h3>
              <p className="text-stone-600">Book your table online in just a few clicks. We'll save your favorite spot.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Gift Cards</h3>
              <p className="text-stone-600">Share the love of good food with our beautiful gift cards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-4">
              <Leaf className="w-4 h-4" /> Seasonal Menu
            </div>
            <h2 className="text-3xl font-semibold text-stone-800">Our Menu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-amber-700 mb-4 border-b border-stone-200 pb-2">Starters</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Garden Salad</h4>
                    <p className="text-stone-500 text-sm">Mixed greens, cherry tomatoes, herb vinaigrette</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$12</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Roasted Beet Soup</h4>
                    <p className="text-stone-500 text-sm">Local beets, goat cheese, dill</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$10</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Burrata & Heirloom Tomatoes</h4>
                    <p className="text-stone-500 text-sm">Fresh basil, olive oil, sea salt</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$16</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-amber-700 mb-4 border-b border-stone-200 pb-2">Mains</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Grilled Salmon</h4>
                    <p className="text-stone-500 text-sm">Seasonal vegetables, lemon butter</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$28</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Herb Roasted Chicken</h4>
                    <p className="text-stone-500 text-sm">Free-range, root vegetables, jus</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$24</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Wild Mushroom Risotto</h4>
                    <p className="text-stone-500 text-sm">Arborio rice, parmesan, truffle oil</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$22</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-amber-700 mb-4 border-b border-stone-200 pb-2">Sides</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Roasted Vegetables</h4>
                    <p className="text-stone-500 text-sm">Chef's seasonal selection</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$8</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Garlic Mashed Potatoes</h4>
                    <p className="text-stone-500 text-sm">Yukon gold, butter, chives</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$7</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-amber-700 mb-4 border-b border-stone-200 pb-2">Desserts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Apple Crumble</h4>
                    <p className="text-stone-500 text-sm">Local apples, vanilla ice cream</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$10</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-stone-800">Seasonal Fruit Tart</h4>
                    <p className="text-stone-500 text-sm">Butter crust, pastry cream</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-amber-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Join Us for a Meal</h2>
          <p className="text-amber-100 mb-8">Experience the simple pleasure of good food, made with care.</p>
          <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50">
            Make a Reservation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-stone-800 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-semibold mb-4">The Garden Table</div>
            <p className="text-stone-400 text-sm">Farm fresh. Simply served. Always delicious.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-stone-400 text-sm">Tue-Sat: 11am - 9pm</p>
            <p className="text-stone-400 text-sm">Sun: 10am - 3pm (Brunch)</p>
            <p className="text-stone-400 text-sm">Mon: Closed</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Find Us</h4>
            <p className="text-stone-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 789 Farm Road, Portland</p>
            <p className="text-stone-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 234-5678</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
