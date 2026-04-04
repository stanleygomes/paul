"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { useAuth } from "@modules/auth/use-auth";
import { syncApiService } from "./sync-api.service";
import { SyncManager } from "./sync-manager";
import type { Task, Project, Memory } from "@paul/entities";

export interface SyncContextType {
  isSyncing: boolean;
  lastSyncAt: number | null;
  syncError: string | null;
  performSync: () => Promise<void>;
}

export const SyncContext = createContext<SyncContextType | null>(null);

export function SyncProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-tasks", []);
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "todo-projects",
    [],
  );
  const [memories, setMemories] = useLocalStorage<Memory[]>(
    "todo-memories",
    [],
  );
  const [lastSyncAt, setLastSyncAt] = useLocalStorage<number | null>(
    "app-ast-sync-at",
    null,
  );

  const [isSyncing, setIsSyncing] = useState(false);
  const isSyncingRef = useRef(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const tasksRef = useRef(tasks);
  const projectsRef = useRef(projects);
  const memoriesRef = useRef(memories);
  tasksRef.current = tasks;
  projectsRef.current = projects;
  memoriesRef.current = memories;

  const performSync = useCallback(async () => {
    if (!token || isSyncingRef.current) return;

    try {
      isSyncingRef.current = true;
      setIsSyncing(true);
      setSyncError(null);

      const response = await syncApiService.syncTasksAndProjects(
        token,
        tasksRef.current,
        projectsRef.current,
        memoriesRef.current,
      );

      const updatedTasks = SyncManager.mergeTasks(
        tasksRef.current,
        response.tasksToUpdate || [],
      );
      const updatedProjects = SyncManager.mergeProjects(
        projectsRef.current,
        response.projectsToUpdate || [],
      );
      const updatedMemories = SyncManager.mergeMemories(
        memoriesRef.current,
        response.memoriesToUpdate || [],
      );

      setTasks(updatedTasks);
      setProjects(updatedProjects);
      setMemories(updatedMemories);
      setLastSyncAt(Date.now());
    } catch (err: any) {
      console.error("Sync failed", err);
      const status = err.response?.status;
      const message =
        err.response?.data?.message || err.message || "Sync failed";

      if (status === 401) {
        setSyncError("Session expired. Please login again.");
      } else {
        setSyncError(message);
      }
    } finally {
      isSyncingRef.current = false;
      setIsSyncing(false);
    }
  }, [token, setLastSyncAt, setProjects, setTasks, setMemories]);

  const hasSyncedRef = useRef(false);

  // Initial sync on login
  useEffect(() => {
    if (isAuthenticated && token && !isSyncing && !hasSyncedRef.current) {
      performSync();
      hasSyncedRef.current = true;
    }
  }, [isAuthenticated, token, isSyncing, performSync]);

  // Periodic sync
  useEffect(() => {
    if (!token) {
      hasSyncedRef.current = false;
      return;
    }

    const interval = setInterval(
      () => {
        if (!document.hidden && !isSyncing) {
          performSync();
        }
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [token, performSync, isSyncing]);

  return (
    <SyncContext.Provider
      value={{
        isSyncing,
        lastSyncAt,
        syncError,
        performSync,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}
