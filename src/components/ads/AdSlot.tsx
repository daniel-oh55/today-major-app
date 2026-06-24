"use client";

import type { AdPlacement } from "@/lib/models/ad";
import { AD_SLOT_CONFIGS } from "@/lib/config/ads";
import { getAdProvider } from "@/lib/ads";
import { AdPlaceholder } from "./AdPlaceholder";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

// AdSlot: placement config → ad provider → render instruction 순으로 처리합니다.
// 실제 SDK 연동 시 getAdProvider()가 반환하는 provider만 교체하면 됩니다.
export function AdSlot({ placement, className }: AdSlotProps) {
  const config = AD_SLOT_CONFIGS[placement];

  if (!config.enabled) {
    // 레이아웃 시프트 방지용 빈 공간
    return <div style={{ height: config.reservedHeight }} aria-hidden="true" />;
  }

  const instruction = getAdProvider().renderSlot(config);

  if (instruction.type === "none") return null;

  return <AdPlaceholder instruction={instruction} className={className} />;
}
