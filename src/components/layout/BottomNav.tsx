"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "경기", icon: "⚾" },
  { href: "/players", label: "선수", icon: "👤" },
  { href: "/favorites", label: "즐겨찾기", icon: "⭐" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-200 flex z-30">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex-1 flex flex-col items-center py-2 text-xs font-medium gap-0.5 ${active ? "text-blue-600" : "text-gray-500"}`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
