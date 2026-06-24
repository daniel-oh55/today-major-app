// Structural validation for MySportsFeeds fictional API responses.
// Validates shape before mapping to prevent runtime crashes on unexpected API shapes.
// TODO: expand field checks to match actual API contract once integration is confirmed.

import { isRecord, hasNonEmptyString, hasRecord } from "../validation";
import { AppDataError } from "../errors";

const PROVIDER_ID = "mysportsfeeds_skeleton";

export function validateMsfTeam(raw: unknown, context: string): asserts raw is Record<string, unknown> {
  if (!isRecord(raw) || !hasNonEmptyString(raw, "team_id") || !hasNonEmptyString(raw, "full_name")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, `${context}: invalid or missing team object`);
  }
}

export function validateMsfGame(raw: unknown): asserts raw is Record<string, unknown> {
  if (!isRecord(raw)) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateMsfGame: not an object");
  }
  if (!hasNonEmptyString(raw, "game_id")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateMsfGame: missing game_id");
  }
  validateMsfTeam(raw["home_team"], "home_team");
  validateMsfTeam(raw["away_team"], "away_team");
}

export function validateMsfPlayer(raw: unknown): asserts raw is Record<string, unknown> {
  if (!isRecord(raw)) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateMsfPlayer: not an object");
  }
  if (!hasNonEmptyString(raw, "player_id")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateMsfPlayer: missing player_id");
  }
  if (!hasNonEmptyString(raw, "first_name") || !hasNonEmptyString(raw, "last_name")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateMsfPlayer: missing name fields");
  }
  // current_team may be null for free agents; mapper handles null safely via optional chaining
  if (raw["current_team"] !== null && !hasRecord(raw, "current_team")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateMsfPlayer: current_team is not an object");
  }
}
