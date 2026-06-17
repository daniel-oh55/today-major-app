import type { AppProviderRef } from "./common";
import type { AppHitterSeasonStats, AppPitcherSeasonStats, AppPlayerRecentGameLog } from "./stats";

export type AppPosition =
  | "P" | "C" | "1B" | "2B" | "3B" | "SS"
  | "LF" | "CF" | "RF" | "DH" | "OF" | "IF";

export type AppBatHand = "L" | "R" | "S";
export type AppThrowHand = "L" | "R";

export interface AppPlayer {
  id: string;
  providerRef: AppProviderRef;
  fullName: string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  position: AppPosition;
  teamId: string;
  teamName: string;
  batHand: AppBatHand;
  throwHand: AppThrowHand;
  birthDate?: string;
  nationality?: string;
}

export type AppPlayerStatus = "Active" | "Injured" | "Inactive" | "Unknown";

export interface AppPlayerDetail extends AppPlayer {
  height?: string;
  weight?: string;
  mlbDebutDate?: string;
  koreanName?: string;
  status?: AppPlayerStatus;
  hitterStats?: AppHitterSeasonStats;
  pitcherStats?: AppPitcherSeasonStats;
  recentGameLog?: AppPlayerRecentGameLog[];
}
