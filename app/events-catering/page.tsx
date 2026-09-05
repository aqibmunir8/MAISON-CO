import React from "react";
import { Metadata } from "next";
import {
  Sparkles,
  Utensils,
  Wine,
  Croissant,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { EventSpacesGrid, EventForm } from "@/components/sections";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Private Dining & Bespoke Catering | Maison & Co.",
  description:
    "Host bespoke gatherings, private hearth feasts, and executive celebrations in our architectural spaces or off-site with Maison's catering.",
};

const CATERING_SERVICES = [
  {
    id: "bakery-morning",
    title: "Artisan Morning Bakery Boxes",
    subtitle: "Viennoiserie & Sourdough Spreads",
    icon: Croissant,
    price: "From $28 / person",
    description:
      "Warm, stone-milled wild sourdough loaves, laminated butter croissants, kouign-amanns, whipped cultured sea salt butter, and seasonal stone fruit preserves delivered fresh from our early morning bake.",
    highlights: [
      "Baked fresh within 3 hours of morning delivery",
      "Includes single-origin estate drip carafes",
      "Individually boxed or architectural wooden boards",
    ],
  },
  {
    id: "hearth-platters",
    title: "Wood-Fired Hearth Platters",
    subtitle: "Feasting Boards for Off-Site Dining",
    icon: Flame,
    price: "From $75 / person",
    description:
      "Large-format embers-roasted proteins, charcoal-grilled market vegetables, whole smoked fish, and warm hearth flatbreads packaged in insulated copper chafing vessels.",
    highlights: [
      "Oak & applewood roasted heritage meats",
      "Botanical herb sauces and ember condiments",
      "On-site hearth chef setup available upon request",
    ],
  },
  {
    id: "sommelier-tastings",
    title: "Private Sommelier Cellar Tastings",
    subtitle: "Low-Intervention Wine Experiences",
    icon: Wine,
    price: "From $90 / person",
    description:
      "Guided vertical tastings led by our Head Sommelier, featuring rare grower champagnes, biodynamic European vintages, and bespoke cellar allocations paired with artisan cheeses.",
    highlights: [
      "Custom glassware and tasting notes provided",
      "Curated 5-pour narrative journey",
      "Exclusive access to allocation-only library bottles",
    ],
  },
];

const FAQS = [
  {
    id: "deposit-cancellation",
    question: "What is your deposit and cancellation policy for private events?",
    answer:
      "A 50% non-refundable deposit of the agreed food and beverage minimum is required to confirm and secure your date. The remaining balance, plus applicable state taxes and a 20% culinary service gratuity, is finalized 72 hours prior to the event date. Cancellations made more than 14 days in advance may transfer their deposit to an alternative date within 6 months.",
  },
  {
    id: "corkage-outside-wine",
    question: "May we bring our own special vintage wines (Corkage Policy)?",
    answer:
      "We warmly welcome rare and commemorative bottles from private cellars that are not currently represented on our active natural wine list. Our corkage fee is $45 per 750ml bottle, with a maximum of three bottles per gathering. For full restaurant buyouts, bespoke corkage packages can be coordinated directly with our Head Sommelier.",
  },
  {
    id: "av-music-capabilities",
    question: "What audiovisual and musical capabilities are available in the spaces?",
    answer:
      "The Garden Orangery and Baker's Mezzanine feature independent high-fidelity Sonos sound zones, wireless handheld microphones, and discrete 4K laser projection capabilities with HDMI/AirPlay integration. For full restaurant buyouts, we provide dedicated DJ infrastructure and acoustic sound management.",
  },
  {
    id: "dietary-adjustments",
    question: "How do you handle severe allergies and dietary accommodations?",
    answer:
      "Because our menus revolve around seasonal wood-fired cooking and stone-milled flours, we take dietary stewardship seriously. With 48 hours notice, our kitchen brigade crafts dedicated vegan, gluten-free, dairy-free, and raw-diet course variations that mirror the elegance of the primary tasting menu.",
  },
  {
    id: "children-accessibility",
    question: "Are your private spaces wheelchair accessible and family-friendly?",
    answer:
      "All ground-level zones including The Garden Orangery and the Grand Dining Room are fully ADA accessible with step-free entrances and accessible restrooms. High chairs and customized seasonal children's menus are available upon request for family gatherings.",
  },
];

export default function EventsCateringPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground">
      {/* Editorial Page Hero */}
      <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-surface-subtle border-b border-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Dining & Bespoke Catering</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.1]">
              Private Gatherings, Celebrations & Hearth Hospitality<span className="text-primary">.</span>
            </h1>

            <p className="text-foreground-muted text-base sm:text-xl leading-relaxed">
              Every celebration at Maison & Co. is shaped by fire, stone-milled grain, and authentic conviviality. Whether an intimate executive dinner over the morning hearth or a full architectural buyout under the stars, our brigade provides seamless hospitality.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#event-inquiry-builder"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-display text-sm font-semibold shadow-subtle hover:bg-primary/90 transition-all"
              >
                <span>Build Event Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#private-spaces"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface border border-border text-foreground hover:bg-surface-subtle font-display text-sm font-semibold transition-all"
              >
                <span>Explore Spaces</span>
              </a>
            </div>
          </div>
        </div>

        {/* Ambient subtle background glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Section 1: Private Dining Spaces Showcase */}
      <EventSpacesGrid />

      {/* Section 2: Catering & Off-Site Bakery Services */}
      <section className="w-full py-16 sm:py-24 bg-surface border-y border-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-primary" />
              <span>Off-Site Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-foreground">
              Catering & Off-Site Bakery Services<span className="text-primary">.</span>
            </h2>
            <p className="text-foreground-muted text-base sm:text-lg leading-relaxed">
              Bring Maison's open-hearth culinary ethos and morning viennoiserie to your home, office, or countryside estate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATERING_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-background rounded-3xl border border-border p-7 flex flex-col justify-between shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-primary border border-amber-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                        {service.subtitle}
                      </div>
                      <h3 className="text-xl font-bold font-display text-foreground mt-1">
                        {service.title}
                      </h3>
                      <div className="mt-2 text-sm font-mono font-bold text-foreground">
                        {service.price}
                      </div>
                    </div>

                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border/60">
                      {service.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-foreground-muted"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <a
                      href="#event-inquiry-builder"
                      className="inline-flex w-full items-center justify-center gap-2 py-3 rounded-xl bg-surface-subtle hover:bg-primary hover:text-primary-foreground text-xs font-mono font-semibold transition-all border border-border hover:border-primary"
                    >
                      <span>Inquire for Catering</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive 3-Step Event Inquiry Builder */}
      <EventForm />

      {/* Section 4: Event Guidelines & FAQ Accordion */}
      <section className="w-full py-16 sm:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-surface-subtle text-foreground-muted border border-border">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Event Guidelines & Terms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground">
              Frequently Answered Inquiries<span className="text-primary">.</span>
            </h2>
            <p className="text-foreground-muted text-sm sm:text-base">
              Everything you need to know regarding space policies, culinary accommodations, and payment schedules.
            </p>
          </div>

          <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card">
            <Accordion type="single" defaultValue="deposit-cancellation">
              {FAQS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-base sm:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground-muted">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Direct Concierge Contact Callout */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold font-display text-foreground">
                Need Bespoke Event Consulting?
              </h3>
              <p className="text-xs sm:text-sm text-foreground-muted">
                Our Private Events Director is available for personal site walkthroughs and wine cellar consultations.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:events@maisonandco.com"
                className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold hover:bg-primary/90 transition-all shadow-xs"
              >
                events@maisonandco.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
