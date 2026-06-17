import { getTeam } from "@/lib/services/teamService";
import { getPlayer } from "@/lib/services/playerService";
import { AdSlot } from "@/components/ads/AdSlot";
import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import { TeamStatSummary } from "@/components/teams/TeamStatSummary";
import { RosterTable } from "@/components/teams/RosterTable";
import { TeamRecentGames } from "@/components/teams/TeamRecentGames";
import { TeamKeyPlayers } from "@/components/teams/TeamKeyPlayers";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { notFound } from "next/navigation";

export default async function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;

  let team;
  try {
    team = await getTeam(teamId);
  } catch {
    notFound();
  }

  const keyPlayers = await Promise.all(
    (team.keyPlayerIds ?? []).map((id) =>
      getPlayer(id).catch(() => null)
    )
  ).then((results) => results.filter((p) => p !== null));

  const winPct = (team.record.pct * 100).toFixed(1);
  const leagueDivision = `${team.league} · ${team.division}`;

  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* ── 팀 헤더 ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <span className="text-xl font-black text-gray-600">{team.abbreviation}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{team.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{leagueDivision}</p>
            {team.venue && (
              <p className="text-xs text-gray-400 mt-0.5">{team.venue}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              ※ 비공식 앱 · 더미 데이터 기준
            </p>
          </div>
        </div>
        {/* 즐겨찾기 버튼 */}
        <div className="mt-3">
          <FavoriteButton id={teamId} type="team" />
        </div>
      </div>

      {/* ── 시즌 성적 (승패 기록) ── */}
      <Section title={`${team.seasonStats?.season ?? 2026} 시즌 성적`}>
        <div className="grid grid-cols-4 gap-2">
          <StatCard label="승"   value={team.record.wins} />
          <StatCard label="패"   value={team.record.losses} />
          <StatCard label="승률" value={`${winPct}%`} />
          <StatCard label="게임차" value={team.record.gbDivision} sub="지구" />
        </div>
      </Section>

      {/* ── 팀 시즌 스탯 ── */}
      {team.seasonStats && <TeamStatSummary seasonStats={team.seasonStats} />}

      {/* ── 중간 네이티브 광고 ── */}
      <div className="px-4 py-2">
        <AdSlot placement="team_detail_mid_native" />
      </div>

      {/* ── 주요 선수 ── */}
      {keyPlayers.length > 0 && <TeamKeyPlayers players={keyPlayers} />}

      {/* ── 로스터 ── */}
      {team.roster && team.roster.length > 0 ? (
        <RosterTable roster={team.roster} teamName={team.shortName} />
      ) : (
        <Section title="로스터">
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-8 text-center">
            <p className="text-sm text-gray-400">로스터 정보를 불러올 수 없습니다.</p>
          </div>
        </Section>
      )}

      {/* ── 최근 경기 ── */}
      {team.recentGames && team.recentGames.length > 0 && (
        <TeamRecentGames recentGames={team.recentGames} teamAbbr={team.abbreviation} />
      )}

      {/* ── 비공식 안내 ── */}
      <DataSourceNotice />
    </div>
  );
}
