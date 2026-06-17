import "server-only";
import { getBaseballDataProvider } from "../providers";
import type { AppTeamDetail } from "../models/team";

export async function getTeam(teamId: string): Promise<AppTeamDetail> {
  const provider = getBaseballDataProvider();
  return provider.getTeam({ teamId });
}
