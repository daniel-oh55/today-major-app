// Fictional representation of a MySportsFeeds-style API response shape.
// These types do NOT reflect the actual MySportsFeeds API contract.
// Actual types must be derived from official API documentation after contract.

export interface MsfTeamDetail {
  team_id: string;      // "NYY"
  city: string;         // "New York"
  name: string;         // "Yankees"
  full_name: string;    // "New York Yankees"
  league: string;       // "AL" | "NL"
  division: string;     // "East" | "Central" | "West"
}

export interface MsfGameSchedule {
  game_id: string;
  scheduled_date: string;        // "20250617" (YYYYMMDD)
  scheduled_time_utc: string;    // "2025-06-17T23:10:00Z"
  home_team: MsfTeamDetail;
  away_team: MsfTeamDetail;
  home_score: number | null;
  away_score: number | null;
  current_inning: number | null;
  current_inning_half: string | null;  // "T" | "B"
  game_status: string;           // "FINAL" | "LIVE" | "SCHEDULED" | "POSTPONED" | "CANCELLED"
  venue_name: string | null;
}

export interface MsfPlayerInfo {
  player_id: string;
  first_name: string;
  last_name: string;
  jersey_number: string | null;
  primary_position: string;
  current_team: MsfTeamDetail | null;  // null if player is a free agent or team data is unavailable
  birth_date: string | null;
  bat_hand: string | null;    // "L" | "R" | "S"
  throw_hand: string | null;  // "L" | "R"
  height: string | null;
  weight: string | null;
}
