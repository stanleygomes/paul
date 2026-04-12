"use client";

import { useSync } from "@modules/sync/use-sync";
import { Cloud, RefreshCw, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";

export function SyncStatusDetails() {
  const { isSyncing, lastSyncAt, syncError, performSync } = useSync();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-tighter">
        {isSyncing ? (
          <>
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>{t("sync.status.syncing")}</span>
          </>
        ) : syncError ? (
          <>
            <AlertCircle className="w-3 h-3 text-red-500" />
            <span className="text-red-500">{t("sync.status.error")}</span>
          </>
        ) : (
          <>
            <Cloud className="w-3 h-3 text-green-500" />
            <span className="text-green-500">{t("sync.status.synced")}</span>
          </>
        )}
      </div>

      <div className="text-[10px] font-bold text-foreground/60">
        {lastSyncAt ? (
          <>
            {t("sync.last_sync")}:{" "}
            {formatDistanceToNow(lastSyncAt, { addSuffix: true })}
          </>
        ) : (
          <>{t("sync.never_synced")}</>
        )}
      </div>

      {syncError && (
        <div className="text-[10px] text-red-500/80 font-medium leading-tight">
          {syncError}
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          performSync();
        }}
        disabled={isSyncing}
        className="mt-1 w-full py-2 text-[10px] cursor-pointer font-black uppercase bg-black text-white dark:bg-white dark:text-black rounded border border-black dark:border-white hover:bg-black/80 dark:hover:bg-white/80 transition-colors disabled:opacity-50"
      >
        {isSyncing ? t("sync.status.syncing") : t("sync.synchronize_now")}
      </button>
    </div>
  );
}
