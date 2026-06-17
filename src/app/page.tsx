import { Fragment } from "react";
import { getGamesByDate } from "@/lib/services/gameService";
import { GameCard } from "@/components/games/GameCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import { EmptyState } from "@/components/common/EmptyState";
import { getTodayKst } from "@/lib/utils/koreaTime";

export const revalidate = 60;

export default async function HomePage() {
  const dateKst = getTodayKst();
  const games = await getGamesByDate(dateKst);

  const liveGames = games.filter((g) => g.status === "live");
  const otherGames = games.filter((g) => g.status !== "live");

  return (
    <div className="flex flex-col gap-0">
      {/* 상단 배너 광고 */}
      <div className="px-4 pt-3">
        <AdSlot placement="home_top_banner" />
      </div>

      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-400">
          {dateKst.replace(/-/g, ".")} KST 기준
        </p>
      </div>

      {/* 진행 중 경기 */}
      {liveGames.length > 0 && (
        <section className="px-4 py-2">
          <h2 className="text-sm font-bold text-red-500 mb-2">진행 중</h2>
          <div className="flex flex-col gap-2">
            {liveGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* 네이티브 광고 */}
      {liveGames.length > 0 && (
        <div className="px-4 py-2">
          <AdSlot placement="home_game_list_native" />
        </div>
      )}

      {/* 나머지 경기 */}
      {otherGames.length > 0 && (
        <section className="px-4 py-2">
          <h2 className="text-sm font-bold text-gray-700 mb-2">전체 경기</h2>
          <div className="flex flex-col gap-2">
            {otherGames.map((game, idx) => (
              <Fragment key={game.id}>
                <GameCard game={game} />
                {idx === 3 && (
                  <AdSlot placement="home_game_list_native" />
                )}
              </Fragment>
            ))}
          </div>
        </section>
      )}

      {games.length === 0 && (
        <EmptyState message="오늘 예정된 경기가 없습니다." sub="다른 날짜를 확인해 보세요." />
      )}

      <div className="py-2">
        <DataSourceNotice />
      </div>
    </div>
  );
}
