import type { AppGame } from "../models/game";
import type { AppGameStatus } from "../models/common";

/** 홈 화면 필터 옵션. "scheduled"는 scheduled + pre_game을 포함합니다. */
export type StatusFilter = "all" | AppGameStatus;

export interface GameStatusCounts {
  total: number;
  live: number;
  scheduled: number;  // scheduled + pre_game
  final: number;
  other: number;      // delayed, postponed, cancelled, suspended, unknown
}

export function getGameStatusCounts(games: AppGame[]): GameStatusCounts {
  const UPCOMING: AppGameStatus[] = ["scheduled", "pre_game"];
  const TERMINAL: AppGameStatus[] = ["final"];
  const ACTIVE: AppGameStatus[] = ["live"];
  return {
    total:     games.length,
    live:      games.filter((g) => ACTIVE.includes(g.status)).length,
    scheduled: games.filter((g) => UPCOMING.includes(g.status)).length,
    final:     games.filter((g) => TERMINAL.includes(g.status)).length,
    other:     games.filter((g) => ![...ACTIVE, ...UPCOMING, ...TERMINAL].includes(g.status)).length,
  };
}

/** "scheduled" 필터는 scheduled + pre_game 양쪽을 포함합니다. */
export function filterGamesByStatus(games: AppGame[], filter: StatusFilter): AppGame[] {
  if (filter === "all") return games;
  if (filter === "scheduled") return games.filter((g) => g.status === "scheduled" || g.status === "pre_game");
  return games.filter((g) => g.status === filter);
}

export function getFavoriteTeamGames(games: AppGame[], favoriteTeamIds: string[]): AppGame[] {
  if (favoriteTeamIds.length === 0) return [];
  return games.filter(
    (g) => favoriteTeamIds.includes(g.homeTeam.id) || favoriteTeamIds.includes(g.awayTeam.id)
  );
}
