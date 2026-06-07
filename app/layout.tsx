import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SkipLink } from "@/components/SkipLink";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sam Goldsmith — girlsam",
  description: "Frontend / full-stack engineer. Clean, fast, accessible web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SkipLink />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
