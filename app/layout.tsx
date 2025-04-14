// app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbit Patrimoine",
  description: "Assistant conversationnel pour investisseurs immobiliers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}