import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileShell } from "@/components/layout/MobileShell";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "오늘의 메이저",
  description: "한국어로 확인하는 미국 프로야구 경기·선수 기록 앱 (비공식 팬앱)",
  manifest: "/manifest.json",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a5f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <MobileShell>
          <AppHeader />
          <main className="flex-1 overflow-y-auto pb-2">{children}</main>
          <BottomNav />
        </MobileShell>
      </body>
    </html>
  );
}
