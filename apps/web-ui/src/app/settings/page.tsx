"use client";

import Link from "next/link";
import { useUser } from "@modules/user/use-user";
import { UserProfileCard } from "../../components/user-profile-card";
import { GuestCard } from "../../components/guest-card";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-[#fef6d9] pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-bold text-black/50 transition-colors hover:text-black"
        >
          ← Back
        </Link>
        <h1 className="mb-8 text-4xl font-black tracking-tight text-black">
          Settings
        </h1>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-black text-black">Account</h2>
          {user ? <UserProfileCard user={user} /> : <GuestCard />}
        </section>
      </div>
    </main>
  );
}
