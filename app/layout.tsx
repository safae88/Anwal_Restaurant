import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Playfair_Display } from "next/font/google";
import DepthLight from "./components/DepthLight";
import SmoothScroll from "./components/SmoothScroll";
import SectionNav from "./components/SectionNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anwal — A different way to experience dining",
  description:
    "A cinematic, intimate dining experience. Warm, moody, unhurried — crafted courses served in a space that feels like home, but never ordinary.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <DepthLight />
        <SectionNav />
        {children}
      </body>
    </html>
  );
}
