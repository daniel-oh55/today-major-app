import type { AdPlacement, AdSlotConfig, AdProviderId } from "@/lib/models/ad";

export type AdRenderInstruction =
  | { type: "placeholder"; placement: AdPlacement; label: string; reservedHeight: number }
  | { type: "none" };

export interface AdProvider {
  readonly id: AdProviderId;
  isEnabled(): boolean;
  getPlacementConfig(placement: AdPlacement): AdSlotConfig | null;
  renderSlot(config: AdSlotConfig): AdRenderInstruction;
}
