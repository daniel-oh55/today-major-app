import type { AppLineScoreInning } from "@/lib/models/game";
import type { AppTeam } from "@/lib/models/team";
import { Section } from "@/components/common/Section";

interface LineScoreTableProps {
  lineScore: AppLineScoreInning[];
  awayTeam: AppTeam;
  homeTeam: AppTeam;
  awayScore: number;
  homeScore: number;
}

export function LineScoreTable({ lineScore, awayTeam, homeTeam, awayScore, homeScore }: LineScoreTableProps) {
  const awayHits   = lineScore.reduce((s, r) => s + r.awayHits,   0);
  const homeHits   = lineScore.reduce((s, r) => s + r.homeHits,   0);
  const awayErrors = lineScore.reduce((s, r) => s + r.awayErrors, 0);
  const homeErrors = lineScore.reduce((s, r) => s + r.homeErrors, 0);

  return (
    <Section title="이닝별 득점">
      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="text-xs min-w-full" aria-label="라인스코어">
          <thead>
            <tr className="bg-gray-50 text-gray-400 border-b border-gray-100">
              <th scope="col" className="py-2 px-3 text-left font-semibold min-w-[52px] sticky left-0 bg-gray-50">팀</th>
              {lineScore.map((r) => (
                <th key={r.inning} scope="col" className="py-2 px-2 font-medium text-center min-w-[28px]">
                  {r.inning}
                </th>
              ))}
              <th scope="col" className="py-2 px-2 font-bold text-center min-w-[28px] border-l border-gray-100 text-gray-600">R</th>
              <th scope="col" className="py-2 px-2 font-medium text-center min-w-[28px]">H</th>
              <th scope="col" className="py-2 px-2 font-medium text-center min-w-[28px]">E</th>
            </tr>
          </thead>
          <tbody>
            {/* 원정팀 */}
            <tr className="border-b border-gray-50">
              <td className="py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">{awayTeam.abbreviation}</td>
              {lineScore.map((r) => (
                <td key={r.inning} className="py-2 px-2 text-center text-gray-600 tabular-nums">{r.awayRuns}</td>
              ))}
              <td className="py-2 px-2 text-center font-bold text-gray-900 tabular-nums border-l border-gray-100">{awayScore}</td>
              <td className="py-2 px-2 text-center text-gray-500 tabular-nums">{awayHits}</td>
              <td className="py-2 px-2 text-center text-gray-500 tabular-nums">{awayErrors}</td>
            </tr>
            {/* 홈팀 */}
            <tr>
              <td className="py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">{homeTeam.abbreviation}</td>
              {lineScore.map((r) => (
                <td key={r.inning} className="py-2 px-2 text-center text-gray-600 tabular-nums">{r.homeRuns}</td>
              ))}
              <td className="py-2 px-2 text-center font-bold text-gray-900 tabular-nums border-l border-gray-100">{homeScore}</td>
              <td className="py-2 px-2 text-center text-gray-500 tabular-nums">{homeHits}</td>
              <td className="py-2 px-2 text-center text-gray-500 tabular-nums">{homeErrors}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}
