import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Megaphone, Eye, TrendingUp, Target, Handshake, PartyPopper, Utensils, Shirt, Gem, Sparkles, Palette,
  Home, Package, Rocket, Wheat, MoreHorizontal, CheckSquare, Info, ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner, Reveal, Section, SectionHeader } from "@/components/site/primitives";
import { FormEngine, Confirmation, type FieldDef } from "@/components/site/FormEngine";

export const Route = createFileRoute("/exhibit")({
  head: () => ({
    meta: [
      { title: "Exhibitor Registration — North Folk Festival 2027" },
      { name: "description", content: "Book a stall at North Folk Festival 2027. Showcase your brand to festival visitors in Chandigarh." },
      { property: "og:title", content: "Bring Your Brand to the Pind." },
      { property: "og:description", content: "Showcase. Connect. Grow." },
    ],
  }),
  component: Exhibit,
});

const cats = [
  { t: "Food & Beverages", I: Utensils }, { t: "Fashion & Clothing", I: Shirt }, { t: "Jewellery & Accessories", I: Gem },
  { t: "Beauty & Personal Care", I: Sparkles }, { t: "Art & Handicrafts", I: Palette }, { t: "Home & Lifestyle", I: Home },
  { t: "Consumer Brands", I: Package }, { t: "Startups & Emerging Businesses", I: Rocket },
  { t: "Traditional & Regional Products", I: Wheat }, { t: "Other Exhibitors", I: MoreHorizontal },
];

const reasons = [
  { t: "Showcase your brand to festival visitors.", I: Megaphone },
  { t: "Increase brand awareness and visibility.", I: Eye },
  { t: "Generate potential sales and business leads.", I: TrendingUp },
  { t: "Interact directly with your target audience.", I: Target },
  { t: "Explore networking and collaboration opportunities.", I: Handshake },
  { t: "Become part of a large cultural celebration.", I: PartyPopper },
];

const fields: FieldDef[] = [
  { name: "brand_name", label: "Brand Name", type: "text", required: true },
  { name: "contact_person_name", label: "Contact Person Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text", required: true },
  { name: "mobile_number", label: "Mobile Number", type: "tel", required: true },
  { name: "whatsapp_number", label: "WhatsApp Number", type: "tel", required: true },
  { name: "email_address", label: "Email Address", type: "email", required: true },
  { name: "business_address", label: "Business Address", type: "textarea", required: true },
  { name: "city_and_state", label: "City and State", type: "text", required: true },
  { name: "business_category", label: "Business Category", type: "select", required: true, options: cats.map((c) => c.t) },
  { name: "product_description", label: "Product Description", type: "textarea", required: true },
  { name: "brand_logo", label: "Brand Logo", type: "file", required: true, hint: "Please upload your brand logo in a high-quality PNG, JPG, or other accepted format. The uploaded logo may be used for exhibitor identification and event promotional material, subject to the applicable permissions." },
  { name: "website_url", label: "Website URL", type: "url", placeholder: "https://" },
  { name: "social_media_profile", label: "Social Media Profile", type: "url", placeholder: "https://" },
  { name: "preferred_stall_category", label: "Preferred Stall Category", type: "select", required: true, options: ["Food Court", "Retail & Lifestyle", "Art & Handicrafts", "Brand Activation", "Other"] },
  { name: "preferred_stall_size", label: "Preferred Stall Size", type: "select", required: true, options: ["Small", "Medium", "Large", "Custom / To discuss"] },
  { name: "electricity_requirements", label: "Electricity Requirements", type: "text" },
  { name: "gst_details", label: "GST Details", type: "text" },
  { name: "additional_requirements", label: "Additional Requirements", type: "textarea" },
  { name: "accept_terms", label: "I accept Exhibitor Terms & Conditions and Privacy Policy.", type: "accept", required: true },
];

function Exhibit() {
  const [done, setDone] = useState<{ id: string; v: Record<string, unknown> } | null>(null);
  if (done) {
    return (
      <Section className="pt-36">
        <Confirmation
          id={done.id}
          idLabel="Exhibitor ID"
          headline="Thank You for Your Interest!"
          summary={[
            ["Brand", String(done.v.brand_name)],
            ["Contact", String(done.v.contact_person_name)],
            ["Category", String(done.v.business_category)],
            ["Stall", `${done.v.preferred_stall_category} · ${done.v.preferred_stall_size}`],
          ]}
        >
          <p>Your exhibitor application has been received successfully.</p>
          <p>Our exhibitor coordination team will review your details and contact you to discuss stall availability, packages, pricing, payment, and booking confirmation.</p>
          <p className="font-semibold text-foreground">We look forward to welcoming your brand to North Folk Festival 2027!</p>
        </Confirmation>
      </Section>
    );
  }
  return (
    <>
      <PageBanner eyebrow="Register / Exhibitors" title="Bring Your Brand to the Pind." sub="Showcase. Connect. Grow.">
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-body">
          <p>North Folk Festival brings together culture, entertainment, food, lifestyle, and community under one roof.</p>
          <p>We invite brands, businesses, entrepreneurs, artisans, food vendors, and creators to become part of this three-day celebration.</p>
          <p>Set up your stall, showcase your products, interact with visitors, build brand awareness, and create meaningful connections with a diverse audience.</p>
          <p>Whether you are an established brand or an emerging business, North Folk Festival offers an opportunity to present your offerings in a vibrant festival environment.</p>
        </div>
        <Button variant="kesar" size="xl" className="mt-8" onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}>
          Register Your Brand <ArrowDown />
        </Button>
      </PageBanner>

      <Section className="pt-8">
        <SectionHeader index="01" category="Why Exhibit" title="Why Exhibit at North Folk Festival?" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ t, I }, i) => (
            <Reveal key={t} delay={i * 80} className="tile flex items-start gap-4 p-6">
              <I size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-terracotta" />
              <p className="font-medium">{t}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader index="02" category="Categories" title="Exhibitor Categories" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {cats.map(({ t, I }, i) => (
              <Reveal key={t} delay={i * 50} className="tile bg-background p-5">
                <I size={20} strokeWidth={1.5} className="text-kesar" />
                <p className="mt-6 text-sm font-semibold leading-snug">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">03 / Stalls</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-[0.95] md:text-5xl">Find the Right Space for Your Brand.</h2>
            <p className="mt-6 leading-relaxed text-body">We offer exhibition opportunities across multiple categories to accommodate different types of businesses and brands. The available stall packages, sizes, facilities, and pricing will be shared with interested exhibitors.</p>
            <p className="mt-6 flex gap-2 font-mono text-xs uppercase tracking-wider text-parchment">
              <Info size={14} className="shrink-0" /> All stall specifications, inclusions, and prices will be updated after finalization by the organizing team.
            </p>
          </Reveal>
          <Reveal delay={100} className="tile-static grid gap-3 p-6 sm:grid-cols-2">
            {["Stall categories.", "Available stall sizes.", "Pricing and packages.", "Electricity availability.", "Furniture and infrastructure.", "Branding and promotional opportunities.", "Setup and dismantling timings.", "Exhibitor guidelines."].map((x) => (
              <div key={x} className="flex gap-3 text-sm"><CheckSquare size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-teal" /> {x}</div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section id="form" className="scroll-mt-16 pt-0">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">04 / Application</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-[0.95]">Register Your Brand</h2>
            <p className="mt-4 leading-relaxed text-body">Interested in exhibiting at North Folk Festival? Share your business details and our team will get in touch with you.</p>
          </aside>
          <div className="lg:col-span-8">
            <FormEngine fields={fields} submitLabel="Submit Exhibitor Application" idPrefix="E" onDone={(id, v) => setDone({ id, v })} />
          </div>
        </div>
      </Section>
    </>
  );
}
