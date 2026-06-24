import "server-only";
import { PROVIDER_METADATA } from "../providers/metadata";
import type { ProviderId } from "../providers/metadata";

// runtime 동작이 보장된 provider 목록. skeleton provider는 포함하지 않습니다.
const RUNTIME_READY_PROVIDERS: ProviderId[] = ["dummy"];

function resolveProvider(): ProviderId {
  const val = process.env.BASEBALL_DATA_PROVIDER;

  if (!val || !(val in PROVIDER_METADATA)) {
    if (val) {
      console.warn(
        "[provider-config] Unknown BASEBALL_DATA_PROVIDER. Falling back to dummy.",
        { reason: "unsupported_provider" }
      );
    }
    return "dummy";
  }

  const id = val as ProviderId;
  if (!RUNTIME_READY_PROVIDERS.includes(id)) {
    console.warn(
      "[provider-config] Selected provider is not runtime-ready (skeleton only). Falling back to dummy.",
      { reason: "not_runtime_ready" }
    );
    return "dummy";
  }

  return id;
}

export const ENV = {
  provider: resolveProvider(),
  apiKey: process.env.BASEBALL_API_KEY ?? "",
  apiBaseUrl: process.env.BASEBALL_API_BASE_URL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
