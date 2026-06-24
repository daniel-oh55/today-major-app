import { NextResponse } from "next/server";
import { searchPlayers } from "@/lib/services/playerService";
import { logApiRouteError } from "@/lib/monitoring/safeLogger";

const DEFAULT_LIMIT = 20;
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

// invalid/NaN → DEFAULT_LIMIT
// 유효한 숫자이지만 범위 밖 → clamp (0/-5 → 1, 999 → 50)
function parseSearchLimit(rawLimit: string | null): number {
  if (!rawLimit) return DEFAULT_LIMIT;
  const parsed = Number(rawLimit);
  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;
  const integerLimit = Math.trunc(parsed);
  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, integerLimit));
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") ?? "";
    const limit = parseSearchLimit(searchParams.get("limit"));
    if (!query.trim()) return NextResponse.json([]);
    const players = await searchPlayers(query, limit);
    return NextResponse.json(players);
  } catch (err) {
    logApiRouteError("players.search", err);
    return NextResponse.json({ error: "Failed to search players" }, { status: 500 });
  }
}
