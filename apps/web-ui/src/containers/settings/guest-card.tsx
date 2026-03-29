import { useTranslation } from "react-i18next";
import Link from "next/link";

export function GuestCard() {
  const { t } = useTranslation();

  return (
    <div className="rounded-base border-2 border-border bg-main p-8 text-center shadow-shadow text-main-foreground">
      <p className="text-2xl font-black">{t("settings.guest.title")}</p>
      <p className="mt-3 text-sm font-medium">{t("settings.guest.subtitle")}</p>
      <Link
        href="/login"
        className="mt-6 inline-block rounded-base border-2 border-border bg-black px-6 py-2.5 text-sm font-bold text-[#fef6d9] shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        {t("settings.guest.login_button")}
      </Link>
    </div>
  );
}
