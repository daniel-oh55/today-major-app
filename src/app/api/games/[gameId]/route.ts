import { NextResponse } from "next/server";
import { getGameCenter } from "@/lib/services/gameService";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const { gameId } = await params;
    const center = await getGameCenter(gameId);
    return NextResponse.json(center);
  } catch (err) {
    console.error("[api/games/[gameId]] Failed to load game center:", err);
    return NextResponse.json({ error: "Failed to load game" }, { status: 500 });
  }
}
