// /lib/idempotency.ts
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function claimIdempotencyKey(key: string) {
  if (!key) return { ok: true }; // kalau client belum kirim key, jangan blok

  const redisKey = `idem:${key}`;

  // set hanya jika belum ada (nx), expire 2 jam (ex)
  const res = await redis.set(redisKey, "1", { nx: true, ex: 60 * 60 * 2 });

  // res === "OK" artinya berhasil mengklaim; null artinya key sudah pernah dipakai
  if (res === null) return { ok: false };
  return { ok: true };
}
