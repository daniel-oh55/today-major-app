export function LoadingState({ message = "불러오는 중..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 gap-3">
      <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}
