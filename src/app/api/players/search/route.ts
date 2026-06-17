import { NextResponse } from "next/server";
import { searchPlayers } from "@/lib/services/playerService";

const DEFAULT_LIMIT = 20;
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

function parseLimit(raw: string | null): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < MIN_LIMIT) return DEFAULT_LIMIT;
  return Math.min(Math.floor(n), MAX_LIMIT);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") ?? "";
    const limit = parseLimit(searchParams.get("limit"));
    if (!query.trim()) return NextResponse.json([]);
    const players = await searchPlayers(query, limit);
    return NextResponse.json(players);
  } catch (err) {
    console.error("[api/players/search] Failed to search players:", err);
    return NextResponse.json({ error: "Failed to search players" }, { status: 500 });
  }
}
