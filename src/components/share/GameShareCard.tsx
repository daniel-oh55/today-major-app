import type { AppGame, AppGameEvent } from "@/lib/models/game";

interface GameShareCardProps {
  game: AppGame;
  events: AppGameEvent[];
}

const CARD_FOOTER = "비공식 팬앱 · 로고·선수 사진·영상 미사용";

const STATUS_LABEL: Record<string, string> = {
  live:      "진행 중",
  final:     "종료",
  scheduled: "예정",
  pre_game:  "경기 전",
  delayed:   "지연",
  postponed: "연기",
  cancelled: "취소",
  suspended: "중단",
  unknown:   "–",
};

export function GameShareCard({ game, events }: GameShareCardProps) {
  const status  = STATUS_LABEL[game.status] ?? game.status;
  const inning  = game.status === "live"
    ? `${game.inningHalf === "top" ? "초" : "말"}${game.inning}회`
    : null;

  const notable = events
    .filter((e) => e.eventType === "homerun" || e.eventType === "hit")
    .slice(-3);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden text-sm" aria-label="공유 카드 미리보기">
      {/* 스코어 헤더 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-4 text-center">
        <p className="text-xs text-gray-400 mb-1">
          {status}{inning ? ` · ${inning}` : ""}
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-base font-bold text-gray-200 w-10 text-right">{game.awayTeam.abbreviation}</span>
          <span className="text-3xl font-black text-white tabular-nums">{game.awayScore}</span>
          <span className="text-gray-500 font-medium text-lg">–</span>
          <span className="text-3xl font-black text-white tabular-nums">{game.homeScore}</span>
          <span className="text-base font-bold text-gray-200 w-10 text-left">{game.homeTeam.abbreviation}</span>
        </div>
        {game.venue && (
          <p className="text-[10px] text-gray-500 mt-1">{game.venue}</p>
        )}
      </div>

      {/* 주요 기록 */}
      {notable.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-[10px] text-gray-400 font-semibold mb-2">주요 기록</p>
          <ul className="flex flex-col gap-1" aria-label="주요 경기 기록">
            {notable.map((e) => (
              <li key={e.id} className="text-xs text-gray-600">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1.5 align-middle ${
                    e.eventType === "homerun" ? "bg-red-400" : "bg-blue-400"
                  }`}
                  aria-hidden="true"
                />
                {e.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 푸터 */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">{CARD_FOOTER}</p>
      </div>
    </div>
  );
}
