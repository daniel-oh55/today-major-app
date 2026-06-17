interface EmptyStateProps {
  message: string;
  sub?: string;
}

export function EmptyState({ message, sub }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <p className="text-gray-400 font-medium">{message}</p>
      {sub && <p className="text-sm text-gray-300 mt-1">{sub}</p>}
    </div>
  );
}
