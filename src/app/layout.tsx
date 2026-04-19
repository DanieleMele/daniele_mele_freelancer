import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Daniele Mele — Webdesign & Webentwicklung · Schweiz",
  description:
    "Webdesign und Webentwicklung aus der Schweiz. Kostenlose Vorschau Ihrer Website. Festpreis ab CHF 1'000.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: "17px",
          lineHeight: "1.55",
          color: "var(--ink-soft)",
          background: "var(--bg)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
