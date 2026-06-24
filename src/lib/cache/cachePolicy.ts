import type { CacheDataType, CachePolicy } from "./types";

export const CACHE_POLICIES: Record<CacheDataType, CachePolicy> = {
  teamProfile:    { ttlSeconds: 86400 },    // 24h — 팀 프로필은 시즌 중 거의 변하지 않음
  playerProfile:  { ttlSeconds: 86400 },    // 24h
  schedule:       { ttlSeconds: 21600 },    // 6h — 경기 일정은 하루 수 회 변경 가능
  standings:      { ttlSeconds: 1800 },     // 30m
  seasonStats:    { ttlSeconds: 300 },      // 5m — 시즌 누적 스탯은 경기 후 갱신
  liveGame:       { ttlSeconds: 15 },       // 15s — 생중계 데이터는 짧은 TTL
  lineups:        { ttlSeconds: 60 },       // 1m
  boxScore:       { ttlSeconds: 30 },       // 30s
  historicalGame: { ttlSeconds: 604800 },   // 7d — 과거 경기 결과는 변하지 않음
};
