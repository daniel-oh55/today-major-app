import type { BaseballDataProvider, GetGamesByDateParams, GetGameCenterParams, SearchPlayersParams, GetPlayerParams, GetTeamParams } from "../types";
import type { AppGame, AppGameCenter } from "../../models/game";
import type { AppPlayer, AppPlayerDetail } from "../../models/player";
import type { AppTeamDetail } from "../../models/team";
import { getTodayKst } from "../../utils/koreaTime";
import { getDummyGames, getDummyGameCenter, DUMMY_PLAYERS, DUMMY_TEAM_DETAILS } from "./dummyData";

export class DummyProvider implements BaseballDataProvider {
  async getGamesByDate({ dateKst }: GetGamesByDateParams): Promise<AppGame[]> {
    return getDummyGames(dateKst);
  }

  async getGameCenter({ gameId }: GetGameCenterParams): Promise<AppGameCenter> {
    const center = getDummyGameCenter(gameId);
    if (center) return center;

    // 다른 gameId는 종료 경기 skeleton 반환
    const games = getDummyGames(getTodayKst());
    const game = games.find((g) => g.id === gameId);
    if (!game) throw new Error(`Game not found: ${gameId}`);

    return {
      game,
      lineScore: [],
      homeLineup: [],
      awayLineup: [],
      homeBoxScore: [],
      awayBoxScore: [],
      events: [],
    };
  }

  async searchPlayers({ query, limit = 10 }: SearchPlayersParams): Promise<AppPlayer[]> {
    const q = query.toLowerCase();
    return DUMMY_PLAYERS.filter(
      (p) =>
        p.fullName.toLowerCase().includes(q) ||
        p.teamName.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q)
    ).slice(0, limit);
  }

  async getPlayer({ playerId }: GetPlayerParams): Promise<AppPlayerDetail> {
    const player = DUMMY_PLAYERS.find((p) => p.id === playerId);
    if (!player) throw new Error(`Player not found: ${playerId}`);
    return player;
  }

  async getTeam({ teamId }: GetTeamParams): Promise<AppTeamDetail> {
    const team = DUMMY_TEAM_DETAILS.find((t) => t.id === teamId);
    if (!team) throw new Error(`Team not found: ${teamId}`);
    return team;
  }
}
