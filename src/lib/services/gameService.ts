import { getBaseballDataProvider } from "../providers";
import type { AppGame, AppGameCenter } from "../models/game";

export async function getGamesByDate(dateKst: string): Promise<AppGame[]> {
  const provider = getBaseballDataProvider();
  return provider.getGamesByDate({ dateKst });
}

export async function getGameCenter(gameId: string): Promise<AppGameCenter> {
  const provider = getBaseballDataProvider();
  return provider.getGameCenter({ gameId });
}
