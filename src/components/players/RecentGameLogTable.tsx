import type { AppPlayerRecentGameLog } from "@/lib/models/stats";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";

interface RecentGameLogTableProps {
  gameLog: AppPlayerRecentGameLog[];
  isPitcher: boolean;
}

const RESULT_COLOR: Record<string, string> = {
  W:  "text-blue-600 font-bold",
  L:  "text-red-500 font-bold",
  SV: "text-green-600 font-bold",
  ND: "text-gray-400",
};

export function RecentGameLogTable({ gameLog, isPitcher }: RecentGameLogTableProps) {
  return (
    <Section title="최근 경기 기록">
      {gameLog.length === 0 ? (
        <EmptyState message="최근 경기 기록이 없습니다." />
      ) : isPitcher ? (
        <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
          <table className="text-xs w-full min-w-[360px]" aria-label="최근 투수 경기 기록">
            <thead>
              <tr className="bg-gray-50 text-gray-400 border-b border-gray-100">
                <th scope="col" className="py-2 px-3 text-left font-medium">날짜</th>
                <th scope="col" className="py-2 px-2 text-center font-medium">상대</th>
                <th scope="col" className="py-2 px-2 text-right font-medium">IP</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">ER</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">BB</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">SO</th>
                <th scope="col" className="py-2 px-2 text-center font-medium">결과</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {gameLog.map((log, i) => (
                <tr key={i}>
                  <td className="py-2 px-3 text-gray-500 tabular-nums">{log.gameDate}</td>
                  <td className="py-2 px-2 text-center font-semibold text-gray-700">{log.opponent}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.inningsPitched ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.earnedRuns ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.pitchingWalks ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.pitchingStrikeouts ?? "–"}</td>
                  <td className={`py-2 px-2 text-center text-xs ${RESULT_COLOR[log.result ?? ""] ?? "text-gray-400"}`}>
                    {log.result ?? "–"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
          <table className="text-xs w-full min-w-[400px]" aria-label="최근 타자 경기 기록">
            <thead>
              <tr className="bg-gray-50 text-gray-400 border-b border-gray-100">
                <th scope="col" className="py-2 px-3 text-left font-medium">날짜</th>
                <th scope="col" className="py-2 px-2 text-center font-medium">상대</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">AB</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">R</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">H</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">HR</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">RBI</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">BB</th>
                <th scope="col" className="py-2 px-2 text-right font-medium tabular-nums">SO</th>
                <th scope="col" className="py-2 px-2 text-right font-medium">AVG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {gameLog.map((log, i) => (
                <tr key={i}>
                  <td className="py-2 px-3 text-gray-500 tabular-nums">{log.gameDate}</td>
                  <td className="py-2 px-2 text-center font-semibold text-gray-700">{log.opponent}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.atBats ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.runs ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.hits ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.homeRuns ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.rbi ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.walks ?? "–"}</td>
                  <td className="py-2 px-2 text-right text-gray-600 tabular-nums">{log.strikeouts ?? "–"}</td>
                  <td className="py-2 px-2 text-right font-medium text-gray-700 tabular-nums">{log.avg ?? "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
