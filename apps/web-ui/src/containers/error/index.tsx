import { useTranslation } from "react-i18next";
import Link from "next/link";

interface ErrorPageProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function ErrorPage({
  title,
  description,
  buttonText,
  buttonHref = "/",
}: ErrorPageProps) {
  const { t } = useTranslation();
  const finalButtonText = buttonText || t("errors.not_found.button");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-xl font-bold text-foreground/60 mb-10 max-w-lg">
          {description}
        </p>
      )}
      <Link
        href={buttonHref}
        className="rounded-base border-4 border-border bg-main px-10 py-5 text-2xl font-black shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none"
      >
        {finalButtonText}
      </Link>
    </div>
  );
}
