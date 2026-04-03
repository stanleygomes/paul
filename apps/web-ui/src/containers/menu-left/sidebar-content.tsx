import { useTranslation } from "react-i18next";
import Link from "next/link";
import { LayoutGrid, Menu as MenuIcon } from "lucide-react";
import { Project } from "@paul/entities";
import { useSearchParams } from "next/navigation";
import { SidebarFilters } from "./sidebar-filters";
import { SidebarProjectList } from "./sidebar-project-list";
import { useSidebar } from "src/hooks/use-sidebar";
import { SidebarMoreSection } from "./sidebar-more-section";
import { SyncIndicator } from "../../components/sync-indicator";
import { UserHints } from "../onboarding/user-hints";

interface SidebarContentProps {
  projects: Project[];
}

export function SidebarContent({ projects }: SidebarContentProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { isOpen, setIsOpen, mounted } = useSidebar();

  if (!mounted) return null;

  return (
    <aside
      className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-[#111] border-r-4 border-black dark:border-white/20 z-[60] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b-4 border-black dark:border-white/20 p-4 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors cursor-pointer text-black dark:text-white"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <span className="text-2xl font-black uppercase tracking-tighter italic text-black dark:text-white">
          {t("sidebar.title")}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 h-[calc(100%-80px)]">
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 px-3">
            {t("sidebar.sections.filters")}
          </h3>
          <SidebarFilters
            searchParams={new URLSearchParams(searchParams.toString())}
          />
        </section>

        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 px-3">
            {t("sidebar.sections.projects")}
          </h3>
          <SidebarProjectList
            projects={projects}
            searchParams={new URLSearchParams(searchParams.toString())}
          />
        </section>

        <SidebarMoreSection />

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between px-3 pt-4 border-t-2 border-black/5 dark:border-white/20">
            <SyncIndicator />
            <div className="flex items-center">
              <UserHints />
            </div>
          </div>

          <Link
            href="/projects"
            className="flex items-center justify-center gap-2 w-full bg-[#f0f0f0] dark:bg-[#222] border-2 border-black dark:border-white/20 rounded-xl p-3 text-xs font-black uppercase tracking-widest hover:bg-main hover:text-main-foreground hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all text-black dark:text-white"
          >
            <LayoutGrid className="w-4 h-4" />
            {t("sidebar.buttons.manage_projects")}
          </Link>
        </div>
      </div>
    </aside>
  );
}
