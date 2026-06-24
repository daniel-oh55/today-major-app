import "server-only";
import { PROVIDER_METADATA } from "./metadata";
import type { ProviderMetadata } from "./metadata";
import { ENV } from "../config/env";

export type { ProviderId } from "./metadata";
// Re-exported from metadata.ts (single source of truth).
export { RUNTIME_READY_PROVIDERS } from "./metadata";

export function getActiveProviderMetadata(): ProviderMetadata {
  return PROVIDER_METADATA[ENV.provider];
}
