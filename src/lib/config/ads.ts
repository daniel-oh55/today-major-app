export type AdPlacement =
  | "home_top_banner"
  | "home_game_list_native"
  | "gamecenter_bottom_banner"
  | "player_detail_mid_native"
  | "team_detail_mid_native"
  | "share_complete_interstitial"
  | "search_result_inline"
  | "favorite_home_inline";

export type AdFormat = "banner" | "native" | "interstitial";

interface AdConfig {
  format: AdFormat;
  label: string;
  heightClass: string; // tailwind height
}

export const AD_CONFIG: Record<AdPlacement, AdConfig> = {
  home_top_banner:           { format: "banner",      label: "상단 배너",       heightClass: "h-14" },
  home_game_list_native:     { format: "native",      label: "네이티브 광고",    heightClass: "h-24" },
  gamecenter_bottom_banner:  { format: "banner",      label: "하단 배너",       heightClass: "h-14" },
  player_detail_mid_native:  { format: "native",      label: "네이티브 광고",    heightClass: "h-24" },
  team_detail_mid_native:    { format: "native",      label: "네이티브 광고",    heightClass: "h-24" },
  share_complete_interstitial: { format: "interstitial", label: "전면 광고",    heightClass: "h-48" },
  search_result_inline:      { format: "native",      label: "검색 광고",       heightClass: "h-20" },
  favorite_home_inline:      { format: "native",      label: "광고",            heightClass: "h-20" },
};
