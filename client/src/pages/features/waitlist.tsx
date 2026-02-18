import { Link } from "wouter";
import { ListOrdered, MessageSquare, Clock, Gauge, Star, Footprints, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { SEO, seoData } from "@/components/seo";

const features = [
  {
    icon: ListOrdered,
    title: "Real-Time Queue Position",
    description: "Prospects see their live position in the queue and estimated wait from their device.",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: MessageSquare,
    title: "SMS Slot-Ready Alerts",
    description: "Automatically notify leads via SMS the moment a slot is available and ready for them.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Clock,
    title: "Estimated Wait Times",
    description: "AI-powered wait time predictions based on current pipeline velocity and capacity.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Gauge,
    title: "Capacity Management",
    description: "Monitor real-time workload and manage service capacity across all teams and departments.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Star,
    title: "Priority Leads",
    description: "Flag VIP clients, enterprise prospects, and high-value leads for priority service and personalized attention.",
    color: "text-teal-600",
    bgColor: "bg-teal-600/10",
  },
  {
    icon: Footprints,
    title: "Inbound Lead Tracking",
    description: "Log and manage inbound leads alongside scheduled appointments for a complete view of your pipeline.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-600/10",
  },
];

const benefits = [
  "Fill cancellation gaps quickly by notifying waitlisted prospects",
  "Improve the onboarding experience with transparent wait times",
  "Maximize team throughput and overall service efficiency",
  "Keep leads engaged while they wait with real-time updates",
];

export default function WaitlistFeature() {
  return (
    <Layout>
      <SEO {...seoData.waitlist} />
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <ListOrdered className="w-3 h-3 mr-1" />
              Client Waitlist
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Smart Queue &{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Capacity Control
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Manage inbound leads and client waitlists seamlessly. Give prospects real-time updates,
              optimize team throughput, and never lose a lead to long wait times.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/contact">
                <Button size="lg" className="gap-2" data-testid="button-waitlist-cta">
                  Book a Demo <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" data-testid="button-waitlist-pricing">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Effortless Queue Management</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From initial inquiry to active client, every step is tracked and communicated automatically.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-accent/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">What's Included</Badge>
              <h2 className="text-3xl font-bold mb-6">
                Maximize Every Slot, Every Day
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">Live</div>
                <p className="text-sm text-muted-foreground">Queue Updates</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">SMS</div>
                <p className="text-sm text-muted-foreground">Slot-Ready Alerts</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">VIP</div>
                <p className="text-sm text-muted-foreground">Priority Service</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">AI</div>
                <p className="text-sm text-muted-foreground">Wait Predictions</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Client Waitlist?</h2>
          <p className="text-muted-foreground mb-8">
            Turn prospects into loyal clients with a seamless, modern waitlist experience.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-waitlist-bottom-cta">
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
