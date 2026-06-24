import { NextResponse } from "next/server";
import { getGamesByDate } from "@/lib/services/gameService";
import { getTodayKst } from "@/lib/utils/koreaTime";
import { logApiRouteError } from "@/lib/monitoring/safeLogger";

export async function GET() {
  try {
    const games = await getGamesByDate(getTodayKst());
    return NextResponse.json(games);
  } catch (err) {
    logApiRouteError("games.today", err);
    return NextResponse.json({ error: "Failed to load games" }, { status: 500 });
  }
}
