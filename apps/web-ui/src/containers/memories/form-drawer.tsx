"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@paul/ui";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface MemoryFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, color?: string) => void;
  initialContent: string;
  initialColor?: string;
  title: string;
  memoryId?: string;
}

import { useLocalStorage } from "usehooks-ts";
import { useDebouncedSave } from "../../hooks/use-debounced-save";
import { PROJECT_COLORS } from "../../constants/project-colors";

export function MemoryFormDrawer({
  isOpen,
  onClose,
  onSubmit,
  initialContent,
  initialColor,
  title,
  memoryId = "new",
}: MemoryFormDrawerProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState(initialContent);
  const [color, setColor] = useState<string | undefined>(initialColor);
  const [draft, setDraft, removeDraft] = useLocalStorage<{
    content: string;
    color?: string;
  }>(`memory_draft_${memoryId}_v2`, { content: "", color: undefined });
  const { saveStatus, save, clear } = useDebouncedSave(600);

  useEffect(() => {
    if (isOpen) {
      if (
        draft &&
        (draft.content !== initialContent || draft.color !== initialColor) &&
        (draft.content || draft.color)
      ) {
        setContent(draft.content || initialContent);
        setColor(draft.color || initialColor);
      } else {
        setContent(initialContent);
        setColor(initialColor);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialContent, initialColor, memoryId]);

  const handleChange = (newVal: string) => {
    const limitedVal = newVal.slice(0, 5000);
    setContent(limitedVal);
    save(() => {
      setDraft({ content: limitedVal, color });
    });
  };

  const handleColorChange = (newColor: string | undefined) => {
    setColor(newColor);
    save(() => {
      setDraft({ content, color: newColor });
    });
  };

  const clearDraftAndClose = () => {
    clear();
    removeDraft();
    setContent("");
    setColor(undefined);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      clear();
      removeDraft();
      onSubmit(content, color);
      setContent("");
      setColor(undefined);
    }
  };

  const CHAR_LIMIT = 5000; // Large limit for notes

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="bottom">
      <DrawerContent className="bg-background border-t-2 border-border rounded-t-[30px] p-6 pb-12 max-w-4xl mx-auto shadow-2xl dark:shadow-white/5">
        <DrawerHeader className="px-6 pb-4 pt-2 text-left shrink-0">
          <DrawerTitle className="text-3xl font-black uppercase tracking-tighter italic">
            {title}
          </DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="px-6 space-y-6">
          <div className="relative">
            <textarea
              autoFocus
              value={content}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={t("memories.placeholder")}
              className="w-full h-64 bg-[#f0f0f0] dark:bg-[#1a1a1a] border-4 border-black dark:border-white/10 rounded-2xl p-6 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-main focus:border-main transition-all resize-none text-black dark:text-white"
            />
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1 pointer-events-none">
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${content.length > CHAR_LIMIT * 0.9 ? "text-red-500" : "text-foreground/40"}`}
              >
                {t("memories.char_limit", {
                  current: content.length,
                  limit: CHAR_LIMIT,
                })}
              </span>
              {saveStatus && (
                <span className="text-[9px] font-black uppercase tracking-widest text-green-600 dark:text-green-400 transition-all animate-pulse">
                  {saveStatus === "saving"
                    ? "Saving draft..."
                    : "Draft saved ✓"}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-foreground/40 px-1">
              Note Color
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleColorChange(undefined)}
                className={`w-10 h-10 rounded-xl border-4 cursor-pointer transition-all flex items-center justify-center bg-[#eee] dark:bg-[#222] ${!color ? "border-black dark:border-white shadow-md" : "border-transparent hover:border-black/20"}`}
                title="Default theme"
              >
                <div className="w-4 h-4 border-2 border-foreground/20 rounded-full" />
              </button>
              {PROJECT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleColorChange(c)}
                  className={`w-10 h-10 rounded-xl border-4 cursor-pointer transition-all ${color === c ? "border-black dark:border-white shadow-md" : "border-transparent hover:border-black/20"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={clearDraftAndClose}
              className="flex-1 bg-[#eee] dark:bg-[#222] text-foreground/60 border-2 border-black/5 dark:border-white/10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#e0e0e0] dark:hover:bg-[#333] transition-all cursor-pointer"
            >
              {t("memories.cancel")}
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className="flex-1 bg-main text-main-foreground border-4 border-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none transition-all cursor-pointer"
            >
              {t("memories.save")}
            </button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
