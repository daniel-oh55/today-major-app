import type { BaseballDataProvider, GetGamesByDateParams, GetGameCenterParams, SearchPlayersParams, GetPlayerParams, GetTeamParams } from "../types";
import type { ProviderMetadata } from "../metadata";
import type { AppGame, AppGameCenter } from "../../models/game";
import type { AppPlayerDetail } from "../../models/player";
import type { AppTeamDetail } from "../../models/team";
import { PROVIDER_METADATA } from "../metadata";
import { getTodayKst } from "../../utils/koreaTime";
import { getDummyGames, getDummyGameCenter, getEnrichedPlayer, getEnrichedPlayers, DUMMY_TEAM_DETAILS } from "./dummyData";

export class DummyProvider implements BaseballDataProvider {
  readonly metadata: ProviderMetadata = PROVIDER_METADATA.dummy;
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

  async searchPlayers({ query, limit = 10 }: SearchPlayersParams): Promise<AppPlayerDetail[]> {
    const q = query.toLowerCase();
    return getEnrichedPlayers()
      .filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          (p.koreanName?.toLowerCase().includes(q) ?? false) ||
          p.teamName.toLowerCase().includes(q) ||
          p.position.toLowerCase().includes(q)
      )
      .slice(0, limit);
  }

  async getPlayer({ playerId }: GetPlayerParams): Promise<AppPlayerDetail> {
    const player = getEnrichedPlayer(playerId);
    if (!player) throw new Error(`Player not found: ${playerId}`);
    return player;
  }

  async getTeam({ teamId }: GetTeamParams): Promise<AppTeamDetail> {
    const team = DUMMY_TEAM_DETAILS.find((t) => t.id === teamId);
    if (!team) throw new Error(`Team not found: ${teamId}`);
    return team;
  }
}
