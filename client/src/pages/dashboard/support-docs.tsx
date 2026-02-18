import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, FileEdit, BarChart3, Target, Users, Receipt, MessageSquare, Code, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "getting-started", title: "Getting Started", description: "Learn the basics and set up your account", articles: 8, icon: BookOpen },
  { id: "content-engine", title: "Content Engine", description: "Create and manage AI-powered content", articles: 12, icon: FileEdit },
  { id: "seo-tools", title: "SEO Tools", description: "Optimize your site for search engines", articles: 15, icon: BarChart3 },
  { id: "rank-tracker", title: "Rank Tracker", description: "Monitor keyword rankings and positions", articles: 6, icon: Target },
  { id: "crm", title: "CRM", description: "Manage contacts and pipeline", articles: 9, icon: Users },
  { id: "invoices", title: "Invoices", description: "Billing, payments, and invoice management", articles: 5, icon: Receipt },
  { id: "widget", title: "Widget", description: "Configure and embed the AI chat widget", articles: 7, icon: MessageSquare },
  { id: "api-reference", title: "API Reference", description: "Developer documentation and endpoints", articles: 18, icon: Code },
  { id: "faqs", title: "FAQs", description: "Frequently asked questions and answers", articles: 22, icon: HelpCircle },
];

export default function SupportDocs() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Documentation</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-docs"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cat) => (
          <Card
            key={cat.id}
            className="hover-elevate cursor-pointer"
            data-testid={`card-category-${cat.id}`}
            onClick={() => toast({ title: `Opening ${cat.title}...`, description: `Browsing ${cat.articles} articles` })}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <cat.icon className="w-5 h-5 text-muted-foreground" />
                {cat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{cat.description}</p>
              <p className="text-xs text-muted-foreground" data-testid={`text-article-count-${cat.id}`}>{cat.articles} articles</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
