import Link from "next/link";

interface AppHeaderProps {
  title?: string;
  backHref?: string;
}

export function AppHeader({ title = "오늘의 메이저", backHref }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 flex items-center h-12 px-4 gap-3">
      {backHref && (
        <Link href={backHref} className="text-blue-600 text-sm font-medium shrink-0 min-h-[44px] flex items-center">
          ← 뒤로
        </Link>
      )}
      <h1 className="text-base font-bold text-gray-900 truncate flex-1">{title}</h1>
    </header>
  );
}
