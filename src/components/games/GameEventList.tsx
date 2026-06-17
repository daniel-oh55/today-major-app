import type { AppGameEvent, AppGameEventType } from "@/lib/models/game";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";

const EVENT_LABEL: Record<AppGameEventType, string> = {
  hit:             "안타",
  homerun:         "홈런",
  strikeout:       "삼진",
  walk:            "볼넷",
  out:             "아웃",
  error:           "실책",
  stolen_base:     "도루",
  double_play:     "병살타",
  pitching_change: "투수 교체",
  inning_end:      "이닝 종료",
  game_end:        "경기 종료",
};

const EVENT_COLOR: Partial<Record<AppGameEventType, string>> = {
  homerun:         "text-red-600 bg-red-50",
  hit:             "text-blue-600 bg-blue-50",
  walk:            "text-green-600 bg-green-50",
  stolen_base:     "text-green-600 bg-green-50",
  pitching_change: "text-purple-600 bg-purple-50",
  error:           "text-orange-600 bg-orange-50",
  game_end:        "text-gray-600 bg-gray-100",
};

interface GameEventListProps {
  events: AppGameEvent[];
}

export function GameEventList({ events }: GameEventListProps) {
  return (
    <Section title="주요 기록 이벤트">
      <p className="text-xs text-gray-400 mb-3">중계 문장이 아닌 주요 기록 이벤트만 표시합니다.</p>
      {events.length === 0 ? (
        <EmptyState message="이벤트 정보 없음" />
      ) : (
        <div className="flex flex-col gap-2">
          {events.map((event) => {
            const colorClass = EVENT_COLOR[event.eventType] ?? "text-gray-700 bg-gray-50";
            return (
              <div
                key={event.id}
                className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex gap-3 items-start"
              >
                <span className="text-[11px] text-gray-400 w-14 shrink-0 pt-0.5 tabular-nums leading-snug">
                  {event.inningHalf === "top" ? "초" : "말"} {event.inning}회
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${colorClass}`}>
                      {EVENT_LABEL[event.eventType]}
                    </span>
                    {event.teamAbbr && (
                      <span className="text-[11px] text-gray-400">{event.teamAbbr}</span>
                    )}
                    {(event.runs ?? 0) > 0 && (
                      <span className="text-[11px] font-bold text-red-500">+{event.runs}점</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-mono leading-snug">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
