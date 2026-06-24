// Mapper: MySportsFeeds fictional API response → internal AppModel
// 실제 연동 시 이 파일의 타입과 변환 로직을 실제 API 응답에 맞게 수정합니다.
import type { AppGame } from "../../models/game";
import type { AppTeam } from "../../models/team";
import type { AppPlayerDetail, AppPosition } from "../../models/player";
import type { AppGameStatus } from "../../models/common";
import { AppDataError } from "../errors";
import type { MsfGameSchedule, MsfTeamDetail, MsfPlayerInfo } from "./types";

const VALID_POSITIONS: AppPosition[] = ["P","C","1B","2B","3B","SS","LF","CF","RF","DH","OF","IF"];

function mapMsfGameStatus(status: string): AppGameStatus {
  switch ((status ?? "").toUpperCase()) {
    case "FINAL":     return "final";
    case "LIVE":      return "live";
    case "SCHEDULED": return "scheduled";
    case "DELAYED":   return "delayed";
    case "POSTPONED": return "postponed";
    case "CANCELLED": return "cancelled";
    case "SUSPENDED": return "suspended";
    default:          return "unknown";
  }
}

function parseMsfDate(raw: string): string {
  // "20250617" → "2025-06-17"
  if (raw.length === 8) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  }
  return raw;
}

function mapMsfTeam(raw: MsfTeamDetail): AppTeam {
  const league = raw.league === "AL" ? "AL" : ("NL" as const);
  const division = (["East", "Central", "West"].includes(raw.division)
    ? raw.division : "East") as "East" | "Central" | "West";
  return {
    id: raw.team_id,
    providerRef: { providerId: "mysportsfeeds", externalId: raw.team_id },
    name: raw.full_name,
    shortName: raw.name,
    abbreviation: raw.team_id,
    city: raw.city,
    league,
    division,
  };
}

export function mapMsfGame(raw: MsfGameSchedule): AppGame {
  if (!raw.game_id || !raw.home_team || !raw.away_team) {
    throw new AppDataError(
      "invalid_response", "mysportsfeeds_skeleton", "mapMsfGame: missing required fields"
    );
  }
  const inningHalf = raw.current_inning_half === "B" ? "bottom" : "top";
  return {
    id: raw.game_id,
    providerRef: { providerId: "mysportsfeeds", externalId: raw.game_id },
    gameDate: parseMsfDate(raw.scheduled_date),
    gameTimeKst: "TBD",   // UTC → KST 변환은 실제 연동 시 구현
    status: mapMsfGameStatus(raw.game_status),
    statusDetail: raw.game_status,
    homeTeam: mapMsfTeam(raw.home_team),
    awayTeam: mapMsfTeam(raw.away_team),
    homeScore: raw.home_score ?? 0,
    awayScore: raw.away_score ?? 0,
    inning: raw.current_inning ?? 0,
    inningHalf,
    isTiebreak: false,
    venue: raw.venue_name ?? undefined,
  };
}

export function mapMsfPlayer(raw: MsfPlayerInfo): AppPlayerDetail {
  if (!raw.player_id || !raw.first_name || !raw.last_name) {
    throw new AppDataError(
      "invalid_response", "mysportsfeeds_skeleton", "mapMsfPlayer: missing required fields"
    );
  }
  const batHand = raw.bat_hand === "L" ? "L" : raw.bat_hand === "S" ? "S" : ("R" as const);
  const throwHand = raw.throw_hand === "L" ? "L" : ("R" as const);
  const position = VALID_POSITIONS.includes(raw.primary_position as AppPosition)
    ? (raw.primary_position as AppPosition)
    : "OF";

  return {
    id: raw.player_id,
    providerRef: { providerId: "mysportsfeeds", externalId: raw.player_id },
    fullName: `${raw.first_name} ${raw.last_name}`,
    firstName: raw.first_name,
    lastName: raw.last_name,
    jerseyNumber: raw.jersey_number ?? "",
    position,
    teamId: raw.current_team?.team_id ?? "",
    teamName: raw.current_team?.full_name ?? "",
    batHand,
    throwHand,
    birthDate: raw.birth_date ?? undefined,
    height: raw.height ?? undefined,
    weight: raw.weight ?? undefined,
  };
}
