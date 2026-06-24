// Compile-time type validation for BallDontLie mappers.
// No runtime test runner required — run `npx tsc --noEmit` to verify.
// If any mapper's return type diverges from the internal model, tsc will fail here.
import type { AppGame } from "../../models/game";
import type { AppPlayerDetail } from "../../models/player";
import { mapBdlGame, mapBdlPlayer } from "./mappers";
import {
  FIXTURE_BDL_GAME,
  FIXTURE_BDL_GAME_SCHEDULED,
  FIXTURE_BDL_PLAYER,
  FIXTURE_BDL_PLAYER_PITCHER,
} from "./__fixtures__";

function assertType<T>(_: T): void {
  // compile-time only — body intentionally empty
}

assertType<AppGame>(mapBdlGame(FIXTURE_BDL_GAME));
assertType<AppGame>(mapBdlGame(FIXTURE_BDL_GAME_SCHEDULED));
assertType<AppPlayerDetail>(mapBdlPlayer(FIXTURE_BDL_PLAYER));
assertType<AppPlayerDetail>(mapBdlPlayer(FIXTURE_BDL_PLAYER_PITCHER));
