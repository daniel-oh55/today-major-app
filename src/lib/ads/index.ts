import type { AdProvider } from "./types";
import { placeholderAdProvider } from "./providers/placeholderAdProvider";

// 현재 활성 광고 provider를 반환합니다.
// 실제 SDK 연동 시 NEXT_PUBLIC_AD_PROVIDER 환경변수로 분기하세요.
// 현재는 placeholder만 지원합니다.
export function getAdProvider(): AdProvider {
  return placeholderAdProvider;
}

export type { AdProvider, AdRenderInstruction } from "./types";
