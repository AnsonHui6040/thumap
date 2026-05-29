import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "校園室內地圖導航系統",
  description: "校園室內導航 MVP 的基礎版本。",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
