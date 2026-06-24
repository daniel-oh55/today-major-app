import Link from "next/link";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  actionHref?: string;
  actionLabel?: string;
}

export function ErrorState({
  message = "데이터를 불러올 수 없습니다.",
  onRetry,
  actionHref,
  actionLabel,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 gap-4 text-center">
      <p className="text-gray-500">{message}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm text-blue-600 font-medium border border-blue-200 rounded-xl px-5 py-2.5 min-h-[44px] active:bg-blue-50 transition-colors"
          >
            다시 시도
          </button>
        )}
        {actionHref && (
          <Link
            href={actionHref}
            className="text-sm text-gray-600 font-medium border border-gray-200 rounded-xl px-5 py-2.5 min-h-[44px] flex items-center active:bg-gray-50 transition-colors"
          >
            {actionLabel ?? "돌아가기"}
          </Link>
        )}
      </div>
    </div>
  );
}
