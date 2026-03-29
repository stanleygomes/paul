"use client";

import React from "react";
import EmailForm from "./email-form";
import Link from "next/link";

export default function Login() {
  const handleProceed = (data: { email: string }) => {
    console.log("Sending code to", data.email);
    // Aqui no futuro você integrará com o seu auth-api
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-base">
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <div className="mb-12 flex flex-col items-center gap-6">
          <Link href="/" className="group">
            <div className="flex h-16 w-16 items-center justify-center rounded-base border-4 border-border bg-main text-2xl font-black uppercase text-main-foreground shadow-shadow transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_var(--border)]">
              D.
            </div>
          </Link>
          <h2 className="text-center text-4xl font-black uppercase tracking-tighter text-foreground drop-shadow-sm md:text-5xl">
            Get more Done.
          </h2>
        </div>

        <EmailForm onSubmit={handleProceed} />

        <div className="mt-12 flex gap-6 text-sm font-bold text-foreground/40">
          <Link
            href="/privacy"
            className="hover:text-main underline decoration-2 underline-offset-2"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-main underline decoration-2 underline-offset-2"
          >
            Terms
          </Link>
          <Link
            href="/"
            className="hover:text-main underline decoration-2 underline-offset-2"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="bg-border p-4 text-center text-xs font-black uppercase tracking-wider text-background md:p-6 italic">
        Minimalist Task Management Framework &copy; 2026
      </div>
    </div>
  );
}
