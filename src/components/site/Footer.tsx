import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { Ribbon } from "./primitives";

const quick = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About The Social Pind" },
  { to: "/festival", label: "North Folk Festival" },
  { to: "/participate", label: "Participants Registration" },
  { to: "/volunteer", label: "Volunteer Registration" },
  { to: "/exhibit", label: "Exhibitor Registration" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
] as const;

const policies = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/refund", label: "Refund Policy" },
  { to: "/terms", label: "Terms & Conditions" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-10 bg-surface">
      <Ribbon className="absolute -top-12 left-0 w-full md:-top-16" />
      <div className="mx-auto max-w-7xl px-5 pt-24 pb-10 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl font-extrabold leading-none md:text-5xl">THE SOCIAL PIND</p>
            <p className="mt-4 font-display text-xl font-bold text-kesar">Where Culture Comes Alive.</p>
            <p className="mt-4 max-w-sm leading-relaxed text-body">
              Celebrating culture, creativity, traditions, and community through unforgettable experiences.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-body transition-colors hover:border-kesar hover:text-kesar"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Quick Links</p>
            <ul className="grid gap-2.5">
              {quick.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-body transition-colors hover:text-kesar">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Policies</p>
            <ul className="grid gap-2.5">
              {policies.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-body transition-colors hover:text-kesar">{l.label}</Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8 mb-2">Payments</p>
            <Link to="/payment" className="text-body transition-colors hover:text-kesar">Submit Payment Details</Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs text-body md:flex-row md:justify-between">
          <span>© 2027 The Social Pind. All Rights Reserved.</span>
          <span className="text-parchment">8–10 January 2027 · Chandigarh</span>
        </div>
      </div>
    </footer>
  );
}
