export type AdPlacement =
  | "home_top_banner"
  | "home_game_list_native"
  | "gamecenter_bottom_banner"
  | "player_detail_mid_native"
  | "team_detail_mid_native"
  | "share_complete_interstitial"
  | "search_result_inline"
  | "favorite_home_inline";

export type AdFormat = "banner" | "native" | "interstitial" | "rewarded" | "placeholder";

// rewarded: 타입만 준비, Phase 6에서 실제 사용하지 않음
// interstitial: 자동 노출하지 않음 — 인라인 placeholder 전용

export type AdProviderId = "placeholder" | "adsense" | "ad-manager" | "admob-webview";

export interface AdFrequencyCap {
  maxImpressionsPerSession: number;
  minIntervalSeconds: number;
}

export interface AdSlotConfig {
  placement: AdPlacement;
  format: AdFormat;
  label: string;
  reservedHeight: number; // px — layout shift 방지용
  enabled: boolean;
  frequencyCap?: AdFrequencyCap;
}

export interface AdDisplayPolicy {
  allowedPlacements: AdPlacement[];
  allowInterstitial: boolean;
  allowNativeInline: boolean;
  notes?: string;
}
