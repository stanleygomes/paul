import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-secondary-background px-6 pb-24 pt-24 md:pt-24 lg:pb-40 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] border-b-4 border-border">
      <div className="z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-block rounded-full border-4 border-border bg-main px-6 py-2 text-sm font-black uppercase tracking-widest text-main-foreground shadow-[4px_4px_0px_0px_var(--border)]">
          Focused Work Framework
        </div>
        <h1 className="mb-8 text-6xl font-black uppercase tracking-tighter text-foreground md:text-8xl lg:text-8xl">
          Focus on what{" "}
          <span className="bg-main px-4 py-2 text-main-foreground shadow-[10px_10px_0px_0px_var(--border)]">
            Matters.
          </span>
        </h1>
        <p className="mx-auto mt-12 max-w-2xl text-xl font-bold leading-relaxed text-foreground/60 md:text-2xl italic italic">
          Done. is the minimalist task manager designed to clear your head and
          amplify your focus. No clutter, just your list.
        </p>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/login"
            className="group flex h-16 w-full items-center justify-center gap-4 rounded-base border-4 border-border bg-main px-12 text-xl font-black uppercase text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none hover:no-underline md:w-auto active:translate-x-2 active:translate-y-2 active:shadow-none"
          >
            Get Started for free
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>

      <div className="absolute right-[5%] top-[20%] hidden h-32 w-32 -rotate-12 border-8 border-border bg-orange-400 lg:block shadow-shadow"></div>
      <div className="absolute left-[5%] bottom-[15%] hidden h-24 w-24 rotate-12 border-4 border-border bg-blue-400 lg:block shadow-shadow"></div>
    </section>
  );
}
