import Link from "next/link";

import { useTranslation } from "react-i18next";

export default function ProjectHeader() {
  const { t } = useTranslation();

  return (
    <div className="py-10">
      <Link
        href="/"
        className="font-bold text-foreground/70 hover:text-foreground"
      >
        ← {t("projects.header.back")}
      </Link>
      <h1 className="text-4xl font-black mt-8">{t("projects.header.title")}</h1>
    </div>
  );
}
