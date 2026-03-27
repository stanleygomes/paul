"use client";

import Link from "next/link";
import { useUser } from "@modules/user/use-user";
import { UserProfileCard } from "../../components/user-profile-card";
import { GuestCard } from "../../components/guest-card";
import { ThemeSelector } from "../../components/theme-selector";

export default function Settings() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-bold text-foreground/50 transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
        <h1 className="mb-8 text-4xl font-black tracking-tight text-foreground">
          Settings
        </h1>

        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">Account</h2>
            {user ? <UserProfileCard user={user} /> : <GuestCard />}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">Theme</h2>
            <ThemeSelector />
          </section>
        </div>
      </div>
    </main>
  );
}
