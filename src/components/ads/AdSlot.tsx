"use client";

import type { AdPlacement } from "@/lib/models/ad";
import { getAdProvider } from "@/lib/ads";
import { AdPlaceholder } from "./AdPlaceholder";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

// AdSlot: provider API를 통해 config와 render instruction을 얻습니다.
// 실제 SDK 연동 시 getAdProvider()가 반환하는 provider만 교체하면 됩니다.
export function AdSlot({ placement, className }: AdSlotProps) {
  const provider = getAdProvider();
  const config = provider.getPlacementConfig(placement);

  if (!config) return null;

  if (!config.enabled) {
    return <div style={{ height: config.reservedHeight }} aria-hidden="true" />;
  }

  const instruction = provider.renderSlot(config);

  if (instruction.type === "none") return null;

  return <AdPlaceholder instruction={instruction} className={className} />;
}
