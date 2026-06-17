import { getPlayer } from "@/lib/services/playerService";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ playerId: string }> }
) {
  const { playerId } = await params;
  try {
    const player = await getPlayer(playerId);
    return NextResponse.json(player);
  } catch {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }
}
