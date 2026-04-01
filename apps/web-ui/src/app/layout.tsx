import type { Metadata, Viewport } from "next";
import "@paul/ui/globals.css";
import { Providers } from "./providers";
import MenuRight from "@containers/menu-right";
import MenuLeft from "@containers/menu-left";
import { Suspense } from "react";
import en from "@modules/i18n/locales/en.json";
import { MainWrapper } from "./main-wrapper";

export const metadata: Metadata = {
  title: en.metadata.title,
  description: en.metadata.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Paul",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <Providers>
          <Suspense fallback={null}>
            <MenuRight />
          </Suspense>
          <Suspense fallback={null}>
            <MenuLeft />
          </Suspense>
          <MainWrapper>{children}</MainWrapper>
        </Providers>
      </body>
    </html>
  );
}
