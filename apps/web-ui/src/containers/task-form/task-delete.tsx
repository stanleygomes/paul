import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@paul/ui/components/ui/alert-dialog";

interface TaskDeleteProps {
  onDelete: () => void;
  onRestore?: () => void;
  isRecentlyDeleted?: boolean;
}

export function TaskDelete({
  onDelete,
  onRestore,
  isRecentlyDeleted,
}: TaskDeleteProps) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleClick() {
    if (isRecentlyDeleted) {
      setShowConfirm(true);
    } else {
      onDelete();
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      {isRecentlyDeleted && onRestore && (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-border bg-main py-3 text-base font-bold text-main-foreground transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-main/90 shadow-shadow cursor-pointer"
          onClick={onRestore}
        >
          <RotateCcw className="h-5 w-5" />{" "}
          {t("task_form.buttons.restore_task")}
        </button>
      )}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 py-3 text-base font-bold transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#ff7597] dark:hover:bg-[#ff7597]/30 shadow-shadow cursor-pointer"
        onClick={handleClick}
      >
        <Trash2 className="h-5 w-5" /> {t("task_form.buttons.delete_task")}
      </button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("task_item.delete_confirm.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("task_item.delete_confirm.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("task_item.delete_confirm.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {t("task_item.delete_confirm.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
