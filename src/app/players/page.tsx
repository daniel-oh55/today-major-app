"use client";

import { Fragment, useRef, useState } from "react";
import { PlayerCard } from "@/components/players/PlayerCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import type { AppPlayerDetail } from "@/lib/models/player";

const MIN_QUERY_LENGTH = 2;
const SEARCH_ERROR_MSG = "선수 검색 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";

export default function PlayersPage() {
  const [query,     setQuery]     = useState("");
  const [results,   setResults]   = useState<AppPlayerDetail[]>([]);
  const [searched,  setSearched]  = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function resetSearchState() {
    setResults([]);
    setSearched(false);
    setError(null);
  }

  async function handleSearch(rawQuery: string) {
    const q = rawQuery.trim();
    if (!q || q.length < MIN_QUERY_LENGTH) return;

    resetSearchState();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/players/search?q=${encodeURIComponent(q)}&limit=20`);
      if (!res.ok) {
        setError(SEARCH_ERROR_MSG);
        return;
      }
      const data: AppPlayerDetail[] = await res.json();
      setResults(data);
      setSearched(true);
    } catch {
      setError(SEARCH_ERROR_MSG);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    resetSearchState();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch(query);
  }

  const trimmedQuery = query.trim();
  const isTooShort   = trimmedQuery.length > 0 && trimmedQuery.length < MIN_QUERY_LENGTH;

  // 렌더링 조건을 파생 변수로 명확히 분리
  const showError   = !isLoading && error !== null;
  const showEmpty   = !isLoading && !error && searched && results.length === 0;
  const showResults = !isLoading && !error && results.length > 0;
  const showHint    = !isLoading && !error && !searched;

  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* ── 검색바 ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-12 z-20">
        <div className="flex gap-2">
          <label htmlFor="player-search" className="sr-only">선수 검색</label>
          <input
            id="player-search"
            ref={inputRef}
            type="search"
            placeholder="선수 이름·팀명으로 검색..."
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors min-w-0"
          />
          <button
            type="button"
            onClick={() => handleSearch(query)}
            disabled={isLoading}
            className="bg-blue-600 text-white text-sm font-semibold rounded-xl px-5 py-2.5 shrink-0 active:bg-blue-700 disabled:opacity-50 transition-colors"
            aria-label="선수 검색"
          >
            검색
          </button>
        </div>
        {isTooShort && (
          <p className="text-xs text-orange-500 mt-1.5 pl-1" role="alert">
            {MIN_QUERY_LENGTH}자 이상 입력해 주세요.
          </p>
        )}
      </div>

      {/* ── 로딩 ── */}
      {isLoading && <LoadingState message="선수 검색 중..." />}

      {/* ── 검색 오류 ── */}
      {showError && (
        <ErrorState
          message={error!}
          onRetry={() => handleSearch(query)}
        />
      )}

      {/* ── 결과 없음 ── */}
      {showEmpty && (
        <EmptyState
          message="검색 결과가 없습니다."
          sub="다른 이름이나 팀명으로 검색해 보세요."
        />
      )}

      {/* ── 검색 결과 ── */}
      {showResults && (
        <div className="px-4 py-3 flex flex-col gap-2">
          <p className="text-xs text-gray-400 mb-1">총 {results.length}명</p>
          {results.map((player, idx) => (
            <Fragment key={player.id}>
              <PlayerCard player={player} />
              {idx === 4 && <AdSlot placement="search_result_inline" />}
            </Fragment>
          ))}
        </div>
      )}

      {/* ── 초기 안내 ── */}
      {showHint && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-2">
          <p className="text-gray-400 text-sm">선수 이름이나 팀명을 입력하고 검색하세요.</p>
          <p className="text-xs text-gray-300">예: Ohtani, Dodgers, 오타니</p>
        </div>
      )}
    </div>
  );
}
