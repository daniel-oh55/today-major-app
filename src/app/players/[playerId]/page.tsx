import { getPlayer } from "@/lib/services/playerService";
import { AdSlot } from "@/components/ads/AdSlot";
import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";
import { notFound } from "next/navigation";

export default async function PlayerDetailPage({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;

  let player;
  try {
    player = await getPlayer(playerId);
  } catch {
    notFound();
  }

  const isPitcher = player.position === "P";

  return (
    <div className="flex flex-col gap-0 pb-4">
      {/* 기본 정보 */}
      <div className="bg-white border-b border-gray-100 px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <span className="text-xl font-black text-gray-400">#{player.jerseyNumber}</span>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{player.fullName}</p>
            <p className="text-sm text-gray-500">{player.teamName} · {player.position}</p>
            {player.nationality && (
              <p className="text-xs text-gray-400 mt-0.5">{player.nationality}</p>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-400">타격</p>
            <p className="font-medium">{player.batHand === "S" ? "양타" : player.batHand === "L" ? "좌타" : "우타"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">투구</p>
            <p className="font-medium">{player.throwHand === "L" ? "좌투" : "우투"}</p>
          </div>
          {player.height && (
            <div>
              <p className="text-xs text-gray-400">신장/체중</p>
              <p className="font-medium text-xs">{player.height} / {player.weight}lb</p>
            </div>
          )}
        </div>
      </div>

      {/* 시즌 기록 카드 placeholder */}
      <Section title="2025 시즌 기록">
        {isPitcher ? (
          <div className="grid grid-cols-3 gap-2">
            <StatCard label="평균자책점" value="—" />
            <StatCard label="승" value="—" />
            <StatCard label="패" value="—" />
            <StatCard label="이닝" value="—" />
            <StatCard label="삼진" value="—" />
            <StatCard label="WHIP" value="—" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <StatCard label="타율" value="—" />
            <StatCard label="홈런" value="—" />
            <StatCard label="타점" value="—" />
            <StatCard label="출루율" value="—" />
            <StatCard label="장타율" value="—" />
            <StatCard label="OPS" value="—" />
          </div>
        )}
        <p className="text-xs text-gray-400 mt-2 text-center">실시간 시즌 기록은 추후 연동 예정입니다.</p>
      </Section>

      {/* 중간 네이티브 광고 */}
      <div className="px-4 py-2">
        <AdSlot placement="player_detail_mid_native" />
      </div>

      {/* 최근 경기 기록 placeholder */}
      <Section title="최근 경기 기록">
        <div className="bg-white rounded-xl border border-gray-100 px-4 py-8 text-center">
          <p className="text-sm text-gray-400">최근 경기 기록은 추후 연동 예정입니다.</p>
        </div>
      </Section>

      {/* 공유 버튼 placeholder */}
      <div className="px-4 py-2">
        <button
          disabled
          className="w-full border border-gray-200 rounded-xl py-3 text-sm text-gray-400 font-medium"
        >
          공유 (준비 중)
        </button>
      </div>
    </div>
  );
}
