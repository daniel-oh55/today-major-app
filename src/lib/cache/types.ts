export type CacheDataType =
  | "teamProfile"
  | "playerProfile"
  | "schedule"
  | "standings"
  | "seasonStats"
  | "liveGame"
  | "lineups"
  | "boxScore"
  | "historicalGame";

export interface CachePolicy {
  ttlSeconds: number;
  staleWhileRevalidate?: number;
}

export interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  expiresAt: number;
  dataType: CacheDataType;
}

export interface CacheService {
  get<T>(key: string): Promise<CacheEntry<T> | null>;
  set<T>(key: string, data: T, policy: CachePolicy, dataType: CacheDataType): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidateByPrefix(prefix: string): Promise<void>;
}
