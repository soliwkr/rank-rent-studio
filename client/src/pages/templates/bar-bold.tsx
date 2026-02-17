import { Button } from "@/components/ui/button";
import { Calendar, Wine, MapPin, Phone, Lock } from "lucide-react";

export default function BarBold() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-serif">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-400">The Vault</div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-emerald-400 transition-colors">Menu</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Events</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Private</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Reserve
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/70 to-zinc-950" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80')",
            filter: "brightness(0.4) sepia(0.3)"
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-emerald-400/50 text-emerald-400 px-4 py-2 mb-6">
            <Lock className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Speakeasy</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Secrets Worth<br />Keeping
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Step back in time to an era of sophistication. Craft cocktails, whispered conversations, and an atmosphere of mystery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
              Reserve a Table
            </Button>
            <Button size="lg" variant="outline" className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10">
              View Cocktail Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-zinc-800 rounded-lg">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Craft Cocktails</h3>
              <p className="text-zinc-400">House-made syrups, rare spirits, prohibition-era recipes.</p>
            </div>
            <div className="text-center p-8 border border-zinc-800 rounded-lg">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Private Events</h3>
              <p className="text-zinc-400">Exclusive spaces for intimate gatherings up to 30 guests.</p>
            </div>
            <div className="text-center p-8 border border-zinc-800 rounded-lg">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Masterclasses</h3>
              <p className="text-zinc-400">Learn the art of cocktail making from our expert mixologists.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm mb-2">Prohibition Era Recipes</p>
            <h2 className="text-3xl md:text-4xl font-bold">Cocktail Menu</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-zinc-800 pb-2">House Signatures</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">The Vault Old Fashioned</h4>
                    <p className="text-zinc-500 text-sm">Aged bourbon, demerara, house bitters, orange</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$18</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Speakeasy Sour</h4>
                    <p className="text-zinc-500 text-sm">Rye, lemon, egg white, absinthe rinse</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$17</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Midnight Manhattan</h4>
                    <p className="text-zinc-500 text-sm">Rittenhouse rye, sweet vermouth, luxardo</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$19</span>
                </div>
              </div>
            </div>
            <div className="border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-zinc-800 pb-2">Classics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Martini</h4>
                    <p className="text-zinc-500 text-sm">Gin or vodka, dry vermouth, olive or twist</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$16</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Negroni</h4>
                    <p className="text-zinc-500 text-sm">Gin, Campari, sweet vermouth</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$15</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Sazerac</h4>
                    <p className="text-zinc-500 text-sm">Cognac, absinthe, Peychaud's bitters</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$17</span>
                </div>
              </div>
            </div>
            <div className="border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-zinc-800 pb-2">Whiskey Selection</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Pappy Van Winkle 15yr</h4>
                    <p className="text-zinc-500 text-sm">Kentucky bourbon, rare</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$65</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Yamazaki 12yr</h4>
                    <p className="text-zinc-500 text-sm">Japanese single malt</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$32</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Lagavulin 16yr</h4>
                    <p className="text-zinc-500 text-sm">Islay single malt, peated</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$24</span>
                </div>
              </div>
            </div>
            <div className="border border-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-zinc-800 pb-2">Bar Bites</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Truffle Fries</h4>
                    <p className="text-zinc-500 text-sm">Parmesan, truffle oil, herbs</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$14</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Charcuterie Board</h4>
                    <p className="text-zinc-500 text-sm">Selection of cured meats, cheese, olives</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$24</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Oysters</h4>
                    <p className="text-zinc-500 text-sm">Half dozen, mignonette, lemon</p>
                  </div>
                  <span className="text-emerald-400 font-bold">$22</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-emerald-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Know the Password?</h2>
          <p className="text-emerald-100/80 mb-8">Reservations recommended. Walk-ins welcome if there's room at the bar.</p>
          <Button size="lg" className="bg-white text-emerald-900 hover:bg-zinc-100 px-8">
            Make a Reservation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-emerald-400 mb-4">The Vault</div>
            <p className="text-zinc-500 text-sm">Enter through the bookshelf.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-zinc-400 text-sm">Wed-Thu: 7pm - 1am</p>
            <p className="text-zinc-400 text-sm">Fri-Sat: 7pm - 2am</p>
            <p className="text-zinc-400 text-sm">Sun-Tue: Closed</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> Behind 42 Secret St, Chicago</p>
            <p className="text-zinc-400 text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 000-VAULT</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
