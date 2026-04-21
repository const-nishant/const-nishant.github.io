import type { Metadata } from "next";
import { DM_Sans, Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Nishant Patil — Full-Stack Cross-Platform Developer",
  description:
    "Portfolio of Nishant Patil, building cross-platform products across web, desktop, and mobile with React, Rust, Flutter, and TypeScript.",
  metadataBase: new URL("https://const-nishant.github.io"),
  openGraph: {
    title: "Nishant Patil — Full-Stack Cross-Platform Developer",
    description:
      "Building cross-platform products across web, desktop, and mobile.",
    url: "https://const-nishant.github.io",
    siteName: "Nishant Patil",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Patil — Full-Stack Cross-Platform Developer",
    description:
      "Building cross-platform products across web, desktop, and mobile.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${syne.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
