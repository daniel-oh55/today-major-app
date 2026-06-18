import type { AppPlayerDetail } from "@/lib/models/player";

interface PlayerShareCardProps {
  player: AppPlayerDetail;
}

const CARD_FOOTER = "비공식 팬앱 · 로고·선수 사진·영상 미사용";

export function PlayerShareCard({ player }: PlayerShareCardProps) {
  const h = player.hitterStats;
  const p = player.pitcherStats;
  const isPitcher  = player.position === "P";
  const displayName = player.koreanName ?? player.fullName;
  const season     = h?.season ?? p?.season;

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden text-sm" aria-label="공유 카드 미리보기">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-900 px-4 py-3">
        <p className="text-[10px] text-blue-400 font-medium tracking-wide uppercase">
          ⚾ 선수 정보 카드{season ? ` · ${season} 시즌` : ""}
        </p>
        <p className="text-lg font-black text-white mt-0.5 leading-tight">{displayName}</p>
        {player.koreanName && (
          <p className="text-xs text-blue-300 mt-0.5 truncate">{player.fullName}</p>
        )}
      </div>

      {/* 팀·포지션 */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-100">
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{player.teamName}</span>
          &nbsp;·&nbsp;{player.position}
        </p>
      </div>

      {/* 시즌 스탯 */}
      {(isPitcher && p) ? (
        <div className="px-4 py-3 grid grid-cols-4 gap-3">
          {[
            { label: "ERA",  value: p.era },
            { label: "WHIP", value: p.whip },
            { label: `${p.wins}승 ${p.losses}패`, value: "" },
            { label: "탈삼진", value: p.strikeouts },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-xs text-gray-400">{label}</span>
              {value !== "" && <span className="text-base font-bold text-gray-800 tabular-nums">{value}</span>}
            </div>
          ))}
        </div>
      ) : h ? (
        <div className="px-4 py-3 grid grid-cols-4 gap-3">
          {[
            { label: "타율", value: h.avg },
            { label: "OPS",  value: h.ops },
            { label: "홈런", value: h.homeRuns },
            { label: "타점", value: h.rbi },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-base font-bold text-gray-800 tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-4 text-xs text-gray-400">시즌 기록 정보가 없습니다.</div>
      )}

      {/* 푸터 */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">{CARD_FOOTER}</p>
      </div>
    </div>
  );
}
