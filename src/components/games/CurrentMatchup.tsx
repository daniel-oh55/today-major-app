import type { AppCurrentMatchup } from "@/lib/models/game";
import type { AppInningHalf } from "@/lib/models/common";
import { Section } from "@/components/common/Section";
import { BaseState } from "@/components/games/BaseState";

interface CurrentMatchupProps {
  matchup: AppCurrentMatchup;
  inning: number;
  inningHalf: AppInningHalf;
}

export function CurrentMatchup({ matchup, inning, inningHalf }: CurrentMatchupProps) {
  const { batter, pitcher, balls, strikes, outs, bases } = matchup;

  return (
    <Section title="현재 상황">
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
        {/* 이닝 + 볼카운트 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">
              {inningHalf === "top" ? "초" : "말"} {inning}회
            </span>
            <span className="text-xs text-gray-400">{outs}아웃</span>
          </div>

          <div
            className="flex items-center gap-1"
            aria-label={`${balls}볼 ${strikes}스트라이크 ${outs}아웃`}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={`b${i}`}
                aria-hidden="true"
                className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  i < balls ? "bg-green-400 text-white" : "bg-gray-100 text-gray-300"
                }`}
              >
                B
              </span>
            ))}
            <span className="text-gray-200 mx-0.5" aria-hidden="true">|</span>
            {[0, 1].map((i) => (
              <span
                key={`s${i}`}
                aria-hidden="true"
                className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  i < strikes ? "bg-red-400 text-white" : "bg-gray-100 text-gray-300"
                }`}
              >
                S
              </span>
            ))}
          </div>
        </div>

        {/* 베이스 + 타자/투수 */}
        <div className="flex items-center gap-4">
          <BaseState bases={bases} />
          <div className="flex-1 flex flex-col gap-2 text-sm">
            <div className="flex items-start justify-between gap-2">
              <span className="text-gray-400 shrink-0 w-8">타자</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 leading-snug">{batter.fullName}</p>
                <p className="text-xs text-gray-400">{batter.teamName} · {batter.position}</p>
              </div>
            </div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-gray-400 shrink-0 w-8">투수</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900 leading-snug">{pitcher.fullName}</p>
                <p className="text-xs text-gray-400">{pitcher.teamName} · {pitcher.position}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
