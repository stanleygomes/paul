import type { Metadata, Viewport } from "next";
import "@paul/ui/globals.css";
import { Providers } from "./providers";
import MenuTop from "@containers/menu-top";
import MenuLeft from "@containers/menu-left";
import { MobileMenu } from "@containers/menu-bottom";
import { Suspense } from "react";
import en from "@modules/i18n/locales/en.json";
import { MainWrapper } from "./main-wrapper";
import { AuthGuard } from "@modules/auth/auth-guard";

export const metadata: Metadata = {
  title: en.metadata.title,
  description: en.metadata.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Paul",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
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
    let theme = localStorage.getItem("app-theme");
    if (theme) {
      theme = theme.replace(/"/g, '');
      if (theme === "auto") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) document.documentElement.classList.add("dark");
      } else if (theme !== "classic") {
        document.documentElement.classList.add(theme);
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
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
          <AuthGuard>
            <Suspense fallback={null}>
              <MenuTop />
            </Suspense>
            <Suspense fallback={null}>
              <MenuLeft />
            </Suspense>
            <Suspense fallback={null}>
              <MobileMenu />
            </Suspense>
            <MainWrapper>{children}</MainWrapper>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
