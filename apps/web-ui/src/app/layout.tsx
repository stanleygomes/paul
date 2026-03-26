import type { Metadata } from "next";
import "@done/utils/globals.css";
import { UserAvatar } from "../components/user-avatar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Todo Tasks",
  description: "Minimal todo task page",
};

const themeScript = `
  try {
    const theme = localStorage.getItem("done-theme");
    if (theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="fixed right-4 top-4 z-50">
            <UserAvatar />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
