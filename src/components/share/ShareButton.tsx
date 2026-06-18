"use client";

import { useEffect, useState } from "react";
import type { AppSharePayload } from "@/lib/models/share";
import { ShareResultMessage, type ShareState } from "./ShareResultMessage";

interface ShareButtonProps {
  payload: AppSharePayload;
  className?: string;
}

const SHARE_ICON = (
  <svg
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

export function ShareButton({ payload, className = "" }: ShareButtonProps) {
  const [state, setState] = useState<ShareState>("idle");

  // 성공 상태는 5초 후 idle로 자동 복귀
  useEffect(() => {
    if (state === "success-share" || state === "success-copy") {
      const t = setTimeout(() => setState("idle"), 5000);
      return () => clearTimeout(t);
    }
  }, [state]);

  async function handleShare() {
    if (state === "sharing") return;
    setState("sharing");

    // 1. Web Share API 시도
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: payload.title,
          text:  payload.text,
          ...(payload.url ? { url: payload.url } : {}),
        });
        setState("success-share");
        return;
      } catch (err) {
        // 사용자가 취소한 경우는 오류가 아님
        if (err instanceof Error && err.name === "AbortError") {
          setState("idle");
          return;
        }
        // 그 외 오류 → clipboard fallback으로 진행
      }
    }

    // 2. Clipboard API 시도
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(payload.text);
        setState("success-copy");
        return;
      } catch {
        // clipboard도 실패 → 수동 복사 fallback
      }
    }

    // 3. 수동 복사 fallback
    setState("fallback");
  }

  const isSuccess = state === "success-share" || state === "success-copy";
  const buttonText =
    state === "sharing"       ? "공유 중..." :
    state === "success-share" ? "공유됨" :
    state === "success-copy"  ? "복사됨" :
    "공유하기";

  const buttonClass =
    isSuccess                    ? "border-green-200 text-green-600 bg-green-50" :
    state === "error"            ? "border-red-200   text-red-600   bg-white"    :
    state === "sharing"          ? "border-gray-200  text-gray-400  bg-white cursor-wait" :
                                   "border-blue-200  text-blue-600  bg-white active:bg-blue-50";

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleShare}
        disabled={state === "sharing"}
        aria-label={isSuccess ? buttonText : "공유하기"}
        className={`w-full border rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-h-[44px] ${buttonClass}`}
      >
        {SHARE_ICON}
        {buttonText}
      </button>
      <ShareResultMessage state={state} fallbackText={payload.text} />
    </div>
  );
}
