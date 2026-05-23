import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSN Group - Enterprise TV Monitoring",
  description: "Dashboard monitoring enterprise untuk DSN Group Wood Product Division.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body>{children}</body>
    </html>
  );
}
