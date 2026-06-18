import { getPlayer } from "@/lib/services/playerService";
import { AdSlot } from "@/components/ads/AdSlot";
import { Section } from "@/components/common/Section";
import { PlayerStatSummary } from "@/components/players/PlayerStatSummary";
import { RecentGameLogTable } from "@/components/players/RecentGameLogTable";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { ShareButton } from "@/components/share/ShareButton";
import { PlayerShareCard } from "@/components/share/PlayerShareCard";
import { buildPlayerShareText } from "@/lib/utils/shareText";
import { notFound } from "next/navigation";

const NATIONALITY_LABEL: Record<string, string> = {
  USA: "미국", JPN: "일본", DOM: "도미니카 공화국",
  VEN: "베네수엘라", CUB: "쿠바", CUR: "퀴라소",
};

function BatThrowLabel({ batHand, throwHand }: { batHand: string; throwHand: string }) {
  const bat    = batHand   === "S" ? "양타" : batHand   === "L" ? "좌타" : "우타";
  const throw_ = throwHand === "L" ? "좌투" : "우투";
  return <>{bat} / {throw_}</>;
}

export default async function PlayerDetailPage({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;

  let player;
  try {
    player = await getPlayer(playerId);
  } catch {
    notFound();
  }

  const isPitcher   = player.position === "P";
  const hasLog      = (player.recentGameLog?.length ?? 0) > 0;
  const sharePayload = buildPlayerShareText(player);

  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* ── 기본 정보 헤더 ── */}
      <div className="bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 pt-4 pb-5">
        {/* 등번호 + 이름 */}
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-full bg-blue-800 border border-blue-700 flex items-center justify-center shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <span className="text-lg font-black text-blue-200">#{player.jerseyNumber}</span>
          </div>
          <div className="flex-1 min-w-0">
            {player.koreanName ? (
              <>
                <h1 className="text-2xl font-black text-white leading-tight">{player.koreanName}</h1>
                <p className="text-sm text-blue-300 truncate mt-0.5">{player.fullName}</p>
              </>
            ) : (
              <h1 className="text-2xl font-black text-white leading-tight">{player.fullName}</h1>
            )}
            <p className="text-sm text-blue-200 mt-1">{player.teamName}</p>
          </div>
        </div>

        {/* 즐겨찾기 버튼 */}
        <div className="mt-3">
          <FavoriteButton id={playerId} type="player" />
        </div>

        {/* 세부 정보 그리드 */}
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-blue-800 pt-3">
          <div>
            <p className="text-[10px] text-blue-500 uppercase tracking-wide">포지션</p>
            <p className="text-sm font-semibold text-blue-100 mt-0.5">{player.position}</p>
          </div>
          <div>
            <p className="text-[10px] text-blue-500 uppercase tracking-wide">투타</p>
            <p className="text-sm font-semibold text-blue-100 mt-0.5">
              <BatThrowLabel batHand={player.batHand} throwHand={player.throwHand} />
            </p>
          </div>
          <div>
            <p className="text-[10px] text-blue-500 uppercase tracking-wide">상태</p>
            <p className={`text-sm font-semibold mt-0.5 ${
              player.status === "Active" ? "text-green-300" : "text-yellow-300"
            }`}>
              {player.status ?? "—"}
            </p>
          </div>
          {player.height && (
            <div>
              <p className="text-[10px] text-blue-500 uppercase tracking-wide">신장</p>
              <p className="text-sm font-semibold text-blue-100 mt-0.5">{player.height}</p>
            </div>
          )}
          {player.weight && (
            <div>
              <p className="text-[10px] text-blue-500 uppercase tracking-wide">체중</p>
              <p className="text-sm font-semibold text-blue-100 mt-0.5">{player.weight} lb</p>
            </div>
          )}
          {player.nationality && (
            <div>
              <p className="text-[10px] text-blue-500 uppercase tracking-wide">국적</p>
              <p className="text-sm font-semibold text-blue-100 mt-0.5">
                {NATIONALITY_LABEL[player.nationality] ?? player.nationality}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── 시즌 기록 요약 ── */}
      <PlayerStatSummary player={player} />

      {/* ── 중간 네이티브 광고 ── */}
      <div className="px-4 pb-1">
        <AdSlot placement="player_detail_mid_native" />
      </div>

      {/* ── 최근 경기 기록 ── */}
      {hasLog ? (
        <RecentGameLogTable
          gameLog={player.recentGameLog!}
          isPitcher={isPitcher}
        />
      ) : (
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">최근 경기 기록</p>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-6 text-center">
            <p className="text-sm text-gray-400">최근 경기 기록이 없습니다.</p>
          </div>
        </div>
      )}

      {/* ── 기록 카드 공유 ── */}
      <Section title="기록 카드 공유">
        <PlayerShareCard player={player} />
        <div className="mt-2">
          <ShareButton payload={sharePayload} />
        </div>
      </Section>
    </div>
  );
}
