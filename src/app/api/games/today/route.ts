import { NextResponse } from "next/server";
import { getGamesByDate } from "@/lib/services/gameService";
import { getTodayKst } from "@/lib/utils/koreaTime";

export async function GET() {
  try {
    const games = await getGamesByDate(getTodayKst());
    return NextResponse.json(games);
  } catch (err) {
    console.error("[api/games/today] Failed to load games:", err);
    return NextResponse.json({ error: "Failed to load games" }, { status: 500 });
  }
}
