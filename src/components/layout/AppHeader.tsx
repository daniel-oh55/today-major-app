import Link from "next/link";

interface AppHeaderProps {
  title?: string;
  backHref?: string;
}

export function AppHeader({ title = "MLB 경기", backHref }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 flex items-center h-12 px-4 gap-3">
      {backHref && (
        <Link href={backHref} className="text-blue-600 text-sm font-medium shrink-0">
          ← 뒤로
        </Link>
      )}
      <h1 className="text-base font-bold text-gray-900 truncate flex-1">{title}</h1>
    </header>
  );
}
