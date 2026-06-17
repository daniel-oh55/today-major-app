"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { AppTeamDetail } from "@/lib/models/team";

export function FavoriteTeamList() {
  const { teamIds, mounted } = useFavorites();
  const [teams, setTeams]       = useState<AppTeamDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (teamIds.length === 0) { setTeams([]); return; }

    setIsLoading(true);
    Promise.all(
      teamIds.map((id) =>
        fetch(`/api/teams/${id}`)
          .then((r) => (r.ok ? (r.json() as Promise<AppTeamDetail>) : null))
          .catch(() => null)
      )
    )
      .then((results) => setTeams(results.filter((t): t is AppTeamDetail => t !== null)))
      .finally(() => setIsLoading(false));
  }, [mounted, teamIds.join(",")]); // teamIds 배열 내용 변화를 문자열로 감지

  if (!mounted || isLoading) return <LoadingState message="즐겨찾는 팀 불러오는 중..." />;
  if (teams.length === 0) return <EmptyState message="즐겨찾는 팀이 없습니다." sub="팀 상세 화면에서 팀 즐겨찾기를 추가하세요." />;

  return (
    <div className="flex flex-col gap-2">
      {teams.map((team) => (
        <div key={team.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <span className="text-sm font-black text-gray-600">{team.abbreviation}</span>
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/teams/${team.id}`}
              className="font-bold text-gray-900 text-sm hover:text-blue-600 transition-colors"
              aria-label={`${team.name} 팀 상세 보기`}
            >
              {team.name}
            </Link>
            <p className="text-xs text-gray-400 mt-0.5">
              {team.league} · {team.division} · {team.record.wins}승 {team.record.losses}패
            </p>
          </div>
          <FavoriteButton id={team.id} type="team" />
        </div>
      ))}
    </div>
  );
}
