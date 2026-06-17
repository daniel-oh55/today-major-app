// BallDontLie API provider - skeleton
// 실제 연동 시 이 파일을 구현합니다.
import type { BaseballDataProvider, GetGamesByDateParams, GetGameCenterParams, SearchPlayersParams, GetPlayerParams, GetTeamParams } from "../types";
import type { AppGame, AppGameCenter } from "../../models/game";
import type { AppPlayer, AppPlayerDetail } from "../../models/player";
import type { AppTeamDetail } from "../../models/team";

export class BallDontLieProvider implements BaseballDataProvider {
  constructor(private readonly apiKey: string) {}

  async getGamesByDate(_params: GetGamesByDateParams): Promise<AppGame[]> {
    throw new Error("BallDontLieProvider: not implemented");
  }

  async getGameCenter(_params: GetGameCenterParams): Promise<AppGameCenter> {
    throw new Error("BallDontLieProvider: not implemented");
  }

  async searchPlayers(_params: SearchPlayersParams): Promise<AppPlayer[]> {
    throw new Error("BallDontLieProvider: not implemented");
  }

  async getPlayer(_params: GetPlayerParams): Promise<AppPlayerDetail> {
    throw new Error("BallDontLieProvider: not implemented");
  }

  async getTeam(_params: GetTeamParams): Promise<AppTeamDetail> {
    throw new Error("BallDontLieProvider: not implemented");
  }
}
