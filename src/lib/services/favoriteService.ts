// 즐겨찾기 서비스 — localStorage 기반 (서버 컴포넌트에서 사용 금지)
// 추후 Supabase/DB 연동 시 이 파일만 교체합니다.

const STORAGE_KEYS = {
  teams:   "today-major:favorites:teams",
  players: "today-major:favorites:players",
} as const;

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]): void {
  localStorage.setItem(key, JSON.stringify(ids));
}

export const favoriteService = {
  getTeamIds(): string[] {
    return readIds(STORAGE_KEYS.teams);
  },

  getPlayerIds(): string[] {
    return readIds(STORAGE_KEYS.players);
  },

  toggleTeam(teamId: string): string[] {
    const ids = readIds(STORAGE_KEYS.teams);
    const next = ids.includes(teamId)
      ? ids.filter((id) => id !== teamId)
      : [...ids, teamId];
    writeIds(STORAGE_KEYS.teams, next);
    return next;
  },

  togglePlayer(playerId: string): string[] {
    const ids = readIds(STORAGE_KEYS.players);
    const next = ids.includes(playerId)
      ? ids.filter((id) => id !== playerId)
      : [...ids, playerId];
    writeIds(STORAGE_KEYS.players, next);
    return next;
  },
};
