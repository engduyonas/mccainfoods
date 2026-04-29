import { COUNTRY_CODES } from "@/lib/countryCodes";

/**
 * Best-effort split of stored dial string (e.g. "+251 964534916") back into picker + local parts.
 */
export function splitStoredPhone(phoneNumber: string): {
  countryCode: string;
  phoneLocal: string;
} {
  const t = phoneNumber.trim();
  if (!t) return { countryCode: "", phoneLocal: "" };

  const sorted = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length);
  for (const row of sorted) {
    const code = row.code;
    if (t.startsWith(`${code} `)) {
      return { countryCode: code, phoneLocal: t.slice(code.length).trim() };
    }
    if (t === code) return { countryCode: code, phoneLocal: "" };
  }
  return { countryCode: "", phoneLocal: t };
}
