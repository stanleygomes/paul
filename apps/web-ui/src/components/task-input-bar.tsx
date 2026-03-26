import { FormEvent, useEffect, KeyboardEvent } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useDebouncedSave } from "../hooks/use-debounced-save";
import { AutoResizeTextarea } from "./auto-resize-textarea";

interface TaskInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function TaskInputBar({ value, onChange, onSubmit }: TaskInputBarProps) {
  const [draft, setDraft, removeDraft] = useLocalStorage("task_draft", "");
  const { saveStatus, save, clear } = useDebouncedSave(600);

  useEffect(() => {
    if (draft && !value) {
      onChange(draft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(newValue: string) {
    onChange(newValue);
    save(() => {
      setDraft(newValue);
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleSubmitAction();
    }
  }

  function handleSubmitAction() {
    clear();
    removeDraft();
    onSubmit();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmitAction();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-[#fef6d9] p-6"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
        <div className="flex overflow-hidden rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <AutoResizeTextarea
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="New task..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-5 py-4 text-sm font-medium outline-none placeholder:text-black/30 max-h-[160px] overflow-y-auto"
          />
          <button
            type="submit"
            className="m-1.5 h-fit rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-80 active:scale-95"
          >
            Add
          </button>
        </div>
        <div className="flex items-center justify-between px-1">
          <p className="w-16 text-xs font-semibold text-black/40 transition-opacity">
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
                ? "Saved ✓"
                : ""}
          </p>
          <p className="text-center text-xs text-black/50">
            Type and press <kbd className="font-semibold">Ctrl + Enter</kbd> to
            add a task
          </p>
          <div className="w-16" />
        </div>
      </div>
    </form>
  );
}
