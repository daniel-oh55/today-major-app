import type { AppGame, AppGameCenter, AppLineScoreInning, AppGameEvent, AppLineupEntry, AppBoxScorePlayer } from "../../models/game";
import type { AppPlayerDetail } from "../../models/player";
import type { AppTeam, AppTeamDetail } from "../../models/team";
import { getTodayKst } from "../../utils/koreaTime";

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
  // ── 기존 선수 (p001–p012) ─────────────────────────────────────────────────
  { id: "p001", providerRef: { providerId: "dummy", externalId: "p001" }, fullName: "Aaron Judge",       firstName: "Aaron",    lastName: "Judge",      jerseyNumber: "99", position: "RF", teamId: "nyy", teamName: "Yankees",  batHand: "R", throwHand: "R", birthDate: "1992-04-26", nationality: "USA", height: "6-7", weight: "282", mlbDebutDate: "2016-08-13" },
  { id: "p002", providerRef: { providerId: "dummy", externalId: "p002" }, fullName: "Shohei Ohtani",     firstName: "Shohei",   lastName: "Ohtani",     jerseyNumber: "17", position: "DH", teamId: "lad", teamName: "Dodgers",  batHand: "L", throwHand: "R", birthDate: "1994-07-05", nationality: "JPN", height: "6-4", weight: "210", mlbDebutDate: "2018-03-29" },
  { id: "p003", providerRef: { providerId: "dummy", externalId: "p003" }, fullName: "Gerrit Cole",       firstName: "Gerrit",   lastName: "Cole",       jerseyNumber: "45", position: "P",  teamId: "nyy", teamName: "Yankees",  batHand: "R", throwHand: "R", birthDate: "1990-09-08", nationality: "USA", height: "6-4", weight: "220", mlbDebutDate: "2013-06-11" },
  { id: "p004", providerRef: { providerId: "dummy", externalId: "p004" }, fullName: "Freddie Freeman",   firstName: "Freddie",  lastName: "Freeman",    jerseyNumber: "5",  position: "1B", teamId: "lad", teamName: "Dodgers",  batHand: "L", throwHand: "R", birthDate: "1989-09-12", nationality: "USA", height: "6-5", weight: "220", mlbDebutDate: "2010-09-01" },
  { id: "p005", providerRef: { providerId: "dummy", externalId: "p005" }, fullName: "Yordan Alvarez",    firstName: "Yordan",   lastName: "Alvarez",    jerseyNumber: "44", position: "DH", teamId: "hou", teamName: "Astros",   batHand: "L", throwHand: "R", birthDate: "1997-06-27", nationality: "CUB", height: "6-5", weight: "225", mlbDebutDate: "2019-06-09" },
  { id: "p006", providerRef: { providerId: "dummy", externalId: "p006" }, fullName: "Ronald Acuna Jr.", firstName: "Ronald",   lastName: "Acuna Jr.",  jerseyNumber: "13", position: "RF", teamId: "atl", teamName: "Braves",   batHand: "R", throwHand: "R", birthDate: "1997-12-18", nationality: "VEN", height: "6-0", weight: "205", mlbDebutDate: "2018-04-25" },
  { id: "p007", providerRef: { providerId: "dummy", externalId: "p007" }, fullName: "Mookie Betts",      firstName: "Mookie",   lastName: "Betts",      jerseyNumber: "50", position: "SS", teamId: "lad", teamName: "Dodgers",  batHand: "R", throwHand: "R", birthDate: "1992-10-07", nationality: "USA", height: "5-9", weight: "180", mlbDebutDate: "2014-06-29" },
  { id: "p008", providerRef: { providerId: "dummy", externalId: "p008" }, fullName: "Spencer Strider",   firstName: "Spencer",  lastName: "Strider",    jerseyNumber: "99", position: "P",  teamId: "atl", teamName: "Braves",   batHand: "R", throwHand: "R", birthDate: "1998-10-28", nationality: "USA", height: "6-0", weight: "195", mlbDebutDate: "2022-04-05" },
  { id: "p009", providerRef: { providerId: "dummy", externalId: "p009" }, fullName: "Jose Ramirez",      firstName: "Jose",     lastName: "Ramirez",    jerseyNumber: "11", position: "3B", teamId: "hou", teamName: "Astros",   batHand: "S", throwHand: "R", birthDate: "1992-09-17", nationality: "DOM", height: "5-11",weight: "190", mlbDebutDate: "2013-09-01" },
  { id: "p010", providerRef: { providerId: "dummy", externalId: "p010" }, fullName: "Kyle Tucker",       firstName: "Kyle",     lastName: "Tucker",     jerseyNumber: "30", position: "RF", teamId: "chc", teamName: "Cubs",     batHand: "L", throwHand: "R", birthDate: "1996-01-17", nationality: "USA", height: "6-4", weight: "190", mlbDebutDate: "2018-07-28" },
  { id: "p011", providerRef: { providerId: "dummy", externalId: "p011" }, fullName: "Bo Bichette",       firstName: "Bo",       lastName: "Bichette",   jerseyNumber: "11", position: "SS", teamId: "bos", teamName: "Red Sox",  batHand: "R", throwHand: "R", birthDate: "1998-03-05", nationality: "USA", height: "6-0", weight: "185", mlbDebutDate: "2019-07-29" },
  { id: "p012", providerRef: { providerId: "dummy", externalId: "p012" }, fullName: "Logan Webb",        firstName: "Logan",    lastName: "Webb",       jerseyNumber: "62", position: "P",  teamId: "sf",  teamName: "Giants",   batHand: "R", throwHand: "R", birthDate: "1996-11-18", nationality: "USA", height: "6-1", weight: "220", mlbDebutDate: "2019-08-02" },

  // ── 추가 선수 (p013–p026) ─────────────────────────────────────────────────
  { id: "p013", providerRef: { providerId: "dummy", externalId: "p013" }, fullName: "Will Smith",        firstName: "Will",     lastName: "Smith",      jerseyNumber: "16", position: "C",  teamId: "lad", teamName: "Dodgers",  batHand: "R", throwHand: "R", birthDate: "1995-03-28", nationality: "USA", height: "6-0", weight: "195", mlbDebutDate: "2019-05-25" },
  { id: "p014", providerRef: { providerId: "dummy", externalId: "p014" }, fullName: "Max Muncy",         firstName: "Max",      lastName: "Muncy",      jerseyNumber: "13", position: "3B", teamId: "lad", teamName: "Dodgers",  batHand: "L", throwHand: "R", birthDate: "1990-08-25", nationality: "USA", height: "6-0", weight: "215", mlbDebutDate: "2012-04-28" },
  { id: "p015", providerRef: { providerId: "dummy", externalId: "p015" }, fullName: "Gavin Lux",         firstName: "Gavin",    lastName: "Lux",        jerseyNumber: "9",  position: "2B", teamId: "lad", teamName: "Dodgers",  batHand: "L", throwHand: "R", birthDate: "1997-11-23", nationality: "USA", height: "6-2", weight: "190", mlbDebutDate: "2019-09-01" },
  { id: "p016", providerRef: { providerId: "dummy", externalId: "p016" }, fullName: "Teoscar Hernandez", firstName: "Teoscar",  lastName: "Hernandez",  jerseyNumber: "37", position: "LF", teamId: "lad", teamName: "Dodgers",  batHand: "R", throwHand: "R", birthDate: "1992-10-15", nationality: "DOM", height: "6-2", weight: "205", mlbDebutDate: "2016-09-01" },
  { id: "p017", providerRef: { providerId: "dummy", externalId: "p017" }, fullName: "Matt Olson",        firstName: "Matt",     lastName: "Olson",      jerseyNumber: "28", position: "1B", teamId: "atl", teamName: "Braves",   batHand: "L", throwHand: "L", birthDate: "1994-03-29", nationality: "USA", height: "6-5", weight: "230", mlbDebutDate: "2016-08-16" },
  { id: "p018", providerRef: { providerId: "dummy", externalId: "p018" }, fullName: "Austin Riley",      firstName: "Austin",   lastName: "Riley",      jerseyNumber: "27", position: "3B", teamId: "atl", teamName: "Braves",   batHand: "R", throwHand: "R", birthDate: "1997-04-02", nationality: "USA", height: "6-3", weight: "240", mlbDebutDate: "2019-05-15" },
  { id: "p019", providerRef: { providerId: "dummy", externalId: "p019" }, fullName: "Ozzie Albies",      firstName: "Ozzie",    lastName: "Albies",     jerseyNumber: "1",  position: "2B", teamId: "atl", teamName: "Braves",   batHand: "S", throwHand: "R", birthDate: "1997-01-07", nationality: "CUR", height: "5-8", weight: "165", mlbDebutDate: "2017-08-01" },
  { id: "p020", providerRef: { providerId: "dummy", externalId: "p020" }, fullName: "Michael Harris II", firstName: "Michael",  lastName: "Harris II",  jerseyNumber: "23", position: "CF", teamId: "atl", teamName: "Braves",   batHand: "L", throwHand: "L", birthDate: "2001-03-07", nationality: "USA", height: "6-0", weight: "195", mlbDebutDate: "2022-05-28" },
  { id: "p021", providerRef: { providerId: "dummy", externalId: "p021" }, fullName: "Yoshinobu Yamamoto",firstName: "Yoshinobu",lastName: "Yamamoto",   jerseyNumber: "18", position: "P",  teamId: "lad", teamName: "Dodgers",  batHand: "R", throwHand: "R", birthDate: "1998-08-17", nationality: "JPN", height: "6-0", weight: "176", mlbDebutDate: "2024-03-20" },
  { id: "p022", providerRef: { providerId: "dummy", externalId: "p022" }, fullName: "Giancarlo Stanton", firstName: "Giancarlo",lastName: "Stanton",    jerseyNumber: "27", position: "DH", teamId: "nyy", teamName: "Yankees",  batHand: "R", throwHand: "R", birthDate: "1989-11-08", nationality: "USA", height: "6-6", weight: "245", mlbDebutDate: "2010-06-08" },
  { id: "p023", providerRef: { providerId: "dummy", externalId: "p023" }, fullName: "Anthony Volpe",     firstName: "Anthony",  lastName: "Volpe",      jerseyNumber: "11", position: "SS", teamId: "nyy", teamName: "Yankees",  batHand: "R", throwHand: "R", birthDate: "2001-04-28", nationality: "USA", height: "5-11",weight: "180", mlbDebutDate: "2023-03-30" },
  { id: "p024", providerRef: { providerId: "dummy", externalId: "p024" }, fullName: "Rafael Devers",     firstName: "Rafael",   lastName: "Devers",     jerseyNumber: "11", position: "3B", teamId: "bos", teamName: "Red Sox",  batHand: "L", throwHand: "R", birthDate: "1996-10-24", nationality: "DOM", height: "6-0", weight: "237", mlbDebutDate: "2017-07-25" },
  { id: "p025", providerRef: { providerId: "dummy", externalId: "p025" }, fullName: "Triston Casas",     firstName: "Triston",  lastName: "Casas",      jerseyNumber: "36", position: "1B", teamId: "bos", teamName: "Red Sox",  batHand: "L", throwHand: "L", birthDate: "2000-01-15", nationality: "USA", height: "6-4", weight: "252", mlbDebutDate: "2022-09-27" },
  { id: "p026", providerRef: { providerId: "dummy", externalId: "p026" }, fullName: "Grayson Rodriguez", firstName: "Grayson",  lastName: "Rodriguez",  jerseyNumber: "30", position: "P",  teamId: "bos", teamName: "Red Sox",  batHand: "R", throwHand: "R", birthDate: "2000-11-16", nationality: "USA", height: "6-5", weight: "220", mlbDebutDate: "2023-04-05" },
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
      venue: "Yankee Stadium",
    },
    {
      id: "g002", providerRef: { providerId: "dummy", externalId: "g002" },
      gameDate: dateKst, gameTimeKst: "11:05",
      status: "live", statusDetail: "Top 5th",
      homeTeam: teamMap["lad"], awayTeam: teamMap["atl"],
      homeScore: 2, awayScore: 4,
      inning: 5, inningHalf: "top", isTiebreak: false,
      venue: "Dodger Stadium",
    },
    {
      id: "g003", providerRef: { providerId: "dummy", externalId: "g003" },
      gameDate: dateKst, gameTimeKst: "12:10",
      status: "live", statusDetail: "Bot 3rd",
      homeTeam: teamMap["hou"], awayTeam: teamMap["chc"],
      homeScore: 1, awayScore: 1,
      inning: 3, inningHalf: "bottom", isTiebreak: false,
      venue: "Minute Maid Park",
    },
    {
      id: "g004", providerRef: { providerId: "dummy", externalId: "g004" },
      gameDate: dateKst, gameTimeKst: "13:15",
      status: "pre_game", statusDetail: "1:15 PM ET",
      homeTeam: teamMap["sf"], awayTeam: teamMap["nym"],
      homeScore: 0, awayScore: 0,
      inning: 0, inningHalf: "top", isTiebreak: false,
      venue: "Oracle Park",
    },
    {
      id: "g005", providerRef: { providerId: "dummy", externalId: "g005" },
      gameDate: dateKst, gameTimeKst: "14:07",
      status: "delayed", statusDetail: "우천 지연",
      homeTeam: teamMap["bos"], awayTeam: teamMap["hou"],
      homeScore: 0, awayScore: 0,
      inning: 0, inningHalf: "top", isTiebreak: false,
      venue: "Fenway Park",
    },
    {
      id: "g006", providerRef: { providerId: "dummy", externalId: "g006" },
      gameDate: dateKst, gameTimeKst: "09:38",
      status: "final", statusDetail: "Final/10",
      homeTeam: teamMap["chc"], awayTeam: teamMap["nyy"],
      homeScore: 7, awayScore: 6,
      inning: 10, inningHalf: "bottom", isTiebreak: false,
      venue: "Wrigley Field",
    },
    {
      id: "g007", providerRef: { providerId: "dummy", externalId: "g007" },
      gameDate: dateKst, gameTimeKst: "15:40",
      status: "scheduled", statusDetail: "3:40 PM ET",
      homeTeam: teamMap["atl"], awayTeam: teamMap["sf"],
      homeScore: 0, awayScore: 0,
      inning: 0, inningHalf: "top", isTiebreak: false,
      venue: "Truist Park",
    },
  ];
}

// ─── 경기 센터: g002 (진행 중 - LAD vs ATL) ──────────────────────────────────

const lineScore002: AppLineScoreInning[] = [
  { inning: 1, homeRuns: 0, awayRuns: 2, homeHits: 1, awayHits: 3, homeErrors: 0, awayErrors: 0 },
  { inning: 2, homeRuns: 1, awayRuns: 0, homeHits: 2, awayHits: 1, homeErrors: 0, awayErrors: 0 },
  { inning: 3, homeRuns: 0, awayRuns: 1, homeHits: 0, awayHits: 2, homeErrors: 1, awayErrors: 0 },
  { inning: 4, homeRuns: 1, awayRuns: 1, homeHits: 2, awayHits: 1, homeErrors: 0, awayErrors: 0 },
];

const events002: AppGameEvent[] = [
  { id: "e001", inning: 1, inningHalf: "top",    eventType: "homerun", description: "2-run HR / Acuna Jr. (ATL)",    playerName: "Ronald Acuna Jr.", teamAbbr: "ATL", runs: 2 },
  { id: "e002", inning: 2, inningHalf: "bottom", eventType: "hit",     description: "RBI Single / Freeman (LAD)",    playerName: "Freddie Freeman",  teamAbbr: "LAD", runs: 1 },
  { id: "e003", inning: 3, inningHalf: "top",    eventType: "hit",     description: "RBI Double / Olson (ATL)",      playerName: "Matt Olson",       teamAbbr: "ATL", runs: 1 },
  { id: "e004", inning: 3, inningHalf: "bottom", eventType: "error",   description: "Fielding Error - 2B (LAD)",     teamAbbr: "LAD" },
  { id: "e005", inning: 4, inningHalf: "top",    eventType: "hit",     description: "RBI Single / Acuna Jr. (ATL)", playerName: "Ronald Acuna Jr.", teamAbbr: "ATL", runs: 1 },
  { id: "e006", inning: 4, inningHalf: "bottom", eventType: "homerun", description: "Solo HR / Ohtani (LAD)",        playerName: "Shohei Ohtani",    teamAbbr: "LAD", runs: 1 },
];

const homeLineup002: AppLineupEntry[] = [
  { battingOrder: 1, player: playerMap["p007"], position: "SS" },
  { battingOrder: 2, player: playerMap["p002"], position: "DH" },
  { battingOrder: 3, player: playerMap["p004"], position: "1B" },
  { battingOrder: 4, player: playerMap["p010"], position: "RF" },
  { battingOrder: 5, player: playerMap["p013"], position: "C"  },
  { battingOrder: 6, player: playerMap["p014"], position: "3B" },
  { battingOrder: 7, player: playerMap["p016"], position: "LF" },
  { battingOrder: 8, player: playerMap["p015"], position: "2B" },
  { battingOrder: 9, player: playerMap["p021"], position: "P"  },
];

const awayLineup002: AppLineupEntry[] = [
  { battingOrder: 1, player: playerMap["p006"], position: "RF" },
  { battingOrder: 2, player: playerMap["p017"], position: "1B" },
  { battingOrder: 3, player: playerMap["p018"], position: "3B" },
  { battingOrder: 4, player: playerMap["p019"], position: "2B" },
  { battingOrder: 5, player: playerMap["p020"], position: "CF" },
  { battingOrder: 6, player: playerMap["p009"], position: "DH" },
  { battingOrder: 7, player: playerMap["p011"], position: "SS" },
  { battingOrder: 8, player: playerMap["p012"], position: "LF" },
  { battingOrder: 9, player: playerMap["p008"], position: "P"  },
];

const homeBox002: AppBoxScorePlayer[] = [
  // 타자
  { player: playerMap["p007"], atBats: 4, hits: 1, runs: 0, rbi: 0, homeRuns: 0, strikeouts: 1, walks: 0 },
  { player: playerMap["p002"], atBats: 4, hits: 2, runs: 1, rbi: 0, homeRuns: 1, strikeouts: 1, walks: 0 },
  { player: playerMap["p004"], atBats: 4, hits: 2, runs: 1, rbi: 1, homeRuns: 0, strikeouts: 0, walks: 1 },
  { player: playerMap["p010"], atBats: 3, hits: 0, runs: 0, rbi: 0, homeRuns: 0, strikeouts: 2, walks: 1 },
  { player: playerMap["p013"], atBats: 3, hits: 1, runs: 0, rbi: 0, homeRuns: 0, strikeouts: 1, walks: 0 },
  // 투수
  { player: playerMap["p021"], inningsPitched: "4.0", hits: 7, runs: 4, earnedRuns: 4, pitchingWalks: 1, pitchingStrikeouts: 5, era: "9.00" },
];

const awayBox002: AppBoxScorePlayer[] = [
  // 타자
  { player: playerMap["p006"], atBats: 4, hits: 3, runs: 2, rbi: 3, homeRuns: 1, strikeouts: 0, walks: 0 },
  { player: playerMap["p017"], atBats: 4, hits: 1, runs: 1, rbi: 1, homeRuns: 0, strikeouts: 1, walks: 0 },
  { player: playerMap["p018"], atBats: 3, hits: 1, runs: 0, rbi: 0, homeRuns: 0, strikeouts: 1, walks: 1 },
  { player: playerMap["p019"], atBats: 4, hits: 1, runs: 1, rbi: 0, homeRuns: 0, strikeouts: 0, walks: 0 },
  { player: playerMap["p020"], atBats: 3, hits: 1, runs: 0, rbi: 0, homeRuns: 0, strikeouts: 1, walks: 0 },
  // 투수
  { player: playerMap["p008"], inningsPitched: "4.0", hits: 6, runs: 2, earnedRuns: 2, pitchingWalks: 1, pitchingStrikeouts: 5, era: "4.50" },
];

// ─── 경기 센터: g001 (종료 - NYY vs BOS) ─────────────────────────────────────

const lineScore001: AppLineScoreInning[] = [
  { inning: 1, homeRuns: 0, awayRuns: 0, homeHits: 0, awayHits: 2, homeErrors: 0, awayErrors: 0 },
  { inning: 2, homeRuns: 2, awayRuns: 0, homeHits: 3, awayHits: 1, homeErrors: 0, awayErrors: 0 },
  { inning: 3, homeRuns: 0, awayRuns: 1, homeHits: 0, awayHits: 2, homeErrors: 0, awayErrors: 0 },
  { inning: 4, homeRuns: 0, awayRuns: 0, homeHits: 1, awayHits: 0, homeErrors: 0, awayErrors: 0 },
  { inning: 5, homeRuns: 2, awayRuns: 1, homeHits: 2, awayHits: 2, homeErrors: 0, awayErrors: 0 },
  { inning: 6, homeRuns: 0, awayRuns: 0, homeHits: 0, awayHits: 1, homeErrors: 0, awayErrors: 0 },
  { inning: 7, homeRuns: 0, awayRuns: 1, homeHits: 0, awayHits: 2, homeErrors: 1, awayErrors: 0 },
  { inning: 8, homeRuns: 1, awayRuns: 0, homeHits: 1, awayHits: 0, homeErrors: 0, awayErrors: 0 },
  { inning: 9, homeRuns: 0, awayRuns: 0, homeHits: 0, awayHits: 1, homeErrors: 0, awayErrors: 0 },
];

const events001: AppGameEvent[] = [
  { id: "f001", inning: 2, inningHalf: "bottom", eventType: "homerun", description: "2-run HR / Judge (NYY)",       playerName: "Aaron Judge",       teamAbbr: "NYY", runs: 2 },
  { id: "f002", inning: 3, inningHalf: "top",    eventType: "hit",     description: "RBI Single / Devers (BOS)",   playerName: "Rafael Devers",     teamAbbr: "BOS", runs: 1 },
  { id: "f003", inning: 5, inningHalf: "bottom", eventType: "homerun", description: "2-run HR / Stanton (NYY)",    playerName: "Giancarlo Stanton", teamAbbr: "NYY", runs: 2 },
  { id: "f004", inning: 5, inningHalf: "top",    eventType: "hit",     description: "RBI Double / Casas (BOS)",    playerName: "Triston Casas",     teamAbbr: "BOS", runs: 1 },
  { id: "f005", inning: 7, inningHalf: "top",    eventType: "error",   description: "Fielding Error (NYY) - Bichette scored", playerName: "Bo Bichette", teamAbbr: "BOS", runs: 1 },
  { id: "f006", inning: 8, inningHalf: "bottom", eventType: "hit",     description: "RBI Single / Volpe (NYY)",    playerName: "Anthony Volpe",     teamAbbr: "NYY", runs: 1 },
  { id: "f007", inning: 9, inningHalf: "bottom", eventType: "game_end", description: "경기 종료 - NYY 5 : BOS 3" },
];

// NYY = home, BOS = away
const homeLineup001: AppLineupEntry[] = [
  { battingOrder: 1, player: playerMap["p023"], position: "SS" },
  { battingOrder: 2, player: playerMap["p001"], position: "RF" },
  { battingOrder: 3, player: playerMap["p022"], position: "DH" },
  { battingOrder: 4, player: playerMap["p009"], position: "3B" },
  { battingOrder: 5, player: playerMap["p014"], position: "1B" },
];

const awayLineup001: AppLineupEntry[] = [
  { battingOrder: 1, player: playerMap["p011"], position: "SS" },
  { battingOrder: 2, player: playerMap["p024"], position: "3B" },
  { battingOrder: 3, player: playerMap["p025"], position: "1B" },
  { battingOrder: 4, player: playerMap["p005"], position: "DH" },
  { battingOrder: 5, player: playerMap["p010"], position: "RF" },
];

const homeBox001: AppBoxScorePlayer[] = [
  // 타자
  { player: playerMap["p001"], atBats: 4, hits: 2, runs: 2, rbi: 2, homeRuns: 1, strikeouts: 1, walks: 0 },
  { player: playerMap["p022"], atBats: 4, hits: 2, runs: 2, rbi: 2, homeRuns: 1, strikeouts: 1, walks: 0 },
  { player: playerMap["p023"], atBats: 3, hits: 1, runs: 1, rbi: 1, homeRuns: 0, strikeouts: 0, walks: 1 },
  // 투수
  { player: playerMap["p003"], inningsPitched: "7.0", hits: 6, runs: 3, earnedRuns: 2, pitchingWalks: 1, pitchingStrikeouts: 8, era: "2.86" },
];

const awayBox001: AppBoxScorePlayer[] = [
  // 타자
  { player: playerMap["p024"], atBats: 4, hits: 2, runs: 1, rbi: 1, homeRuns: 0, strikeouts: 0, walks: 0 },
  { player: playerMap["p025"], atBats: 4, hits: 2, runs: 1, rbi: 1, homeRuns: 0, strikeouts: 1, walks: 0 },
  { player: playerMap["p011"], atBats: 4, hits: 1, runs: 1, rbi: 0, homeRuns: 0, strikeouts: 1, walks: 0 },
  // 투수
  { player: playerMap["p026"], inningsPitched: "5.0", hits: 7, runs: 4, earnedRuns: 4, pitchingWalks: 2, pitchingStrikeouts: 4, era: "7.20" },
];

// ─── 경기 센터 조회 ───────────────────────────────────────────────────────────

export function getDummyGameCenter(gameId: string): AppGameCenter | null {
  const dateKst = getTodayKst();
  const games = getDummyGames(dateKst);
  const game = games.find((g) => g.id === gameId);
  if (!game) return null;

  if (gameId === "g002") {
    return {
      game,
      lineScore: lineScore002,
      currentMatchup: {
        batter:  playerMap["p002"],
        pitcher: playerMap["p008"],
        balls: 2, strikes: 1, outs: 1,
        bases: { first: true, second: false, third: true },
      },
      homeLineup:    homeLineup002,
      awayLineup:    awayLineup002,
      homeBoxScore:  homeBox002,
      awayBoxScore:  awayBox002,
      events:        events002,
    };
  }

  if (gameId === "g001") {
    return {
      game,
      lineScore: lineScore001,
      homeLineup:   homeLineup001,
      awayLineup:   awayLineup001,
      homeBoxScore: homeBox001,
      awayBoxScore: awayBox001,
      events:       events001,
    };
  }

  return null;
}

// ─── 팀 상세 ─────────────────────────────────────────────────────────────────

export const DUMMY_TEAM_DETAILS: AppTeamDetail[] = [
  { ...teamMap["nyy"], record: { wins: 42, losses: 28, pct: 0.600, gbDivision: "-" },   rosterPlaceholder: true },
  { ...teamMap["lad"], record: { wins: 45, losses: 24, pct: 0.652, gbDivision: "-" },   rosterPlaceholder: true },
  { ...teamMap["atl"], record: { wins: 38, losses: 32, pct: 0.543, gbDivision: "7.0" }, rosterPlaceholder: true },
];

export { playerMap, teamMap };
