"use client";

import { useSync } from "@modules/sync/use-sync";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, Cloud, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@components/button";
import { Typography } from "@components/typography";

function getSyncStatusInfo(isSyncing: boolean, hasError: boolean) {
  if (isSyncing) {
    return {
      icon: RefreshCw,
      labelKey: "sync.status.syncing",
      color: "",
      iconClass: "animate-spin",
    };
  }

  if (hasError) {
    return {
      icon: AlertCircle,
      labelKey: "sync.status.error",
      color: "text-red-500",
      iconClass: "",
    };
  }

  return {
    icon: Cloud,
    labelKey: "sync.status.synced",
    color: "text-green-500",
    iconClass: "",
  };
}

export function SyncStatusDetails() {
  const { isSyncing, lastSyncAt, syncError, performSync } = useSync();
  const { t } = useTranslation();

  const statusInfo = getSyncStatusInfo(isSyncing, !!syncError);
  const StatusIcon = statusInfo.icon;

  const getSyncMessage = () => {
    if (!lastSyncAt) return t("sync.never_synced");

    return `${t("sync.last_sync")}: ${formatDistanceToNow(lastSyncAt, {
      addSuffix: true,
    })}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <StatusIcon
          className={`h-3 w-3 ${statusInfo.color} ${statusInfo.iconClass}`}
        />
        <Typography
          variant="small"
          className={`font-black uppercase ${statusInfo.color}`}
        >
          {t(statusInfo.labelKey)}
        </Typography>
      </div>

      <Typography variant="small" className="text-[10px] text-foreground/60">
        {getSyncMessage()}
      </Typography>

      {syncError && (
        <Typography
          variant="small"
          className="text-[10px] text-red-500/80 leading-tight"
        >
          {syncError}
        </Typography>
      )}

      <Button
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          performSync();
        }}
        disabled={isSyncing}
        className="mt-1 !p-2 !text-[10px]"
      >
        {isSyncing ? t("sync.status.syncing") : t("sync.synchronize_now")}
      </Button>
    </div>
  );
}
