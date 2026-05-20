import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: "واحد نظارت گازرسانی — سازمان نظام مهندسی ساختمان استان کردستان",
    template: "%s | واحد نظارت گازرسانی کردستان",
  },
  description:
    "سامانه یکپارچه مدیریت، نظارت و هماهنگی پروژه‌های گازرسانی — سازمان نظام مهندسی ساختمان استان کردستان",
  keywords: ["نظام مهندسی کردستان", "نظارت گازرسانی", "تعرفه گاز", "گاز فشار ضعیف", "کنتور گاز"],
  openGraph: {
    locale: "fa_IR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head />
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-600 focus:text-white"
        >
          رفتن به محتوای اصلی
        </a>
        <NextTopLoader
          color="#059669"
          initialPosition={0.1}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner={false}
          easing="ease"
          speed={300}
          shadow="0 0 10px #059669, 0 0 5px #10B981"
          zIndex={9999}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
