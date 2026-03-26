import type { Metadata } from "next";
import "@done/utils/globals.css";
import { UserAvatar } from "../components/user-avatar";

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
      <body className="antialiased">
        <div className="fixed right-4 top-4 z-50">
          <UserAvatar />
        </div>
        {children}
      </body>
    </html>
  );
}
