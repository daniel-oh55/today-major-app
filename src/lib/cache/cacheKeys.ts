const PREFIX = "today-major";

export const CacheKeys = {
  schedule:     (dateKst: string)  => `${PREFIX}:schedule:${dateKst}`,
  gameCenter:   (gameId: string)   => `${PREFIX}:gameCenter:${gameId}`,
  liveGame:     (gameId: string)   => `${PREFIX}:liveGame:${gameId}`,
  player:       (playerId: string) => `${PREFIX}:player:${playerId}`,
  playerSearch: (query: string)    => `${PREFIX}:playerSearch:${query.toLowerCase()}`,
  team:         (teamId: string)   => `${PREFIX}:team:${teamId}`,
  standings:    (season: string)   => `${PREFIX}:standings:${season}`,
} as const;
