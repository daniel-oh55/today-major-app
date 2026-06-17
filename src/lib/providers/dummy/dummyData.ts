import type { AppGame, AppGameCenter, AppLineScoreInning, AppGameEvent, AppLineupEntry, AppBoxScorePlayer } from "../../models/game";
import type { AppPlayerDetail } from "../../models/player";
import type { AppTeam, AppTeamDetail } from "../../models/team";

// ─── 팀 ──────────────────────────────────────────────────────────────────────

export const DUMMY_TEAMS: AppTeam[] = [
  { id: "nyy", providerRef: { providerId: "dummy", externalId: "nyy" }, name: "New York Yankees", shortName: "Yankees", abbreviation: "NYY", city: "New York", league: "AL", division: "East" },
  { id: "bos", providerRef: { providerId: "dummy", externalId: "bos" }, name: "Boston Red Sox", shortName: "Red Sox", abbreviation: "BOS", city: "Boston", league: "AL", division: "East" },
  { id: "lad", providerRef: { providerId: "dummy", externalId: "lad" }, name: "Los Angeles Dodgers", shortName: "Dodgers", abbreviation: "LAD", city: "Los Angeles", league: "NL", division: "West" },
  { id: "hou", providerRef: { providerId: "dummy", externalId: "hou" }, name: "Houston Astros", shortName: "Astros", abbreviation: "HOU", city: "Houston", league: "AL", division: "West" },
  { id: "atl", providerRef: { providerId: "dummy", externalId: "atl" }, name: "Atlanta Braves", shortName: "Braves", abbreviation: "ATL", city: "Atlanta", league: "NL", division: "East" },
  { id: "chc", providerRef: { providerId: "dummy", externalId: "chc" }, name: "Chicago Cubs", shortName: "Cubs", abbreviation: "CHC", city: "Chicago", league: "NL", division: "Central" },
  { id: "sf",  providerRef: { providerId: "dummy", externalId: "sf"  }, name: "San Francisco Giants", shortName: "Giants", abbreviation: "SF", city: "San Francisco", league: "NL", division: "West" },
  { id: "nym", providerRef: { providerId: "dummy", externalId: "nym" }, name: "New York Mets", shortName: "Mets", abbreviation: "NYM", city: "New York", league: "NL", division: "East" },
];

const teamMap = Object.fromEntries(DUMMY_TEAMS.map((t) => [t.id, t]));

// ─── 선수 ─────────────────────────────────────────────────────────────────────

export const DUMMY_PLAYERS: AppPlayerDetail[] = [
  { id: "p001", providerRef: { providerId: "dummy", externalId: "p001" }, fullName: "Aaron Judge", firstName: "Aaron", lastName: "Judge", jerseyNumber: "99", position: "RF", teamId: "nyy", teamName: "Yankees", batHand: "R", throwHand: "R", birthDate: "1992-04-26", nationality: "USA", height: "6-7", weight: "282", mlbDebutDate: "2016-08-13" },
  { id: "p002", providerRef: { providerId: "dummy", externalId: "p002" }, fullName: "Shohei Ohtani", firstName: "Shohei", lastName: "Ohtani", jerseyNumber: "17", position: "DH", teamId: "lad", teamName: "Dodgers", batHand: "L", throwHand: "R", birthDate: "1994-07-05", nationality: "JPN", height: "6-4", weight: "210", mlbDebutDate: "2018-03-29" },
  { id: "p003", providerRef: { providerId: "dummy", externalId: "p003" }, fullName: "Gerrit Cole", firstName: "Gerrit", lastName: "Cole", jerseyNumber: "45", position: "P", teamId: "nyy", teamName: "Yankees", batHand: "R", throwHand: "R", birthDate: "1990-09-08", nationality: "USA", height: "6-4", weight: "220", mlbDebutDate: "2013-06-11" },
  { id: "p004", providerRef: { providerId: "dummy", externalId: "p004" }, fullName: "Freddie Freeman", firstName: "Freddie", lastName: "Freeman", jerseyNumber: "5", position: "1B", teamId: "lad", teamName: "Dodgers", batHand: "L", throwHand: "R", birthDate: "1989-09-12", nationality: "USA", height: "6-5", weight: "220", mlbDebutDate: "2010-09-01" },
  { id: "p005", providerRef: { providerId: "dummy", externalId: "p005" }, fullName: "Yordan Alvarez", firstName: "Yordan", lastName: "Alvarez", jerseyNumber: "44", position: "DH", teamId: "hou", teamName: "Astros", batHand: "L", throwHand: "R", birthDate: "1997-06-27", nationality: "CUB", height: "6-5", weight: "225", mlbDebutDate: "2019-06-09" },
  { id: "p006", providerRef: { providerId: "dummy", externalId: "p006" }, fullName: "Ronald Acuna Jr.", firstName: "Ronald", lastName: "Acuna Jr.", jerseyNumber: "13", position: "RF", teamId: "atl", teamName: "Braves", batHand: "R", throwHand: "R", birthDate: "1997-12-18", nationality: "VEN", height: "6-0", weight: "205", mlbDebutDate: "2018-04-25" },
  { id: "p007", providerRef: { providerId: "dummy", externalId: "p007" }, fullName: "Mookie Betts", firstName: "Mookie", lastName: "Betts", jerseyNumber: "50", position: "SS", teamId: "lad", teamName: "Dodgers", batHand: "R", throwHand: "R", birthDate: "1992-10-07", nationality: "USA", height: "5-9", weight: "180", mlbDebutDate: "2014-06-29" },
  { id: "p008", providerRef: { providerId: "dummy", externalId: "p008" }, fullName: "Spencer Strider", firstName: "Spencer", lastName: "Strider", jerseyNumber: "99", position: "P", teamId: "atl", teamName: "Braves", batHand: "R", throwHand: "R", birthDate: "1998-10-28", nationality: "USA", height: "6-0", weight: "195", mlbDebutDate: "2022-04-05" },
  { id: "p009", providerRef: { providerId: "dummy", externalId: "p009" }, fullName: "Jose Ramirez", firstName: "Jose", lastName: "Ramirez", jerseyNumber: "11", position: "3B", teamId: "hou", teamName: "Astros", batHand: "S", throwHand: "R", birthDate: "1992-09-17", nationality: "DOM", height: "5-11", weight: "190", mlbDebutDate: "2013-09-01" },
  { id: "p010", providerRef: { providerId: "dummy", externalId: "p010" }, fullName: "Kyle Tucker", firstName: "Kyle", lastName: "Tucker", jerseyNumber: "30", position: "RF", teamId: "chc", teamName: "Cubs", batHand: "L", throwHand: "R", birthDate: "1996-01-17", nationality: "USA", height: "6-4", weight: "190", mlbDebutDate: "2018-07-28" },
  { id: "p011", providerRef: { providerId: "dummy", externalId: "p011" }, fullName: "Bo Bichette", firstName: "Bo", lastName: "Bichette", jerseyNumber: "11", position: "SS", teamId: "bos", teamName: "Red Sox", batHand: "R", throwHand: "R", birthDate: "1998-03-05", nationality: "USA", height: "6-0", weight: "185", mlbDebutDate: "2019-07-29" },
  { id: "p012", providerRef: { providerId: "dummy", externalId: "p012" }, fullName: "Logan Webb", firstName: "Logan", lastName: "Webb", jerseyNumber: "62", position: "P", teamId: "sf", teamName: "Giants", batHand: "R", throwHand: "R", birthDate: "1996-11-18", nationality: "USA", height: "6-1", weight: "220", mlbDebutDate: "2019-08-02" },
];

const playerMap = Object.fromEntries(DUMMY_PLAYERS.map((p) => [p.id, p]));

// ─── 오늘 경기 목록 ──────────────────────────────────────────────────────────

export function getDummyGames(dateKst: string): AppGame[] {
  return [
    {
      id: "g001", providerRef: { providerId: "dummy", externalId: "g001" },
      gameDate: dateKst, gameTimeKst: "10:10",
      status: "final", statusDetail: "Final",
      homeTeam: teamMap["nyy"], awayTeam: teamMap["bos"],
      homeScore: 5, awayScore: 3,
      inning: 9, inningHalf: "bottom", isTiebreak: false,
    },
    {
      id: "g002", providerRef: { providerId: "dummy", externalId: "g002" },
      gameDate: dateKst, gameTimeKst: "11:05",
      status: "live", statusDetail: "Top 5th",
      homeTeam: teamMap["lad"], awayTeam: teamMap["atl"],
      homeScore: 2, awayScore: 4,
      inning: 5, inningHalf: "top", isTiebreak: false,
    },
    {
      id: "g003", providerRef: { providerId: "dummy", externalId: "g003" },
      gameDate: dateKst, gameTimeKst: "12:10",
      status: "live", statusDetail: "Bot 3rd",
      homeTeam: teamMap["hou"], awayTeam: teamMap["chc"],
      homeScore: 1, awayScore: 1,
      inning: 3, inningHalf: "bottom", isTiebreak: false,
    },
    {
      id: "g004", providerRef: { providerId: "dummy", externalId: "g004" },
      gameDate: dateKst, gameTimeKst: "13:15",
      status: "pre_game", statusDetail: "1:15 PM ET",
      homeTeam: teamMap["sf"], awayTeam: teamMap["nym"],
      homeScore: 0, awayScore: 0,
      inning: 0, inningHalf: "top", isTiebreak: false,
    },
    {
      id: "g005", providerRef: { providerId: "dummy", externalId: "g005" },
      gameDate: dateKst, gameTimeKst: "14:07",
      status: "delayed", statusDetail: "우천 지연",
      homeTeam: teamMap["bos"], awayTeam: teamMap["hou"],
      homeScore: 0, awayScore: 0,
      inning: 0, inningHalf: "top", isTiebreak: false,
    },
    {
      id: "g006", providerRef: { providerId: "dummy", externalId: "g006" },
      gameDate: dateKst, gameTimeKst: "09:38",
      status: "final", statusDetail: "Final/10",
      homeTeam: teamMap["chc"], awayTeam: teamMap["nyy"],
      homeScore: 7, awayScore: 6,
      inning: 10, inningHalf: "bottom", isTiebreak: false,
    },
    {
      id: "g007", providerRef: { providerId: "dummy", externalId: "g007" },
      gameDate: dateKst, gameTimeKst: "15:40",
      status: "scheduled", statusDetail: "3:40 PM ET",
      homeTeam: teamMap["atl"], awayTeam: teamMap["sf"],
      homeScore: 0, awayScore: 0,
      inning: 0, inningHalf: "top", isTiebreak: false,
    },
  ];
}

// ─── 경기 센터 (g002 - 진행 중) ──────────────────────────────────────────────

const lineScore002: AppLineScoreInning[] = [
  { inning: 1, homeRuns: 0, awayRuns: 2, homeHits: 1, awayHits: 3, homeErrors: 0, awayErrors: 0 },
  { inning: 2, homeRuns: 1, awayRuns: 0, homeHits: 2, awayHits: 1, homeErrors: 0, awayErrors: 0 },
  { inning: 3, homeRuns: 0, awayRuns: 1, homeHits: 0, awayHits: 2, homeErrors: 1, awayErrors: 0 },
  { inning: 4, homeRuns: 1, awayRuns: 1, homeHits: 2, awayHits: 1, homeErrors: 0, awayErrors: 0 },
];

const events002: AppGameEvent[] = [
  { id: "e001", inning: 1, inningHalf: "top",    eventType: "homerun", description: "2-run HR / Acuna Jr. (ATL)",      playerName: "Ronald Acuna Jr.", teamAbbr: "ATL", runs: 2 },
  { id: "e002", inning: 2, inningHalf: "bottom",  eventType: "hit",     description: "RBI Single / Freeman (LAD)",      playerName: "Freddie Freeman",  teamAbbr: "LAD", runs: 1 },
  { id: "e003", inning: 3, inningHalf: "top",    eventType: "hit",     description: "RBI Double / Betts (ATL)",        playerName: "Mookie Betts",     teamAbbr: "ATL", runs: 1 },
  { id: "e004", inning: 3, inningHalf: "bottom",  eventType: "error",   description: "Fielding Error - 2B (LAD)",                                       teamAbbr: "LAD" },
  { id: "e005", inning: 4, inningHalf: "top",    eventType: "hit",     description: "RBI Single / Acuna Jr. (ATL)",   playerName: "Ronald Acuna Jr.", teamAbbr: "ATL", runs: 1 },
  { id: "e006", inning: 4, inningHalf: "bottom",  eventType: "homerun", description: "Solo HR / Ohtani (LAD)",          playerName: "Shohei Ohtani",    teamAbbr: "LAD", runs: 1 },
];

const homeLineup002: AppLineupEntry[] = [
  { battingOrder: 1, player: playerMap["p007"], position: "SS" },
  { battingOrder: 2, player: playerMap["p002"], position: "DH" },
  { battingOrder: 3, player: playerMap["p004"], position: "1B" },
  { battingOrder: 4, player: playerMap["p010"], position: "RF" },
  { battingOrder: 5, player: playerMap["p001"], position: "CF" },
];

const awayLineup002: AppLineupEntry[] = [
  { battingOrder: 1, player: playerMap["p006"], position: "RF" },
  { battingOrder: 2, player: playerMap["p008"], position: "P" },
  { battingOrder: 3, player: playerMap["p009"], position: "3B" },
  { battingOrder: 4, player: playerMap["p011"], position: "SS" },
  { battingOrder: 5, player: playerMap["p012"], position: "CF" },
];

const homeBox002: AppBoxScorePlayer[] = [
  { player: playerMap["p007"], atBats: 4, hits: 1, runs: 0, rbi: 0, homeRuns: 0, strikeouts: 1, walks: 0 },
  { player: playerMap["p002"], atBats: 4, hits: 2, runs: 1, rbi: 0, homeRuns: 1, strikeouts: 1, walks: 0 },
  { player: playerMap["p004"], atBats: 4, hits: 2, runs: 1, rbi: 1, homeRuns: 0, strikeouts: 0, walks: 1 },
];

const awayBox002: AppBoxScorePlayer[] = [
  { player: playerMap["p006"], atBats: 4, hits: 3, runs: 2, rbi: 3, homeRuns: 1, strikeouts: 0, walks: 0 },
  { player: playerMap["p008"], inningsPitched: "4.0", earnedRuns: 2, pitchingStrikeouts: 5, pitchingWalks: 1, era: "4.50" },
];

export function getDummyGameCenter(gameId: string): AppGameCenter | null {
  if (gameId !== "g002") return null;

  const games = getDummyGames("2025-06-17");
  const game = games.find((g) => g.id === "g002");
  if (!game) return null;

  return {
    game,
    lineScore: lineScore002,
    currentMatchup: {
      batter: playerMap["p002"],
      pitcher: playerMap["p008"],
      balls: 2,
      strikes: 1,
      outs: 1,
      bases: { first: true, second: false, third: true },
    },
    homeLineup: homeLineup002,
    awayLineup: awayLineup002,
    homeBoxScore: homeBox002,
    awayBoxScore: awayBox002,
    events: events002,
  };
}

// ─── 팀 상세 ─────────────────────────────────────────────────────────────────

export const DUMMY_TEAM_DETAILS: AppTeamDetail[] = [
  { ...teamMap["nyy"], record: { wins: 42, losses: 28, pct: 0.600, gbDivision: "-" }, rosterPlaceholder: true },
  { ...teamMap["lad"], record: { wins: 45, losses: 24, pct: 0.652, gbDivision: "-" }, rosterPlaceholder: true },
  { ...teamMap["atl"], record: { wins: 38, losses: 32, pct: 0.543, gbDivision: "7.0" }, rosterPlaceholder: true },
];

export { playerMap, teamMap };
