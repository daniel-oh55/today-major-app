import { getBaseballDataProvider } from "../providers";
import type { AppPlayer, AppPlayerDetail } from "../models/player";

export async function searchPlayers(query: string, limit = 10): Promise<AppPlayer[]> {
  const provider = getBaseballDataProvider();
  return provider.searchPlayers({ query, limit });
}

export async function getPlayer(playerId: string): Promise<AppPlayerDetail> {
  const provider = getBaseballDataProvider();
  return provider.getPlayer({ playerId });
}
