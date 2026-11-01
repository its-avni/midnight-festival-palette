import type { ReactNode } from "react";
import { PageBanner, Section } from "./primitives";

export type Clause = { title: string; body: ReactNode };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function LegalPage({ eyebrow, title, preamble, clauses }: { eyebrow: string; title: string; preamble: ReactNode; clauses: Clause[] }) {
  return (
    <>
      <PageBanner eyebrow={eyebrow} title={title}>
        <div className="mt-6 max-w-3xl space-y-3 text-lg leading-relaxed text-body">{preamble}</div>
      </PageBanner>
      <Section className="pt-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <nav className="hidden lg:col-span-3 lg:block lg:sticky lg:top-24 lg:self-start" aria-label="Contents">
            <p className="eyebrow mb-4">Contents</p>
            <ol className="space-y-2 border-l border-border">
              {clauses.map((c, i) => (
                <li key={c.title}>
                  <a href={`#${slug(c.title)}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-body hover:border-kesar hover:text-foreground">
                    <span className="font-mono text-xs text-parchment">{String(i + 1).padStart(2, "0")}</span> {c.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="space-y-10 lg:col-span-8 lg:col-start-5">
            {clauses.map((c, i) => (
              <section key={c.title} id={slug(c.title)} className="scroll-mt-24 border-t border-border pt-6">
                <p className="font-mono text-xs text-parchment">Clause {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-2xl font-bold">{c.title}</h2>
                <div className="mt-4 space-y-3 leading-relaxed text-body [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">{c.body}</div>
              </section>
            ))}
          </article>
        </div>
      </Section>
    </>
  );
}

export function List({ items }: { items: string[] }) {
  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}
