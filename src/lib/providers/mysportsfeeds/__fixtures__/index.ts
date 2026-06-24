// Fixture data for MySportsFeeds mapper type checks.
// These are fictional values for structural validation only — not real API responses.
import type { MsfGameSchedule, MsfPlayerInfo, MsfTeamDetail } from "../types";

export const FIXTURE_MSF_TEAM_HOME: MsfTeamDetail = {
  team_id: "NYY",
  city: "New York",
  name: "Yankees",
  full_name: "New York Yankees",
  league: "AL",
  division: "East",
};

export const FIXTURE_MSF_TEAM_AWAY: MsfTeamDetail = {
  team_id: "BOS",
  city: "Boston",
  name: "Red Sox",
  full_name: "Boston Red Sox",
  league: "AL",
  division: "East",
};

export const FIXTURE_MSF_GAME: MsfGameSchedule = {
  game_id: "20250617-NYY-BOS",
  scheduled_date: "20250617",
  scheduled_time_utc: "2025-06-17T23:10:00Z",
  home_team: FIXTURE_MSF_TEAM_HOME,
  away_team: FIXTURE_MSF_TEAM_AWAY,
  home_score: 5,
  away_score: 3,
  current_inning: 9,
  current_inning_half: "B",
  game_status: "FINAL",
  venue_name: "Yankee Stadium",
};

export const FIXTURE_MSF_GAME_SCHEDULED: MsfGameSchedule = {
  game_id: "20250618-NYY-BOS",
  scheduled_date: "20250618",
  scheduled_time_utc: "2025-06-18T00:10:00Z",
  home_team: FIXTURE_MSF_TEAM_HOME,
  away_team: FIXTURE_MSF_TEAM_AWAY,
  home_score: null,
  away_score: null,
  current_inning: null,
  current_inning_half: null,
  game_status: "SCHEDULED",
  venue_name: null,
};

export const FIXTURE_MSF_PLAYER: MsfPlayerInfo = {
  player_id: "judge-a-99",
  first_name: "Aaron",
  last_name: "Judge",
  jersey_number: "99",
  primary_position: "RF",
  current_team: FIXTURE_MSF_TEAM_HOME,
  birth_date: "1992-04-26",
  bat_hand: "R",
  throw_hand: "R",
  height: "6-7",
  weight: "282",
};

export const FIXTURE_MSF_PLAYER_PITCHER: MsfPlayerInfo = {
  player_id: "cole-g-45",
  first_name: "Gerrit",
  last_name: "Cole",
  jersey_number: "45",
  primary_position: "P",
  current_team: FIXTURE_MSF_TEAM_HOME,
  birth_date: "1990-09-08",
  bat_hand: "R",
  throw_hand: "R",
  height: "6-4",
  weight: "220",
};
