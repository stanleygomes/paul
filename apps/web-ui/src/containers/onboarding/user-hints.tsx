"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@done/ui/components/ui/dialog";
import { Button } from "@done/ui/components/ui/button";
import { useTranslation } from "react-i18next";
import { HelpCircle, LayoutGrid, Settings, Info, Hand } from "lucide-react";

export function UserHints() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label={t("hints.title")}
          className="cursor-pointer rounded-full p-2 text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-2 border-black dark:border-white/20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
            {t("hints.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <LayoutGrid className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-tight">
                {t("hints.menu_left.title")}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("hints.menu_left.description")}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-tight">
                {t("hints.menu_right.title")}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("hints.menu_right.description")}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <Hand className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-tight">
                {t("hints.task_list.title")}
              </h4>
              <div className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                <p>• {t("hints.task_list.swipe_done")}</p>
                <p>• {t("hints.task_list.swipe_delete")}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-tight">
                {t("hints.task_details.title")}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("hints.task_details.description")}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full h-12 text-base font-black uppercase tracking-widest"
            >
              {t("hints.close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
