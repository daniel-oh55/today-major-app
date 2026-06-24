import "server-only";
import { getActiveProviderMetadata } from "@/lib/providers/registry";

// 현재 활성 provider를 표시하는 서버 컴포넌트.
// 상업 API 연결 전(isCommercialReady=false)에만 배지를 표시합니다.
export function ProviderBadge() {
  const meta = getActiveProviderMetadata();
  if (meta.isCommercialReady) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 font-medium">
      <span aria-hidden="true">⚠</span>
      {meta.label}
    </span>
  );
}
