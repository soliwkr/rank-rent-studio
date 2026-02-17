import { Button } from "@/components/ui/button";
import { Calendar, Utensils, MapPin, Phone, Star, Music } from "lucide-react";

export default function RestaurantVibrant() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-500">Fiesta Kitchen</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white">
            <a href="#" className="hover:text-orange-300 transition-colors">Menu</a>
            <a href="#" className="hover:text-orange-300 transition-colors">Order Online</a>
            <a href="#" className="hover:text-orange-300 transition-colors">Catering</a>
            <a href="#" className="hover:text-orange-300 transition-colors">About</a>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Reserve Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-rose-500 to-pink-500" />
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&q=80')"
          }}
        />
        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm mb-6">
              <span className="mr-2">🌮</span> Authentic Fusion Cuisine
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Taste the<br />Energy!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Modern Mexican fusion that brings bold flavors and vibrant atmosphere to every dish.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8">
                Book a Table
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Order Takeout
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Why Fiesta Kitchen?</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Fresh ingredients, bold spices, and recipes passed down through generations.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Fresh Daily</h3>
              <p className="text-zinc-600 text-sm">Made from scratch every morning</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-rose-50 border border-rose-100">
              <div className="w-14 h-14 bg-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Award Winning</h3>
              <p className="text-zinc-600 text-sm">Best Fusion Restaurant 2024</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-pink-50 border border-pink-100">
              <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Easy Booking</h3>
              <p className="text-zinc-600 text-sm">Reserve in seconds online</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Music className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Live Music</h3>
              <p className="text-zinc-600 text-sm">Friday & Saturday nights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Our Menu</h2>
            <p className="text-zinc-600">Bold flavors, fresh ingredients, unforgettable taste</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
              <div className="text-orange-500 text-sm font-bold uppercase tracking-wider mb-4">Tacos</div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Carne Asada</h4>
                    <p className="text-zinc-500 text-sm">Grilled steak, onions, cilantro, salsa verde</p>
                  </div>
                  <span className="text-orange-500 font-bold">$4.50</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Al Pastor</h4>
                    <p className="text-zinc-500 text-sm">Marinated pork, pineapple, onions</p>
                  </div>
                  <span className="text-orange-500 font-bold">$4.25</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Fish Baja</h4>
                    <p className="text-zinc-500 text-sm">Crispy fish, cabbage slaw, chipotle crema</p>
                  </div>
                  <span className="text-orange-500 font-bold">$5.00</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
              <div className="text-rose-500 text-sm font-bold uppercase tracking-wider mb-4">Burritos</div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">California Burrito</h4>
                    <p className="text-zinc-500 text-sm">Carne asada, fries, guac, sour cream</p>
                  </div>
                  <span className="text-rose-500 font-bold">$14.95</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Carnitas</h4>
                    <p className="text-zinc-500 text-sm">Slow-cooked pork, beans, rice, salsa</p>
                  </div>
                  <span className="text-rose-500 font-bold">$13.95</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Veggie Supreme</h4>
                    <p className="text-zinc-500 text-sm">Grilled veggies, black beans, rice, cheese</p>
                  </div>
                  <span className="text-rose-500 font-bold">$12.95</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
              <div className="text-pink-500 text-sm font-bold uppercase tracking-wider mb-4">Specialties</div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Nachos Grande</h4>
                    <p className="text-zinc-500 text-sm">Loaded nachos with all the toppings</p>
                  </div>
                  <span className="text-pink-500 font-bold">$16.95</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Enchiladas Suizas</h4>
                    <p className="text-zinc-500 text-sm">Three enchiladas, tomatillo cream sauce</p>
                  </div>
                  <span className="text-pink-500 font-bold">$15.95</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-900">Churros</h4>
                    <p className="text-zinc-500 text-sm">Cinnamon sugar, chocolate sauce</p>
                  </div>
                  <span className="text-pink-500 font-bold">$8.95</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-rose-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Party?</h2>
          <p className="text-white/90 mb-8">Book your table now and get ready for an unforgettable dining experience!</p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8">
            Make a Reservation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-orange-400 mb-4">Fiesta Kitchen</div>
            <p className="text-zinc-400 text-sm">Bold flavors, vibrant atmosphere, unforgettable experiences.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-zinc-400 text-sm">Mon-Thu: 11am - 10pm</p>
            <p className="text-zinc-400 text-sm">Fri-Sat: 11am - 12am</p>
            <p className="text-zinc-400 text-sm">Sun: 10am - 9pm</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> 456 Sunset Blvd, LA</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 987-6543</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
