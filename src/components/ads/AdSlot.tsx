"use client";

import type { AdPlacement } from "@/lib/config/ads";
import { AdPlaceholder } from "./AdPlaceholder";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

// AdSlot: 실제 광고 SDK 연동 전까지 placeholder를 표시합니다.
// SDK 연동 시 이 컴포넌트 내부에서만 초기화하면 됩니다.
export function AdSlot({ placement, className }: AdSlotProps) {
  return <AdPlaceholder placement={placement} className={className} />;
}
