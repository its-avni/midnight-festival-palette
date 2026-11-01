import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, CalendarDays, MapPin, Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import { PageBanner, Section } from "@/components/site/primitives";
import { FormEngine, Confirmation, type FieldDef } from "@/components/site/FormEngine";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact The Social Pind — North Folk Festival 2027" },
      { name: "description", content: "Questions about participating, volunteering, exhibiting, sponsorship, or attending? Reach the North Folk Festival team." },
      { property: "og:title", content: "Let's Get in Touch." },
      { property: "og:description", content: "Reach the organizing team of North Folk Festival 2027." },
    ],
  }),
  component: Contact,
});

const fields: FieldDef[] = [
  { name: "full_name", label: "Full Name", type: "text", required: true },
  { name: "email_address", label: "Email Address", type: "email", required: true },
  { name: "contact_number", label: "Contact Number", type: "tel", required: true },
  { name: "query_category", label: "Query Category", type: "select", required: true, options: ["General", "Participant", "Volunteer", "Exhibitor", "Sponsorship", "Other"] },
  { name: "subject", label: "Subject", type: "text", required: true, span: 2 },
  { name: "message", label: "Message", type: "textarea", required: true },
];

const info = [
  { I: Building2, k: "Organizer", v: "The Social Pind" },
  { I: CalendarDays, k: "Event", v: "North Folk Festival 2027" },
  { I: MapPin, k: "Location", v: "Chandigarh, India" },
  { I: Phone, k: "Phone", v: "[Official Contact Number]" },
  { I: MessageCircle, k: "WhatsApp", v: "[Official WhatsApp Number]" },
  { I: Mail, k: "Email", v: "[Official Email Address]" },
  { I: Instagram, k: "Instagram", v: "[Instagram Link]" },
];

function Contact() {
  const [done, setDone] = useState<{ id: string; v: Record<string, unknown> } | null>(null);
  return (
    <>
      <PageBanner eyebrow="Contact / Reach Us" title="Let's Get in Touch.">
        <div className="mt-6 max-w-2xl space-y-3 text-lg leading-relaxed text-body">
          <p>Have a question about participating, volunteering, exhibiting, sponsorship, or attending North Folk Festival?</p>
          <p>We would love to hear from you. Reach out to our team and we will get back to you.</p>
        </div>
      </PageBanner>
      <Section className="pt-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="tile-static divide-y divide-border">
              {info.map(({ I, k, v }) => (
                <div key={k} className="flex items-center gap-4 p-4">
                  <I size={20} strokeWidth={1.5} className="shrink-0 text-kesar" />
                  <div>
                    <dt className="eyebrow !text-[0.62rem]">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </aside>
          <div className="lg:col-span-8">
            {done ? (
              <Confirmation
                id={done.id}
                idLabel="Message Reference"
                headline="Message sent. We'll be in touch."
                summary={[["Category", String(done.v["query_category"])], ["Subject", String(done.v["subject"])]]}
              >
                <p>Thank you for reaching out, {String(done.v["full_name"])}. Our team will get back to you at {String(done.v["email_address"])}.</p>
              </Confirmation>
            ) : (
              <FormEngine fields={fields} submitLabel="Send Message" idPrefix="MSG" onDone={(id, v) => setDone({ id, v })} />
            )}
          </div>
        </div>
        <blockquote className="mx-auto mt-24 max-w-4xl text-center font-display text-2xl font-bold leading-snug md:text-4xl">
          "Whether you want to perform, collaborate, exhibit, volunteer, or simply be a part of the celebration, <span className="text-kesar">there's a place for you here.</span>"
        </blockquote>
      </Section>
    </>
  );
}
