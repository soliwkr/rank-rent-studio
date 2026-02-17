import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LogIn, Globe, ArrowRight, ChevronDown, Utensils, Coffee, Wine, Hotel, Building, MessageSquare, Phone, Bot, BarChart3, Search, TrendingUp, Globe2, Layout, Palette, Code, Headphones, Shield, Zap, FileText, HelpCircle, BookOpen, Mail, MapPin, Calendar, Moon, Sun, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { SiteSearch } from "./site-search";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
];
import indexFlowLogo from "@assets/image_1771351451425.png";

const solutions = [
  { href: "/solutions/restaurants", label: "Restaurants", icon: Utensils, desc: "Table management & online reservations" },
  { href: "/solutions/hotels", label: "Hotels", icon: Hotel, desc: "Room booking & AI concierge" },
  { href: "/solutions/cafes", label: "Cafés", icon: Coffee, desc: "Quick-service & walk-in management" },
  { href: "/solutions/bars", label: "Bars", icon: Wine, desc: "Nightlife & event booking management" },
];

const featureItems = [
  { href: "/platform/ai-concierge", label: "Virtual Concierge", icon: Bot, desc: "AI booking widget on your website" },
  { href: "/features/voice-booking", label: "Voice Booking (AI)", icon: Phone, desc: "Twilio | Hospitality Customer Service number" },
  { href: "/features/sms-confirmations", label: "SMS Confirmations", icon: MessageSquare, desc: "Automated booking confirmations & reminders" },
];

const moreFeatureItems = [
  { href: "/features/prepaid-reservations", label: "RSVP Monetized", icon: Shield, desc: "Prepaid reservations to reduce no-shows" },
  { href: "/features/waitlist", label: "Waitlist Management", icon: Calendar, desc: "Smart queue & capacity control" },
  { href: "/features/multi-language", label: "Multi-Language Booking", icon: Globe2, desc: "Accept bookings in 20+ languages" },
];

const resourceItems = [
  { href: "/blog", label: "Blog", icon: BookOpen, desc: "Hospitality industry insights & tips" },
  { href: "/docs", label: "Documentation", icon: FileText, desc: "Setup guides & API reference" },
  { href: "/faq", label: "FAQ", icon: HelpCircle, desc: "Frequently asked questions" },
  { href: "/testimonials", label: "Testimonials", icon: MessageSquare, desc: "Client reviews & feedback" },
  { href: "/case-studies", label: "Case Studies", icon: FileText, desc: "In-depth client success stories" },
];

const platformItems = [
  { href: "/platform/dashboard", label: "Client Dashboard", icon: Layout, desc: "Set-up manage venue operations" },
  { href: "/platform/integrations", label: "Integrations", icon: Code, desc: "Stripe | PayPal | Twilio" },
  { href: "/platform/byok", label: "BYOK", icon: Shield, desc: "Bring Your Own AI Keys" },
];

const webDesignItems = [
  { href: "/platform/hospitality-websites", label: "Hospitality Websites", icon: Globe, desc: "Bespoke Industry Solutions" },
  { href: "/platform/seo", label: "Search Engine Optimization", icon: Search, desc: "SEO done for you" },
  { href: "/platform/content-marketing", label: "Content Marketing", icon: BookOpen, desc: "Blog articles done for you" },
  { href: "/services/local-citations", label: "Local Citations", icon: MapPin, desc: "Get found across 50+ directories" },
  { href: "/solutions/multi-location", label: "Multiple Location Pages", icon: Building, desc: "Show up in Google across every city or area you operate in" },
];

const analyticsItems = [
  { href: "/platform/local-search-grid", label: "Local Search Grid", icon: Grid3X3, desc: "See where you rank across the map" },
  { href: "/platform/rank-tracking", label: "Rank Tracking", icon: TrendingUp, desc: "Monitor 1000 Keywords on Google + AI" },
  { href: "/platform/search-console", label: "GSC", icon: Search, desc: "Google Search Console integrated" },
  { href: "/features/analytics", label: "Analytics", icon: BarChart3, desc: "Booking, widget & call performance" },
];

const comparisonNavItems = [
  { href: "/comparisons/opentable", label: "OpenTable Alternative", icon: Utensils, desc: "Why venues switch from OpenTable" },
  { href: "/comparisons/resy", label: "Resy Alternative", icon: Calendar, desc: "Resto vs Resy side-by-side" },
  { href: "/comparisons/best-booking-systems", label: "Best Booking Systems", icon: Search, desc: "2026 restaurant booking software guide" },
  { href: "/comparisons/pricing", label: "Pricing Comparison", icon: FileText, desc: "Transparent cost breakdown" },
  { href: "/comparisons/platform", label: "Platform Comparison", icon: BarChart3, desc: "Feature-by-feature capability matrix" },
];

const contactItems = [
  { href: "/contact", label: "Contact Us", icon: Mail, desc: "Get in touch" },
  { href: "/contact", label: "Book a Demo", icon: Calendar, desc: "See it live" },
  { href: "/locations", label: "Locations", icon: Globe2, desc: "Find us nearby" },
];

interface NavItem {
  href: string;
  label: string;
  icon: any;
  hash?: string;
  desc?: string;
}

interface MegaColumn {
  label: string;
  items: NavItem[];
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  location: string;
  testId: string;
  variant?: "utility" | "main";
  align?: "start" | "end";
  columns?: MegaColumn[];
  footer?: { label: string; href: string };
}

function MegaMenuItem({ item, location, testId, onClick }: { item: NavItem; location: string; testId: string; onClick: () => void }) {
  const active = location === item.href;
  return (
    <Link href={item.href}>
      <div
        className={`flex items-start gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${active ? "bg-primary/10 dark:bg-primary/20" : "hover-elevate"}`}
        data-testid={testId}
        onClick={onClick}
      >
        <div className={`mt-0.5 p-1.5 rounded-md shrink-0 ${active ? "bg-primary/20 dark:bg-primary/30" : "bg-muted dark:bg-muted/50"}`}>
          <item.icon className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className={`text-sm font-medium leading-tight ${active ? "text-primary" : ""}`}>{item.label}</span>
          {item.desc && <span className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</span>}
        </div>
      </div>
    </Link>
  );
}

function NavDropdown({ label, items, location, testId, variant = "main", align = "start", columns, footer }: NavDropdownProps) {
  const allItems = columns ? columns.flatMap(c => c.items) : items;
  const isActive = allItems.some((item) => location === item.href || location.startsWith(item.href + "/"));
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  if (variant === "utility") {
    return (
      <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <button
          className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors outline-none"
          data-testid={testId}
          onClick={() => setOpen((v) => !v)}
        >
          {label}
          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className={`absolute top-full pt-1 z-50 ${align === "end" ? "right-0" : "left-0"}`}>
            <div className="min-w-[160px] rounded-md border border-border/50 bg-white dark:bg-popover shadow-sm p-1">
              {items.map((item) => (
                <Link key={item.label} href={item.href}>
                  <div
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer hover-elevate transition-colors"
                    data-testid={`${testId}-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const isMega = columns && columns.length > 0;

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={`flex items-center gap-1 text-sm font-medium transition-colors px-3 py-2 rounded-md outline-none ${
          isActive
            ? "text-primary dark:text-primary"
            : "text-foreground/70 hover:text-foreground dark:text-gray-300 dark:hover:text-white"
        }`}
        data-testid={testId}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className={`absolute top-full pt-2 z-50 ${align === "end" ? "right-0" : isMega ? "left-1/2 -translate-x-1/2" : "left-0"}`}>
          {isMega ? (
            <div className="rounded-lg border border-border/50 bg-white dark:bg-popover shadow-lg">
              <div className="flex p-2 gap-0">
                {columns.map((col, idx) => (
                  <div key={col.label} className={`min-w-[240px] ${idx > 0 ? "border-l border-border/30 pl-2" : ""}`}>
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{col.label}</div>
                    <div className="space-y-0.5">
                      {col.items.map((item) => (
                        <MegaMenuItem
                          key={item.label}
                          item={item}
                          location={location}
                          testId={`${testId}-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => setOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {footer && (
                <div className="border-t border-border/30 px-4 py-3 bg-muted/30 dark:bg-muted/10 rounded-b-lg">
                  <Link href={footer.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between"
                      data-testid={`${testId}-footer-cta`}
                      onClick={() => setOpen(false)}
                    >
                      {footer.label}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="min-w-[280px] rounded-lg border border-border/50 bg-white dark:bg-popover shadow-lg p-2">
              <div className="space-y-0.5">
                {items.map((item) => (
                  <MegaMenuItem
                    key={item.label}
                    item={item}
                    location={location}
                    testId={`${testId}-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface MobileDropdownProps {
  label: string;
  items: NavItem[];
  location: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  testId: string;
  sections?: { label: string; items: NavItem[] }[];
}

function MobileDropdown({ label, items, location, isOpen, onToggle, onNavigate, testId, sections }: MobileDropdownProps) {
  const allItems = sections ? sections.flatMap(s => s.items) : items;
  return (
    <div>
      <button
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
          isOpen || allItems.some((i) => location === i.href || location.startsWith(i.href + "/"))
            ? "text-primary bg-primary/5"
            : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
        }`}
        onClick={onToggle}
        data-testid={testId}
      >
        {label}
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pl-3 py-1 space-y-0.5">
          {sections ? (
            sections.map((section) => (
              <div key={section.label}>
                <div className="px-3 py-1.5 mt-1 first:mt-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </div>
                {section.items.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        location === item.href || location.startsWith(item.href + "/")
                          ? "text-primary bg-primary/5"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                      }`}
                      onClick={onNavigate}
                      data-testid={`${testId}-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            ))
          ) : (
            items.map((item) => (
              <Link key={item.label} href={item.href}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                    location === item.href || location.startsWith(item.href + "/")
                      ? "text-primary bg-primary/5"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={onNavigate}
                  data-testid={`${testId}-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>{item.label}</span>
                    {item.desc && <span className="text-xs text-muted-foreground">{item.desc}</span>}
                  </div>
                </button>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, label, location, testId }: { href: string; label: string; location: string; testId: string }) {
  const isActive = location === href;
  return (
    <Link
      href={href}
      className={`flex items-center text-sm font-medium transition-colors px-3 py-2 rounded-md relative ${
        isActive
          ? "text-primary dark:text-primary"
          : "text-foreground/70 hover:text-foreground dark:text-gray-300 dark:hover:text-white"
      }`}
      data-testid={testId}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="hidden lg:block bg-primary dark:bg-primary/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-4">
              <NavDropdown label="Resources" items={resourceItems} location={location} testId="link-nav-resources" variant="utility" />
              <NavDropdown label="Contact" items={contactItems} location={location} testId="link-nav-contact" variant="utility" />
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors outline-none focus:outline-none focus:ring-0" data-testid="button-language">
                    <Globe className="w-3 h-3" />
                    EN
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-border/50 shadow-sm">
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} data-testid={`lang-${lang.code}`}>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={() => {
                  const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
                  const next = current === "light" ? "dark" : "light";
                  document.documentElement.classList.toggle("dark", next === "dark");
                  localStorage.setItem("theme", next);
                }}
                className="text-white/80 hover:text-white transition-colors outline-none focus:outline-none"
                data-testid="button-theme-toggle-utility"
              >
                <Moon className="w-3.5 h-3.5 dark:hidden text-white" />
                <Sun className="w-3.5 h-3.5 hidden dark:block text-white" />
              </button>
              <Link href="/client-login">
                <span className="text-xs text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1" data-testid="button-login">
                  <LogIn className="w-3 h-3" />
                  Client Login
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            <Link href="/" className="flex items-center flex-shrink-0" data-testid="link-home-logo">
              <img
                src={indexFlowLogo}
                alt="indexFlow - AI Booking Software for Restaurants, Cafes, Bars & Hotels"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              <NavLink href="/how-it-works" label="How It Works" location={location} testId="link-nav-how-it-works" />
              <NavDropdown
                label="Solutions"
                items={solutions}
                location={location}
                testId="link-nav-solutions"
                footer={{ label: "See all solutions", href: "/solutions/restaurants" }}
              />
              <NavDropdown
                label="Platform"
                items={[]}
                location={location}
                testId="link-nav-platform"
                columns={[
                  { label: "Control Center", items: platformItems },
                  { label: "Services", items: webDesignItems },
                  { label: "Performance", items: analyticsItems },
                ]}
                footer={{ label: "View pricing & plans", href: "/pricing" }}
              />
              <NavDropdown
                label="Features"
                items={[]}
                location={location}
                testId="link-nav-features"
                columns={[
                  { label: "What You Can Do", items: featureItems },
                  { label: "Booking Tools", items: moreFeatureItems },
                ]}
              />
              <NavDropdown label="Why Resto" items={comparisonNavItems} location={location} testId="link-nav-why-resto" />
              <NavLink href="/pricing" label="Pricing" location={location} testId="link-nav-pricing" />
              <NavLink href="/blog" label="Blog" location={location} testId="link-nav-blog" />
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <SiteSearch />
              <Link href="/pricing">
                <Button variant="outline" data-testid="button-get-started">Get Started</Button>
              </Link>
              <Link href="/book-demo">
                <Button className="dark:text-white" data-testid="button-book-demo">Book a Demo</Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="outline-none focus:outline-none focus:ring-0" data-testid="button-language">
                    <Globe className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-border/50 shadow-sm">
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} data-testid={`lang-${lang.code}`}>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                data-testid="button-mobile-menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[calc(100vh-3.5rem)] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white dark:bg-gray-900 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="py-3 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-0.5">
              <Link href="/how-it-works">
                <button
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    location === "/how-it-works"
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                  data-testid="link-mobile-how-it-works"
                >
                  How It Works
                </button>
              </Link>
              <MobileDropdown
                label="Solutions"
                items={solutions}
                location={location}
                isOpen={openMobileDropdown === "solutions"}
                onToggle={() => toggleMobileDropdown("solutions")}
                onNavigate={() => setIsOpen(false)}
                testId="link-mobile-solutions"
              />
              <MobileDropdown
                label="Platform"
                items={[]}
                location={location}
                isOpen={openMobileDropdown === "platform"}
                onToggle={() => toggleMobileDropdown("platform")}
                onNavigate={() => setIsOpen(false)}
                testId="link-mobile-platform"
                sections={[
                  { label: "Control Center", items: platformItems },
                  { label: "Services", items: webDesignItems },
                  { label: "Performance", items: analyticsItems },
                ]}
              />
              <MobileDropdown
                label="Features"
                items={[]}
                location={location}
                isOpen={openMobileDropdown === "features"}
                onToggle={() => toggleMobileDropdown("features")}
                onNavigate={() => setIsOpen(false)}
                testId="link-mobile-features"
                sections={[
                  { label: "What You Can Do", items: featureItems },
                  { label: "Booking Tools", items: moreFeatureItems },
                ]}
              />
              <MobileDropdown
                label="Why Resto"
                items={comparisonNavItems}
                location={location}
                isOpen={openMobileDropdown === "compare"}
                onToggle={() => toggleMobileDropdown("compare")}
                onNavigate={() => setIsOpen(false)}
                testId="link-mobile-why-resto"
              />
              <Link href="/pricing">
                <button
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    location === "/pricing"
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                  data-testid="link-mobile-pricing"
                >
                  Pricing
                </button>
              </Link>
              <Link href="/blog">
                <button
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    location === "/blog"
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                  data-testid="link-mobile-blog"
                >
                  Blog
                </button>
              </Link>

              <div className="border-t border-border/30 my-2" />

              <div className="flex flex-col gap-2 px-3 py-2">
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => setIsOpen(false)}
                    data-testid="link-mobile-get-started"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/book-demo">
                  <Button
                    className="w-full justify-center dark:text-white"
                    onClick={() => setIsOpen(false)}
                    data-testid="link-mobile-book-demo"
                  >
                    Book a Demo
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/client-login">
                  <Button
                    variant="ghost"
                    className="w-full justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                    data-testid="link-mobile-client-login"
                  >
                    <LogIn className="w-4 h-4" />
                    Client Login
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
