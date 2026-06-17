import type { AppGameStatus, AppInningHalf, AppProviderRef } from "./common";
import type { AppTeam } from "./team";
import type { AppPlayer } from "./player";

export interface AppGame {
  id: string;
  providerRef: AppProviderRef;
  gameDate: string;       // "2025-06-17"
  gameTimeKst: string;    // "10:10"
  status: AppGameStatus;
  statusDetail: string;   // "Top 5th", "Final", "7:10 PM ET"
  homeTeam: AppTeam;
  awayTeam: AppTeam;
  homeScore: number;
  awayScore: number;
  inning: number;
  inningHalf: AppInningHalf;
  isTiebreak: boolean;
}

export interface AppBaseState {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface AppCurrentMatchup {
  batter: AppPlayer;
  pitcher: AppPlayer;
  balls: number;
  strikes: number;
  outs: number;
  bases: AppBaseState;
}

export interface AppLineScoreInning {
  inning: number;
  homeRuns: number;
  awayRuns: number;
  homeHits: number;
  awayHits: number;
  homeErrors: number;
  awayErrors: number;
}

export interface AppLineupEntry {
  battingOrder: number;
  player: AppPlayer;
  position: string;
}

export type AppGameEventType =
  | "hit" | "homerun" | "strikeout" | "walk" | "out"
  | "error" | "stolen_base" | "double_play" | "pitching_change"
  | "inning_end" | "game_end";

export interface AppGameEvent {
  id: string;
  inning: number;
  inningHalf: AppInningHalf;
  eventType: AppGameEventType;
  description: string;   // 영어 원문 설명
  playerName?: string;
  teamAbbr?: string;
  runs?: number;
}

export interface AppBoxScorePlayer {
  player: AppPlayer;
  atBats?: number;
  hits?: number;
  runs?: number;
  rbi?: number;
  homeRuns?: number;
  strikeouts?: number;
  walks?: number;
  inningsPitched?: string;
  earnedRuns?: number;
  pitchingStrikeouts?: number;
  pitchingWalks?: number;
  era?: string;
}

export interface AppGameCenter {
  game: AppGame;
  lineScore: AppLineScoreInning[];
  currentMatchup?: AppCurrentMatchup;
  homeLineup: AppLineupEntry[];
  awayLineup: AppLineupEntry[];
  homeBoxScore: AppBoxScorePlayer[];
  awayBoxScore: AppBoxScorePlayer[];
  events: AppGameEvent[];
}
