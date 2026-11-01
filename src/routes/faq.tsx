import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { PageBanner, Section } from "@/components/site/primitives";
import { faqs, faqCategories, type FaqCategory } from "@/data/faq";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — North Folk Festival 2027" },
      { name: "description", content: "Answers about participating, volunteering, exhibiting, payments, and logistics at North Folk Festival 2027." },
      { property: "og:title", content: "Frequently Asked Questions — North Folk Festival" },
      { property: "og:description", content: "Everything you need to know about North Folk Festival 2027." },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [cat, setCat] = useState<FaqCategory | "All">("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(faqs[0].q);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return faqs.filter((f) => (cat === "All" || f.c === cat) && (!s || (f.q + f.a).toLowerCase().includes(s)));
  }, [cat, q]);

  return (
    <>
      <PageBanner eyebrow="Help / FAQ" title="Frequently Asked Questions" />
      <Section className="pt-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="space-y-5 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <label className="relative block">
              <Search size={18} strokeWidth={1.5} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body" />
              <input className="field pl-11" placeholder="Search questions" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search questions" />
            </label>
            <div className="flex flex-wrap gap-2">
              {(["All", ...faqCategories] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    cat === c ? "border-kesar bg-kesar text-background" : "border-border text-body hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="font-mono text-xs text-parchment">{list.length} of {faqs.length} questions</p>
          </aside>
          <div className="lg:col-span-8">
            {list.length === 0 && <p className="text-body">No questions match your search.</p>}
            <ul className="divide-y divide-border border-y border-border">
              {list.map((f) => {
                const isOpen = open === f.q;
                const n = faqs.indexOf(f) + 1;
                return (
                  <li key={f.q}>
                    <button onClick={() => setOpen(isOpen ? null : f.q)} aria-expanded={isOpen} className="flex w-full items-start gap-5 py-5 text-left">
                      <span className="mt-1 w-8 shrink-0 font-mono text-xs text-parchment">{String(n).padStart(2, "0")}</span>
                      <span className="flex-1 text-lg font-semibold">{f.q}</span>
                      <Plus size={20} strokeWidth={1.5} className={cn("mt-1 shrink-0 transition-transform", isOpen && "rotate-45 text-kesar")} />
                    </button>
                    {isOpen && <p className="pb-6 pl-[3.25rem] pr-8 leading-relaxed text-body">{f.a}</p>}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
