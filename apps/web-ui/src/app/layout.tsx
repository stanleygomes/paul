import type { Metadata } from "next";
import "@done/utils/globals.css";

export const metadata: Metadata = {
  title: "Todo Tasks",
  description: "Minimal todo task page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
