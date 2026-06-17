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
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
