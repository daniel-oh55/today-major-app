"use client";

import { useFavorites } from "@/lib/hooks/useFavorites";

interface FavoriteButtonProps {
  id: string;
  type: "team" | "player";
}

export function FavoriteButton({ id, type }: FavoriteButtonProps) {
  const { teamIds, playerIds, mounted, toggleTeam, togglePlayer } = useFavorites();

  const isFavorited = mounted && (
    type === "team" ? teamIds.includes(id) : playerIds.includes(id)
  );

  function handleClick() {
    if (type === "team") toggleTeam(id);
    else togglePlayer(id);
  }

  const label = type === "team" ? "팀" : "선수";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isFavorited}
      aria-label={isFavorited ? "즐겨찾기 해제" : `${label} 즐겨찾기 추가`}
      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors min-h-[44px] ${
        isFavorited
          ? "bg-yellow-50 border-yellow-300 text-yellow-700 active:bg-yellow-100"
          : "bg-white border-gray-200 text-gray-600 active:bg-gray-50"
      }`}
    >
      <span aria-hidden="true" className="text-base">{isFavorited ? "★" : "☆"}</span>
      <span>{isFavorited ? "즐겨찾기 해제" : `${label} 즐겨찾기`}</span>
    </button>
  );
}
