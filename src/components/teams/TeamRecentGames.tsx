import type { AppTeamRecentGame } from "@/lib/models/team";
import { Section } from "@/components/common/Section";

interface TeamRecentGamesProps {
  recentGames: AppTeamRecentGame[];
  teamAbbr: string;
}

export function TeamRecentGames({ recentGames, teamAbbr }: TeamRecentGamesProps) {
  return (
    <Section title="최근 경기">
      <div className="flex flex-col gap-2">
        {recentGames.map((g, i) => {
          const myScore = g.isHome ? g.homeScore : g.awayScore;
          const oppScore = g.isHome ? g.awayScore : g.homeScore;
          const isWin = g.result === "W";
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3"
            >
              <span
                className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                  isWin ? "bg-blue-600 text-white" : "bg-red-100 text-red-600"
                }`}
                aria-label={isWin ? "승" : "패"}
              >
                {isWin ? "승" : "패"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  vs {g.opponent}
                  <span className="text-xs text-gray-400 font-normal ml-1.5">
                    {g.isHome ? "홈" : "원정"}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{g.gameDate}</p>
              </div>
              <div className="text-right tabular-nums shrink-0">
                <p className="text-base font-black text-gray-900">
                  {teamAbbr} {myScore}
                  <span className="text-gray-300 mx-1">:</span>
                  {oppScore} {g.opponent}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
