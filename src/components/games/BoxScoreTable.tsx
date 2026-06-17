import type { AppBoxScorePlayer } from "@/lib/models/game";
import type { AppTeam } from "@/lib/models/team";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";

interface BoxScoreTableProps {
  awayBoxScore: AppBoxScorePlayer[];
  homeBoxScore: AppBoxScorePlayer[];
  awayTeam: AppTeam;
  homeTeam: AppTeam;
}

function isBatter(row: AppBoxScorePlayer): boolean {
  return row.atBats !== undefined;
}

function BatterRows({ rows, teamAbbr }: { rows: AppBoxScorePlayer[]; teamAbbr: string }) {
  const batters = rows.filter(isBatter);
  if (batters.length === 0) return null;
  return (
    <div>
      <p className="text-[11px] font-semibold text-gray-400 px-3 py-1.5 bg-gray-50 border-b border-gray-100">
        {teamAbbr} — 타자
      </p>
      <div className="overflow-x-auto">
        <table className="text-xs w-full min-w-[300px]" aria-label={`${teamAbbr} 타자 기록`}>
          <thead>
            <tr className="text-gray-400 border-b border-gray-100">
              <th scope="col" className="py-1.5 px-3 text-left font-medium">선수</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">AB</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">R</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">H</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">RBI</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">BB</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">SO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {batters.map((row) => (
              <tr key={row.player.id}>
                <td className="py-1.5 px-3 font-medium text-gray-800 truncate max-w-[96px]">{row.player.lastName}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.atBats ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.runs ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.hits ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.rbi ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.walks ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.strikeouts ?? "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PitcherRows({ rows, teamAbbr }: { rows: AppBoxScorePlayer[]; teamAbbr: string }) {
  const pitchers = rows.filter((r) => !isBatter(r));
  if (pitchers.length === 0) return null;
  return (
    <div>
      <p className="text-[11px] font-semibold text-gray-400 px-3 py-1.5 bg-gray-50 border-b border-gray-100 border-t">
        {teamAbbr} — 투수
      </p>
      <div className="overflow-x-auto">
        <table className="text-xs w-full min-w-[300px]" aria-label={`${teamAbbr} 투수 기록`}>
          <thead>
            <tr className="text-gray-400 border-b border-gray-100">
              <th scope="col" className="py-1.5 px-3 text-left font-medium">선수</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium">IP</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">H</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">R</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">ER</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">BB</th>
              <th scope="col" className="py-1.5 px-2 text-right font-medium tabular-nums">SO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pitchers.map((row) => (
              <tr key={row.player.id}>
                <td className="py-1.5 px-3 font-medium text-gray-800 truncate max-w-[96px]">{row.player.lastName}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.inningsPitched ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.hits ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.runs ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.earnedRuns ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.pitchingWalks ?? "–"}</td>
                <td className="py-1.5 px-2 text-right text-gray-600 tabular-nums">{row.pitchingStrikeouts ?? "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeamBoxScore({ rows, team }: { rows: AppBoxScorePlayer[]; team: AppTeam }) {
  return (
    <>
      <BatterRows rows={rows} teamAbbr={team.abbreviation} />
      <PitcherRows rows={rows} teamAbbr={team.abbreviation} />
    </>
  );
}

export function BoxScoreTable({ awayBoxScore, homeBoxScore, awayTeam, homeTeam }: BoxScoreTableProps) {
  const hasData = awayBoxScore.length > 0 || homeBoxScore.length > 0;

  return (
    <Section title="박스스코어">
      {!hasData ? (
        <EmptyState message="박스스코어 정보 없음" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col divide-y divide-gray-100">
          <TeamBoxScore rows={awayBoxScore} team={awayTeam} />
          <TeamBoxScore rows={homeBoxScore} team={homeTeam} />
        </div>
      )}
    </Section>
  );
}
