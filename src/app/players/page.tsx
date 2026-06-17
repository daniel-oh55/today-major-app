"use client";

import { useState, useTransition } from "react";
import { PlayerCard } from "@/components/players/PlayerCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import type { AppPlayer } from "@/lib/models/player";

export default function PlayersPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AppPlayer[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSearch(q: string) {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    startTransition(async () => {
      const res = await fetch(`/api/players/search?q=${encodeURIComponent(q)}&limit=10`);
      const data: AppPlayer[] = await res.json();
      setResults(data);
      setSearched(true);
    });
  }

  return (
    <div className="flex flex-col gap-0 pb-4">
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-12 z-20">
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="선수 이름, 팀명으로 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
          <button
            onClick={() => handleSearch(query)}
            className="bg-blue-600 text-white text-sm font-medium rounded-lg px-4 py-2 shrink-0"
          >
            검색
          </button>
        </div>
      </div>

      {isPending && <LoadingState message="선수 검색 중..." />}

      {!isPending && searched && results.length === 0 && (
        <EmptyState message="검색 결과가 없습니다." sub="다른 이름이나 팀명으로 검색해 보세요." />
      )}

      {!isPending && results.length > 0 && (
        <div className="px-4 py-3 flex flex-col gap-2">
          {results.map((player, idx) => (
            <>
              <PlayerCard key={player.id} player={player} />
              {idx === 4 && <AdSlot key="search-ad" placement="search_result_inline" />}
            </>
          ))}
          <AdSlot placement="search_result_inline" className="mt-2" />
        </div>
      )}

      {!searched && !isPending && (
        <div className="px-4 py-8 text-center text-sm text-gray-400">
          선수 이름이나 팀명을 입력하고 검색하세요.
        </div>
      )}
    </div>
  );
}
