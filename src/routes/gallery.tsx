import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, Instagram, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner, Reveal, Section } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import hero from "@/assets/hero-mountains.jpg";
import bhangra from "@/assets/bhangra.jpg";
import nati from "@/assets/nati.jpg";
import qawwali from "@/assets/qawwali.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Social Pind & North Folk Festival" },
      { name: "description", content: "The Moments. The People. The Culture. Explore performances, people, and experiences from The Social Pind." },
      { property: "og:title", content: "The Moments. The People. The Culture." },
      { property: "og:description", content: "Colours, performances, people, and experiences from The Social Pind." },
    ],
  }),
  component: Gallery,
});

const filters = ["All", "Bhangra & Folk Dance", "Himachali Nati", "Artists & Performances", "Cultural Experiences", "Food & Exhibitions", "Behind the Scenes", "Festival Highlights"];

const items = [
  { src: bhangra, cat: "Bhangra & Folk Dance", alt: "Bhangra dancers mid-leap on stage", tall: true },
  { src: nati, cat: "Himachali Nati", alt: "Nati dancers in Kullu shawls" },
  { src: qawwali, cat: "Artists & Performances", alt: "Qawwali ensemble at night" },
  { src: hero, cat: "Festival Highlights", alt: "Festival poster artwork of the mountains" },
];

function Gallery() {
  const [f, setF] = useState("All");
  const [open, setOpen] = useState<(typeof items)[number] | null>(null);
  const shown = items.filter((i) => f === "All" || i.cat === f);

  return (
    <>
      <PageBanner
        eyebrow="Gallery / Media"
        title="The Moments. The People. The Culture."
        sub="A festival is made of moments that stay with us long after the celebrations end. Explore the colours, performances, people, and experiences that represent the spirit of The Social Pind."
      />
      <Section className="pt-8">
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((x) => (
            <button
              key={x}
              onClick={() => setF(x)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                f === x ? "border-kesar bg-kesar text-background" : "border-border text-body hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {x}
            </button>
          ))}
        </div>
        {shown.length ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {shown.map((it, i) => (
              <Reveal key={it.alt} delay={i * 80} className="mb-4 break-inside-avoid">
                <button onClick={() => setOpen(it)} className="group relative block w-full overflow-hidden rounded-2xl">
                  <img src={it.src} alt={it.alt} loading="lazy" className={cn("w-full object-cover transition-transform duration-500 group-hover:scale-105", it.tall ? "aspect-[4/5]" : "aspect-[5/4]")} />
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider backdrop-blur">{it.cat}</span>
                </button>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="tile-static flex flex-col items-center py-20 text-center">
            <ImageIcon size={32} strokeWidth={1.5} className="text-parchment" />
            <p className="mt-4 font-display text-2xl font-bold">Moments coming soon</p>
            <p className="mt-2 max-w-sm text-body">Photos for this category will be added as the festival approaches and after the event.</p>
          </div>
        )}
      </Section>

      <Section className="pt-0">
        <Reveal className="tile-static flex flex-col gap-6 bg-navy-deep/40 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold leading-[1.1]">Stay Connected. Stay Inspired.</h2>
            <p className="mt-4 leading-relaxed text-body">Follow The Social Pind on social media for festival announcements, artist updates, registration information, behind-the-scenes content, and exclusive glimpses of North Folk Festival.</p>
          </div>
          <Button asChild variant="kesar" size="xl"><a href="#" target="_blank" rel="noreferrer"><Instagram strokeWidth={1.5} /> Follow Us on Instagram</a></Button>
        </Reveal>
      </Section>

      {open && (
        <div role="dialog" aria-modal className="fixed inset-0 z-[60] grid place-items-center bg-background/95 p-4 backdrop-blur" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-5 top-5 rounded-full border border-border p-2"><X strokeWidth={1.5} /></button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.src} alt={open.alt} className="max-h-[80dvh] w-auto rounded-xl object-contain" />
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-parchment">{open.cat} — {open.alt}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
