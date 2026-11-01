import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, List } from "@/components/site/Legal";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — The Social Pind" },
      { name: "description", content: "Refund and cancellation terms for registrations and stall bookings at North Folk Festival 2027." },
      { property: "og:title", content: "Refund & Cancellation Policy" },
      { property: "og:description", content: "Read before making any payment for North Folk Festival 2027." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal / Refunds"
      title="Refund & Cancellation Policy"
      preamble={<>
        <p>At The Social Pind, we aim to maintain transparency and clarity in all registration, participation, and exhibitor booking processes for North Folk Festival 2027.</p>
        <p>Please read the following policy carefully before making any payment.</p>
      </>}
      clauses={[
        { title: "Participant Registration", body: <p>Registration fees, if applicable, will be subject to the terms communicated during registration. Refund eligibility in cases of withdrawal, cancellation, or disqualification will be determined by the official competition rules.</p> },
        { title: "Volunteer Registration", body: <p>Volunteer applications are not considered paid bookings unless a specific fee is communicated. Any exceptional payment arrangements will be governed by the applicable terms.</p> },
        { title: "Exhibitor Bookings", body: <p>Exhibitor stall payments are subject to the stall booking terms shared by the organizing team. Cancellation requests, changes in stall allocation, and refund eligibility will be handled according to the agreed booking terms.</p> },
        { title: "Event Postponement or Cancellation", body: <p>If North Folk Festival is postponed, rescheduled, or cancelled, the organizing team will communicate the applicable options and refund arrangements to registered participants and exhibitors.</p> },
        { title: "Duplicate or Failed Payments", body: <p>If a duplicate transaction or unsuccessful payment results in an amount being debited, the concerned person should contact the organizing team with the relevant transaction reference.</p> },
        { title: "Refund Requests", body: <><p>Refund requests must be submitted through the official contact channels along with:</p><List items={["Full name / Business name.", "Registration or booking ID.", "Registered phone number.", "Payment transaction reference.", "Reason for requesting the refund."]} /></> },
        { title: "Refund Processing", body: <p>Approved refunds will be processed through the applicable payment method and within the timeframe communicated by the organizing team.</p> },
        { title: "Contact Information", body: <p>For refund-related queries: Email: [Official Email Address] | Phone: [Official Contact Number]</p> },
      ]}
    />
  ),
});
