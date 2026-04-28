/** Shared client + server validation for public applications (invite flow). */

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

export interface ValidatedApplicationInput {
  fullName: string;
  phoneNumber: string;
  passportNumber: string;
  gender: string;
  photograph: string;
  age: number;
}

/**
 * Concatenate dialing code + local number like the admin form.
 */
export function combinePhoneParts(countryCode: string, phoneLocal: string): string {
  const cc = (countryCode || "").trim();
  const local = (phoneLocal || "").trim().replace(/\s+/g, " ");
  if (!cc) return local;
  return `${cc} ${local}`.trim();
}

const DATA_URL_IMAGE = /^data:image\/(png|jpeg|jpg|webp);base64,/i;

function dataUrlDecodedBytesApprox(dataUrl: string): number | null {
  if (!DATA_URL_IMAGE.test(dataUrl)) return null;
  const comma = dataUrl.indexOf(",");
  if (comma === -1) return null;
  const b64 = dataUrl.slice(comma + 1).replace(/\s/g, "");
  if (!b64.length) return null;
  return Math.floor((b64.length * 3) / 4);
}

export interface RawApplicationPayload {
  fullName?: unknown;
  countryCode?: unknown;
  phoneLocal?: unknown;
  passportNumber?: unknown;
  gender?: unknown;
  photograph?: unknown;
  age?: unknown;
}

/**
 * Validates request body shape and field rules (aligned with admin manual entry).
 */
export function validateApplicationPayload(
  input: RawApplicationPayload | Record<string, unknown>
): { ok: true; value: ValidatedApplicationInput } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const fullName =
    typeof input.fullName === "string" ? input.fullName.trim() : "";

  const countryCode =
    typeof input.countryCode === "string" ? input.countryCode.trim() : "";
  const phoneLocal = typeof input.phoneLocal === "string" ? input.phoneLocal.trim() : "";
  const passportNumber =
    typeof input.passportNumber === "string" ? input.passportNumber.trim().toUpperCase() : "";

  const gender = typeof input.gender === "string" ? input.gender : "";
  const photograph = typeof input.photograph === "string" ? input.photograph : "";

  let ageNum: number | null = null;
  const ageRaw = input.age;
  if (typeof ageRaw === "number" && !Number.isNaN(ageRaw)) {
    ageNum = ageRaw;
  } else if (typeof ageRaw === "string" && ageRaw.trim() !== "") {
    const n = parseInt(ageRaw, 10);
    if (!Number.isNaN(n)) ageNum = n;
  }

  if (!fullName) {
    errors.fullName = "Full name is required";
  } else if (fullName.length < 3) {
    errors.fullName = "Name must be at least 3 characters";
  } else if (!/^[a-zA-Z\s\-'.]+$/.test(fullName)) {
    errors.fullName = "Letters, spaces, hyphens, and apostrophes only";
  }

  if (!phoneLocal) {
    errors.phoneLocal = "Phone number is required";
  }

  if (!countryCode) {
    errors.countryCode = "Select a country code";
  }

  const phoneNumber = combinePhoneParts(countryCode, phoneLocal);
  if (!countryCode || !phoneLocal || !phoneNumber) {
    if (!errors.phoneLocal) errors.phoneLocal = "Phone number is required";
  }

  if (!passportNumber) {
    errors.passportNumber = "Passport or ID number is required";
  } else if (!/^[a-zA-Z0-9\-]+$/.test(passportNumber)) {
    errors.passportNumber = "Letters, digits, and hyphens only";
  } else if (passportNumber.length < 5) {
    errors.passportNumber = "Too short (min 5)";
  } else if (passportNumber.length > 20) {
    errors.passportNumber = "Too long (max 20)";
  }

  if (!gender) {
    errors.gender = "Select a gender";
  } else if (!["Male", "Female", "Other"].includes(gender)) {
    errors.gender = "Invalid selection";
  }

  if (ageNum === null) {
    errors.age = "Age is required";
  } else if (ageNum < 18) {
    errors.age = "Must be 18+";
  } else if (ageNum > 100) {
    errors.age = "Max 100";
  }

  if (!photograph) {
    errors.photograph = "Photo is required";
  } else {
    const bytes = dataUrlDecodedBytesApprox(photograph);
    if (bytes === null) {
      errors.photograph = "Use a PNG, JPG, or WebP image (base64 data URL)";
    } else if (bytes > MAX_PHOTO_BYTES) {
      errors.photograph = `Photo must be at most ${MAX_PHOTO_BYTES / (1024 * 1024)}MB`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      fullName,
      phoneNumber,
      passportNumber,
      gender,
      photograph,
      age: ageNum!,
    },
  };
}
