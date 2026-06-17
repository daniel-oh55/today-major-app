import Link from "next/link";
import type { AppPlayer } from "@/lib/models/player";

interface PlayerCardProps {
  player: AppPlayer;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link href={`/players/${player.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 active:bg-gray-50 transition-colors">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-gray-500">#{player.jerseyNumber}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{player.fullName}</p>
          <p className="text-xs text-gray-500">{player.teamName} · {player.position}</p>
        </div>
        <span className="text-xs text-gray-300 shrink-0">
          {player.batHand === "S" ? "양타" : player.batHand === "L" ? "좌타" : "우타"} / {player.throwHand === "L" ? "좌투" : "우투"}
        </span>
      </div>
    </Link>
  );
}
