import type { User } from "@models/user";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const initial = user.name[0]?.toUpperCase() ?? "?";

  return (
    <div className="rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl font-black text-[#fef6d9]">
          {initial}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-black">{user.name}</p>
          <p className="text-sm font-medium text-foreground/60">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
