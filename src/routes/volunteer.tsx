import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Users, MessageSquare, Network, Eye, Heart, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner, Reveal, Section, SectionHeader } from "@/components/site/primitives";
import { FormEngine, Confirmation, type FieldDef } from "@/components/site/FormEngine";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer Registration — North Folk Festival 2027" },
      { name: "description", content: "Join the volunteer team behind North Folk Festival 2027 in Chandigarh." },
      { property: "og:title", content: "Be the Energy Behind the Experience." },
      { property: "og:description", content: "Great festivals are built by great people." },
    ],
  }),
  component: Volunteer,
});

const tracks = [
  "Event Operations & Logistics", "Registration & Help Desk", "Artist & Guest Management", "Backstage Coordination",
  "Participant Management", "Crowd Management", "Exhibitor Coordination", "Social Media & Content",
  "Photography & Videography", "Hospitality & Guest Assistance",
];

const reasons = [
  { t: "Gain practical event management experience.", I: Briefcase },
  { t: "Work with a dynamic organizing team.", I: Users },
  { t: "Develop communication and coordination skills.", I: MessageSquare },
  { t: "Network with artists, performers, and brands.", I: Network },
  { t: "Experience the behind-the-scenes of a cultural festival.", I: Eye },
  { t: "Become part of a memorable community experience.", I: Heart },
];

const fields: FieldDef[] = [
  { name: "full_name", label: "Full Name", type: "text", required: true },
  { name: "age_dob", label: "Date of Birth", type: "date", required: true },
  { name: "contact_number", label: "Contact Number", type: "tel", required: true },
  { name: "whatsapp_number", label: "WhatsApp Number", type: "tel", required: true },
  { name: "email_address", label: "Email Address", type: "email", required: true },
  { name: "city", label: "City", type: "text", required: true },
  { name: "college_organization", label: "College / Organization", type: "text" },
  { name: "occupation_education", label: "Occupation / Education", type: "text", required: true },
  { name: "areas_of_interest", label: "Areas of Interest", type: "checks", required: true, options: tracks },
  { name: "previous_experience", label: "Previous Experience", type: "textarea" },
  { name: "skills_strengths", label: "Skills & Strengths", type: "textarea", required: true },
  { name: "availability", label: "Availability", type: "checks", required: true, options: ["Pre-event", "8 January", "9 January", "10 January"] },
  { name: "why_volunteer", label: "Why do you want to volunteer?", type: "textarea", required: true },
  { name: "volunteer_photo", label: "Your Photo", type: "file" },
  { name: "accept_terms", label: "I accept Privacy Policy and volunteer terms.", type: "accept", required: true },
];

function Volunteer() {
  const [done, setDone] = useState<{ id: string; v: Record<string, unknown> } | null>(null);
  if (done) {
    return (
      <Section className="pt-36">
        <Confirmation
          id={done.id}
          idLabel="Volunteer ID"
          headline="Thank You for Showing Interest in Joining North Folk Festival 2027!"
          summary={[
            ["Name", String(done.v["full_name"])],
            ["City", String(done.v["city"])],
            ["Interests", (done.v["areas_of_interest"] as string[]).join(", ")],
            ["Availability", (done.v["availability"] as string[]).join(", ")],
          ]}
        >
          <p>We have received your volunteer application. Our team will review your details and get in touch with you regarding selection, responsibilities, orientation, and further instructions.</p>
          <p className="font-semibold text-foreground">Let's make this festival happen together!</p>
        </Confirmation>
      </Section>
    );
  }
  return (
    <>
      <PageBanner eyebrow="Register / Volunteers" title="Be the Energy Behind the Experience." sub="Great festivals are built by great people.">
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-body">
          <p>North Folk Festival is looking for enthusiastic, responsible, and passionate individuals who want to be part of an exciting cultural experience.</p>
          <p>As a volunteer, you will get an opportunity to work behind the scenes, interact with artists and performers, coordinate with teams, and contribute to bringing a large-scale cultural festival to life.</p>
          <p>Whether you are a student, creative enthusiast, event management aspirant, or someone who simply loves being part of live experiences, we welcome you to join our team.</p>
        </div>
        <Button variant="kesar" size="xl" className="mt-8" onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}>
          Apply as a Volunteer <ArrowDown />
        </Button>
      </PageBanner>

      <Section className="pt-8">
        <SectionHeader index="01" category="Why Volunteer" title="Why Volunteer With Us?" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ t, I }, i) => (
            <Reveal key={t} delay={i * 80} className="tile flex items-start gap-4 p-6">
              <I size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-teal" />
              <p className="font-medium">{t}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader index="02" category="Tracks" title="Volunteer Opportunities" />
          <div className="flex flex-wrap gap-3">
            {tracks.map((t, i) => (
              <span key={t} className={`stencil border border-border bg-background text-foreground ${i % 2 ? "rotate-[1.5deg]" : ""}`}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <Section id="form" className="scroll-mt-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">03 / Application</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-[0.95]">Join the Volunteer Team</h2>
            <p className="mt-4 leading-relaxed text-body">Tell us a little about yourself and how you would like to contribute.</p>
          </aside>
          <div className="lg:col-span-8">
            <FormEngine fields={fields} submitLabel="Apply as a Volunteer" idPrefix="V" onDone={(id, v) => setDone({ id, v })} />
          </div>
        </div>
      </Section>
    </>
  );
}
