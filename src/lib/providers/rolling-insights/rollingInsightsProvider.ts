// DataFeeds by Rolling Insights API provider — skeleton
// 실제 연동 전 계약 및 약관 검토 필요. 이 파일은 구조만 정의합니다.
import type { BaseballDataProvider, GetGamesByDateParams, GetGameCenterParams, SearchPlayersParams, GetPlayerParams, GetTeamParams } from "../types";
import type { ProviderMetadata } from "../metadata";
import type { AppGame, AppGameCenter } from "../../models/game";
import type { AppPlayerDetail } from "../../models/player";
import type { AppTeamDetail } from "../../models/team";
import { PROVIDER_METADATA } from "../metadata";
import { AppDataError } from "../errors";

export class RollingInsightsProvider implements BaseballDataProvider {
  readonly metadata: ProviderMetadata = PROVIDER_METADATA.rolling_insights_skeleton;

  constructor(private readonly apiKey: string) {}

  async getGamesByDate(_params: GetGamesByDateParams): Promise<AppGame[]> {
    throw new AppDataError("provider_unavailable", this.metadata.id, "RollingInsightsProvider: not implemented");
  }

  async getGameCenter(_params: GetGameCenterParams): Promise<AppGameCenter> {
    throw new AppDataError("provider_unavailable", this.metadata.id, "RollingInsightsProvider: not implemented");
  }

  async searchPlayers(_params: SearchPlayersParams): Promise<AppPlayerDetail[]> {
    throw new AppDataError("provider_unavailable", this.metadata.id, "RollingInsightsProvider: not implemented");
  }

  async getPlayer(_params: GetPlayerParams): Promise<AppPlayerDetail> {
    throw new AppDataError("provider_unavailable", this.metadata.id, "RollingInsightsProvider: not implemented");
  }

  async getTeam(_params: GetTeamParams): Promise<AppTeamDetail> {
    throw new AppDataError("provider_unavailable", this.metadata.id, "RollingInsightsProvider: not implemented");
  }
}
