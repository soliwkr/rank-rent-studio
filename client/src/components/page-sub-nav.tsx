import { Link, useLocation } from "wouter";

interface SubNavItem {
  label: string;
  href?: string;
  id?: string;
}

interface PageSubNavProps {
  items?: SubNavItem[];
  sections?: SubNavItem[];
}

export function PageSubNav({ items, sections }: PageSubNavProps) {
  const [location] = useLocation();
  const navItems = items || sections || [];

  if (navItems.length === 0) return null;

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="flex flex-wrap gap-1 p-1 bg-muted rounded-lg" data-testid="page-sub-nav">
      {navItems.map((item) => {
        if (item.id) {
          return (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id!)}
              className="px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors text-muted-foreground hover-elevate"
              data-testid={`subnav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.label}
            </button>
          );
        }
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href || "#"}>
            <span className={`px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors ${isActive ? 'bg-background shadow-sm' : 'text-muted-foreground hover-elevate'}`}
              data-testid={`subnav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default PageSubNav;
