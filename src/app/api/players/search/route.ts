import { NextResponse } from "next/server";
import { searchPlayers } from "@/lib/services/playerService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") ?? "";
    const limit = Number(searchParams.get("limit") ?? "10");
    if (!query.trim()) return NextResponse.json([]);
    const players = await searchPlayers(query, limit);
    return NextResponse.json(players);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
