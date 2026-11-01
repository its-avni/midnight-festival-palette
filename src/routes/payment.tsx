import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, QrCode, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { PageBanner, Reveal, Section } from "@/components/site/primitives";
import { FormEngine, Confirmation, type FieldDef } from "@/components/site/FormEngine";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Payment — North Folk Festival 2027" },
      { name: "description", content: "Pay via UPI and submit your transaction details to complete your North Folk Festival 2027 registration." },
      { property: "og:title", content: "Complete Your Registration." },
      { property: "og:description", content: "Scan & Pay, then submit your transaction details for verification." },
    ],
  }),
  component: Payment,
});

const UPI_ID = "[Official UPI ID]";

const fields: FieldDef[] = [
  { name: "registration_type", label: "Registration Type", type: "select", required: true, options: ["Participant", "Volunteer", "Exhibitor"] },
  { name: "registration_id", label: "Registration ID", type: "text", required: true, placeholder: "e.g. NFF27-P-AB12CD" },
  { name: "name_team_brand", label: "Name / Team / Brand", type: "text", required: true },
  { name: "registered_mobile", label: "Registered Mobile Number", type: "tel", required: true },
  { name: "amount_paid", label: "Amount Paid", type: "currency", required: true },
  { name: "transaction_id_utr", label: "Transaction ID / UTR Number", type: "text", required: true },
  { name: "date_of_payment", label: "Date of Payment", type: "date", required: true },
  { name: "payment_screenshot", label: "Payment Screenshot", type: "file", required: true },
];

function Payment() {
  const [done, setDone] = useState<{ id: string; v: Record<string, unknown> } | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied");
    setTimeout(() => setCopied(false), 2000);
  };

  if (done) {
    return (
      <Section className="pt-36">
        <Confirmation
          id={done.id}
          idLabel="Payment Reference"
          headline="Thank you! Your payment details have been submitted successfully."
          note="Important: Payment submission does not mean payment verification. Final confirmation will be communicated by the organizing team."
          summary={[
            ["Registration", `${done.v.registration_type} · ${done.v.registration_id}`],
            ["Name", String(done.v.name_team_brand)],
            ["Amount", `INR ${done.v.amount_paid}`],
            ["UTR", String(done.v.transaction_id_utr)],
          ]}
        >
          <p>Our team will verify the transaction and update your registration status. You will receive a confirmation once the payment has been verified.</p>
        </Confirmation>
      </Section>
    );
  }

  return (
    <>
      <PageBanner eyebrow="Payments / Verification" title="Complete Your Registration.">
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-body">
          <p>To proceed with your registration or stall booking, please follow the payment instructions provided below.</p>
          <p>Once payment is completed, submit your transaction details so our team can verify the payment and update your registration status.</p>
        </div>
      </PageBanner>
      <Section className="pt-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="tile-static overflow-hidden">
              <div className="border-b border-border bg-navy-deep/60 p-5">
                <p className="eyebrow">Payment Method</p>
                <p className="mt-1 font-display text-2xl font-extrabold">Scan & Pay</p>
              </div>
              <div className="p-5">
                <div className="grid aspect-square place-items-center rounded-xl border border-dashed border-input bg-background text-center">
                  <div>
                    <QrCode size={64} strokeWidth={1} className="mx-auto text-parchment" />
                    <p className="mt-3 px-6 text-xs text-body">[Official Payment QR Code Container]</p>
                  </div>
                </div>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="eyebrow !text-[0.62rem]">UPI ID</dt>
                    <dd className="mt-1 flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 font-mono">
                      {UPI_ID}
                      <button onClick={copy} aria-label="Copy UPI ID" className="rounded p-1.5 text-kesar hover:bg-kesar/10">
                        {copied ? <Check size={16} /> : <Copy size={16} strokeWidth={1.5} />}
                      </button>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !text-[0.62rem]">Account Holder</dt>
                    <dd className="mt-1 font-semibold">[Official Account Name]</dd>
                  </div>
                </dl>
                <p className="mt-5 flex gap-2 text-xs leading-relaxed text-body">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0 text-terracotta" /> Payments must be made only through officially communicated payment channels.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <p className="mb-5 text-lg text-body">After completing payment, provide the following details:</p>
            <FormEngine fields={fields} submitLabel="Submit Payment Details" idPrefix="PAY" onDone={(id, v) => setDone({ id, v })} />
          </div>
        </div>
      </Section>
    </>
  );
}
