import type { AppTeamDetail } from "@/lib/models/team";

interface TeamShareCardProps {
  team: AppTeamDetail;
}

const CARD_FOOTER = "비공식 팬앱 · 로고·선수 사진·영상 미사용";

export function TeamShareCard({ team }: TeamShareCardProps) {
  const r = team.record;
  const s = team.seasonStats;
  const pctDisplay = r.pct >= 1 ? r.pct.toFixed(3) : r.pct.toFixed(3).slice(1);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden text-sm" aria-label="공유 카드 미리보기">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3">
        <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
          ⚾ 팀 정보 카드{s ? ` · ${s.season} 시즌` : ""}
        </p>
        <p className="text-lg font-black text-white mt-0.5 leading-tight">{team.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{team.league} · {team.division}</p>
      </div>

      {/* 시즌 성적 */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">승패</span>
            <span className="text-base font-bold text-gray-900 tabular-nums">{r.wins}–{r.losses}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">승률</span>
            <span className="text-base font-bold text-gray-900 tabular-nums">{pctDisplay}</span>
          </div>
          {r.gbDivision !== "-" && (
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400">게임차</span>
              <span className="text-base font-bold text-gray-900 tabular-nums">{r.gbDivision}</span>
            </div>
          )}
        </div>
      </div>

      {/* 팀 스탯 */}
      {s && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "타율",  value: s.teamAvg },
              { label: "OPS",   value: s.teamOps },
              { label: "ERA",   value: s.teamEra },
              { label: "WHIP",  value: s.teamWhip },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-xs text-gray-400">{label}</span>
                <span className="text-sm font-bold text-gray-800 tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 최근 경기 */}
      {team.recentGames && team.recentGames.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-[10px] text-gray-400 font-semibold mb-1.5">최근 경기</p>
          <div className="flex gap-1.5 flex-wrap">
            {team.recentGames.slice(0, 5).map((g, i) => (
              <span
                key={i}
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  g.result === "W"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {g.result === "W" ? "승" : "패"}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 푸터 */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">{CARD_FOOTER}</p>
      </div>
    </div>
  );
}
