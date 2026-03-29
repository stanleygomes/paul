import Link from "next/link";

export function AppLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group hover:no-underline px-2"
    >
      <div className="flex h-8 w-8 select-none items-center justify-center rounded-full bg-foreground text-sm font-black text-background">
        D
      </div>
      <span className="text-xl font-black leading-none tracking-tight text-foreground hidden sm:inline">
        Done.
      </span>
    </Link>
  );
}
