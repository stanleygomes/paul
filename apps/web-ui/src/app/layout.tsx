import type { Metadata } from "next";
import "@done/utils/globals.css";
import { Providers } from "./providers";
import Menu from "src/containers/menu";

export const metadata: Metadata = {
  title: "Done.",
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
          <Menu />
          {children}
        </Providers>
      </body>
    </html>
  );
}
