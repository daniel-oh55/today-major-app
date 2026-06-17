import Link from "next/link";
import type { AppGame } from "@/lib/models/game";
import { GameStatusBadge } from "@/components/common/GameStatusBadge";

interface GameCardProps {
  game: AppGame;
}

export function GameCard({ game }: GameCardProps) {
  const isLive = game.status === "live";
  const isFinal = game.status === "final";
  const showScore = isLive || isFinal;

  const awayWin = game.awayScore > game.homeScore;
  const homeWin = game.homeScore > game.awayScore;

  return (
    <Link
      href={`/games/${game.id}`}
      className="block active:opacity-80 transition-opacity"
      aria-label={`${game.awayTeam.shortName} vs ${game.homeTeam.shortName} 경기센터 보기`}
    >
      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col gap-2.5 min-h-[88px]">
        {/* 헤더: 상태 배지 + 시간 */}
        <div className="flex items-center justify-between gap-2">
          <GameStatusBadge
            status={game.status}
            detail={isLive ? game.statusDetail : undefined}
          />
          <span className="text-xs text-gray-400 shrink-0">{game.gameTimeKst} KST</span>
        </div>

        {/* 팀 & 스코어 */}
        <div className="flex items-center gap-2">
          {/* 원정팀 */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 truncate leading-none mb-0.5">{game.awayTeam.city}</p>
            <p className={`font-bold truncate leading-tight ${showScore && awayWin ? "text-gray-900" : showScore ? "text-gray-400" : "text-gray-900"}`}>
              {game.awayTeam.shortName}
            </p>
            <p className="text-xs text-gray-300 truncate leading-none mt-0.5">{game.awayTeam.abbreviation}</p>
          </div>

          {/* 스코어 or vs */}
          <div className="flex items-center justify-center gap-2 shrink-0 w-24">
            {showScore ? (
              <>
                <span className={`text-2xl font-black tabular-nums w-8 text-right leading-none ${awayWin ? "text-gray-900" : "text-gray-300"}`}>
                  {game.awayScore}
                </span>
                <span className="text-gray-200 text-lg leading-none">:</span>
                <span className={`text-2xl font-black tabular-nums w-8 text-left leading-none ${homeWin ? "text-gray-900" : "text-gray-300"}`}>
                  {game.homeScore}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-300 font-medium">vs</span>
            )}
          </div>

          {/* 홈팀 */}
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs text-gray-400 truncate leading-none mb-0.5">{game.homeTeam.city}</p>
            <p className={`font-bold truncate leading-tight ${showScore && homeWin ? "text-gray-900" : showScore ? "text-gray-400" : "text-gray-900"}`}>
              {game.homeTeam.shortName}
            </p>
            <p className="text-xs text-gray-300 truncate leading-none mt-0.5">{game.homeTeam.abbreviation}</p>
          </div>
        </div>

        {/* 하단: 추가 상태 정보 + 이동 힌트 */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {isLive && (
              <span className="text-xs text-red-500 font-medium">
                {game.inningHalf === "top" ? "초" : "말"} {game.inning}회
              </span>
            )}
            {isFinal && (
              <span className="text-xs text-gray-400">최종 기록</span>
            )}
            {!isLive && !isFinal && (
              <span className="text-xs text-gray-400">{game.statusDetail}</span>
            )}
          </div>
          <span className="text-xs text-gray-300 shrink-0 flex items-center gap-0.5">
            경기센터
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
