import { Link } from "wouter";
import { Check, X, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { SEO, seoData } from "@/components/seo";

const comparisonRows = [
  { feature: "Per-Lead Fees", indexflow: "No", competitor: "$1 - $7.50", indexflowWins: true },
  { feature: "Monthly Cost", indexflow: "$299 flat", competitor: "Variable", indexflowWins: true },
  { feature: "AI Phone Answering", indexflow: "Yes", competitor: "No", indexflowWins: true },
  { feature: "Custom Website", indexflow: "Yes", competitor: "No", indexflowWins: true },
  { feature: "SMS Confirmations", indexflow: "Included", competitor: "Add-on", indexflowWins: true },
  { feature: "Setup", indexflow: "Done for you", competitor: "Self-service", indexflowWins: true },
  { feature: "SEO Tools", indexflow: "Yes", competitor: "No", indexflowWins: true },
];

const reasons = [
  {
    title: "No Per-Lead Fees",
    description: "Traditional SEO tools charge $1 to $7.50 per lead generated. indexFlow charges a flat monthly rate -- no matter how many clients you serve.",
  },
  {
    title: "AI-Powered Everything",
    description: "From phone answering to live chat, indexFlow's AI assistant handles client inquiries 24/7. Traditional SEO tools don't offer this.",
  },
  {
    title: "Custom Website Included",
    description: "Every indexFlow plan includes a professionally designed, SEO-optimized website. Traditional SEO tools give you a generic profile page.",
  },
  {
    title: "Done-for-You Setup",
    description: "Our team builds and configures everything for you. No DIY setup, no learning curve, no wasted time.",
  },
];

export default function OpenTableComparison() {
  return (
    <Layout>
      <SEO {...seoData.compareOpenTable} />
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              OpenTable Alternative
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Why Businesses Switch{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                from OpenTable
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              No per-lead fees, AI-powered automation, and fully managed setup.
              See why agencies and businesses are making the switch.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/contact">
                <Button size="lg" className="gap-2" data-testid="button-opentable-switch">
                  Switch to indexFlow <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" data-testid="button-opentable-pricing">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">indexFlow vs Traditional SEO Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A head-to-head comparison across the features that matter most.
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-opentable-comparison">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold text-primary">indexFlow</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Traditional SEO Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? "bg-accent/30" : ""}>
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                            <Check className="w-4 h-4" /> {row.indexflow}
                          </span>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">{row.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-accent/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Agencies Choose indexFlow</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <Card key={reason.title} className="hover-elevate">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Drop Per-Lead Fees?</h2>
          <p className="text-muted-foreground mb-8">
            Switch from traditional SEO tools to indexFlow and keep more of your revenue.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-opentable-bottom-cta">
              Switch to indexFlow <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
