/** Tokens from crypto.randomBytes(24).toString("base64url") — 32 URL-safe chars, no padding. */
export const INVITE_TOKEN_REGEX = /^[A-Za-z0-9_-]{32}$/;
