// Mapper: BallDontLie fictional API response → internal AppModel
// 실제 연동 시 이 파일의 타입과 변환 로직을 실제 API 응답에 맞게 수정합니다.
import type { AppGame } from "../../models/game";
import type { AppTeam } from "../../models/team";
import type { AppPlayerDetail, AppPosition } from "../../models/player";
import type { AppGameStatus } from "../../models/common";
import { AppDataError } from "../errors";
import type { BdlGame, BdlTeam, BdlPlayer } from "./types";

const VALID_POSITIONS: AppPosition[] = ["P","C","1B","2B","3B","SS","LF","CF","RF","DH","OF","IF"];

function mapBdlGameStatus(status: string): AppGameStatus {
  switch ((status ?? "").toLowerCase()) {
    case "final":       return "final";
    case "in progress": return "live";
    case "scheduled":   return "scheduled";
    case "delayed":     return "delayed";
    case "postponed":   return "postponed";
    case "cancelled":   return "cancelled";
    case "suspended":   return "suspended";
    default:            return "unknown";
  }
}

function mapBdlTeam(raw: BdlTeam): AppTeam {
  const league = raw.conference === "American" ? "AL" : ("NL" as const);
  const division = (["East", "Central", "West"].includes(raw.division)
    ? raw.division : "East") as "East" | "Central" | "West";
  return {
    id: String(raw.id),
    providerRef: { providerId: "balldontlie", externalId: String(raw.id) },
    name: raw.name,
    shortName: raw.name.split(" ").at(-1) ?? raw.name,
    abbreviation: raw.abbreviation,
    city: raw.city,
    league,
    division,
  };
}

export function mapBdlGame(raw: BdlGame): AppGame {
  if (!raw.id || !raw.home_team || !raw.visitor_team) {
    throw new AppDataError(
      "invalid_response", "balldontlie_skeleton", "mapBdlGame: missing required fields"
    );
  }
  return {
    id: String(raw.id),
    providerRef: { providerId: "balldontlie", externalId: String(raw.id) },
    gameDate: raw.date,
    gameTimeKst: raw.time ?? "TBD",   // ET → KST 변환은 실제 연동 시 구현
    status: mapBdlGameStatus(raw.status),
    statusDetail: raw.status,
    homeTeam: mapBdlTeam(raw.home_team),
    awayTeam: mapBdlTeam(raw.visitor_team),
    homeScore: raw.home_team_score ?? 0,
    awayScore: raw.visitor_team_score ?? 0,
    inning: raw.period ?? 0,
    inningHalf: "top",
    isTiebreak: false,
    venue: raw.venue ?? undefined,
  };
}

export function mapBdlPlayer(raw: BdlPlayer): AppPlayerDetail {
  if (!raw.id || !raw.first_name || !raw.last_name) {
    throw new AppDataError(
      "invalid_response", "balldontlie_skeleton", "mapBdlPlayer: missing required fields"
    );
  }
  const batHand = raw.bats === "L" ? "L" : raw.bats === "S" ? "S" : ("R" as const);
  const throwHand = raw.throws === "L" ? "L" : ("R" as const);
  const position = VALID_POSITIONS.includes(raw.position as AppPosition)
    ? (raw.position as AppPosition)
    : "OF";

  return {
    id: String(raw.id),
    providerRef: { providerId: "balldontlie", externalId: String(raw.id) },
    fullName: `${raw.first_name} ${raw.last_name}`,
    firstName: raw.first_name,
    lastName: raw.last_name,
    jerseyNumber: raw.jersey_number ?? "",
    position,
    teamId: String(raw.team.id),
    teamName: raw.team.name,
    batHand,
    throwHand,
    birthDate: raw.birth_date ?? undefined,
    height: raw.height ?? undefined,
    weight: raw.weight ?? undefined,
  };
}
