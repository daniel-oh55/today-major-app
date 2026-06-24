import type { ProviderMetadata } from "./metadata";
import type { AppGame, AppGameCenter } from "../models/game";
import type { AppPlayerDetail } from "../models/player";
import type { AppTeamDetail } from "../models/team";

export type { ProviderMetadata } from "./metadata";

export interface GetGamesByDateParams {
  dateKst: string; // "2025-06-17"
}

export interface GetGameCenterParams {
  gameId: string;
}

export interface SearchPlayersParams {
  query: string;
  limit?: number;
}

export interface GetPlayerParams {
  playerId: string;
}

export interface GetTeamParams {
  teamId: string;
}

export interface BaseballDataProvider {
  readonly metadata: ProviderMetadata;
  getGamesByDate(params: GetGamesByDateParams): Promise<AppGame[]>;
  getGameCenter(params: GetGameCenterParams): Promise<AppGameCenter>;
  searchPlayers(params: SearchPlayersParams): Promise<AppPlayerDetail[]>;
  getPlayer(params: GetPlayerParams): Promise<AppPlayerDetail>;
  getTeam(params: GetTeamParams): Promise<AppTeamDetail>;
}
