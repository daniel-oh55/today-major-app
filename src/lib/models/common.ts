export type AppProviderId = "dummy" | "balldontlie" | "mysportsfeeds";

export interface AppProviderRef {
  providerId: AppProviderId;
  externalId: string;
}

export type AppGameStatus =
  | "scheduled"   // 경기 예정
  | "live"        // 진행 중
  | "final"       // 종료
  | "postponed"   // 연기
  | "cancelled";  // 취소

export type AppInningHalf = "top" | "bottom";
