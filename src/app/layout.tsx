import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileShell } from "@/components/layout/MobileShell";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "MLB 경기 정보",
  description: "미국 프로야구(MLB) 경기 일정, 스코어, 선수 기록을 확인하세요. 비공식 앱입니다.",
  manifest: "/manifest.json",
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
