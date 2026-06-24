import type { AdPlacement, AdSlotConfig } from "@/lib/models/ad";
import type { AdProvider, AdRenderInstruction } from "@/lib/ads/types";
import { AD_SLOT_CONFIGS } from "@/lib/config/ads";

export const placeholderAdProvider: AdProvider = {
  id: "placeholder",

  isEnabled(): boolean {
    return true;
  },

  getPlacementConfig(placement: AdPlacement): AdSlotConfig | null {
    return AD_SLOT_CONFIGS[placement] ?? null;
  },

  renderSlot(config: AdSlotConfig): AdRenderInstruction {
    if (!config.enabled) return { type: "none" };
    return {
      type: "placeholder",
      placement: config.placement,
      label: config.label,
      reservedHeight: config.reservedHeight,
    };
  },
};
