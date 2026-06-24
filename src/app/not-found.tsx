import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-5">
      <p className="text-5xl" aria-hidden="true">⚾</p>
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-gray-800">페이지를 찾을 수 없습니다</h1>
        <p className="text-sm text-gray-400">
          존재하지 않는 경기·선수·팀 ID이거나<br />
          삭제된 페이지일 수 있습니다.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[200px]">
        <Link
          href="/"
          className="w-full text-sm font-semibold text-white bg-blue-600 rounded-xl py-3 min-h-[44px] flex items-center justify-center active:bg-blue-700 transition-colors"
        >
          홈으로 이동
        </Link>
        <Link
          href="/players"
          className="w-full text-sm font-medium text-gray-600 border border-gray-200 rounded-xl py-3 min-h-[44px] flex items-center justify-center active:bg-gray-50 transition-colors"
        >
          선수 검색
        </Link>
      </div>
    </div>
  );
}
