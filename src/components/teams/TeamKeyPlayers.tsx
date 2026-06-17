import Link from "next/link";
import type { AppPlayerDetail } from "@/lib/models/player";
import { Section } from "@/components/common/Section";

interface TeamKeyPlayersProps {
  players: AppPlayerDetail[];
}

export function TeamKeyPlayers({ players }: TeamKeyPlayersProps) {
  if (players.length === 0) return null;

  return (
    <Section title="주요 선수">
      <div className="flex flex-col gap-2">
        {players.map((player) => {
          const h = player.hitterStats;
          const p = player.pitcherStats;
          const isPitcher = player.position === "P";
          const displayName = player.koreanName ?? player.fullName;

          return (
            <Link
              key={player.id}
              href={`/players/${player.id}`}
              className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 hover:border-blue-200 transition-colors active:bg-gray-50"
              aria-label={`${displayName} 선수 상세 보기`}
            >
              <div
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <span className="text-xs font-black text-gray-500">#{player.jerseyNumber}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 leading-tight">{displayName}</p>
                {player.koreanName && (
                  <p className="text-xs text-gray-400 truncate">{player.fullName}</p>
                )}
                <p className="text-xs text-gray-500 mt-0.5">{player.position}</p>
              </div>
              {isPitcher && p ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-right shrink-0">
                  <span className="text-[10px] text-gray-400">ERA</span>
                  <span className="text-[10px] text-gray-400">WHIP</span>
                  <span className="text-sm font-bold text-gray-800 tabular-nums">{p.era}</span>
                  <span className="text-sm font-bold text-gray-800 tabular-nums">{p.whip}</span>
                </div>
              ) : h ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-right shrink-0">
                  <span className="text-[10px] text-gray-400">AVG</span>
                  <span className="text-[10px] text-gray-400">OPS</span>
                  <span className="text-sm font-bold text-gray-800 tabular-nums">{h.avg}</span>
                  <span className="text-sm font-bold text-gray-800 tabular-nums">{h.ops}</span>
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
