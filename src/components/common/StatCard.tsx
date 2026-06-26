interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center gap-0.5 min-w-0">
      <span className="text-xs text-gray-500 whitespace-nowrap">{label}</span>
      <span className="text-lg font-bold text-gray-900">{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  );
}
