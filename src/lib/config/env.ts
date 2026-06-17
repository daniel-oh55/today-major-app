import "server-only";

// Phase 0에서 runtime 동작이 보장된 provider는 dummy뿐입니다.
// balldontlie / mysportsfeeds 는 skeleton만 존재하며 runtime에 선택되면 dummy로 fallback됩니다.
const SUPPORTED_RUNTIME_PROVIDERS = ["dummy"] as const;
type SupportedProvider = (typeof SUPPORTED_RUNTIME_PROVIDERS)[number];

function getProviderEnv(): SupportedProvider {
  const val = process.env.BASEBALL_DATA_PROVIDER;
  if (val && !SUPPORTED_RUNTIME_PROVIDERS.includes(val as SupportedProvider)) {
    console.warn(
      `[env] BASEBALL_DATA_PROVIDER="${val}" is not supported in Phase 0. ` +
        `Falling back to "dummy". Supported: ${SUPPORTED_RUNTIME_PROVIDERS.join(", ")}`
    );
  }
  return "dummy";
}

export const ENV = {
  provider: getProviderEnv(),
  apiKey: process.env.BASEBALL_API_KEY ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
