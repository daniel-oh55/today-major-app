import type { CacheDataType, CachePolicy } from "../cache/types";
import { CACHE_POLICIES } from "../cache/cachePolicy";

export const PROVIDER_OPERATION_NAMES = [
  "games.today",
  "games.detail",
  "games.live",
  "players.search",
  "players.detail",
  "teams.detail",
  "standings.get",
  "lineups.get",
  "boxscore.get",
] as const;

export type ProviderOperationName = (typeof PROVIDER_OPERATION_NAMES)[number];

const OPERATION_CACHE_DATA_TYPE: Record<ProviderOperationName, CacheDataType> = {
  "games.today":    "schedule",
  "games.detail":   "historicalGame",
  "games.live":     "liveGame",
  "players.search": "playerProfile",
  "players.detail": "playerProfile",
  "teams.detail":   "teamProfile",
  "standings.get":  "standings",
  "lineups.get":    "lineups",
  "boxscore.get":   "boxScore",
};

export function getCachePolicyForOperation(op: ProviderOperationName): CachePolicy {
  return CACHE_POLICIES[OPERATION_CACHE_DATA_TYPE[op]];
}
