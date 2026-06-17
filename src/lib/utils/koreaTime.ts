/** KST 기준 오늘 날짜를 YYYY-MM-DD 형식으로 반환합니다. */
export function getTodayKst(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}
