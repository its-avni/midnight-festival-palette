import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/festival", label: "Festival" },
  { to: "/gallery", label: "Gallery" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "frosted py-2.5" : "py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-extrabold tracking-tight">THE SOCIAL PIND</span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-parchment">NORTH FOLK FEST 2027</span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-body transition-colors hover:text-foreground data-[status=active]:text-kesar"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="line" size="sm" className="rounded-full px-4">
            <Link to="/volunteer">Volunteer</Link>
          </Button>
          <Button asChild variant="kesar" size="sm" className="rounded-full px-4">
            <Link to="/participate">
              Register Team <ArrowUpRight strokeWidth={2} />
            </Link>
          </Button>
        </div>
        <button
          className="rounded-md p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </nav>
      {open && (
        <div className="mx-auto max-w-7xl px-5 pb-6 pt-4 lg:hidden">
          <ul className="flex flex-col divide-y divide-border">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-2xl font-bold data-[status=active]:text-kesar"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button asChild variant="line" size="xl">
              <Link to="/volunteer" onClick={() => setOpen(false)}>Volunteer</Link>
            </Button>
            <Button asChild variant="kesar" size="xl">
              <Link to="/participate" onClick={() => setOpen(false)}>Register Team</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
