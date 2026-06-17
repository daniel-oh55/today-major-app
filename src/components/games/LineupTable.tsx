"use client";

import { useState } from "react";
import Link from "next/link";
import type { AppLineupEntry } from "@/lib/models/game";
import type { AppTeam } from "@/lib/models/team";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";

interface LineupTableProps {
  awayLineup: AppLineupEntry[];
  homeLineup: AppLineupEntry[];
  awayTeam: AppTeam;
  homeTeam: AppTeam;
}

function LineupRows({ lineup }: { lineup: AppLineupEntry[] }) {
  if (lineup.length === 0) {
    return <EmptyState message="라인업 정보 없음" />;
  }
  return (
    <ul aria-label="타순" className="divide-y divide-gray-50">
      {lineup.map((entry) => (
        <li key={entry.player.id}>
          <Link
            href={`/players/${entry.player.id}`}
            className="flex items-center gap-3 py-2.5 px-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label={`${entry.battingOrder}번 타자 ${entry.player.fullName} (${entry.position}) 선수 상세 보기`}
          >
            <span className="text-xs text-gray-400 w-4 shrink-0 tabular-nums text-right">
              {entry.battingOrder}
            </span>
            <span className="text-xs font-semibold text-blue-600 w-8 shrink-0">
              {entry.position}
            </span>
            <span className="text-sm text-gray-800 flex-1 truncate">
              {entry.player.fullName}
            </span>
            <span className="text-gray-300 text-xs" aria-hidden="true">›</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LineupTable({ awayLineup, homeLineup, awayTeam, homeTeam }: LineupTableProps) {
  const [tab, setTab] = useState<"away" | "home">("away");

  return (
    <Section title="라인업">
      <div
        className="flex gap-0 mb-3 border-b border-gray-100"
        role="tablist"
        aria-label="팀 라인업 선택"
      >
        {(
          [
            { key: "away" as const, label: `${awayTeam.abbreviation} (원정)` },
            { key: "home" as const, label: `${homeTeam.abbreviation} (홈)` },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`lineup-tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`lineup-panel-${key}`}
            onClick={() => setTab(key)}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        id={`lineup-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`lineup-tab-${tab}`}
        className="bg-white rounded-xl border border-gray-100 overflow-hidden"
      >
        {tab === "away" ? (
          <LineupRows lineup={awayLineup} />
        ) : (
          <LineupRows lineup={homeLineup} />
        )}
      </div>
    </Section>
  );
}
