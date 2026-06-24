import type { ProviderMetadata } from "@/lib/providers/metadata";
import { PROVIDER_METADATA } from "@/lib/providers/metadata";

interface DataSourceNoticeProps {
  // Server pages can pass the active provider's metadata for accurate display.
  // Defaults to dummy metadata when called from client components without props.
  metadata?: ProviderMetadata;
}

export function DataSourceNotice({ metadata = PROVIDER_METADATA.dummy }: DataSourceNoticeProps) {
  return (
    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
      <p className="text-xs text-gray-400 leading-relaxed">
        비공식 팬앱 — MLB, MLBAM 및 각 구단과 무관합니다. 로고·선수 사진·영상은 제공하지 않습니다.
      </p>
      {!metadata.isCommercialReady && (
        <p className="text-xs text-amber-500 mt-1">
          ⚠ 현재 데이터: {metadata.label} — 상업 API 계약 전 더미 데이터 기준
        </p>
      )}
    </div>
  );
}
