import { Button } from "@/components/ui/button";
import { Beer, Clock, MapPin, Phone, Users } from "lucide-react";

export default function BarSimple() {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold text-stone-800">The Local Tap</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            <a href="#" className="hover:text-amber-700 transition-colors">Beer Menu</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Food</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Events</a>
            <a href="#" className="hover:text-amber-700 transition-colors">About</a>
          </div>
          <Button className="bg-amber-700 hover:bg-amber-800 text-white">
            Book a Table
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm mb-6">
              <Beer className="w-4 h-4" /> 24 Craft Beers on Tap
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-stone-800 mb-6 leading-tight">
              Good Beer,<br />Great Company
            </h1>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Your neighborhood pub with the best selection of local and international craft beers. 
              Come for the beer, stay for the atmosphere.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
                View Beer Menu
              </Button>
              <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100">
                Book for Group
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800&q=80"
                alt="Craft beer taps - Bar website template"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Beer className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Craft Selection</h3>
              <p className="text-stone-600">Rotating taps featuring local breweries and rare imports.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Happy Hour</h3>
              <p className="text-stone-600">4-7pm daily. $2 off all drafts and half-price appetizers.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Private Events</h3>
              <p className="text-stone-600">Book our back room for parties up to 40 guests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-6 bg-amber-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm mb-4">
              <Beer className="w-4 h-4" /> What's On Tap
            </div>
            <h2 className="text-2xl font-semibold text-stone-800">Menu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-amber-700 mb-4 pb-2 border-b border-stone-200">Draft Beers</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Local IPA</span>
                    <p className="text-stone-500 text-xs">Hoppy, citrus notes</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Pilsner</span>
                    <p className="text-stone-500 text-xs">Crisp, refreshing</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$6</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Stout</span>
                    <p className="text-stone-500 text-xs">Rich, coffee notes</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-stone-800">Wheat Beer</span>
                    <p className="text-stone-500 text-xs">Light, citrus</p>
                  </div>
                  <span className="text-amber-700 font-semibold">$6</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-amber-700 mb-4 pb-2 border-b border-stone-200">Wine & Spirits</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">House Red/White</span>
                  <span className="text-amber-700 font-semibold">$8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Well Cocktails</span>
                  <span className="text-amber-700 font-semibold">$9</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Whiskey Sour</span>
                  <span className="text-amber-700 font-semibold">$11</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Old Fashioned</span>
                  <span className="text-amber-700 font-semibold">$12</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-amber-700 mb-4 pb-2 border-b border-stone-200">Appetizers</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Loaded Nachos</span>
                  <span className="text-amber-700 font-semibold">$14</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Buffalo Wings</span>
                  <span className="text-amber-700 font-semibold">$13</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Soft Pretzels</span>
                  <span className="text-amber-700 font-semibold">$10</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-amber-700 mb-4 pb-2 border-b border-stone-200">Mains</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Classic Burger</span>
                  <span className="text-amber-700 font-semibold">$15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Fish & Chips</span>
                  <span className="text-amber-700 font-semibold">$16</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-800">Grilled Cheese</span>
                  <span className="text-amber-700 font-semibold">$12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-amber-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Planning a Party?</h2>
          <p className="text-amber-100 mb-8">Book our private room for your next celebration. Beer flights included!</p>
          <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50">
            Reserve Private Room
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-stone-800 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-semibold mb-4">The Local Tap</div>
            <p className="text-stone-400 text-sm">Your neighborhood craft beer destination.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-stone-400 text-sm">Mon-Thu: 4pm - 12am</p>
            <p className="text-stone-400 text-sm">Fri-Sat: 2pm - 2am</p>
            <p className="text-stone-400 text-sm">Sun: 2pm - 10pm</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Find Us</h4>
            <p className="text-stone-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 222 Main Street, Austin</p>
            <p className="text-stone-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 888-BEER</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
