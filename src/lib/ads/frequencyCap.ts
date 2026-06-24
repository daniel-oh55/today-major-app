// Client-side only — sessionStorage에 의존합니다.
// 서버 컴포넌트에서 직접 호출하지 마세요.

const KEY_PREFIX = "today-major:ad-freq:";

function readCount(placement: string): number {
  try {
    return parseInt(sessionStorage.getItem(KEY_PREFIX + placement) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function writeCount(placement: string, count: number): void {
  try {
    sessionStorage.setItem(KEY_PREFIX + placement, String(count));
  } catch {
    // sessionStorage 비활성화(private mode 등) 시 무시
  }
}

export function recordImpression(placement: string): void {
  writeCount(placement, readCount(placement) + 1);
}

export function getImpressionCount(placement: string): number {
  return readCount(placement);
}

export function isFrequencyCapped(placement: string, maxPerSession: number): boolean {
  return readCount(placement) >= maxPerSession;
}
