import type { AppGameStatus } from "@/lib/models/common";
import { getGameStatusDisplay } from "@/lib/utils/formatGameStatus";

interface GameStatusBadgeProps {
  status: AppGameStatus;
  detail?: string;
}

export function GameStatusBadge({ status, detail }: GameStatusBadgeProps) {
  const { label, badgeClass, isLive } = getGameStatusDisplay(status);
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}
    >
      {isLive && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
      )}
      {detail ?? label}
    </span>
  );
}
