// Fictional representation of a BallDontLie-style API response shape.
// These types do NOT reflect the actual BallDontLie API contract.
// Actual types must be derived from official API documentation after contract.

export interface BdlTeam {
  id: number;
  name: string;           // "New York Yankees"
  abbreviation: string;   // "NYY"
  city: string;
  conference: string;     // "American" | "National"
  division: string;       // "East" | "Central" | "West"
}

export interface BdlGame {
  id: number;
  date: string;                     // "YYYY-MM-DD"
  time: string | null;              // "19:10" (ET)
  home_team: BdlTeam;
  visitor_team: BdlTeam;
  home_team_score: number | null;
  visitor_team_score: number | null;
  period: number | null;            // current inning number
  status: string;                   // "Final" | "In Progress" | "Scheduled" | "Postponed"
  venue: string | null;
}

export interface BdlPlayer {
  id: number;
  first_name: string;
  last_name: string;
  jersey_number: string | null;
  position: string;
  team: BdlTeam;
  height: string | null;
  weight: string | null;
  birth_date: string | null;
  bats: string | null;    // "L" | "R" | "S"
  throws: string | null;  // "L" | "R"
}
