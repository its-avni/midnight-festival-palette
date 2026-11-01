import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, List } from "@/components/site/Legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Social Pind" },
      { name: "description", content: "How The Social Pind collects, uses, stores, and protects your information for North Folk Festival 2027." },
      { property: "og:title", content: "Privacy Policy — The Social Pind" },
      { property: "og:description", content: "How we handle your personal information." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal / Privacy"
      title="Privacy Policy — The Social Pind"
      preamble={<>
        <p>At The Social Pind, we respect your privacy and are committed to protecting the personal information you share with us through our website and registration platforms.</p>
        <p>This Privacy Policy explains how we collect, use, store, and protect your information when you access our website or register for North Folk Festival 2027.</p>
      </>}
      clauses={[
        { title: "Information We Collect", body: <List items={["Name and contact details.", "Email address and phone number.", "Team and participant information.", "Volunteer application information.", "Business and exhibitor details.", "Uploaded photographs, brand logos, and documents.", "Payment transaction references and payment confirmation details.", "Any additional information voluntarily submitted through website forms."]} /> },
        { title: "How We Use Your Information", body: <List items={["Processing registrations and applications.", "Communicating event-related updates.", "Verifying payments.", "Coordinating with participants, volunteers, and exhibitors.", "Managing event operations.", "Sending important announcements and notifications.", "Improving our services and website experience."]} /> },
        { title: "Information Sharing", body: <p>We do not sell personal information. Information may be shared with authorized event personnel, service providers, and other parties where necessary to operate the festival, provide services, or meet applicable legal obligations.</p> },
        { title: "Data Security", body: <p>We take reasonable technical and organizational measures to protect the information submitted through our website against unauthorized access, misuse, alteration, or disclosure.</p> },
        { title: "Photographs and Media", body: <p>Photographs and logos submitted during registration may be used for verification, event coordination, and approved promotional purposes. Any public use will be subject to the applicable consent and permissions.</p> },
        { title: "Cookies", body: <p>Our website may use cookies and similar technologies to improve functionality, analyze website traffic, and enhance the browsing experience.</p> },
        { title: "Your Rights", body: <p>You may contact us to request access to, correction of, or deletion of your personal information, subject to applicable legal and operational requirements.</p> },
        { title: "Policy Updates", body: <p>We reserve the right to update this Privacy Policy when necessary. Any changes will be published on this page.</p> },
        { title: "Contact Us", body: <p>For privacy-related questions or requests, contact:<br />The Social Pind<br />Email: [Official Email Address]</p> },
      ]}
    />
  ),
});
