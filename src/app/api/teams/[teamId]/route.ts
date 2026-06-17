import { getTeam } from "@/lib/services/teamService";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;
  try {
    const team = await getTeam(teamId);
    return NextResponse.json(team);
  } catch {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }
}
