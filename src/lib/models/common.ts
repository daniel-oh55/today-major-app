export type AppProviderId = "dummy" | "balldontlie" | "mysportsfeeds";

export interface AppProviderRef {
  providerId: AppProviderId;
  externalId: string;
}

export type AppGameStatus =
  | "scheduled"   // 경기 예정
  | "pre_game"    // 경기 전 (워밍업 단계)
  | "live"        // 진행 중
  | "final"       // 종료
  | "delayed"     // 지연
  | "postponed"   // 연기
  | "cancelled"   // 취소
  | "suspended"   // 중단
  | "unknown";    // 확인 필요

export type AppInningHalf = "top" | "bottom";
