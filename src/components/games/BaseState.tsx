import type { AppBaseState } from "@/lib/models/game";

interface BaseStateProps {
  bases: AppBaseState;
  className?: string;
}

export function BaseState({ bases, className = "" }: BaseStateProps) {
  const occupied: string[] = [];
  if (bases.second) occupied.push("2루");
  if (bases.third)  occupied.push("3루");
  if (bases.first)  occupied.push("1루");
  const ariaLabel = occupied.length > 0
    ? `주자: ${occupied.join(", ")}`
    : "주자 없음";

  const on  = "fill-orange-400 stroke-orange-500";
  const off = "fill-gray-100 stroke-gray-300";

  return (
    <div className={`shrink-0 ${className}`} aria-label={ariaLabel}>
      <svg width="60" height="52" viewBox="0 0 60 52" role="img" aria-hidden="true">
        {/* 2루 (위 중앙) */}
        <rect x="20" y="2"  width="18" height="18" transform="rotate(45 29 11)" className={bases.second ? on : off} strokeWidth="1.5" />
        {/* 1루 (오른쪽) */}
        <rect x="36" y="18" width="18" height="18" transform="rotate(45 45 27)" className={bases.first  ? on : off} strokeWidth="1.5" />
        {/* 3루 (왼쪽) */}
        <rect x="4"  y="18" width="18" height="18" transform="rotate(45 13 27)" className={bases.third  ? on : off} strokeWidth="1.5" />
        {/* 홈 (아래, 항상 흰색 오각형) */}
        <polygon points="29,48 23,42 29,36 35,42" className="fill-white stroke-gray-300" strokeWidth="1.5" />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
