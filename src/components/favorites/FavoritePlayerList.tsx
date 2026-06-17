"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { AppPlayerDetail } from "@/lib/models/player";

export function FavoritePlayerList() {
  const { playerIds, mounted } = useFavorites();
  const [players, setPlayers]   = useState<AppPlayerDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (playerIds.length === 0) { setPlayers([]); return; }

    setIsLoading(true);
    Promise.all(
      playerIds.map((id) =>
        fetch(`/api/players/${id}`)
          .then((r) => (r.ok ? (r.json() as Promise<AppPlayerDetail>) : null))
          .catch(() => null)
      )
    )
      .then((results) => setPlayers(results.filter((p): p is AppPlayerDetail => p !== null)))
      .finally(() => setIsLoading(false));
  }, [mounted, playerIds.join(",")]); // playerIds 배열 내용 변화를 문자열로 감지

  if (!mounted || isLoading) return <LoadingState message="즐겨찾는 선수 불러오는 중..." />;
  if (players.length === 0) return <EmptyState message="즐겨찾는 선수가 없습니다." sub="선수 상세 화면에서 선수 즐겨찾기를 추가하세요." />;

  return (
    <div className="flex flex-col gap-2">
      {players.map((player) => {
        const displayName = player.koreanName ?? player.fullName;
        const h = player.hitterStats;
        const p = player.pitcherStats;
        const isPitcher = player.position === "P";

        return (
          <div key={player.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <span className="text-xs font-black text-gray-600">#{player.jerseyNumber}</span>
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/players/${player.id}`}
                className="font-bold text-gray-900 text-sm hover:text-blue-600 transition-colors"
                aria-label={`${displayName} 선수 상세 보기`}
              >
                {displayName}
              </Link>
              {player.koreanName && (
                <p className="text-xs text-gray-400 truncate">{player.fullName}</p>
              )}
              <p className="text-xs text-gray-400 mt-0.5">
                {player.teamName} · {player.position}
                {isPitcher && p ? ` · ERA ${p.era}` : h ? ` · AVG ${h.avg}` : ""}
              </p>
            </div>
            <FavoriteButton id={player.id} type="player" />
          </div>
        );
      })}
    </div>
  );
}
