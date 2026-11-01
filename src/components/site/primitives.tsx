import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

/** Editorial dual-rail header: title left, mono index rail right. */
export function SectionHeader({
  index,
  category,
  title,
  sub,
  className,
}: {
  index: string;
  category: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12", className)}>
      <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl text-4xl font-extrabold leading-[0.95] md:text-5xl">{title}</h2>
        <span className="eyebrow shrink-0 border-l border-border pl-4">
          {index} / {category}
        </span>
      </div>
      {sub && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">{sub}</p>}
    </Reveal>
  );
}

export function PageBanner({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-kesar/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-navy/30 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 max-w-5xl text-5xl font-extrabold leading-[0.95] md:text-7xl">{title}</h1>
          {sub && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-body md:text-xl">{sub}</p>}
          {children}
        </Reveal>
      </div>
      <Ribbon className="absolute -bottom-2 left-0 w-full" />
    </section>
  );
}

export function Ribbon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={cn("h-14 md:h-20", className)} aria-hidden>
      <path d="M0 60 C 240 10, 480 80, 720 40 S 1200 0, 1440 30 L1440 44 C 1200 14, 960 70, 720 54 S 240 30, 0 74 Z" fill="var(--kesar-gold)" opacity="0.9" />
      <path d="M0 70 C 300 30, 560 90, 820 52 S 1240 20, 1440 46 L1440 54 C 1240 30, 1000 80, 820 62 S 300 44, 0 78 Z" fill="var(--kullu-crimson)" opacity="0.85" />
    </svg>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-5 md:px-8", className)}>{children}</div>;
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
