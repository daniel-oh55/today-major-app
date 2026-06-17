import { NextResponse } from "next/server";
import { getGamesByDate } from "@/lib/services/gameService";

function getTodayKst(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export async function GET() {
  try {
    const games = await getGamesByDate(getTodayKst());
    return NextResponse.json(games);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
