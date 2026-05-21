export function photographDataUrlToResponse(dataUrl: string): Response | null {
  const match = /^data:([^;,]+)(?:;[^,]*)?;base64,(.+)$/i.exec(dataUrl.trim());
  if (!match) return null;

  const contentType = match[1];
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Response(bytes, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}

export function employeePhotoUrl(id: string): string {
  return `/api/employees/${id}/photo`;
}
