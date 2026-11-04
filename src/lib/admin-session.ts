export const ADMIN_SESSION_COOKIE = "karysole_admin_session";
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 horas

// Firma vía Web Crypto (disponible tanto en Node como en el runtime Edge
// del middleware) en vez de node:crypto, para que esto funcione en ambos.

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "Falta ADMIN_SESSION_SECRET en las variables de entorno (ver .env.local.example).",
    );
  }
  return secret;
}

async function hmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token de sesión: timestamp de expiración + firma HMAC, sin estado en servidor. */
export async function createSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_COOKIE_MAX_AGE * 1000;
  const payload = String(expiresAt);
  return `${payload}.${await hmac(payload, getSecret())}`;
}

export async function isSessionTokenValid(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = await hmac(payload, getSecret());
  if (signature !== expectedSignature) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export async function checkAdminPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Se comparan los hashes (no los valores crudos) para que la igualdad de
  // longitudes no filtre nada útil sobre la contraseña real.
  const [candidateHash, expectedHash] = await Promise.all([
    hmac(candidate, getSecret()),
    hmac(expected, getSecret()),
  ]);
  return candidateHash === expectedHash;
}
