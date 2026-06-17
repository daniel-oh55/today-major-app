interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "데이터를 불러올 수 없습니다.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 gap-3 text-center">
      <p className="text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-blue-600 font-medium border border-blue-200 rounded-lg px-4 py-2"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
