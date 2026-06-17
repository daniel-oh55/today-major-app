import type { AppGameStatus } from "../models/common";

export interface GameStatusDisplay {
  label: string;
  badgeClass: string;
  isLive: boolean;
}

const STATUS_DISPLAY: Record<AppGameStatus, GameStatusDisplay> = {
  scheduled:  { label: "예정",      badgeClass: "bg-gray-100 text-gray-600",          isLive: false },
  pre_game:   { label: "경기 전",   badgeClass: "bg-blue-50 text-blue-600",           isLive: false },
  live:       { label: "진행 중",   badgeClass: "bg-red-500 text-white",              isLive: true  },
  final:      { label: "종료",      badgeClass: "bg-gray-700 text-white",             isLive: false },
  delayed:    { label: "지연",      badgeClass: "bg-yellow-100 text-yellow-700",      isLive: false },
  postponed:  { label: "연기",      badgeClass: "bg-orange-100 text-orange-700",      isLive: false },
  cancelled:  { label: "취소",      badgeClass: "bg-gray-100 text-gray-400",          isLive: false },
  suspended:  { label: "중단",      badgeClass: "bg-purple-100 text-purple-700",      isLive: false },
  unknown:    { label: "확인 필요", badgeClass: "bg-gray-100 text-gray-500",          isLive: false },
};

export function getGameStatusDisplay(status: AppGameStatus): GameStatusDisplay {
  return STATUS_DISPLAY[status] ?? STATUS_DISPLAY["unknown"];
}
