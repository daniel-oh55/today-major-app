import type { AppProviderRef } from "./common";

export interface AppTeam {
  id: string;
  providerRef: AppProviderRef;
  name: string;          // 팀 전체명 (예: New York Yankees)
  shortName: string;     // 짧은 팀명 (예: Yankees)
  abbreviation: string;  // 약자 (예: NYY)
  city: string;
  league: "AL" | "NL";
  division: "East" | "Central" | "West";
}

export interface AppTeamRecord {
  wins: number;
  losses: number;
  pct: number;
  gbDivision: string;
}

export interface AppTeamSeasonStats {
  season: number;
  // 팀 타격
  teamAvg: string;       // ".261"
  teamOps: string;       // ".782"
  runs: number;          // 시즌 득점
  homeRuns: number;      // 시즌 홈런
  // 팀 투구
  teamEra: string;       // "3.42"
  teamWhip: string;      // "1.19"
  runsAllowed: number;   // 시즌 실점
}

export interface AppRosterPlayer {
  playerId: string;
  fullName: string;
  jerseyNumber: string;
  position: string;
  batHand: "L" | "R" | "S";
  throwHand: "L" | "R";
}

export interface AppTeamRecentGame {
  gameDate: string;      // "2026-06-17"
  opponent: string;      // "BOS"
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  result: "W" | "L";
}

export interface AppTeamDetail extends AppTeam {
  venue?: string;
  record: AppTeamRecord;
  seasonStats?: AppTeamSeasonStats;
  roster?: AppRosterPlayer[];
  keyPlayerIds?: string[];
  recentGames?: AppTeamRecentGame[];
}
