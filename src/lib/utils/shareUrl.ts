// 공유 URL 빌더 — 추후 도메인 설정 시 이 파일만 수정합니다.
export function buildShareUrl(path: string, origin = ""): string {
  return `${origin}${path}`;
}
