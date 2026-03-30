"use client";

import { useSync } from "@modules/todo/use-sync";
import { Cloud, CloudOff, RefreshCw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export function SyncIndicator() {
  const { isSyncing, lastSyncAt, syncError, performSync } = useSync();

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground mr-4">
      <AnimatePresence mode="wait">
        {isSyncing ? (
          <motion.div
            key="syncing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span className="hidden sm:inline">Syncing...</span>
          </motion.div>
        ) : syncError ? (
          <motion.button
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => performSync()}
            className="flex items-center gap-1.5 text-destructive hover:underline"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync Error</span>
          </motion.button>
        ) : lastSyncAt ? (
          <motion.button
            key="synced"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => performSync()}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            title={`Last sync: ${new Date(lastSyncAt).toLocaleString()}`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              Synced {formatDistanceToNow(lastSyncAt, { addSuffix: true })}
            </span>
          </motion.button>
        ) : (
          <motion.button
            key="offline"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => performSync()}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <CloudOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Not synced</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
