"use client";

import { useEffect, useState } from "react";
import { favoriteService } from "../services/favoriteService";

export interface UseFavoritesReturn {
  teamIds: string[];
  playerIds: string[];
  mounted: boolean;
  toggleTeam(id: string): void;
  togglePlayer(id: string): void;
}

export function useFavorites(): UseFavoritesReturn {
  const [teamIds,   setTeamIds]   = useState<string[]>([]);
  const [playerIds, setPlayerIds] = useState<string[]>([]);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => {
    setTeamIds(favoriteService.getTeamIds());
    setPlayerIds(favoriteService.getPlayerIds());
    setMounted(true);
  }, []);

  function toggleTeam(id: string): void {
    setTeamIds(favoriteService.toggleTeam(id));
  }

  function togglePlayer(id: string): void {
    setPlayerIds(favoriteService.togglePlayer(id));
  }

  return { teamIds, playerIds, mounted, toggleTeam, togglePlayer };
}
