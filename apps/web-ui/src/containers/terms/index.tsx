import { useTranslation, Trans } from "react-i18next";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function TermsSection({ title, children }: SectionProps) {
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

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background p-6 pt-24 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="inline-block py-3 text-3xl font-black uppercase tracking-tighter text-foreground">
            {t("terms.title")}
          </h1>
          <p className="mt-6 text-sm font-bold text-foreground/60">
            {t("terms.last_updated")}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <TermsSection title={t("terms.sections.acceptance.title")}>
            <p>
              <Trans
                i18nKey="terms.sections.acceptance.p1"
                components={[<strong key="0" className="text-foreground" />]}
              />
            </p>
          </TermsSection>

          <TermsSection title={t("terms.sections.description.title")}>
            <p>{t("terms.sections.description.p1")}</p>
          </TermsSection>

          <TermsSection title={t("terms.sections.responsibilities.title")}>
            <p className="mb-3">{t("terms.sections.responsibilities.p1")}</p>
            <p>{t("terms.sections.responsibilities.p2")}</p>
          </TermsSection>

          <TermsSection title={t("terms.sections.property.title")}>
            <p>{t("terms.sections.property.p1")}</p>
          </TermsSection>

          <TermsSection title={t("terms.sections.liability.title")}>
            <p>{t("terms.sections.liability.p1")}</p>
          </TermsSection>

          <TermsSection title={t("terms.sections.modifications.title")}>
            <p>{t("terms.sections.modifications.p1")}</p>
          </TermsSection>
        </div>

        <div className="mt-16 text-center text-xs font-bold text-foreground/40 pb-20">
          {t("terms.footer")}
        </div>
      </div>
    </div>
  );
}
