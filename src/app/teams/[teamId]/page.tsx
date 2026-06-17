import { getTeam } from "@/lib/services/teamService";
import { AdSlot } from "@/components/ads/AdSlot";
import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";
import { notFound } from "next/navigation";

export default async function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;

  let team;
  try {
    team = await getTeam(teamId);
  } catch {
    notFound();
  }

  const winPct = (team.record.pct * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-0 pb-4">
      {/* 팀 기본 정보 */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <span className="text-xl font-black text-gray-500">{team.abbreviation}</span>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{team.name}</p>
            <p className="text-sm text-gray-500">{team.league} · {team.division}</p>
          </div>
        </div>
      </div>

      {/* 팀 스탯 요약 */}
      <Section title="2025 시즌 성적">
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="승" value={team.record.wins} />
          <StatCard label="패" value={team.record.losses} />
          <StatCard label="승률" value={`${winPct}%`} />
          <StatCard label="게임차" value={team.record.gbDivision} sub="지구" />
        </div>
      </Section>

      {/* 중간 네이티브 광고 */}
      <div className="px-4 py-2">
        <AdSlot placement="team_detail_mid_native" />
      </div>

      {/* 로스터 placeholder */}
      <Section title="로스터">
        <div className="bg-white rounded-xl border border-gray-100 px-4 py-8 text-center">
          <p className="text-sm text-gray-400">로스터 정보는 추후 연동 예정입니다.</p>
        </div>
      </Section>
    </div>
  );
}
