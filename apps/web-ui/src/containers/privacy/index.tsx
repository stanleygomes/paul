import { useTranslation, Trans } from "react-i18next";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function PrivacySection({ title, children }: SectionProps) {
  return (
    <section className="mb-5 rounded-base border-2 border-border bg-main p-6">
      <h2 className="mb-3 text-xl font-black uppercase tracking-tight text-main-foreground">
        {title}
      </h2>
      <div className="text-sm font-bold leading-relaxed text-main-foreground/80">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background p-6 pt-24 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="inline-block py-3 text-3xl font-black uppercase tracking-tighter text-foreground">
            {t("privacy.title")}
          </h1>
          <p className="mt-6 text-sm font-bold text-foreground/60">
            {t("privacy.last_updated")}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <PrivacySection title={t("privacy.sections.data_collected.title")}>
            <p className="mb-3">
              <Trans
                i18nKey="privacy.sections.data_collected.p1"
                components={[<strong key="0" className="text-foreground" />]}
              />
            </p>
            <p>{t("privacy.sections.data_collected.p2")}</p>
          </PrivacySection>

          <PrivacySection title={t("privacy.sections.usage.title")}>
            <p>{t("privacy.sections.usage.p1")}</p>
          </PrivacySection>

          <PrivacySection title={t("privacy.sections.storage.title")}>
            <p className="mb-3">{t("privacy.sections.storage.p1")}</p>
            <p>{t("privacy.sections.storage.p2")}</p>
          </PrivacySection>

          <PrivacySection title={t("privacy.sections.sharing.title")}>
            <p>
              <Trans
                i18nKey="privacy.sections.sharing.p1"
                components={[
                  <strong key="0" className="text-foreground text-lg italic" />,
                ]}
              />
            </p>
          </PrivacySection>

          <PrivacySection title={t("privacy.sections.rights.title")}>
            <p>{t("privacy.sections.rights.p1")}</p>
          </PrivacySection>
        </div>

        <div className="mt-16 text-center text-xs font-bold text-foreground/40 pb-20">
          {t("privacy.footer")}
        </div>
      </div>
    </div>
  );
}
