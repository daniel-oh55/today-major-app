// Client-safe: no server-only imports. Static metadata only — no process.env access.

export type ProviderTermsStatus = "unverified" | "review_required" | "approved";

export type ProviderId =
  | "dummy"
  | "balldontlie_skeleton"
  | "mysportsfeeds_skeleton"
  | "sportsdataio_skeleton"
  | "sportradar_skeleton"
  | "rolling_insights_skeleton";

export interface ProviderMetadata {
  id: ProviderId;
  label: string;
  isOfficial: boolean;
  isCommercialReady: boolean;
  attributionText: string;
  termsStatus: ProviderTermsStatus;
  supportsLiveGames: boolean;
  supportsLineups: boolean;
  supportsBoxScore: boolean;
  supportsPlayerStats: boolean;
  supportsTeamStats: boolean;
}

export const PROVIDER_METADATA: Record<ProviderId, ProviderMetadata> = {
  dummy: {
    id: "dummy",
    label: "개발용 더미 데이터",
    isOfficial: false,
    isCommercialReady: false,
    attributionText: "초기 개발용 더미 데이터 — 상업 API 계약 전까지 실제 서비스 데이터가 아닙니다.",
    termsStatus: "unverified",
    supportsLiveGames: false,
    supportsLineups: true,
    supportsBoxScore: true,
    supportsPlayerStats: true,
    supportsTeamStats: true,
  },
  balldontlie_skeleton: {
    id: "balldontlie_skeleton",
    label: "BallDontLie (미연동)",
    isOfficial: false,
    isCommercialReady: false,
    attributionText: "BallDontLie API — 계약 및 약관 검토 필요. 아직 연동되지 않았습니다.",
    termsStatus: "review_required",
    supportsLiveGames: false,
    supportsLineups: false,
    supportsBoxScore: false,
    supportsPlayerStats: true,
    supportsTeamStats: true,
  },
  mysportsfeeds_skeleton: {
    id: "mysportsfeeds_skeleton",
    label: "MySportsFeeds (미연동)",
    isOfficial: false,
    isCommercialReady: false,
    attributionText: "MySportsFeeds API — 계약 및 약관 검토 필요. 아직 연동되지 않았습니다.",
    termsStatus: "review_required",
    supportsLiveGames: false,
    supportsLineups: false,
    supportsBoxScore: false,
    supportsPlayerStats: false,
    supportsTeamStats: false,
  },
  sportsdataio_skeleton: {
    id: "sportsdataio_skeleton",
    label: "SportsDataIO (미연동)",
    isOfficial: false,
    isCommercialReady: false,
    attributionText: "SportsDataIO API — 계약 및 약관 검토 필요. 아직 연동되지 않았습니다.",
    termsStatus: "review_required",
    supportsLiveGames: false,
    supportsLineups: false,
    supportsBoxScore: false,
    supportsPlayerStats: false,
    supportsTeamStats: false,
  },
  sportradar_skeleton: {
    id: "sportradar_skeleton",
    label: "Sportradar (미연동)",
    isOfficial: false,
    isCommercialReady: false,
    attributionText: "Sportradar API — 계약 및 약관 검토 필요. 아직 연동되지 않았습니다.",
    termsStatus: "review_required",
    supportsLiveGames: false,
    supportsLineups: false,
    supportsBoxScore: false,
    supportsPlayerStats: false,
    supportsTeamStats: false,
  },
  rolling_insights_skeleton: {
    id: "rolling_insights_skeleton",
    label: "Rolling Insights (미연동)",
    isOfficial: false,
    isCommercialReady: false,
    attributionText: "DataFeeds by Rolling Insights API — 계약 및 약관 검토 필요. 아직 연동되지 않았습니다.",
    termsStatus: "review_required",
    supportsLiveGames: false,
    supportsLineups: false,
    supportsBoxScore: false,
    supportsPlayerStats: false,
    supportsTeamStats: false,
  },
};
