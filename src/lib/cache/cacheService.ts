import type { CacheEntry, CachePolicy, CacheDataType, CacheService } from "./types";

// In-memory cache는 Vercel/serverless 환경에서 운영 보장 캐시가 아닙니다.
// 각 함수 호출은 새 인스턴스에서 시작될 수 있으므로 hot-instance 내 단기 캐시로만 유효합니다.
// 프로덕션에서 신뢰할 수 있는 캐시가 필요한 경우 Redis(Upstash 등)로 교체하세요.
class InMemoryCacheService implements CacheService {
  private readonly store = new Map<string, CacheEntry<unknown>>();

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const entry = this.store.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry;
  }

  async set<T>(
    key: string,
    data: T,
    policy: CachePolicy,
    dataType: CacheDataType
  ): Promise<void> {
    const now = Date.now();
    this.store.set(key, {
      data,
      cachedAt: now,
      expiresAt: now + policy.ttlSeconds * 1000,
      dataType,
    } as CacheEntry<unknown>);
  }

  async invalidate(key: string): Promise<void> {
    this.store.delete(key);
  }

  async invalidateByPrefix(prefix: string): Promise<void> {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key);
    }
  }
}

let _instance: CacheService | null = null;

export function getCacheService(): CacheService {
  if (!_instance) _instance = new InMemoryCacheService();
  return _instance;
}
