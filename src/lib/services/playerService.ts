import "server-only";
import { getBaseballDataProvider } from "../providers";
import type { AppPlayerDetail } from "../models/player";

export async function searchPlayers(query: string, limit = 10): Promise<AppPlayerDetail[]> {
  const provider = getBaseballDataProvider();
  return provider.searchPlayers({ query, limit });
}

export async function getPlayer(playerId: string): Promise<AppPlayerDetail> {
  const provider = getBaseballDataProvider();
  return provider.getPlayer({ playerId });
}
