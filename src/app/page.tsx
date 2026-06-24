import { getGamesByDate } from "@/lib/services/gameService";
import { getActiveProviderMetadata } from "@/lib/providers/registry";
import { getTodayKst } from "@/lib/utils/koreaTime";
import { HomeClient } from "@/components/games/HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  const dateKst = getTodayKst();
  const [games, providerMeta] = await Promise.all([
    getGamesByDate(dateKst),
    Promise.resolve(getActiveProviderMetadata()),
  ]);
  return <HomeClient games={games} dateKst={dateKst} providerMeta={providerMeta} />;
}
