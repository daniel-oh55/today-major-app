import { AdSlot } from "@/components/ads/AdSlot";
import { FavoriteTeamList } from "@/components/favorites/FavoriteTeamList";
import { FavoritePlayerList } from "@/components/favorites/FavoritePlayerList";

export default function FavoritesPage() {
  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* ── 헤더 ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-lg font-bold text-gray-900">즐겨찾기</h1>
        <p className="text-xs text-gray-400 mt-0.5">현재 기기 기준으로 저장됩니다.</p>
      </div>

      {/* ── 즐겨찾는 팀 ── */}
      <div className="px-4 pt-4">
        <h2 className="text-sm font-bold text-gray-700 mb-2">즐겨찾는 팀</h2>
        <FavoriteTeamList />
      </div>

      {/* ── 광고 ── */}
      <div className="px-4 pt-4">
        <AdSlot placement="favorite_home_inline" />
      </div>

      {/* ── 즐겨찾는 선수 ── */}
      <div className="px-4 pt-4">
        <h2 className="text-sm font-bold text-gray-700 mb-2">즐겨찾는 선수</h2>
        <FavoritePlayerList />
      </div>
    </div>
  );
}
