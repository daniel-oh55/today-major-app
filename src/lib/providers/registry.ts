import "server-only";
import { PROVIDER_METADATA } from "./metadata";
import type { ProviderMetadata, ProviderId } from "./metadata";
import { ENV } from "../config/env";

export type { ProviderId } from "./metadata";

// runtime-ready: 실제 데이터를 반환할 수 있는 provider.
// skeleton provider는 이 목록에 추가하지 마세요.
export const RUNTIME_READY_PROVIDERS: ProviderId[] = ["dummy"];

export function getActiveProviderMetadata(): ProviderMetadata {
  return PROVIDER_METADATA[ENV.provider];
}
