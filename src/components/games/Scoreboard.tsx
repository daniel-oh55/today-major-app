import type { AppGame } from "@/lib/models/game";
import { GameStatusBadge } from "@/components/common/GameStatusBadge";

interface ScoreboardProps {
  game: AppGame;
}

export function Scoreboard({ game }: ScoreboardProps) {
  const isLive    = game.status === "live";
  const showScore = game.status === "live" || game.status === "final";
  const awayWins  = game.awayScore > game.homeScore;
  const homeWins  = game.homeScore > game.awayScore;

  return (
    <div className="bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 pt-4 pb-5">
      {/* 상태 + 시간 */}
      <div className="flex items-center justify-between mb-4">
        <GameStatusBadge status={game.status} detail={isLive ? game.statusDetail : undefined} />
        <span className="text-xs text-blue-300">{game.gameTimeKst} KST</span>
      </div>

      {/* 팀 & 스코어 */}
      <div className="flex items-center">
        {/* 원정팀 */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-blue-400 truncate">{game.awayTeam.city}</p>
          <p className={`text-xl font-bold truncate leading-tight ${showScore && !awayWins ? "text-blue-300" : "text-white"}`}>
            {game.awayTeam.shortName}
          </p>
          <p className="text-[10px] text-blue-500 truncate">{game.awayTeam.abbreviation}</p>
        </div>

        {/* 스코어 */}
        <div className="flex items-center justify-center gap-3 shrink-0 px-3">
          {showScore ? (
            <>
              <span
                className={`text-4xl font-black tabular-nums w-10 text-right leading-none ${awayWins ? "text-white" : "text-blue-400"}`}
                aria-label={`${game.awayTeam.abbreviation} ${game.awayScore}점`}
              >
                {game.awayScore}
              </span>
              <span className="text-blue-600 text-2xl font-light" aria-hidden="true">:</span>
              <span
                className={`text-4xl font-black tabular-nums w-10 text-left leading-none ${homeWins ? "text-white" : "text-blue-400"}`}
                aria-label={`${game.homeTeam.abbreviation} ${game.homeScore}점`}
              >
                {game.homeScore}
              </span>
            </>
          ) : (
            <span className="text-blue-500 text-lg font-medium px-4" aria-label="경기 예정">vs</span>
          )}
        </div>

        {/* 홈팀 */}
        <div className="flex-1 min-w-0 text-right">
          <p className="text-[10px] text-blue-400 truncate">{game.homeTeam.city}</p>
          <p className={`text-xl font-bold truncate leading-tight ${showScore && !homeWins ? "text-blue-300" : "text-white"}`}>
            {game.homeTeam.shortName}
          </p>
          <p className="text-[10px] text-blue-500 truncate">{game.homeTeam.abbreviation}</p>
        </div>
      </div>

      {/* 구장 + 날짜 */}
      {(game.venue || game.gameDate) && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-800">
          <span className="text-[11px] text-blue-400 truncate">{game.venue ?? "—"}</span>
          <span className="text-[11px] text-blue-500 shrink-0 ml-2">{game.gameDate}</span>
        </div>
      )}
    </div>
  );
}
