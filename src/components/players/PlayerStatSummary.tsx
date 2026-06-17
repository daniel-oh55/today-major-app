import type { AppPlayerDetail } from "@/lib/models/player";
import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";

interface PlayerStatSummaryProps {
  player: AppPlayerDetail;
}

export function PlayerStatSummary({ player }: PlayerStatSummaryProps) {
  const h = player.hitterStats;
  const p = player.pitcherStats;
  const isPitcher = player.position === "P";
  const seasonYear = h?.season ?? p?.season ?? new Date().getFullYear();

  return (
    <Section title={`${seasonYear} 시즌 기록`}>
      {isPitcher && p ? (
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="평균자책점" value={p.era} />
          <StatCard label="WHIP"      value={p.whip} />
          <StatCard label="이닝"      value={p.inningsPitched} />
          <StatCard label="승"        value={p.wins} />
          <StatCard label="패"        value={p.losses} />
          <StatCard label="세이브"    value={p.saves} />
          <StatCard label="삼진"      value={p.strikeouts} />
          <StatCard label="볼넷"      value={p.walks} />
          <StatCard label="피홈런"    value={p.homeRuns} />
        </div>
      ) : !isPitcher && h ? (
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="타율"   value={h.avg} />
          <StatCard label="출루율" value={h.obp} />
          <StatCard label="장타율" value={h.slg} />
          <StatCard label="OPS"    value={h.ops} />
          <StatCard label="홈런"   value={h.homeRuns} />
          <StatCard label="타점"   value={h.rbi} />
          <StatCard label="안타"   value={h.hits} />
          <StatCard label="득점"   value={h.runs} />
          <StatCard label="도루"   value={h.stolenBases} />
          <StatCard label="볼넷"   value={h.walks} />
          <StatCard label="삼진"   value={h.strikeouts} />
          <StatCard label="경기"   value={h.gamesPlayed} />
        </div>
      ) : (
        <p className="text-xs text-gray-400 text-center py-4">시즌 기록 준비 중입니다.</p>
      )}
    </Section>
  );
}
