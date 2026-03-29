import Link from "next/link";

export function GuestCard() {
  return (
    <div className="rounded-base border-2 border-border bg-main p-8 text-center shadow-shadow text-main-foreground">
      <p className="text-2xl font-black">You&apos;re browsing as a guest</p>
      <p className="mt-3 text-sm font-medium">
        Log in to sync your tasks, access your history, and enjoy all the
        benefits.
      </p>
      <Link
        href="/login"
        className="mt-6 inline-block rounded-base border-2 border-border bg-black px-6 py-2.5 text-sm font-bold text-[#fef6d9] shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        Log in
      </Link>
    </div>
  );
}
