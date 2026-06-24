import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 — 오늘의 메이저",
  robots: "noindex",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-0 pb-10">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <Link href="/" className="text-blue-600 text-sm font-medium shrink-0">← 홈</Link>
        <h1 className="text-base font-bold text-gray-900 truncate">이용약관</h1>
      </div>

      {/* 임시 안내 배너 */}
      <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <p className="text-xs text-amber-700 leading-relaxed">
          ⚠ 이 문서는 MVP 임시 안내입니다. 실제 서비스 출시 전 법률·정책 전문가의 검토가 필요합니다.
        </p>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-5">

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">서비스 성격</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              "오늘의 메이저"는 한국 MLB 팬을 위한 비공식 팬앱입니다.
              MLB, MLBAM(MLB Advanced Media), 각 구단 및 선수와 공식 제휴·파트너십 관계가 없습니다.
              이 앱은 비공식 제3자 서비스입니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">데이터 정확성</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              현재 MVP 단계에서 모든 데이터는 개발용 더미 데이터입니다. 실제 경기 정보가 아닙니다.
              향후 상업 API 연동 후에도 데이터의 정확성·실시간성·완전성을 보장하지 않습니다.
              데이터 지연, 오류, 누락이 발생할 수 있습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">로고·사진·영상</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              이 앱은 MLB 공식 로고, 구단 로고, 선수 사진, 영상, 하이라이트를 사용하지 않습니다.
              관련 이미지 자산은 MLB 및 각 저작권자의 권리 범위에 해당하므로 무단 사용하지 않습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">책임 한계</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              이 앱을 통해 제공되는 정보를 기반으로 한 결정에 대한 책임은 이용자 본인에게 있습니다.
              개발자는 데이터 정확성, 서비스 가용성, 또는 이용으로 인한 손실에 대해 책임을 지지 않습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">약관 변경</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              실제 서비스 출시 전 이 임시 안내는 법률 전문가 검토를 거쳐 확정 약관으로 교체될 예정입니다.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
