import type { AppProviderId } from "../models/common";

function getProviderEnv(): AppProviderId {
  const val = process.env.BASEBALL_DATA_PROVIDER;
  if (val === "balldontlie" || val === "mysportsfeeds") return val;
  return "dummy";
}

export const ENV = {
  provider: getProviderEnv(),
  apiKey: process.env.BASEBALL_API_KEY ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
