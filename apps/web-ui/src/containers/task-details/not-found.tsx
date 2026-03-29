import ErrorPage from "@containers/error";
import { useTranslation } from "react-i18next";

export default function TaskDetailsNotFound() {
  const { t } = useTranslation();

  return (
    <ErrorPage
      title={t("errors.task_not_found.title")}
      description={t("errors.task_not_found.description")}
      buttonText={t("errors.task_not_found.button")}
      buttonHref="/"
    />
  );
}
