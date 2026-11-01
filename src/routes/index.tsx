import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Calendar, MapPin, Clock, Layers, Activity, Mountain, Star, Music, ShoppingBag, Users,
  ArrowRight, ArrowUpRight, Mic2, HandHeart, Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeader, Section, Container, Ribbon } from "@/components/site/primitives";
import hero from "@/assets/hero-mountains.jpg";
import bhangra from "@/assets/bhangra.jpg";
import nati from "@/assets/nati.jpg";
import qawwali from "@/assets/qawwali.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Social Pind — North Folk Festival 2027, Chandigarh" },
      { name: "description", content: "Bringing the Culture Alive. Bhangra, Himachali Nati, Qawwali and more — 8 to 10 January 2027 in Chandigarh." },
      { property: "og:title", content: "North Folk Festival 2027 — The Social Pind" },
      { property: "og:description", content: "Three Days. Countless Stories. One Celebration. 8–10 January 2027, Chandigarh." },
    ],
  }),
  component: Home,
});

const TARGET = new Date("2027-01-08T10:00:00+05:30").getTime();

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = now === null ? 0 : Math.max(0, TARGET - now);
  const parts = [
    ["Days", Math.floor(diff / 86400000)],
    ["Hours", Math.floor(diff / 3600000) % 24],
    ["Mins", Math.floor(diff / 60000) % 60],
    ["Secs", Math.floor(diff / 1000) % 60],
  ] as const;
  return (
    <div className="grid grid-cols-4 divide-x divide-border overflow-hidden rounded-xl border border-border bg-background/60 backdrop-blur-md">
      {parts.map(([l, v]) => (
        <div key={l} className="px-3 py-3 text-center md:px-5">
          <div className="font-mono text-2xl font-bold tabular-nums md:text-3xl">{now === null ? "--" : String(v).padStart(2, "0")}</div>
          <div className="eyebrow mt-1 !text-[0.6rem]">{l}</div>
        </div>
      ))}
    </div>
  );
}

const highlights = [
  { t: "Bhangra Championship", d: "Experience the energy, passion, and spirit of Punjab through competitive Bhangra performances.", I: Activity, c: "text-kesar", b: "bg-kesar/10" },
  { t: "Himachali Nati Competition", d: "Celebrate the beauty and traditions of Himachal Pradesh through its iconic folk dance.", I: Mountain, c: "text-teal", b: "bg-teal/10" },
  { t: "Celebrity & Artist Experiences", d: "Meet celebrated personalities and enjoy special appearances and performances.", I: Star, c: "text-kesar", b: "bg-kesar/10" },
  { t: "Qawwali Night", d: "Experience an evening filled with soulful music, rhythm, and traditional melodies.", I: Music, c: "text-crimson", b: "bg-crimson/15" },
  { t: "Exhibition & Shopping", d: "Explore brands, food, fashion, lifestyle, handicrafts, and unique products.", I: ShoppingBag, c: "text-terracotta", b: "bg-terracotta/10" },
  { t: "Culture & Community", d: "Connect with people, discover traditions, and celebrate the spirit of togetherness.", I: Users, c: "text-teal", b: "bg-pine/20" },
];

function Home() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const on = () => setOffset(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* 1.1 Hero */}
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src={hero}
          alt="Illustrated Himalayan ridges at sunrise with Bhangra dancers and a dhol player"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          style={{ transform: `translateY(${offset * 0.25}px) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <Container className="relative flex min-h-[100dvh] flex-col justify-end pt-32 pb-24 md:pb-32">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <span className="stencil bg-crimson text-foreground">#CHAK_DE_PHATTE</span>
              <span className="stencil ml-2 rotate-[1.5deg] bg-teal text-background">#NATI_ROCKS</span>
              <h1 className="mt-6 text-[3.4rem] font-extrabold leading-[0.9] sm:text-7xl lg:text-[7.5rem]">
                Bringing the <br />
                <span className="text-kesar">Culture</span> Alive.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-body">
                A celebration of roots, rhythm, traditions, and togetherness. Welcome to The Social Pind — a space where India's vibrant folk culture meets the energy of today's generation.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button variant="kesar" size="xl" onClick={() => document.getElementById("festival")?.scrollIntoView({ behavior: "smooth" })}>
                  Explore the Festival <ArrowRight strokeWidth={2} />
                </Button>
                <Button asChild variant="navy" size="xl"><Link to="/participate">Register Now</Link></Button>
                <Button asChild variant="line" size="xl"><Link to="/exhibit">Become an Exhibitor</Link></Button>
              </div>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-4">
              <div className="tile-static border-l-4 !border-l-kesar p-5">
                <p className="eyebrow">01 / Flagship Event</p>
                <p className="mt-2 font-display text-2xl font-extrabold">NORTH FOLK FESTIVAL 2027</p>
                <p className="mt-1 font-mono text-sm text-body">8 to 10 January 2027 | Chandigarh, India</p>
                <div className="mt-5"><Countdown /></div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Lineup ribbon */}
      <div className="overflow-hidden border-y border-border bg-surface py-4">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl font-extrabold uppercase">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Bhangra", "Himachali Nati", "Qawwali Night", "Celebrity Appearances", "Exhibitions", "Food & Shopping"].map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10">
                <span className={i % 2 ? "text-outline" : "text-foreground"}>{w}</span>
                <span className="h-2 w-2 rotate-45 bg-crimson" />
              </span>
            )),
          )}
        </div>
      </div>

      {/* 1.2 Intro */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">02 / The Social Pind</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] md:text-5xl">A Place Where People, Culture & Stories Come Together.</h2>
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-body lg:col-span-6 lg:col-start-7">
            <p>The Social Pind is more than just an event platform. It is a celebration of culture, creativity, community, and connection.</p>
            <p>Built around the spirit of bringing people together, The Social Pind creates experiences that celebrate India's diverse traditions while embracing the energy of modern communities.</p>
            <p>From folk performances and cultural competitions to art, music, food, and lifestyle experiences, we aim to create spaces where people can connect with their roots, discover new experiences, and celebrate together.</p>
            <Button asChild variant="line" size="xl" className="mt-3"><Link to="/about">Discover Our Story <ArrowUpRight /></Link></Button>
          </Reveal>
        </div>
      </Section>

      {/* 1.3 Festival intro */}
      <section id="festival" className="scroll-mt-20 bg-surface py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal className="grid grid-cols-5 grid-rows-6 gap-3 h-[520px]">
              <img src={bhangra} alt="Bhangra dancers performing on stage" loading="lazy" width={1024} height={1280} className="col-span-3 row-span-6 h-full w-full rounded-2xl object-cover -rotate-1" />
              <img src={nati} alt="Himachali Nati dancers in traditional shawls" loading="lazy" width={1280} height={1024} className="col-span-2 row-span-3 h-full w-full rounded-2xl object-cover rotate-2" />
              <img src={qawwali} alt="Qawwali musicians performing at night" loading="lazy" width={1280} height={1024} className="col-span-2 row-span-3 h-full w-full rounded-2xl object-cover -rotate-1" />
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow">03 / The Festival</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] md:text-5xl">Introducing North Folk Festival 2027</h2>
              <p className="mt-4 font-display text-xl font-bold text-kesar">Three Days. Countless Stories. One Celebration.</p>
              <div className="mt-6 space-y-4 leading-relaxed text-body">
                <p>North Folk Festival is a three-day celebration of North India's rich folk traditions, bringing together talented performers, cultural enthusiasts, artists, brands, and communities.</p>
                <p>Featuring competitive Bhangra and Himachali Nati performances, celebrity appearances, live entertainment, Qawwali, exhibitions, and an immersive cultural experience, the festival is designed to bring traditional art forms to a contemporary audience.</p>
              </div>
              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { I: Calendar, k: "Dates", v: "8, 9 & 10 January 2027" },
                  { I: MapPin, k: "Location", v: "Chandigarh Club" },
                  { I: Clock, k: "Duration", v: "3 Days" },
                  { I: Layers, k: "Format", v: "Cultural Festival, Folk Dance Competitions, Live Entertainment & Exhibition" },
                ].map(({ I, k, v }) => (
                  <div key={k} className="flex gap-3 rounded-xl border border-border bg-background p-4">
                    <I size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-kesar" />
                    <div>
                      <dt className="eyebrow !text-[0.62rem]">{k}</dt>
                      <dd className="mt-1 text-sm font-semibold">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <Button asChild variant="kesar" size="xl" className="mt-8"><Link to="/festival">Explore North Folk Festival <ArrowRight /></Link></Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 1.4 Highlights */}
      <Section>
        <SectionHeader index="04" category="Highlights" title="More Than a Festival. It's an Experience." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ t, d, I, c, b }, i) => (
            <Reveal key={t} delay={i * 100} className="tile p-7">
              <div className="flex items-start justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-full ${b} ${c}`}><I size={22} strokeWidth={1.5} /></span>
                <span className="font-mono text-xs text-parchment">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 text-2xl font-bold leading-tight">{t}</h3>
              <p className="mt-3 leading-relaxed text-body">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 1.5 Get involved */}
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <SectionHeader
            index="05"
            category="Get Involved"
            title="Be a Part of the Celebration."
            sub="Whether you are a performer, a cultural enthusiast, a volunteer, or a brand looking to connect with a vibrant audience, there is a place for you at North Folk Festival."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Participate", d: "Showcase your talent and compete on a platform celebrating folk traditions.", cta: "Register Team", to: "/participate", I: Mic2, accent: "border-t-kesar" },
              { t: "Volunteer", d: "Be part of the team that brings this cultural experience to life.", cta: "Join as Volunteer", to: "/volunteer", I: HandHeart, accent: "border-t-teal" },
              { t: "Exhibit", d: "Showcase your brand, products, and creativity to festival visitors.", cta: "Book a Stall", to: "/exhibit", I: Store, accent: "border-t-crimson" },
            ].map(({ t, d, cta, to, I, accent }, i) => (
              <Reveal key={t} delay={i * 100} className={`tile flex flex-col border-t-4 bg-background p-8 ${accent}`}>
                <I size={24} strokeWidth={1.5} className="text-parchment" />
                <h3 className="mt-10 text-4xl font-extrabold">{t}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-body">{d}</p>
                <Button asChild variant="line" size="xl" className="mt-8 self-start">
                  <Link to={to}>{cta} <ArrowRight /></Link>
                </Button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 1.6 Closing CTA */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full bg-kesar/10 blur-[100px]" />
        <Container className="relative">
          <Reveal className="max-w-4xl">
            <p className="eyebrow">06 / The Call</p>
            <h2 className="mt-4 text-5xl font-extrabold leading-[0.92] md:text-8xl">The Pind Is Calling. <span className="text-kesar">Are You In?</span></h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-body">Be part of something bigger. Celebrate culture, create memories, and experience the spirit of North India.</p>
            <Button asChild variant="kesar" size="xl" className="mt-10"><Link to="/participate">Register Now <ArrowRight /></Link></Button>
          </Reveal>
        </Container>
        <Ribbon className="absolute bottom-24 left-0 w-full opacity-30" />
      </section>
    </>
  );
}
