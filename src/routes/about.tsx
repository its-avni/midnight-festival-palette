import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Users, PenTool, HeartHandshake, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner, Reveal, Section, SectionHeader } from "@/components/site/primitives";
import nati from "@/assets/nati.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About The Social Pind — Culture, Community, Connection" },
      { name: "description", content: "The Social Pind brings people closer to the traditions, stories, and experiences that make us who we are." },
      { property: "og:title", content: "About The Social Pind" },
      { property: "og:description", content: "Rooted in Culture. Driven by Community." },
    ],
  }),
  component: About,
});

const beliefs = [
  { t: "Culture", d: "Preserving and celebrating India's rich cultural diversity.", I: Compass },
  { t: "Community", d: "Creating spaces that bring people together.", I: Users },
  { t: "Creativity", d: "Encouraging artists, performers, and creators.", I: PenTool },
  { t: "Connection", d: "Building meaningful relationships through shared experiences.", I: HeartHandshake },
  { t: "Celebration", d: "Making every cultural experience memorable.", I: Award },
];

function About() {
  return (
    <>
      <PageBanner
        eyebrow="About / The Social Pind"
        title="The Culture. The Community. The Connection."
        sub="Bringing people closer to the traditions, stories, and experiences that make us who we are."
      />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img src={nati} alt="Himachali folk dancers in a circle against snow peaks" loading="lazy" width={1280} height={1024} className="aspect-[4/5] w-full rounded-2xl object-cover" />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">01 / Our Story</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] md:text-5xl">Rooted in Culture. Driven by Community.</h2>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-body">
              <p>The Social Pind was envisioned as a platform to bring people together through the power of culture, creativity, and shared experiences.</p>
              <p>In a world that is constantly evolving, we believe that our traditions, art forms, music, and cultural identities deserve to be celebrated, preserved, and experienced by future generations.</p>
              <p>Our aim is to create engaging platforms where traditional art meets modern expression, where artists get opportunities to showcase their talent, and where communities come together to celebrate their heritage.</p>
              <p>Through festivals, competitions, exhibitions, and cultural experiences, The Social Pind seeks to build meaningful connections between people, traditions, and generations.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="bg-navy-deep py-24">
        <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
          <Reveal>
            <p className="eyebrow">02 / Our Vision</p>
            <blockquote className="mt-6 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              "To create a platform where culture is not just remembered, but <span className="text-kesar">experienced, celebrated, and passed on.</span>"
            </blockquote>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeader index="03" category="Beliefs" title="What We Believe In" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {beliefs.map(({ t, d, I }, i) => (
            <Reveal key={t} delay={i * 100} className="tile p-6">
              <I size={24} strokeWidth={1.5} className="text-kesar" />
              <h3 className="mt-8 text-2xl font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <Reveal className="tile-static flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold leading-[0.95] md:text-5xl">Every Culture Has a Story. Let's Celebrate Yours.</h2>
            <p className="mt-5 text-lg leading-relaxed text-body">Join The Social Pind and become part of a growing community that celebrates traditions, talent, and togetherness.</p>
          </div>
          <Button asChild variant="kesar" size="xl"><Link to="/festival">Explore Our Events <ArrowRight /></Link></Button>
        </Reveal>
      </Section>
    </>
  );
}
