import { getGameCenter } from "@/lib/services/gameService";
import { Scoreboard } from "@/components/games/Scoreboard";
import { CurrentMatchup } from "@/components/games/CurrentMatchup";
import { LineScoreTable } from "@/components/games/LineScoreTable";
import { LineupTable } from "@/components/games/LineupTable";
import { BoxScoreTable } from "@/components/games/BoxScoreTable";
import { GameEventList } from "@/components/games/GameEventList";
import { AdSlot } from "@/components/ads/AdSlot";
import { notFound } from "next/navigation";

export const revalidate = 30;

export default async function GameDetailPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;

  let center;
  try {
    center = await getGameCenter(gameId);
  } catch {
    notFound();
  }

  const { game, lineScore, currentMatchup, homeLineup, awayLineup, homeBoxScore, awayBoxScore, events } = center;
  const isLive = game.status === "live";

  return (
    <div className="flex flex-col gap-0 pb-6">
      <Scoreboard game={game} />

      {isLive && currentMatchup && (
        <CurrentMatchup
          matchup={currentMatchup}
          inning={game.inning}
          inningHalf={game.inningHalf}
        />
      )}

      {lineScore.length > 0 && (
        <LineScoreTable
          lineScore={lineScore}
          awayTeam={game.awayTeam}
          homeTeam={game.homeTeam}
          awayScore={game.awayScore}
          homeScore={game.homeScore}
        />
      )}

      {(awayLineup.length > 0 || homeLineup.length > 0) && (
        <LineupTable
          awayLineup={awayLineup}
          homeLineup={homeLineup}
          awayTeam={game.awayTeam}
          homeTeam={game.homeTeam}
        />
      )}

      {(awayBoxScore.length > 0 || homeBoxScore.length > 0) && (
        <BoxScoreTable
          awayBoxScore={awayBoxScore}
          homeBoxScore={homeBoxScore}
          awayTeam={game.awayTeam}
          homeTeam={game.homeTeam}
        />
      )}

      {events.length > 0 && (
        <GameEventList events={events} />
      )}

      <div className="px-4 pt-2">
        <AdSlot placement="gamecenter_bottom_banner" />
      </div>
    </div>
  );
}
