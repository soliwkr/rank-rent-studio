import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight, Bed } from "lucide-react";

export default function HotelMinimalistic() {
  return (
    <div className="min-h-screen bg-white font-serif">
      {/* Navigation */}
      <nav className="px-8 py-6 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-lg font-light tracking-[0.2em] text-zinc-900">THE WHITE HOUSE</div>
          <div className="hidden md:flex items-center gap-12 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-900 transition-colors">Suites</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Experience</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Spa</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Contact</a>
          </div>
          <Button variant="outline" className="border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-sm">
            Book Suite
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-8">Countryside B&B</p>
            <h1 className="text-4xl md:text-6xl font-light text-zinc-900 mb-8 leading-[1.1]">
              Timeless<br />Elegance
            </h1>
            <p className="text-zinc-500 text-lg mb-12 leading-relaxed">
              A refined countryside retreat. Beautifully appointed suites, 
              tranquil gardens, and impeccable service.
            </p>
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800 px-8 py-6">
              Reserve Your Suite <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div>
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                alt="Luxury suite - Hotel website template"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Suites Section */}
      <section className="py-24 px-8 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase text-center mb-4">Accommodations</p>
          <h2 className="text-3xl font-light text-zinc-900 text-center mb-16">Our Suites</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="aspect-[4/3] bg-zinc-200 mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                  <Bed className="w-12 h-12 text-zinc-400" />
                </div>
              </div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-2">Garden Suite</p>
              <h3 className="text-lg font-light text-zinc-900 mb-2">Peaceful Retreat</h3>
              <p className="text-zinc-500 text-sm mb-4">King bed, garden terrace, marble bath.</p>
              <p className="text-zinc-900">From $249/night</p>
            </div>
            <div>
              <div className="aspect-[4/3] bg-zinc-200 mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                  <Bed className="w-12 h-12 text-zinc-400" />
                </div>
              </div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-2">Manor Suite</p>
              <h3 className="text-lg font-light text-zinc-900 mb-2">Grand Living</h3>
              <p className="text-zinc-500 text-sm mb-4">Separate sitting room, fireplace, estate views.</p>
              <p className="text-zinc-900">From $349/night</p>
            </div>
            <div>
              <div className="aspect-[4/3] bg-zinc-200 mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                  <Bed className="w-12 h-12 text-zinc-400" />
                </div>
              </div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-2">The Residence</p>
              <h3 className="text-lg font-light text-zinc-900 mb-2">Ultimate Luxury</h3>
              <p className="text-zinc-500 text-sm mb-4">Two bedrooms, private dining, butler service.</p>
              <p className="text-zinc-900">From $549/night</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-4">01</p>
              <h3 className="text-lg font-light text-zinc-900 mb-4">Spa & Wellness</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Rejuvenating treatments in our tranquil garden spa.</p>
            </div>
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-4">02</p>
              <h3 className="text-lg font-light text-zinc-900 mb-4">Private Dining</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Intimate dinners prepared by our resident chef.</p>
            </div>
            <div>
              <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-4">03</p>
              <h3 className="text-lg font-light text-zinc-900 mb-4">Estate Gardens</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">10 acres of manicured grounds to explore.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 px-8 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-4">Reservations</p>
            <h2 className="text-3xl font-light text-zinc-900">Book Your Stay</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-3">Arrival</p>
              <div className="border-b border-zinc-200 pb-2">
                <span className="text-zinc-900 font-light">Select date</span>
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-3">Departure</p>
              <div className="border-b border-zinc-200 pb-2">
                <span className="text-zinc-900 font-light">Select date</span>
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-3">Guests</p>
              <div className="border-b border-zinc-200 pb-2">
                <span className="text-zinc-900 font-light">2 Guests</span>
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-3">Suite</p>
              <div className="border-b border-zinc-200 pb-2">
                <span className="text-zinc-900 font-light">Any Suite</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800 px-12 py-6 tracking-wider">
              Check Availability <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="mt-12 flex justify-center gap-12 text-xs text-zinc-400">
            <span>Best rate guaranteed</span>
            <span>Complimentary breakfast</span>
            <span>Flexible cancellation</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 border-t border-zinc-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-6">Experience</p>
          <h2 className="text-3xl font-light text-zinc-900 mb-8">Begin Your Stay</h2>
          <p className="text-zinc-500 mb-10">Complimentary breakfast and afternoon tea with every booking.</p>
          <Button className="bg-zinc-900 text-white hover:bg-zinc-800 px-12 py-6">
            Reserve Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-lg font-light tracking-[0.2em] text-zinc-900 mb-6">THE WHITE HOUSE</div>
            <p className="text-zinc-500 text-sm">Timeless elegance in<br />the English countryside.</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-4">Arrival</p>
            <p className="text-zinc-600 text-sm">Check-in from 3pm</p>
            <p className="text-zinc-600 text-sm">Check-out by 11am</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase mb-4">Location</p>
            <p className="text-zinc-600 text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-600" /> White House Lane, Cotswolds</p>
            <p className="text-zinc-600 text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-amber-600" /> +44 1234 567890</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
