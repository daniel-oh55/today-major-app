import type { AppGameStatus } from "@/lib/models/common";

interface GameStatusBadgeProps {
  status: AppGameStatus;
  detail?: string;
}

const STATUS_STYLE: Record<AppGameStatus, string> = {
  live:      "bg-red-500 text-white",
  scheduled: "bg-gray-100 text-gray-600",
  final:     "bg-gray-700 text-white",
  postponed: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-gray-100 text-gray-400",
};

const STATUS_LABEL: Record<AppGameStatus, string> = {
  live:      "LIVE",
  scheduled: "예정",
  final:     "종료",
  postponed: "연기",
  cancelled: "취소",
};

export function GameStatusBadge({ status, detail }: GameStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[status]}`}>
      {status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
      {detail || STATUS_LABEL[status]}
    </span>
  );
}
