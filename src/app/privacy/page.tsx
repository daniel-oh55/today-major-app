import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 — 오늘의 메이저",
  robots: "noindex",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-0 pb-10">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <Link href="/" className="text-blue-600 text-sm font-medium shrink-0">← 홈</Link>
        <h1 className="text-base font-bold text-gray-900 truncate">개인정보처리방침</h1>
      </div>

      {/* 임시 안내 배너 */}
      <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <p className="text-xs text-amber-700 leading-relaxed">
          ⚠ 이 문서는 MVP 임시 안내입니다. 실제 서비스 출시 전 법률·정책 전문가의 검토가 필요합니다.
        </p>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-5">

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">수집하는 정보</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              현재 MVP 단계에서는 로그인·회원가입·서버 데이터베이스 저장을 사용하지 않습니다.
              개인 식별 정보를 수집하지 않습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">즐겨찾기</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              즐겨찾기(팀/선수)는 현재 사용 중인 기기의 localStorage에만 저장됩니다.
              서버로 전송되지 않으며, 다른 기기와 동기화되지 않습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">광고</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              현재 실제 광고 SDK(Google AdSense, Ad Manager 등)가 연동되어 있지 않습니다.
              광고 위치에는 placeholder만 표시됩니다.
              향후 광고 SDK 연동 시 정책이 업데이트될 예정입니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">외부 API 및 데이터</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              현재 실제 상업 API가 연동되어 있지 않습니다. 모든 데이터는 개발용 더미 데이터입니다.
              향후 상업 API 계약 및 연동 시 데이터 처리 방식이 변경될 수 있으며,
              그에 따라 이 안내가 업데이트될 예정입니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-2">향후 변경사항</h2>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              광고·분석·로그인 기능 도입 시 개인정보처리방침이 업데이트됩니다.
              실제 서비스 출시 전 법률 전문가 검토 후 확정 문서로 교체 예정입니다.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
