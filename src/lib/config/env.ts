import "server-only";
import { PROVIDER_METADATA, RUNTIME_READY_PROVIDERS } from "../providers/metadata";
import type { ProviderId } from "../providers/metadata";

export type ProviderRuntimeMode =
  | "dummy_only"            // 모든 env 설정을 무시하고 dummy만 사용
  | "safe_dummy_fallback"   // 미지원/skeleton provider는 dummy로 fallback (기본값)
  | "provider_poc_disabled" // skeleton 선택 가능하나 실제 외부 호출 차단 (safe_dummy_fallback과 동일하게 동작)
  | "provider_enabled";     // 실제 provider 허용 (BASEBALL_API_KEY 필요; 현재 runtime-ready provider 없음)

const VALID_RUNTIME_MODES: ProviderRuntimeMode[] = [
  "dummy_only",
  "safe_dummy_fallback",
  "provider_poc_disabled",
  "provider_enabled",
];

function resolveRuntimeMode(): ProviderRuntimeMode {
  const val = process.env.BASEBALL_PROVIDER_RUNTIME_MODE;
  if (!val) return "safe_dummy_fallback";
  if ((VALID_RUNTIME_MODES as string[]).includes(val)) {
    return val as ProviderRuntimeMode;
  }
  console.warn(
    "[provider-config] Unknown BASEBALL_PROVIDER_RUNTIME_MODE. Falling back to safe_dummy_fallback.",
    { reason: "unsupported_runtime_mode" }
  );
  return "safe_dummy_fallback";
}

function resolveApiTimeoutMs(): number {
  const val = process.env.BASEBALL_API_TIMEOUT_MS;
  if (!val) return 5000;
  const parsed = parseInt(val, 10);
  if (isNaN(parsed) || parsed <= 0 || parsed > 60_000) {
    console.warn(
      "[provider-config] Invalid BASEBALL_API_TIMEOUT_MS. Using default 5000ms.",
      { reason: "invalid_timeout_value" }
    );
    return 5000;
  }
  return parsed;
}

function resolveProvider(runtimeMode: ProviderRuntimeMode): ProviderId {
  // dummy_only: 모든 설정을 무시하고 강제로 dummy 사용
  if (runtimeMode === "dummy_only") return "dummy";

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

  // provider_enabled 모드에서는 BASEBALL_API_KEY가 있어야 합니다.
  // 현재는 실제 runtime-ready provider가 없으므로 이 분기에 도달하지 않습니다.
  if (runtimeMode === "provider_enabled" && !process.env.BASEBALL_API_KEY) {
    console.warn(
      "[provider-config] provider_enabled mode requires BASEBALL_API_KEY. Falling back to dummy.",
      { reason: "missing_api_key" }
    );
    return "dummy";
  }

  return id;
}

const _runtimeMode = resolveRuntimeMode();

export const ENV = {
  provider: resolveProvider(_runtimeMode),
  runtimeMode: _runtimeMode,
  apiKey: process.env.BASEBALL_API_KEY ?? "",
  apiBaseUrl: process.env.BASEBALL_API_BASE_URL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  apiTimeoutMs: resolveApiTimeoutMs(),
} as const;
