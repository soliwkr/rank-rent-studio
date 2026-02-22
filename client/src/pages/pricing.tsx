import { Link } from "wouter";
import { Check, ArrowRight, Users, Layers, Building2, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { SEO, seoData } from "@/components/seo";
import { colorShadows } from "@/lib/color-shadows";

const plans = [
  {
    name: "Solo",
    price: "$99",
    period: "per month",
    tagline: "Stop paying for 6 tools. Pay for one.",
    highlight: false,
    features: [
      "1 user",
      "1 workspace",
      "40 AI posts/month",
      "All 40+ tools included",
      "Google Indexing Automation",
      "Rank Tracker — 1,000 keywords",
      "Email support",
    ],
    cta: "Get Started",
    ctaLink: "/contact",
    icon: Users,
  },
  {
    name: "Pro",
    price: "$199",
    period: "per month",
    tagline: "Turn your SEO service into a product.",
    highlight: true,
    features: [
      "5 users",
      "50 white label workspaces",
      "Bulk campaigns",
      "Everything in Solo",
      "Full white-label branding",
      "Client-facing dashboards",
      "Reseller licence included",
      "Priority support",
    ],
    cta: "Start Free 30-Day Trial",
    ctaLink: "/contact",
    icon: Layers,
  },
  {
    name: "Agency",
    price: "$349",
    period: "per month",
    tagline: "Infrastructure for agencies that mean business.",
    highlight: false,
    features: [
      "10 users",
      "100 white label workspaces",
      "Full white label",
      "Everything in Pro",
      "Advanced API access",
      "Priority onboarding call",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    ctaLink: "/contact",
    icon: Building2,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    tagline: "You've outgrown tools. You need infrastructure.",
    highlight: false,
    features: [
      "Unlimited everything",
      "Super Admin Dashboard",
      "Dedicated support",
      "Custom contracts",
      "White glove onboarding",
      "SLA guarantees",
      "Co-marketing options",
    ],
    cta: "Talk To Us",
    ctaLink: "/contact",
    icon: Crown,
  },
];

export default function Pricing() {
  return (
    <Layout>
      <SEO {...seoData.pricing} />
      <div className="min-h-screen">
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="text-pricing-title">
                Simple Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-pricing-subtitle">
                Plans that scale with you.<br />
                Start small, grow without limits. No contracts, cancel anytime. Every plan includes all 40+ tools.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-start">
              {plans.map((plan, i) => (
                <Card
                  key={plan.name}
                  className={`relative overflow-visible transition-all hover:-translate-y-1 ${colorShadows[i % colorShadows.length]} ${plan.highlight ? "ring-2 ring-primary/30" : ""}`}
                  data-testid={`card-pricing-${plan.name.toLowerCase()}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-yellow-500 text-black border-0 shadow-[0_0_20px_rgba(234,179,8,0.5)]" data-testid="badge-popular">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8 pb-2">
                    <CardTitle className="text-xl" data-testid={`text-plan-name-${plan.name.toLowerCase()}`}>
                      {plan.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold" data-testid={`text-price-${plan.name.toLowerCase()}`}>
                          {plan.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                    </div>

                    <p className="text-center text-sm text-muted-foreground italic" data-testid={`text-tagline-${plan.name.toLowerCase()}`}>
                      "{plan.tagline}"
                    </p>

                    <ul className="space-y-2.5">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm" data-testid={`feature-${plan.name.toLowerCase()}-${index}`}>
                          <ArrowRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-6">
                    <Link href={plan.ctaLink} className="w-full">
                      <Button
                        className="w-full"
                        size="default"
                        variant={plan.highlight ? "default" : "outline"}
                        data-testid={`button-cta-${plan.name.toLowerCase()}`}
                      >
                        {plan.cta} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/contact">
                <Button size="lg" data-testid="button-start-free-trial">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
