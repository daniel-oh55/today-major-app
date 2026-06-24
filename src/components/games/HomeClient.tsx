"use client";

import { Fragment, useState } from "react";
import type { AppGame } from "@/lib/models/game";
import { GameCard } from "@/components/games/GameCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { EmptyState } from "@/components/common/EmptyState";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import {
  getGameStatusCounts,
  filterGamesByStatus,
  getFavoriteTeamGames,
  type StatusFilter,
} from "@/lib/utils/gameSummary";
import { useFavorites } from "@/lib/hooks/useFavorites";

interface HomeClientProps {
  games: AppGame[];
  dateKst: string;
}

const FILTER_TABS: { value: StatusFilter; label: string }[] = [
  { value: "all",       label: "전체" },
  { value: "live",      label: "진행 중" },
  { value: "scheduled", label: "예정" },
  { value: "final",     label: "종료" },
];

export function HomeClient({ games, dateKst }: HomeClientProps) {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const { teamIds, mounted } = useFavorites();

  const counts = getGameStatusCounts(games);
  const favoriteGames = getFavoriteTeamGames(games, teamIds);
  const filteredGames = filterGamesByStatus(games, filter);
  const showFavorites = mounted && filter === "all" && favoriteGames.length > 0;

  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* ── 히어로 ── */}
      <div className="bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 pt-5 pb-6">
        <p className="text-xs text-blue-400 font-medium tracking-wide mb-1">⚾ MLB 경기 정보</p>
        <h1 className="text-xl font-bold leading-snug">
          한국 시간 기준<br />
          오늘의 미국 프로야구
        </h1>
        <p className="text-xs text-blue-300 mt-2">{dateKst.replace(/-/g, ".")} KST 기준</p>
        <p className="text-xs text-blue-500 mt-1">비공식 앱 · 현재 더미 데이터 사용 중</p>
      </div>

      {/* ── 상단 배너 광고 ── */}
      <div className="px-4 pt-3">
        <AdSlot placement="home_top_banner" />
      </div>

      {/* ── 경기 요약 카드 ── */}
      <div className="px-4 pt-4 pb-2">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "전체",    value: counts.total,     urgent: false },
            { label: "진행 중", value: counts.live,      urgent: counts.live > 0 },
            { label: "예정",    value: counts.scheduled, urgent: false },
            { label: "종료",    value: counts.final,     urgent: false },
          ].map(({ label, value, urgent }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-100 py-3 flex flex-col items-center gap-1"
            >
              <span className={`text-2xl font-black leading-none tabular-nums ${urgent ? "text-red-500" : "text-gray-800"}`}>
                {value}
              </span>
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 상태 필터 탭 ── */}
      <div className="px-4 py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5" role="group" aria-label="경기 상태 필터">
          {FILTER_TABS.map(({ value, label }) => {
            const isActive = filter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={isActive}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {label}
                {value === "live" && counts.live > 0 && (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold bg-red-500 text-white leading-none">
                    {counts.live}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 즐겨찾는 팀 경기 ── */}
      {showFavorites && (
        <section className="px-4 py-2" aria-label="즐겨찾는 팀 경기">
          <h2 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
            <span>⭐</span>
            <span>즐겨찾는 팀</span>
          </h2>
          <div className="flex flex-col gap-2">
            {favoriteGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* ── 전체/필터 경기 목록 ── */}
      <section className="px-4 py-2" aria-label="경기 목록">
        <h2 className="text-sm font-bold text-gray-700 mb-2">
          {filter === "all" ? "전체 경기" : `${FILTER_TABS.find((t) => t.value === filter)?.label} 경기`}
        </h2>

        {filteredGames.length === 0 ? (
          <EmptyState
            message={`${FILTER_TABS.find((t) => t.value === filter)?.label} 경기가 없습니다.`}
            sub="다른 상태를 선택해 보세요."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {filteredGames.map((game, idx) => (
              <Fragment key={game.id}>
                <GameCard game={game} />
                {idx === 3 && (
                  <AdSlot placement="home_game_list_native" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </section>

      {/* ── 비공식 안내 ── */}
      <DataSourceNotice />
    </div>
  );
}
