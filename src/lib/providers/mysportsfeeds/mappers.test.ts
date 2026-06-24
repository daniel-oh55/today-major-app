// Compile-time type validation for MySportsFeeds mappers.
// No runtime test runner required — run `npx tsc --noEmit` to verify.
// If any mapper's return type diverges from the internal model, tsc will fail here.
import type { AppGame } from "../../models/game";
import type { AppPlayerDetail } from "../../models/player";
import { mapMsfGame, mapMsfPlayer } from "./mappers";
import {
  FIXTURE_MSF_GAME,
  FIXTURE_MSF_GAME_SCHEDULED,
  FIXTURE_MSF_PLAYER,
  FIXTURE_MSF_PLAYER_PITCHER,
} from "./__fixtures__";

function assertType<T>(_: T): void {
  // compile-time only — body intentionally empty
}

assertType<AppGame>(mapMsfGame(FIXTURE_MSF_GAME));
assertType<AppGame>(mapMsfGame(FIXTURE_MSF_GAME_SCHEDULED));
assertType<AppPlayerDetail>(mapMsfPlayer(FIXTURE_MSF_PLAYER));
assertType<AppPlayerDetail>(mapMsfPlayer(FIXTURE_MSF_PLAYER_PITCHER));
