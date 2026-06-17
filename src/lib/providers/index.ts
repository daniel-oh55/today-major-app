import "server-only";

import type { BaseballDataProvider } from "./types";
import { DummyProvider } from "./dummy/dummyProvider";

// Phase 0: dummy provider만 runtime 동작. ENV.provider는 항상 "dummy"를 반환합니다.
// balldontlie / mysportsfeeds skeleton 파일은 보존되지만 runtime에 선택되지 않습니다.
let _instance: BaseballDataProvider | null = null;

export function getBaseballDataProvider(): BaseballDataProvider {
  if (_instance) return _instance;
  _instance = new DummyProvider();
  return _instance;
}
