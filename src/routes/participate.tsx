import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Mountain, Calendar, Camera, ShieldCheck, Users, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner, Reveal, Section } from "@/components/site/primitives";
import { FormEngine, Confirmation, type FieldDef } from "@/components/site/FormEngine";

export const Route = createFileRoute("/participate")({
  head: () => ({
    meta: [
      { title: "Participants Registration — North Folk Festival 2027" },
      { name: "description", content: "Register your Bhangra or Himachali Nati team for North Folk Festival 2027 in Chandigarh." },
      { property: "og:title", content: "Your Talent Deserves a Stage." },
      { property: "og:description", content: "Bring your team. Bring your energy. Bring your culture." },
    ],
  }),
  component: Participate,
});

const fields: FieldDef[] = [
  { name: "select_competition", label: "Select Competition", type: "select", required: true, options: ["Bhangra", "Himachali Nati"] },
  { name: "team_name", label: "Team Name", type: "text", required: true },
  { name: "team_leader_name", label: "Team Leader Name", type: "text", required: true },
  { name: "contact_number", label: "Contact Number", type: "tel", required: true },
  { name: "whatsapp_number", label: "WhatsApp Number", type: "tel", required: true },
  { name: "email_address", label: "Email Address", type: "email", required: true },
  { name: "city_and_state", label: "City and State", type: "text", required: true },
  { name: "institution_organization", label: "Institution / Organization", type: "text", placeholder: "College / Academy / Organization" },
  { name: "total_team_members", label: "Total Team Members", type: "number", required: true },
  { name: "team_members_details", label: "Team Members Details", type: "textarea", required: true, placeholder: "Names and details, one member per line" },
  { name: "team_photograph", label: "Team Photograph", type: "file", required: true, hint: "Please upload a clear team photograph in JPG, PNG, or another accepted image format. Ensure that the image represents your registered team." },
  { name: "social_media_profile", label: "Social Media Profile", type: "url", placeholder: "https://instagram.com/yourteam" },
  { name: "previous_performance_link", label: "Previous Performance Link", type: "url", placeholder: "YouTube / Drive link" },
  { name: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Special requirements / props" },
  { name: "accept_rules", label: "I accept competition rules and Privacy Policy.", type: "accept", required: true },
];

function Participate() {
  const [done, setDone] = useState<{ id: string; v: Record<string, unknown> } | null>(null);

  if (done) {
    const members = String(done.v["team_members_details"] ?? "").split("\n").filter((l) => l.trim()).length;
    return (
      <Section className="pt-36">
        <Confirmation
          id={done.id}
          idLabel="Participant ID"
          headline="Your Journey Starts Here!"
          note="Note: Submission of the registration form does not automatically guarantee selection for the main competition."
          summary={[
            ["Competition", String(done.v["select_competition"])],
            ["Team", String(done.v["team_name"])],
            ["Team Leader", String(done.v["team_leader_name"])],
            ["Members", `${done.v["total_team_members"]} declared · ${members} listed`],
          ]}
        >
          <p>Thank you for registering for North Folk Festival 2027.</p>
          <p>Your registration has been successfully submitted. Our organizing team will review the details and contact your team representative regarding eligibility, auditions, selection, and further participation instructions.</p>
        </Confirmation>
      </Section>
    );
  }

  return (
    <>
      <PageBanner eyebrow="Register / Participants" title="Your Talent Deserves a Stage." sub="Bring your team. Bring your energy. Bring your culture.">
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-body">
          <p>North Folk Festival invites Bhangra and Himachali Nati dance teams to participate in a celebration of North India's folk traditions.</p>
          <p>Whether you represent a college, dance academy, cultural institution, or independent group, this is your opportunity to showcase your talent, compete with passionate performers, and experience the excitement of a cultural festival.</p>
        </div>
        <Button variant="kesar" size="xl" className="mt-8" onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}>
          Register Your Team <ArrowDown />
        </Button>
      </PageBanner>

      <Section className="pt-8">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { t: "Bhangra Competition", d: "Showcase your skills, coordination, energy, and interpretation of Punjabi folk dance.", date: "8 January 2027", I: Activity, c: "text-kesar border-t-kesar" },
            { t: "Himachali Nati Competition", d: "Celebrate Himachali heritage through traditional dance, expression, and group performances.", date: "9 January 2027", I: Mountain, c: "text-teal border-t-teal" },
          ].map(({ t, d, date, I, c }, i) => (
            <Reveal key={t} delay={i * 100} className={`tile border-t-4 p-8 ${c}`}>
              <I size={28} strokeWidth={1.5} />
              <h3 className="mt-6 text-3xl font-extrabold text-foreground">{t}</h3>
              <p className="mt-3 leading-relaxed text-body">{d}</p>
              <p className="mt-6 flex items-center gap-2 font-mono text-sm text-parchment"><Calendar size={16} strokeWidth={1.5} /> Competition Date: {date}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="form" className="scroll-mt-16 pt-0">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">Team Registration</p>
            <h2 className="text-4xl font-extrabold leading-[0.95]">Before you begin</h2>
            {[
              { I: ShieldCheck, t: "Category rules", d: "Choose one competition per registration. Teams entering both Bhangra and Himachali Nati should submit two separate forms." },
              { I: Camera, t: "Team photograph", d: "A clear, recent group photo of the registered team, in JPG or PNG format." },
              { I: Users, t: "Eligibility", d: "College teams, dance academies, independent groups, and cultural institutions are welcome. Selection follows the organizers' review and audition process." },
            ].map(({ I, t, d }) => (
              <div key={t} className="tile-static flex gap-4 p-5">
                <I size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-kesar" />
                <div><p className="font-semibold">{t}</p><p className="mt-1 text-sm leading-relaxed text-body">{d}</p></div>
              </div>
            ))}
          </aside>
          <div className="lg:col-span-8">
            <FormEngine fields={fields} submitLabel="Submit Team Registration" idPrefix="P" onDone={(id, v) => setDone({ id, v })} />
          </div>
        </div>
      </Section>
    </>
  );
}
