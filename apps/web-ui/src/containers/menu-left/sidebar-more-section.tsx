import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StickyNote, Sparkles, Settings, LayoutGrid } from "lucide-react";

interface SidebarMoreSectionProps {
  showProjects?: boolean;
}

export function SidebarMoreSection({ showProjects }: SidebarMoreSectionProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = [
    ...(showProjects
      ? [
          {
            href: "/projects",
            label: t("menu.links.projects"),
            icon: LayoutGrid,
            colorClass: "bg-blue-100 dark:bg-blue-900",
            iconColorClass: "text-blue-600 dark:text-blue-400",
          },
        ]
      : []),
    {
      href: "/memories",
      label: t("sidebar.memories"),
      icon: StickyNote,
      colorClass: "bg-pink-100 dark:bg-pink-900",
      iconColorClass: "text-pink-600 dark:text-pink-400",
    },
    {
      href: "/plan",
      label: t("sidebar.plan_mode"),
      icon: Sparkles,
      colorClass: "bg-purple-100 dark:bg-purple-900",
      iconColorClass: "text-purple-600 dark:text-purple-400",
    },
    {
      href: "/settings",
      label: t("sidebar.settings"),
      icon: Settings,
      colorClass: "bg-gray-100 dark:bg-gray-800",
      iconColorClass: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <section>
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 px-3">
        {t("sidebar.sections.more")}
      </h3>
      <div className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-bold transition-all ${
                isActive
                  ? "bg-main text-main-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black dark:border-white/20"
                  : "text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <div
                className={`p-1 px-1.5 rounded-lg border-2 border-black dark:border-white/20 ${
                  isActive ? "bg-white text-main" : link.colorClass
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-main" : link.iconColorClass
                  }`}
                />
              </div>
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
