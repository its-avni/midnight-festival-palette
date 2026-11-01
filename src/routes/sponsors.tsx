import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Zap, Award, Drama, Radio, Coffee, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner, Reveal, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors & Partners — North Folk Festival 2027" },
      { name: "description", content: "Partner with The Social Pind as a sponsor, event partner, media partner, or experience partner." },
      { property: "og:title", content: "Together, We Make Culture Bigger." },
      { property: "og:description", content: "Sponsorship and partnership opportunities at North Folk Festival 2027." },
    ],
  }),
  component: Sponsors,
});

const tiers = [
  { t: "Title Sponsorship", I: Crown, big: true },
  { t: "Powered By Sponsorship", I: Zap, big: true },
  { t: "Associate Sponsorship", I: Award },
  { t: "Event & Cultural Partnerships", I: Drama },
  { t: "Media Partnerships", I: Radio },
  { t: "Hospitality Partnerships", I: Coffee },
  { t: "Community Partnerships", I: Users },
];

function Sponsors() {
  return (
    <>
      <PageBanner eyebrow="Sponsors / Partners" title="Together, We Make Culture Bigger.">
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-body">
          <p>North Folk Festival brings together communities, brands, artists, and organizations through the power of cultural experiences.</p>
          <p>We believe in building meaningful partnerships that create value for everyone involved.</p>
          <p>We welcome brands and organizations interested in collaborating with us as sponsors, event partners, media partners, and experience partners.</p>
        </div>
      </PageBanner>
      <Section className="pt-8">
        <p className="eyebrow mb-6">01 / Partnership Opportunities</p>
        <div className="grid gap-4 md:grid-cols-6">
          {tiers.map(({ t, I, big }, i) => (
            <Reveal key={t} delay={i * 70} className={`tile flex flex-col justify-between p-7 ${big ? "md:col-span-3 min-h-64" : "md:col-span-2 min-h-48"}`}>
              <div className="flex items-start justify-between">
                <I size={big ? 28 : 22} strokeWidth={1.5} className={big ? "text-kesar" : "text-parchment"} />
                <span className="font-mono text-xs text-parchment">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className={big ? "text-4xl font-extrabold leading-[0.95]" : "text-2xl font-bold"}>{t}</h3>
                <div className="mt-4 grid h-12 place-items-center rounded-md border border-dashed border-border font-mono text-[0.65rem] uppercase tracking-wider text-body/60">Partner logo</div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-parchment">Sponsor logos, names, and partnership details will be updated as agreements are finalized.</p>
      </Section>
      <Section className="pt-0">
        <Reveal className="tile-static flex flex-col gap-6 border-l-4 !border-l-kesar p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-4xl font-extrabold">Interested in Partnering With Us?</h2>
            <p className="mt-3 text-lg text-body">Let's create something memorable together.</p>
          </div>
          <Button asChild variant="kesar" size="xl"><Link to="/contact">Become a Partner <ArrowRight /></Link></Button>
        </Reveal>
      </Section>
    </>
  );
}
