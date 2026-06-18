"use client";

import { AdSlot } from "@/components/ads/AdSlot";

export type ShareState =
  | "idle"
  | "sharing"
  | "success-share"
  | "success-copy"
  | "fallback"
  | "error";

interface ShareResultMessageProps {
  state: ShareState;
  fallbackText: string;
}

export function ShareResultMessage({ state, fallbackText }: ShareResultMessageProps) {
  if (state === "idle" || state === "sharing") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="mt-2 flex flex-col gap-2"
    >
      {state === "success-share" && (
        <>
          <p className="text-sm text-green-600 font-medium text-center py-2">
            ✓ 공유했습니다.
          </p>
          <AdSlot placement="share_complete_interstitial" />
        </>
      )}

      {state === "success-copy" && (
        <>
          <p className="text-sm text-green-600 font-medium text-center py-2">
            ✓ 클립보드에 복사됐습니다.
          </p>
          <AdSlot placement="share_complete_interstitial" />
        </>
      )}

      {state === "error" && (
        <p className="text-sm text-red-500 font-medium text-center py-2">
          공유에 실패했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      {state === "fallback" && (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-gray-500 font-medium">아래 텍스트를 직접 복사하세요:</p>
          <textarea
            readOnly
            value={fallbackText}
            rows={8}
            className="w-full text-xs text-gray-700 border border-gray-200 rounded-xl p-3 resize-none bg-gray-50 leading-relaxed"
            aria-label="공유할 텍스트 (직접 복사)"
            onFocus={(e) => e.target.select()}
          />
        </div>
      )}
    </div>
  );
}
