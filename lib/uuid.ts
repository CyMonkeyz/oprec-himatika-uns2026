// /lib/uuid.ts
export function makeIdempotencyKey() {
  // Browser modern: crypto.randomUUID()
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // fallback sederhana (jarang kepakai)
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
