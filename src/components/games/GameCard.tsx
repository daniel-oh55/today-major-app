import Link from "next/link";
import type { AppGame } from "@/lib/models/game";
import { GameStatusBadge } from "@/components/common/GameStatusBadge";

interface GameCardProps {
  game: AppGame;
}

export function GameCard({ game }: GameCardProps) {
  const isLive = game.status === "live";
  const showScore = game.status === "live" || game.status === "final";

  return (
    <Link href={`/games/${game.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col gap-2 active:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <GameStatusBadge status={game.status} detail={isLive ? game.statusDetail : undefined} />
          <span className="text-xs text-gray-400">{game.gameTimeKst} KST</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* 원정팀 */}
          <div className="flex-1 flex flex-col items-start gap-0.5">
            <span className="text-xs text-gray-500">{game.awayTeam.city}</span>
            <span className="font-semibold text-gray-900">{game.awayTeam.shortName}</span>
            <span className="text-xs text-gray-400">{game.awayTeam.abbreviation}</span>
          </div>

          {/* 스코어 */}
          <div className="flex items-center gap-3 px-2">
            {showScore ? (
              <>
                <span className={`text-2xl font-bold tabular-nums ${game.awayScore > game.homeScore ? "text-gray-900" : "text-gray-400"}`}>
                  {game.awayScore}
                </span>
                <span className="text-gray-300">:</span>
                <span className={`text-2xl font-bold tabular-nums ${game.homeScore > game.awayScore ? "text-gray-900" : "text-gray-400"}`}>
                  {game.homeScore}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400 font-medium">vs</span>
            )}
          </div>

          {/* 홈팀 */}
          <div className="flex-1 flex flex-col items-end gap-0.5">
            <span className="text-xs text-gray-500">{game.homeTeam.city}</span>
            <span className="font-semibold text-gray-900">{game.homeTeam.shortName}</span>
            <span className="text-xs text-gray-400">{game.homeTeam.abbreviation}</span>
          </div>
        </div>

        {isLive && (
          <p className="text-xs text-red-500 font-medium text-center">{game.statusDetail}</p>
        )}
      </div>
    </Link>
  );
}
