export type ShareTargetType = "player" | "team" | "game" | "today-games";

export interface AppShareCard {
  targetType: ShareTargetType;
  title: string;
  subtitle?: string;
  stats: Array<{ label: string; value: string | number }>;
}

export interface AppSharePayload {
  title: string;
  text: string;
  url?: string;
}
