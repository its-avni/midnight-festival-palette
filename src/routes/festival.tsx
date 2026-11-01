import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Utensils, Shirt, Palette, Store, Users, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner, Reveal, Section, SectionHeader } from "@/components/site/primitives";
import bhangra from "@/assets/bhangra.jpg";
import nati from "@/assets/nati.jpg";
import qawwali from "@/assets/qawwali.jpg";

export const Route = createFileRoute("/festival")({
  head: () => ({
    meta: [
      { title: "North Folk Festival 2027 — Three Days in Chandigarh" },
      { name: "description", content: "Bhangra on 8 January, Himachali Nati on 9 January, and a grand finale with Qawwali on 10 January 2027." },
      { property: "og:title", content: "North Folk Festival 2027" },
      { property: "og:description", content: "Three Days. Two Folk Traditions. One Grand Celebration." },
    ],
  }),
  component: Festival,
});

const days = [
  {
    tag: "DAY 1 — 8 JANUARY 2027", title: "Bhangra: The Spirit of Punjab", img: bhangra, color: "bg-kesar text-background",
    d: "The festival opens with the energy and enthusiasm of Bhangra. Dance teams from colleges, independent groups, academies, and cultural institutions will get an opportunity to showcase their talent and compete on a common platform. The competition will celebrate the power, rhythm, coordination, and cultural richness of Punjabi folk dance.",
    h: ["Open-category Bhangra competition.", "Registered team performances.", "Judging by experienced artists and cultural personalities.", "Recognition and prizes for winning teams."],
  },
  {
    tag: "DAY 2 — 9 JANUARY 2027", title: "Himachali Nati: Celebrating the Mountains", img: nati, color: "bg-teal text-background",
    d: "Day two celebrates the vibrant folk traditions of Himachal Pradesh through the beautiful art of Nati. Bringing together traditional dance groups and performers, this competition aims to showcase the diversity, rhythm, and cultural identity of Himachali folk traditions.",
    h: ["Open-category Himachali Nati competition.", "Participation from independent groups, institutions, and dance teams.", "Experienced judges and cultural experts.", "Recognition and prizes for winning teams."],
  },
  {
    tag: "DAY 3 — 10 JANUARY 2027", title: "The Grand Finale: Music, Stars & Celebration", img: qawwali, color: "bg-crimson text-foreground",
    d: "The final day brings the festival together through special celebrity appearances, live entertainment, and a memorable Qawwali night. An evening dedicated to music, cultural expression, and celebration, marking the grand conclusion of North Folk Festival.",
    h: ["Celebrity appearances and special guests.", "Live musical performances.", "Qawwali night.", "Grand festival closing celebration."],
    note: "Final artist lineup and programme timings will be announced closer to the event.",
  },
];

const info: [string, string][] = [
  ["Festival", "North Folk Festival"],
  ["Organizer", "The Social Pind"],
  ["Dates", "8–10 January 2027"],
  ["Location", "Chandigarh"],
  ["Duration", "3 Days"],
  ["Competitions", "Bhangra & Himachali Nati"],
  ["Main attractions", "Celebrity appearances, Qawwali, exhibitions"],
  ["Venue", "To be announced"],
];

function Festival() {
  return (
    <>
      <PageBanner eyebrow="Festival / 8–10 January 2027" title="Three Days. Two Folk Traditions. One Grand Celebration.">
        <div className="mt-8 grid max-w-4xl gap-4 text-lg leading-relaxed text-body md:grid-cols-3">
          <p>The North Folk Festival is a cultural celebration dedicated to the vibrant folk traditions of North India.</p>
          <p>Taking place from 8–10 January 2027 in Chandigarh, the festival brings together folk dance competitions, talented performers, cultural artists, celebrity personalities, music, food, shopping, and entertainment under one roof.</p>
          <p>At its heart, North Folk Festival is about celebrating the traditions that connect us, providing a platform for emerging talent, and creating an unforgettable experience for audiences.</p>
        </div>
      </PageBanner>

      <Section>
        <SectionHeader index="01" category="Itinerary" title="The Three-Day Experience" />
        <div className="space-y-20">
          {days.map((day, i) => (
            <div key={day.tag} className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <img src={day.img} alt={day.title} loading="lazy" className="aspect-[5/4] w-full rounded-2xl object-cover" />
              </Reveal>
              <Reveal delay={100}>
                <span className={`stencil ${day.color}`}>{day.tag}</span>
                <h3 className="mt-5 text-4xl font-extrabold leading-[0.95] md:text-5xl">{day.title}</h3>
                <p className="mt-6 leading-relaxed text-body">{day.d}</p>
                <ul className="mt-6 grid gap-2.5">
                  {day.h.map((x) => (
                    <li key={x} className="flex gap-3"><Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-kesar" />{x}</li>
                  ))}
                </ul>
                {day.note && (
                  <p className="mt-6 flex gap-2 font-mono text-xs uppercase tracking-wider text-parchment">
                    <Info size={14} strokeWidth={2} className="shrink-0" /> {day.note}
                  </p>
                )}
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHeader index="02" category="Beyond the Stage" title="The Festival Has More to Explore." sub="North Folk Festival is designed to offer visitors more than just performances." className="mb-8" />
            <ul className="grid gap-3">
              {[
                { t: "Food and beverage experiences.", I: Utensils },
                { t: "Fashion, clothing, and accessories.", I: Shirt },
                { t: "Art, handicrafts, and lifestyle products.", I: Palette },
                { t: "Brand exhibitions and interactive stalls.", I: Store },
                { t: "Community activities and cultural experiences.", I: Users },
              ].map(({ t, I }, i) => (
                <Reveal as="li" key={t} delay={i * 80} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
                  <I size={20} strokeWidth={1.5} className="text-kesar" /> {t}
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal>
            <p className="eyebrow mb-4">03 / Event Information</p>
            <table className="w-full overflow-hidden rounded-xl border border-border bg-background text-left">
              <thead>
                <tr className="border-b border-border bg-navy-deep/60">
                  <th className="p-4 font-mono text-xs uppercase tracking-wider text-parchment">Detail</th>
                  <th className="p-4 font-mono text-xs uppercase tracking-wider text-parchment">Official Information</th>
                </tr>
              </thead>
              <tbody>
                {info.map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0">
                    <td className="p-4 font-semibold">{k}</td>
                    <td className="p-4 text-body">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal className="max-w-3xl">
          <h2 className="text-5xl font-extrabold leading-[0.95] md:text-6xl">Be There When Culture Takes Centre Stage.</h2>
          <p className="mt-6 text-lg leading-relaxed text-body">Join us for three days of performances, traditions, music, and unforgettable experiences.</p>
          <Button asChild variant="kesar" size="xl" className="mt-8"><Link to="/participate">Register / Explore Participation <ArrowRight /></Link></Button>
        </Reveal>
      </Section>
    </>
  );
}
