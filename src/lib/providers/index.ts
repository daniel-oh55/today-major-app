import "server-only";
import type { BaseballDataProvider } from "./types";
import { DummyProvider } from "./dummy/dummyProvider";
import { ENV } from "../config/env";

let _instance: BaseballDataProvider | null = null;

export function getBaseballDataProvider(): BaseballDataProvider {
  if (_instance) return _instance;

  switch (ENV.provider) {
    case "dummy":
    default:
      // skeleton provider가 env에 설정되더라도 env.ts에서 dummy로 fallback됩니다.
      _instance = new DummyProvider();
      break;
  }

  return _instance;
}
