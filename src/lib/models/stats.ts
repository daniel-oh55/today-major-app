export interface AppHitterSeasonStats {
  season: number;
  gamesPlayed: number;
  atBats: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  rbi: number;
  runs: number;
  stolenBases: number;
  walks: number;
  strikeouts: number;
  avg: string;   // ".300"
  obp: string;   // ".380"
  slg: string;   // ".520"
  ops: string;   // ".900"
}

export interface AppPitcherSeasonStats {
  season: number;
  wins: number;
  losses: number;
  era: string;   // "3.12"
  gamesPlayed: number;
  gamesStarted: number;
  inningsPitched: string;  // "120.1"
  strikeouts: number;
  walks: number;
  hits: number;
  homeRuns: number;
  whip: string;  // "1.15"
  saves: number;
}
