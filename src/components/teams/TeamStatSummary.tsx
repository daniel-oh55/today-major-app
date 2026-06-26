import type { AppTeamSeasonStats } from "@/lib/models/team";
import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";

interface TeamStatSummaryProps {
  seasonStats: AppTeamSeasonStats;
}

export function TeamStatSummary({ seasonStats: s }: TeamStatSummaryProps) {
  return (
    <Section title={`${s.season} 시즌 팀 스탯`}>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">팀 타격</p>
          <div className="grid grid-cols-4 gap-2">
            <StatCard label="타율" value={s.teamAvg} />
            <StatCard label="OPS"  value={s.teamOps} />
            <StatCard label="득점" value={s.runs} />
            <StatCard label="홈런" value={s.homeRuns} />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">팀 투구</p>
          <div className="grid grid-cols-4 gap-2">
            <StatCard label="ERA"  value={s.teamEra} />
            <StatCard label="WHIP" value={s.teamWhip} />
            <StatCard label="실점" value={s.runsAllowed} />
          </div>
        </div>
      </div>
    </Section>
  );
}
