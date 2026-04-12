import { useTranslation } from "react-i18next";
import Link from "next/link";
import { SimpleCard } from "src/components/simple-card";
import { Typography } from "src/components/typography";
import { Button } from "src/components/button";

export function GuestCard() {
  const { t } = useTranslation();

  return (
    <SimpleCard className="bg-main p-8 text-center !shadow-shadow border-black">
      <Typography variant="h2" className="text-black">
        {t("settings.guest.title")}
      </Typography>
      <Typography variant="p" className="mt-3 font-bold text-black/80">
        {t("settings.guest.subtitle")}
      </Typography>
      <Link href="/login" className="mt-6 block no-underline">
        <Button className="w-full bg-black text-white hover:bg-black/90 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {t("settings.guest.login_button")}
        </Button>
      </Link>
    </SimpleCard>
  );
}
