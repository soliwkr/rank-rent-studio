import { Button } from "@/components/ui/button";
import { Mountain, Bed, Utensils, MapPin, Phone, Calendar } from "lucide-react";

export default function HotelBold() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-400">Mountain View Lodge</div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-emerald-400 transition-colors">Rooms</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Activities</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Dining</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Gallery</a>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Book Your Stay
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/20 to-zinc-950" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-emerald-400/50 text-emerald-400 px-4 py-2 mb-6">
            <Mountain className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Boutique Mountain Retreat</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Adventure<br />Awaits
          </h1>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Nestled in the heart of the mountains. Cozy rooms, stunning views, and unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
              Check Availability
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              View Rooms
            </Button>
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Accommodations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-800 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 flex items-center justify-center">
                <Bed className="w-12 h-12 text-emerald-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Mountain Suite</h3>
                <p className="text-zinc-400 text-sm mb-4">King bed, fireplace, mountain views. Perfect for couples.</p>
                <p className="text-emerald-400 font-bold">From $199/night</p>
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 flex items-center justify-center">
                <Bed className="w-12 h-12 text-emerald-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Family Cabin</h3>
                <p className="text-zinc-400 text-sm mb-4">Two bedrooms, full kitchen, private deck. Sleeps 6.</p>
                <p className="text-emerald-400 font-bold">From $349/night</p>
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 flex items-center justify-center">
                <Bed className="w-12 h-12 text-emerald-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Cozy Room</h3>
                <p className="text-zinc-400 text-sm mb-4">Queen bed, ensuite bathroom, forest views.</p>
                <p className="text-emerald-400 font-bold">From $149/night</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 border border-zinc-800 rounded-lg">
            <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mountain className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Adventure Packages</h3>
            <p className="text-zinc-400">Hiking, skiing, kayaking. We'll plan your perfect adventure.</p>
          </div>
          <div className="text-center p-8 border border-zinc-800 rounded-lg">
            <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">On-Site Restaurant</h3>
            <p className="text-zinc-400">Farm-to-table dining with stunning mountain views.</p>
          </div>
          <div className="text-center p-8 border border-zinc-800 rounded-lg">
            <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flexible Booking</h3>
            <p className="text-zinc-400">Easy online reservations. Free cancellation up to 48h.</p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm mb-2">Reserve Your Stay</p>
            <h2 className="text-3xl md:text-4xl font-bold">Check Availability</h2>
          </div>
          <div className="border border-zinc-800 rounded-xl p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Check-in</label>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <span className="text-white">Select date</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Check-out</label>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <span className="text-white">Select date</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Guests</label>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
                  <span className="text-white">2 Adults</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Room Type</label>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
                  <span className="text-white">Any Room</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-12">
                Search Availability
              </Button>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center text-sm text-zinc-400">
            <div>Best rate guarantee when booking direct</div>
            <div>Free cancellation up to 48 hours</div>
            <div>Breakfast included with every stay</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-emerald-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Adventure</h2>
          <p className="text-emerald-100/80 mb-8">Book directly for the best rates. Breakfast included with every stay.</p>
          <Button size="lg" className="bg-white text-emerald-900 hover:bg-zinc-100 px-8">
            Check Availability
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-emerald-400 mb-4">Mountain View Lodge</div>
            <p className="text-zinc-500 text-sm">Your mountain escape awaits.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Reception Hours</h4>
            <p className="text-zinc-400 text-sm">7am - 10pm Daily</p>
            <p className="text-zinc-400 text-sm">Late check-in available</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 1 Summit Road, Aspen</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) LODGE-01</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
