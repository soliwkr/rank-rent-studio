import { Link } from "wouter";
import { Mail, Utensils, Hotel, Coffee, Wine, Building, Layout, Code, Shield, Globe, Search, TrendingUp, BarChart3, BookOpen, Bot, Phone, MessageSquare, Calendar, Globe2, FileText, HelpCircle, DollarSign, MapPin } from "lucide-react";
import { SiLinkedin, SiX, SiFacebook, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import indexFlowLogo from "@assets/image_1771351451425.png";

const discoverLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
  { href: "/book-demo", label: "Book a Demo" },
];

const whoThisIsForLinks = [
  { href: "/solutions/restaurants", label: "Restaurants" },
  { href: "/solutions/hotels", label: "Hotels" },
  { href: "/solutions/cafes", label: "Cafés" },
  { href: "/solutions/bars", label: "Bars" },
  { href: "/1/today", label: "Client Login" },
  { href: "/admin", label: "Admin" },
];

const featureLinks = [
  { href: "/platform/ai-concierge", label: "Virtual Concierge" },
  { href: "/features/voice-booking", label: "Voice Booking (AI)" },
  { href: "/features/sms-confirmations", label: "SMS Confirmations" },
  { href: "/features/prepaid-reservations", label: "Prepaid Reservations" },
  { href: "/features/waitlist", label: "Waitlist Management" },
  { href: "/features/multi-language", label: "Multi-Language Booking" },
];

const servicesLinks = [
  { href: "/platform/hospitality-websites", label: "Hospitality Websites" },
  { href: "/platform/seo", label: "SEO" },
  { href: "/platform/content-marketing", label: "Content Marketing" },
  { href: "/services/local-citations", label: "Local Citations" },
  { href: "/solutions/multi-location", label: "Multiple Location Pages" },
];

const resourceLinks = [
  { href: "/docs", label: "Documentation" },
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/case-studies", label: "Case Studies" },
];

const whyRestoLinks = [
  { href: "/comparisons/opentable", label: "vs OpenTable" },
  { href: "/comparisons/resy", label: "vs Resy" },
  { href: "/comparisons/best-booking-systems", label: "Best Booking Systems" },
  { href: "/comparisons/pricing", label: "Pricing Comparison" },
  { href: "/comparisons/platform", label: "Platform Comparison" },
];

const platformFooterLinks = [
  { href: "/platform/dashboard", label: "Client Dashboard" },
  { href: "/platform/integrations", label: "Integrations" },
  { href: "/platform/byok", label: "BYOK" },
  { href: "/platform/local-search-grid", label: "Local Search Grid" },
  { href: "/platform/rank-tracking", label: "Rank Tracking" },
  { href: "/platform/search-console", label: "Google Search Console" },
  { href: "/features/analytics", label: "Analytics" },
];

const locationLinks = [
  { href: "/locations", label: "All Locations" },
  { href: "/locations/new-york", label: "New York" },
  { href: "/locations/london", label: "London" },
  { href: "/locations/paris", label: "Paris" },
  { href: "/locations/dublin", label: "Dublin" },
  { href: "/locations/sydney", label: "Sydney" },
  { href: "/locations/toronto", label: "Toronto" },
];

interface FooterLink {
  href: string;
  label: string;
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4 text-sm text-foreground">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted/40 dark:bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6">
          <FooterColumn title="Discover" links={discoverLinks} />
          <FooterColumn title="Solutions" links={whoThisIsForLinks} />
          <FooterColumn title="Features" links={featureLinks} />
          <FooterColumn title="Services" links={servicesLinks} />
          <FooterColumn title="Platform" links={platformFooterLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Locations" links={locationLinks} />
        </div>

        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link href="/" className="shrink-0" data-testid="link-footer-logo">
                <img
                  src={indexFlowLogo}
                  alt="indexFlow - Restaurant Booking Software & AI Virtual Concierge"
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered booking and website platform for hospitality.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn" data-testid="link-footer-linkedin">
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="X (Twitter)" data-testid="link-footer-x">
                <SiX className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook" data-testid="link-footer-facebook">
                <SiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram" data-testid="link-footer-instagram">
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
          <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Resto.restaurant</span>
            <span className="hidden sm:inline text-border">|</span>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-privacy"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-terms"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>hello@resto.restaurant</span>
          </div>
        </div>
      </div>

      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-blue-400 to-purple-400" />
      <div className="bg-background py-3 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by{" "}
          <a
            href="https://projectbuilt.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            data-testid="link-powered-by"
          >
            projectbuilt.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
