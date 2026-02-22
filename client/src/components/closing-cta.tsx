import { Link } from "wouter";
import { ArrowRight, Rocket, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClosingCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/contact">
            <Button size="lg" data-testid="button-trial-cta">
              <Rocket className="w-4 h-4 mr-1.5" /> 30 Day Trial $1 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" data-testid="button-discovery-cta">
              <Phone className="w-4 h-4 mr-1.5" /> Discovery Call <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          No contracts · No setup fees · Cancel anytime
        </p>
      </div>
    </section>
  );
}
