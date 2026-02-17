import { SiWordpress, SiShopify, SiSquarespace, SiWix, SiWebflow } from "react-icons/si";

const partners = [
  { name: "WordPress", icon: SiWordpress },
  { name: "Shopify", icon: SiShopify },
  { name: "Squarespace", icon: SiSquarespace },
  { name: "Wix", icon: SiWix },
  { name: "Webflow", icon: SiWebflow },
];

export function CMSPartners() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8" data-testid="cms-partners">
      {partners.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-muted-foreground" data-testid={`partner-${p.name.toLowerCase()}`}>
          <p.icon className="w-6 h-6" />
          <span className="text-sm font-medium">{p.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CMSPartners;
