import { useRef, useState, useCallback, useEffect } from "react";

export function useDebouncedSave(delay = 600) {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    (callback: () => void) => {
      setSaveStatus("saving");

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        callback();
        setSaveStatus("saved");

        if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
        statusTimerRef.current = setTimeout(() => setSaveStatus("idle"), 2000);
      }, delay);
    },
    [delay],
  );

  const flush = useCallback((callback: () => void) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
      callback();
    }
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setSaveStatus("idle");
  }, []);

  const clear = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setSaveStatus("idle");
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  return { saveStatus, save, flush, clear };
}
