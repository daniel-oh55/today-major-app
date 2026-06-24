// Fixture data for BallDontLie mapper type checks.
// These are fictional values for structural validation only — not real API responses.
import type { BdlGame, BdlPlayer, BdlTeam } from "../types";

export const FIXTURE_BDL_TEAM_HOME: BdlTeam = {
  id: 14,
  name: "New York Yankees",
  abbreviation: "NYY",
  city: "New York",
  conference: "American",
  division: "East",
};

export const FIXTURE_BDL_TEAM_AWAY: BdlTeam = {
  id: 2,
  name: "Boston Red Sox",
  abbreviation: "BOS",
  city: "Boston",
  conference: "American",
  division: "East",
};

export const FIXTURE_BDL_GAME: BdlGame = {
  id: 9001,
  date: "2025-06-17",
  time: "19:10",
  home_team: FIXTURE_BDL_TEAM_HOME,
  visitor_team: FIXTURE_BDL_TEAM_AWAY,
  home_team_score: 5,
  visitor_team_score: 3,
  period: 9,
  status: "Final",
  venue: "Yankee Stadium",
};

export const FIXTURE_BDL_GAME_SCHEDULED: BdlGame = {
  id: 9002,
  date: "2025-06-18",
  time: "20:10",
  home_team: FIXTURE_BDL_TEAM_HOME,
  visitor_team: FIXTURE_BDL_TEAM_AWAY,
  home_team_score: null,
  visitor_team_score: null,
  period: null,
  status: "Scheduled",
  venue: null,
};

export const FIXTURE_BDL_PLAYER: BdlPlayer = {
  id: 42,
  first_name: "Aaron",
  last_name: "Judge",
  jersey_number: "99",
  position: "RF",
  team: FIXTURE_BDL_TEAM_HOME,
  height: "6-7",
  weight: "282",
  birth_date: "1992-04-26",
  bats: "R",
  throws: "R",
};

export const FIXTURE_BDL_PLAYER_PITCHER: BdlPlayer = {
  id: 77,
  first_name: "Gerrit",
  last_name: "Cole",
  jersey_number: "45",
  position: "P",
  team: FIXTURE_BDL_TEAM_HOME,
  height: "6-4",
  weight: "220",
  birth_date: "1990-09-08",
  bats: "R",
  throws: "R",
};
