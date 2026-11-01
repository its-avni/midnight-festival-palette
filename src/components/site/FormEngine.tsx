import { useState, type FormEvent, type ReactNode } from "react";
import { Upload, CheckCircle2, Printer, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "number" | "url" | "date" | "textarea" | "select" | "file" | "checks" | "accept" | "currency";
  required?: boolean;
  options?: readonly string[];
  placeholder?: string;
  hint?: string;
  span?: 1 | 2;
  accept?: string;
};

type Values = Record<string, string | string[] | boolean | File | null>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9\s-]{10,15}$/;

export function validate(fields: FieldDef[], v: Values) {
  const errs: Record<string, string> = {};
  for (const f of fields) {
    const val = v[f.name];
    const empty =
      val === undefined || val === null || val === "" || val === false || (Array.isArray(val) && val.length === 0);
    if (f.required && empty) {
      errs[f.name] = f.type === "accept" ? "Please accept to continue." : "This field is required.";
      continue;
    }
    if (empty) continue;
    if (f.type === "email" && !EMAIL.test(String(val).trim())) errs[f.name] = "Enter a valid email address.";
    if (f.type === "tel" && !PHONE.test(String(val).trim())) errs[f.name] = "Enter a valid phone number.";
    if (f.type === "url") {
      try {
        new URL(String(val));
      } catch {
        errs[f.name] = "Enter a full link, starting with https://";
      }
    }
    if ((f.type === "number" || f.type === "currency") && !(Number(val) > 0)) errs[f.name] = "Enter a number above zero.";
    if (f.type === "file" && val instanceof File) {
      if (!val.type.startsWith("image/")) errs[f.name] = "Please upload an image file (JPG or PNG).";
      else if (val.size > 10 * 1024 * 1024) errs[f.name] = "Image must be under 10 MB.";
    }
  }
  return errs;
}

export function makeId(prefix: string) {
  const n = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `NFF27-${prefix}-${n}`;
}

export function FormEngine({
  fields,
  submitLabel,
  idPrefix,
  onDone,
}: {
  fields: FieldDef[];
  submitLabel: string;
  idPrefix: string;
  onDone: (id: string, values: Values) => void;
}) {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const set = (k: string, v: Values[string] | undefined) => {
    setValues((p) => ({ ...p, [k]: v ?? null }));
    setErrors((p) => {
      const { [k]: _, ...rest } = p;
      return rest;
    });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(fields, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector(`[data-field="${Object.keys(errs)[0]}"]`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBusy(true);
    setTimeout(() => {
      onDone(makeId(idPrefix), values);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  return (
    <form noValidate onSubmit={submit} className="tile-static grid gap-5 p-6 md:grid-cols-2 md:p-8">
      {fields.map((f) => (
        <div key={f.name} data-field={f.name} className={cn(f.span === 2 || ["textarea", "checks", "accept", "file"].includes(f.type) ? "md:col-span-2" : "")}>
          <FieldControl f={f} value={values[f.name]} set={set} error={errors[f.name]} />
        </div>
      ))}
      <div className="md:col-span-2">
        <Button type="submit" variant="kesar" size="xl" disabled={busy} className="w-full md:w-auto">
          {busy ? "Submitting..." : submitLabel} <ArrowRight strokeWidth={2} />
        </Button>
      </div>
    </form>
  );
}

function Label({ f }: { f: FieldDef }) {
  return (
    <label htmlFor={f.name} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold">
      <span>
        {f.label}
        {f.required && <span className="text-kesar"> *</span>}
      </span>
      {!f.required && f.type !== "accept" && <span className="font-mono text-[0.65rem] uppercase tracking-wider text-parchment/70">Optional</span>}
    </label>
  );
}

function FieldControl({
  f,
  value,
  set,
  error,
}: {
  f: FieldDef;
  value: Values[string] | undefined;
  set: (k: string, v: Values[string] | undefined) => void;
  error?: string | undefined;
}) {
  let control: ReactNode;
  const common = { id: f.name, name: f.name, "aria-invalid": !!error, className: cn("field", error && "border-destructive") };

  if (f.type === "textarea") {
    control = <textarea {...common} rows={4} placeholder={f.placeholder} value={(value as string) ?? ""} onChange={(e) => set(f.name, e.target.value)} />;
  } else if (f.type === "select") {
    control = (
      <select {...common} value={(value as string) ?? ""} onChange={(e) => set(f.name, e.target.value)}>
        <option value="" disabled>Select an option</option>
        {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else if (f.type === "file") {
    const file = value as File | null | undefined;
    control = (
      <label htmlFor={f.name} className={cn("flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-input bg-background p-5 transition-colors hover:border-kesar", error && "border-destructive")}>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy/40 text-kesar"><Upload size={20} strokeWidth={1.5} /></span>
        <span className="text-sm">
          <span className="block font-semibold">{file ? file.name : "Choose an image"}</span>
          <span className="text-body">{file ? `${(file.size / 1024).toFixed(0)} KB` : "JPG or PNG, up to 10 MB"}</span>
        </span>
        <input id={f.name} type="file" accept={f.accept ?? "image/png,image/jpeg,image/webp"} className="sr-only" onChange={(e) => set(f.name, e.target.files?.[0] ?? null)} />
      </label>
    );
  } else if (f.type === "checks") {
    const arr = (value as string[]) ?? [];
    control = (
      <div className="grid gap-2 sm:grid-cols-2">
        {f.options?.map((o) => {
          const on = arr.includes(o);
          return (
            <label key={o} className={cn("flex cursor-pointer items-center gap-3 rounded-md border px-3.5 py-2.5 text-sm transition-colors", on ? "border-kesar bg-kesar/10" : "border-input hover:border-foreground/30")}>
              <input type="checkbox" className="accent-[var(--kesar-gold)]" checked={on} onChange={() => set(f.name, on ? arr.filter((x) => x !== o) : [...arr, o])} />
              {o}
            </label>
          );
        })}
      </div>
    );
  } else if (f.type === "accept") {
    return (
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input id={f.name} type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--kesar-gold)]" checked={!!value} onChange={(e) => set(f.name, e.target.checked)} />
          <span>{f.label} <span className="text-kesar">*</span></span>
        </label>
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </div>
    );
  } else {
    control = (
      <div className="relative">
        {f.type === "currency" && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-parchment">INR</span>}
        <input
          {...common}
          className={cn(common.className, f.type === "currency" && "pl-14")}
          type={f.type === "currency" ? "number" : f.type}
          inputMode={f.type === "tel" ? "tel" : undefined}
          min={f.type === "number" || f.type === "currency" ? 1 : undefined}
          placeholder={f.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => set(f.name, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <Label f={f} />
      {control}
      {f.hint && <p className="mt-2 text-xs leading-relaxed text-body">{f.hint}</p>}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function Confirmation({
  id,
  idLabel,
  headline,
  children,
  note,
  summary,
}: {
  id: string;
  idLabel: string;
  headline: string;
  children: ReactNode;
  note?: string;
  summary: [string, string][];
}) {
  return (
    <div className="tile-static mx-auto max-w-3xl overflow-hidden">
      <div className="border-b border-border bg-navy-deep/50 p-6 md:p-8">
        <div className="flex items-center gap-3 text-success">
          <CheckCircle2 size={24} strokeWidth={1.5} />
          <span className="eyebrow !text-success">Submitted · Verification Pending</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{headline}</h2>
      </div>
      <div className="grid gap-6 p-6 md:p-8">
        <div className="space-y-3 leading-relaxed text-body">{children}</div>
        <div className="rounded-lg border border-kesar/40 bg-kesar/5 p-5">
          <p className="eyebrow">{idLabel}</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-kesar">{id}</p>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {summary.filter(([, v]) => v).map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-parchment">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        {note && (
          <p className="flex gap-3 rounded-lg border border-border bg-background p-4 text-sm text-body">
            <ShieldAlert size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-terracotta" />
            {note}
          </p>
        )}
        <div>
          <Button variant="line" size="xl" onClick={() => window.print()}>
            <Printer strokeWidth={1.5} /> Print summary
          </Button>
        </div>
      </div>
    </div>
  );
}
