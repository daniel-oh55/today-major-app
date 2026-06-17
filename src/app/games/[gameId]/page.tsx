import { getGameCenter } from "@/lib/services/gameService";
import { GameStatusBadge } from "@/components/common/GameStatusBadge";
import { AdSlot } from "@/components/ads/AdSlot";
import { Section } from "@/components/common/Section";
import { notFound } from "next/navigation";
import type { AppLineScoreInning } from "@/lib/models/game";
import type { AppGameEventType } from "@/lib/models/game";

export const revalidate = 30;

const EVENT_LABEL: Record<AppGameEventType, string> = {
  hit: "안타", homerun: "홈런", strikeout: "삼진", walk: "볼넷",
  out: "아웃", error: "실책", stolen_base: "도루", double_play: "병살",
  pitching_change: "투수 교체", inning_end: "이닝 종료", game_end: "경기 종료",
};

function BaseDiamond({ first, second, third }: { first: boolean; second: boolean; third: boolean }) {
  const on = "fill-orange-400 stroke-orange-500";
  const off = "fill-gray-100 stroke-gray-300";
  return (
    <svg width="60" height="50" viewBox="0 0 60 50" className="shrink-0">
      <rect x="20" y="2" width="18" height="18" transform="rotate(45 29 11)" className={second ? on : off} strokeWidth="1.5" />
      <rect x="36" y="18" width="18" height="18" transform="rotate(45 45 27)" className={first ? on : off} strokeWidth="1.5" />
      <rect x="4" y="18" width="18" height="18" transform="rotate(45 13 27)" className={third ? on : off} strokeWidth="1.5" />
    </svg>
  );
}

function InningRow({ row }: { row: AppLineScoreInning }) {
  return (
    <tr className="text-xs text-center border-b border-gray-100">
      <td className="py-1 px-2 font-medium text-gray-500">{row.inning}</td>
      <td className="py-1 px-2">{row.awayRuns}</td>
      <td className="py-1 px-2">{row.homeRuns}</td>
    </tr>
  );
}

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
    <div className="flex flex-col gap-0 pb-4">
      {/* 스코어보드 */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <GameStatusBadge status={game.status} detail={isLive ? game.statusDetail : undefined} />
          <span className="text-xs text-gray-400">{game.gameDate}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 text-left">
            <p className="text-xs text-gray-400">{game.awayTeam.city}</p>
            <p className="font-bold text-gray-900">{game.awayTeam.shortName}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-3xl font-black tabular-nums ${game.awayScore > game.homeScore ? "text-gray-900" : "text-gray-300"}`}>
              {game.awayScore}
            </span>
            <span className="text-gray-200 text-xl">:</span>
            <span className={`text-3xl font-black tabular-nums ${game.homeScore > game.awayScore ? "text-gray-900" : "text-gray-300"}`}>
              {game.homeScore}
            </span>
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs text-gray-400">{game.homeTeam.city}</p>
            <p className="font-bold text-gray-900">{game.homeTeam.shortName}</p>
          </div>
        </div>
      </div>

      {/* 진행 중: 현재 상황 */}
      {isLive && currentMatchup && (
        <Section title="현재 상황">
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 text-sm">
                <span className="font-medium">{game.inningHalf === "top" ? "초" : "말"} {game.inning}회</span>
                <span className="text-gray-400">{currentMatchup.outs}아웃</span>
              </div>
              <div className="flex gap-1 text-xs">
                <span className={`px-1.5 py-0.5 rounded ${currentMatchup.balls >= 1 ? "bg-green-400 text-white" : "bg-gray-100 text-gray-300"}`}>B</span>
                <span className={`px-1.5 py-0.5 rounded ${currentMatchup.balls >= 2 ? "bg-green-400 text-white" : "bg-gray-100 text-gray-300"}`}>B</span>
                <span className={`px-1.5 py-0.5 rounded ${currentMatchup.balls >= 3 ? "bg-green-400 text-white" : "bg-gray-100 text-gray-300"}`}>B</span>
                <span className="mx-1 text-gray-200">|</span>
                <span className={`px-1.5 py-0.5 rounded ${currentMatchup.strikes >= 1 ? "bg-red-400 text-white" : "bg-gray-100 text-gray-300"}`}>S</span>
                <span className={`px-1.5 py-0.5 rounded ${currentMatchup.strikes >= 2 ? "bg-red-400 text-white" : "bg-gray-100 text-gray-300"}`}>S</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <BaseDiamond {...currentMatchup.bases} />
              <div className="flex-1 flex flex-col gap-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">타자</span>
                  <span className="font-medium">{currentMatchup.batter.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">투수</span>
                  <span className="font-medium">{currentMatchup.pitcher.fullName}</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* 라인스코어 */}
      {lineScore.length > 0 && (
        <Section title="이닝별 득점">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="py-2 px-2 text-left font-medium">이닝</th>
                  <th className="py-2 px-2 font-medium">{game.awayTeam.abbreviation}</th>
                  <th className="py-2 px-2 font-medium">{game.homeTeam.abbreviation}</th>
                </tr>
              </thead>
              <tbody>
                {lineScore.map((row) => <InningRow key={row.inning} row={row} />)}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* 라인업 */}
      {(awayLineup.length > 0 || homeLineup.length > 0) && (
        <Section title="라인업">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">{game.awayTeam.abbreviation} (원정)</p>
              {awayLineup.map((entry) => (
                <div key={entry.player.id} className="flex gap-2 text-xs py-1 border-b border-gray-50">
                  <span className="text-gray-400 w-4">{entry.battingOrder}</span>
                  <span className="text-gray-400 w-6">{entry.position}</span>
                  <span className="text-gray-800 truncate">{entry.player.lastName}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">{game.homeTeam.abbreviation} (홈)</p>
              {homeLineup.map((entry) => (
                <div key={entry.player.id} className="flex gap-2 text-xs py-1 border-b border-gray-50">
                  <span className="text-gray-400 w-4">{entry.battingOrder}</span>
                  <span className="text-gray-400 w-6">{entry.position}</span>
                  <span className="text-gray-800 truncate">{entry.player.lastName}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 박스스코어 */}
      {(awayBoxScore.length > 0 || homeBoxScore.length > 0) && (
        <Section title="박스스코어">
          {[{ team: game.awayTeam, rows: awayBoxScore }, { team: game.homeTeam, rows: homeBoxScore }].map(({ team, rows }) => (
            <div key={team.id} className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-1">{team.abbreviation}</p>
              <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
                <table className="text-xs w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400">
                      <th className="py-1.5 px-2 text-left">선수</th>
                      <th className="py-1.5 px-2">AB</th>
                      <th className="py-1.5 px-2">H</th>
                      <th className="py-1.5 px-2">R</th>
                      <th className="py-1.5 px-2">RBI</th>
                      <th className="py-1.5 px-2">HR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.player.id} className="border-t border-gray-50">
                        <td className="py-1.5 px-2 font-medium text-gray-800">{row.player.lastName}</td>
                        <td className="py-1.5 px-2 text-center text-gray-600">{row.atBats ?? row.inningsPitched ?? "-"}</td>
                        <td className="py-1.5 px-2 text-center text-gray-600">{row.hits ?? row.pitchingStrikeouts ?? "-"}</td>
                        <td className="py-1.5 px-2 text-center text-gray-600">{row.runs ?? row.earnedRuns ?? "-"}</td>
                        <td className="py-1.5 px-2 text-center text-gray-600">{row.rbi ?? row.pitchingWalks ?? "-"}</td>
                        <td className="py-1.5 px-2 text-center text-gray-600">{row.homeRuns ?? row.era ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* 주요 이벤트 */}
      {events.length > 0 && (
        <Section title="주요 이벤트">
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex gap-3 items-start">
                <span className="text-xs text-gray-400 w-14 shrink-0 pt-0.5">
                  {event.inningHalf === "top" ? "초" : "말"} {event.inning}회
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-blue-600">{EVENT_LABEL[event.eventType]}</span>
                    {event.teamAbbr && <span className="text-xs text-gray-400">{event.teamAbbr}</span>}
                    {event.runs != null && event.runs > 0 && (
                      <span className="text-xs font-bold text-red-500">+{event.runs}점</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 하단 배너 광고 */}
      <div className="px-4 pt-2">
        <AdSlot placement="gamecenter_bottom_banner" />
      </div>
    </div>
  );
}
