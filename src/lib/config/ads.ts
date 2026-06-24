import type { AdPlacement, AdSlotConfig, AdDisplayPolicy } from "@/lib/models/ad";

// AdPlacement 재수출 — 기존 import 경로 유지
export type { AdPlacement };

export const AD_SLOT_CONFIGS: Record<AdPlacement, AdSlotConfig> = {
  home_top_banner: {
    placement: "home_top_banner",
    format: "banner",
    label: "상단 배너",
    reservedHeight: 56,
    enabled: true,
  },
  home_game_list_native: {
    placement: "home_game_list_native",
    format: "native",
    label: "네이티브 광고",
    reservedHeight: 96,
    enabled: true,
  },
  gamecenter_bottom_banner: {
    placement: "gamecenter_bottom_banner",
    format: "banner",
    label: "하단 배너",
    reservedHeight: 56,
    enabled: true,
  },
  player_detail_mid_native: {
    placement: "player_detail_mid_native",
    format: "native",
    label: "네이티브 광고",
    reservedHeight: 96,
    enabled: true,
  },
  team_detail_mid_native: {
    placement: "team_detail_mid_native",
    format: "native",
    label: "네이티브 광고",
    reservedHeight: 96,
    enabled: true,
  },
  share_complete_interstitial: {
    placement: "share_complete_interstitial",
    format: "interstitial",
    label: "공유 완료 광고",
    reservedHeight: 192,
    enabled: true,
    // 자동 전면광고(오버레이) 아님 — 공유 완료 후 인라인 영역만 점유
  },
  search_result_inline: {
    placement: "search_result_inline",
    format: "native",
    label: "검색 광고",
    reservedHeight: 80,
    enabled: true,
  },
  favorite_home_inline: {
    placement: "favorite_home_inline",
    format: "native",
    label: "광고",
    reservedHeight: 80,
    enabled: true,
  },
};

// 화면별 광고 노출 정책
// 실제 렌더링은 AdSlot이 AD_SLOT_CONFIGS를 직접 참조합니다.
// 이 정책은 문서화 및 lint/policy check 용도입니다.
export const AD_DISPLAY_POLICY: Record<string, AdDisplayPolicy> = {
  home: {
    allowedPlacements: ["home_top_banner", "home_game_list_native"],
    allowInterstitial: false,
    allowNativeInline: true,
  },
  gamecenter: {
    allowedPlacements: ["gamecenter_bottom_banner"],
    allowInterstitial: false,
    allowNativeInline: false,
    notes: "경기센터는 하단 배너 1개만 허용. 중간 네이티브·전면광고 금지.",
  },
  player_detail: {
    allowedPlacements: ["player_detail_mid_native"],
    allowInterstitial: false,
    allowNativeInline: true,
  },
  team_detail: {
    allowedPlacements: ["team_detail_mid_native"],
    allowInterstitial: false,
    allowNativeInline: true,
  },
  search: {
    allowedPlacements: ["search_result_inline"],
    allowInterstitial: false,
    allowNativeInline: true,
  },
  favorites: {
    allowedPlacements: ["favorite_home_inline"],
    allowInterstitial: false,
    allowNativeInline: true,
  },
  share_complete: {
    allowedPlacements: ["share_complete_interstitial"],
    allowInterstitial: false,
    allowNativeInline: false,
    notes: "공유 완료 후 인라인 노출만 허용. 자동 전면광고(오버레이) 금지.",
  },
};
