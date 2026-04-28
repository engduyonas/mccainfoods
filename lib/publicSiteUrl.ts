type HeaderLike = { get(name: string): string | null };

/**
 * Public site origin for absolute links (Host / X-Forwarded-* / NEXT_PUBLIC_SITE_URL).
 */
export function resolvePublicSiteUrl(headers: HeaderLike): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (env) return env;

  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!host) return "";

  const forwardedProto = headers.get("x-forwarded-proto");
  const isLocal =
    host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]");
  const proto =
    forwardedProto === "http" || forwardedProto === "https"
      ? forwardedProto
      : isLocal
        ? "http"
        : "https";

  return `${proto}://${host}`;
}

export function invitationApplyUrl(headers: HeaderLike, token: string): string {
  const base = resolvePublicSiteUrl(headers);
  if (!base) {
    return `/apply/${token}`;
  }
  return `${base}/apply/${token}`;
}
