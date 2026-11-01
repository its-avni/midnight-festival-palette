import { createFileRoute } from "@tanstack/react-router";
import { PageBanner, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — The Social Pind" },
      { name: "description", content: "Terms and conditions for using the website and registering for North Folk Festival 2027." },
      { property: "og:title", content: "Terms & Conditions — The Social Pind" },
      { property: "og:description", content: "The terms that apply to North Folk Festival 2027 registrations." },
    ],
  }),
  component: Terms,
});

const clauses = [
  "All registration information submitted must be accurate and complete.",
  "Participants must comply with the eligibility requirements and competition guidelines.",
  "Registration does not guarantee selection or participation in the final competition.",
  "The organizing team reserves the right to review, approve, or reject applications based on eligibility and event requirements.",
  "Exhibitor stall allocation will be subject to availability and confirmation by the organizing team.",
  "Payments must be made only through officially communicated payment channels.",
  "Participants, volunteers, and exhibitors must follow event rules, safety guidelines, and instructions issued by the organizing team.",
  "The organizing team reserves the right to modify event schedules, performances, activities, and arrangements when necessary.",
  "Any misuse of the website or submission of false information may result in rejection or cancellation of an application.",
  "All intellectual property, branding, and website content must not be reproduced without appropriate permission.",
  "All refund and cancellation matters will be governed by the official Refund Policy.",
  "By submitting a registration form, you acknowledge that you have read and agreed to the applicable policies and terms.",
];

function Terms() {
  return (
    <>
      <PageBanner eyebrow="Legal / Terms" title="Terms & Conditions — The Social Pind" sub="By accessing this website or registering for North Folk Festival 2027, you agree to comply with the following terms and conditions." />
      <Section className="pt-8">
        <ol className="mx-auto max-w-4xl divide-y divide-border border-y border-border">
          {clauses.map((c, i) => (
            <li key={c} className="flex gap-6 py-5">
              <span className="w-8 shrink-0 font-mono text-sm text-kesar">{String(i + 1).padStart(2, "0")}</span>
              <p className="leading-relaxed text-body">{c}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-4xl text-body">For questions regarding these terms, please contact [Official Email Address].</p>
      </Section>
    </>
  );
}
