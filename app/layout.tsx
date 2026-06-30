import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Cổng Dịch vụ công",
  description:
    "Cổng Dịch vụ công — Kết nối, cung cấp thông tin và dịch vụ công mọi lúc, mọi nơi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} min-h-screen bg-[#f4f6fb] text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
