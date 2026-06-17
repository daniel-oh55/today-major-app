import Link from "next/link";
import type { AppPlayerDetail } from "@/lib/models/player";

interface PlayerCardProps {
  player: AppPlayerDetail;
}

function BatThrowBadge({ batHand, throwHand }: { batHand: string; throwHand: string }) {
  const bat   = batHand   === "S" ? "양타" : batHand   === "L" ? "좌타" : "우타";
  const throw_ = throwHand === "L" ? "좌투" : "우투";
  return (
    <span className="text-xs text-gray-400 shrink-0 tabular-nums">
      {bat} / {throw_}
    </span>
  );
}

export function PlayerCard({ player }: PlayerCardProps) {
  const { hitterStats: h, pitcherStats: p } = player;
  const isPitcher = player.position === "P";
  const hasBatterStats  = !isPitcher && !!h;
  const hasPitcherStats = isPitcher  && !!p;

  return (
    <Link
      href={`/players/${player.id}`}
      aria-label={`${player.koreanName ?? player.fullName} 선수 상세 보기`}
      className="block"
    >
      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col gap-2.5 active:bg-gray-50 transition-colors">
        {/* 상단: 등번호 뱃지 + 이름 + 투타 */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <span className="text-xs font-bold text-blue-500">#{player.jerseyNumber}</span>
          </div>
          <div className="flex-1 min-w-0">
            {player.koreanName ? (
              <>
                <p className="font-bold text-gray-900 leading-snug truncate">{player.koreanName}</p>
                <p className="text-xs text-gray-400 truncate">{player.fullName}</p>
              </>
            ) : (
              <p className="font-semibold text-gray-900 leading-snug truncate">{player.fullName}</p>
            )}
            <p className="text-xs text-gray-500">{player.teamName} · {player.position}</p>
          </div>
          <BatThrowBadge batHand={player.batHand} throwHand={player.throwHand} />
        </div>

        {/* 미니 스탯 — 타자 */}
        {hasBatterStats && h && (
          <div className="grid grid-cols-4 gap-1 pt-1 border-t border-gray-50" aria-label="시즌 기록 요약">
            {[
              { label: "AVG", value: h.avg },
              { label: "OPS", value: h.ops },
              { label: "HR",  value: h.homeRuns },
              { label: "RBI", value: h.rbi },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] text-gray-400">{label}</span>
                <span className="text-sm font-bold text-gray-800 tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* 미니 스탯 — 투수 */}
        {hasPitcherStats && p && (
          <div className="grid grid-cols-4 gap-1 pt-1 border-t border-gray-50" aria-label="시즌 기록 요약">
            {[
              { label: "ERA",  value: p.era },
              { label: "WHIP", value: p.whip },
              { label: "SO",   value: p.strikeouts },
              { label: "W-L",  value: `${p.wins}-${p.losses}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] text-gray-400">{label}</span>
                <span className="text-sm font-bold text-gray-800 tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
