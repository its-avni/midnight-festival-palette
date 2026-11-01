import { describe, it, expect } from "vitest";
import { validate, makeId, type FieldDef } from "@/components/site/FormEngine";

const fields: FieldDef[] = [
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "accept", label: "Accept", type: "accept", required: true },
  { name: "site", label: "Site", type: "url" },
];

describe("registration form rules", () => {
  it("requires the accept checkbox", () => {
    expect(validate(fields, { email: "a@b.co", phone: "9876543210", accept: false }).accept).toBeDefined();
  });
  it("rejects a malformed email", () => {
    expect(validate(fields, { email: "nope", phone: "9876543210", accept: true }).email).toBeDefined();
  });
  it("rejects a too-short phone", () => {
    expect(validate(fields, { email: "a@b.co", phone: "12345", accept: true }).phone).toBeDefined();
  });
  it("passes a complete valid form, optional fields empty", () => {
    expect(validate(fields, { email: "a@b.co", phone: "+91 98765 43210", accept: true })).toEqual({});
  });
  it("generates IDs with the registration-type prefix", () => {
    expect(makeId("P")).toMatch(/^NFF27-P-[A-Z0-9]{6}$/);
  });
});
