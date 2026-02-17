import { Button } from "@/components/ui/button";
import { Anchor, Bed, Wifi, MapPin, Phone, Coffee } from "lucide-react";

export default function HotelSimple() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-xl font-medium text-slate-800">Harbor Inn</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Rooms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Amenities</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Location</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Book Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium mb-4">
            <Anchor className="w-4 h-4" /> Waterfront Inn
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-slate-800 mb-6">
            Coastal Comfort
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
            A quiet retreat steps from the harbor. Simple rooms, ocean breezes, and the perfect base for exploring the coast.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Check Availability
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              View Rooms
            </Button>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80"
              alt="Coastal view - Hotel website template"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-medium text-slate-800 text-center mb-10">Room Types</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-lg p-6">
              <Bed className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-medium text-slate-800 mb-2">Standard Room</h3>
              <p className="text-slate-600 text-sm mb-4">Queen bed, garden view, ensuite bath.</p>
              <p className="text-blue-600 font-medium">From $99/night</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <Bed className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-medium text-slate-800 mb-2">Harbor View</h3>
              <p className="text-slate-600 text-sm mb-4">King bed, private balcony, water views.</p>
              <p className="text-blue-600 font-medium">From $149/night</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-6">
              <Bed className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-medium text-slate-800 mb-2">Family Suite</h3>
              <p className="text-slate-600 text-sm mb-4">Two bedrooms, kitchenette, sleeps 5.</p>
              <p className="text-blue-600 font-medium">From $199/night</p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-medium text-slate-800 text-center mb-10">Included with Every Stay</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Coffee className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-700 text-sm">Continental Breakfast</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Wifi className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-700 text-sm">Free WiFi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-700 text-sm">Free Parking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Anchor className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-slate-700 text-sm">Beach Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium mb-2">
              <Anchor className="w-4 h-4" /> Book Your Stay
            </div>
            <h2 className="text-2xl font-medium text-slate-800">Check Availability</h2>
          </div>
          <div className="border border-slate-200 rounded-lg p-6">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm text-slate-600 mb-2">Check-in</label>
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-slate-500">Select date</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Check-out</label>
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-slate-500">Select date</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Guests</label>
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-slate-500">2 Adults</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Room Type</label>
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-slate-500">Any Room</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10">
                Search Rooms
              </Button>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-slate-500">
            Book direct for the best rates. Free cancellation up to 24 hours before check-in.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-medium text-white mb-4">Ready for Your Coastal Getaway?</h2>
          <p className="text-blue-100 mb-8">Book direct and save 10% on your stay.</p>
          <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
            Check Availability
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-800 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-medium mb-4">Harbor Inn</div>
            <p className="text-slate-400 text-sm">Your coastal retreat on the water.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Check-in / Check-out</h4>
            <p className="text-slate-400 text-sm">Check-in: 3pm onwards</p>
            <p className="text-slate-400 text-sm">Check-out: by 11am</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Location</h4>
            <p className="text-slate-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 15 Harbor Road, Cape Cod</p>
            <p className="text-slate-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 567-HARBOR</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
