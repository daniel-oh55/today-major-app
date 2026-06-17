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

export interface AppTeamDetail extends AppTeam {
  record: AppTeamRecord;
  rosterPlaceholder: true;
}
