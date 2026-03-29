import { useTranslation, Trans } from "react-i18next";

interface InputFooterProps {
  saveStatus: string;
}

export function InputFooter({ saveStatus }: InputFooterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-1">
      <p className="w-16 text-xs font-semibold text-foreground/40 transition-opacity">
        {saveStatus === "saving"
          ? t("create_task.status.saving")
          : saveStatus === "saved"
            ? t("create_task.status.saved")
            : ""}
      </p>
      <p className="hidden sm:block text-center text-xs text-foreground/50">
        <Trans i18nKey="create_task.footer.keyboard_hint">
          Type and press <kbd className="font-semibold">Ctrl + Enter</kbd> to
          add a task
        </Trans>
      </p>
      <div className="w-16" />
    </div>
  );
}
