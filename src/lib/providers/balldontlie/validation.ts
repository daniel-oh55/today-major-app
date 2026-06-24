// Structural validation for BallDontLie fictional API responses.
// Validates shape before mapping to prevent runtime crashes on unexpected API shapes.
// TODO: expand field checks to match actual API contract once integration is confirmed.

import { isRecord, hasNumber, hasNonEmptyString, hasRecord } from "../validation";
import { AppDataError } from "../errors";

const PROVIDER_ID = "balldontlie_skeleton";

export function validateBdlTeam(raw: unknown, context: string): asserts raw is Record<string, unknown> {
  if (!isRecord(raw) || !hasNumber(raw, "id") || !hasNonEmptyString(raw, "name")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, `${context}: invalid or missing team object`);
  }
}

export function validateBdlGame(raw: unknown): asserts raw is Record<string, unknown> {
  if (!isRecord(raw)) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateBdlGame: not an object");
  }
  if (!hasNumber(raw, "id")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateBdlGame: missing id");
  }
  validateBdlTeam(raw["home_team"], "home_team");
  validateBdlTeam(raw["visitor_team"], "visitor_team");
}

export function validateBdlPlayer(raw: unknown): asserts raw is Record<string, unknown> {
  if (!isRecord(raw)) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateBdlPlayer: not an object");
  }
  if (!hasNumber(raw, "id")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateBdlPlayer: missing id");
  }
  if (!hasNonEmptyString(raw, "first_name") || !hasNonEmptyString(raw, "last_name")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateBdlPlayer: missing name fields");
  }
  // team may be null for free agents; mapper handles null safely via optional chaining
  if (raw["team"] !== null && !hasRecord(raw, "team")) {
    throw new AppDataError("invalid_response", PROVIDER_ID, "validateBdlPlayer: team is not an object");
  }
}
