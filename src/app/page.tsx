import { getGamesByDate } from "@/lib/services/gameService";
import { getTodayKst } from "@/lib/utils/koreaTime";
import { HomeClient } from "@/components/games/HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  const dateKst = getTodayKst();
  const games = await getGamesByDate(dateKst);
  return <HomeClient games={games} dateKst={dateKst} />;
}
