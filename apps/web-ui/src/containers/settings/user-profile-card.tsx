import { useState } from "react";
import type { User } from "@paul/entities";
import { useUser } from "../../modules/user/use-user";
import { useAuth } from "../../modules/auth/use-auth";
import { Check, Pencil, X, LogOut } from "lucide-react";
import { toast } from "@paul/ui";
import { useRouter } from "next/navigation";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const { updateProfile } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initial = (user.name || user.email)?.[0]?.toUpperCase() ?? "?";

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({ name: name.trim() });
      setIsEditing(false);
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name || "");
    setIsEditing(false);
  };

  return (
    <div className="rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-black text-2xl font-black text-[#fef6d9]">
          {initial}
        </div>
        <div className="flex flex-1 flex-col gap-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-base border-2 border-border bg-main px-2 py-1 text-lg font-black focus:outline-none"
                autoFocus
              />
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="rounded-base bg-black p-1.5 text-white hover:bg-black/80"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="rounded-base border-2 border-border bg-main p-1.5 hover:bg-secondary-background"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <p className="text-xl font-black">{user.name || "Sem nome"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-foreground/60 hover:text-foreground"
              >
                <Pencil size={16} />
              </button>
            </div>
          )}
          <p className="text-sm font-medium text-foreground/60">{user.email}</p>
        </div>
      </div>
      <div className="mt-6 border-t-2 border-border pt-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-base border-2 border-border bg-main py-2 text-sm font-bold shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
