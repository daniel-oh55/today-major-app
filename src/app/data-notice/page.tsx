import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "데이터 안내 — 오늘의 메이저",
  robots: "noindex",
};

export default function DataNoticePage() {
  return (
    <div className="flex flex-col gap-0 pb-10">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <Link href="/" className="text-blue-600 text-sm font-medium shrink-0">← 홈</Link>
        <h1 className="text-base font-bold text-gray-900 truncate">데이터 안내</h1>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-5">

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">현재 데이터 상태</h2>
          <div className="bg-amber-50 rounded-xl border border-amber-200 px-4 py-4">
            <p className="text-sm text-amber-800 leading-relaxed font-medium">
              ⚠ 현재 표시되는 모든 데이터는 개발용 더미 데이터입니다.
            </p>
            <p className="text-sm text-amber-700 leading-relaxed mt-1">
              실제 MLB 경기 정보·선수 기록·팀 스탯이 아닙니다.
              상업 API 계약 및 연동 완료 후 실제 데이터로 교체될 예정입니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">상업 API 미연동</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              현재 실제 스포츠 데이터 API(BallDontLie, MySportsFeeds, SportsDataIO 등)가 연동되어 있지 않습니다.
              실제 연동을 위해서는 각 제공사와의 계약 및 약관 확인이 선행되어야 합니다.
              특히 광고형 무료 앱에서의 사용 가능 여부를 계약 전에 반드시 확인합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">MLB Stats API 미사용</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              이 앱은 MLB Stats API(api.mlb.com)를 정식 데이터 소스로 사용하지 않습니다.
              이 원칙은 변경되지 않습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">데이터 출처 표기</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              상업 API 연동 후에는 해당 데이터 제공사가 요구하는 출처 표기(attribution) 및
              면책 문구가 앱에 표시될 예정입니다.
              현재는 개발용 더미 데이터 출처만 표시됩니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">로고·사진·영상</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              이 앱은 MLB 공식 로고, 구단 로고, 선수 사진, 영상, 하이라이트를 제공하지 않습니다.
              이 정책은 API 연동 이후에도 유지됩니다.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
