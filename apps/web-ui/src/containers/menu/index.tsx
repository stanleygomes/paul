import { UserAvatar } from "../../components/user-avatar";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border-2 border-black shadow-sm">
      <Link
        href="/"
        className="font-bold text-gray-700 hover:text-black transition-colors"
      >
        Tasks
      </Link>
      <Link
        href="/projects"
        className="font-bold text-gray-700 hover:text-black transition-colors"
      >
        Projects
      </Link>
      <UserAvatar />
    </div>
  );
}
