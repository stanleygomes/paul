import React from "react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-border p-8 border-t-4 border-black">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-base border-4 border-background bg-main text-xl font-black text-main-foreground italic">
          D.
        </div>
        <div className="flex gap-8 text-sm font-black uppercase text-background">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </div>
        <p className="text-xs font-black text-background/60">
          © 2026 DONE. APPLICATION
        </p>
      </div>
    </footer>
  );
}
