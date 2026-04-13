import { FormEvent, useEffect, KeyboardEvent, useState, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useDebouncedSave } from "../../modules/create-task/use-debounced-save";
import { Task } from "@paul/entities";
import { TaskDatePicker as DatePicker } from "@components/task-date-picker";
import { TaskProjectSelector as ProjectSelector } from "@components/task-project-selector";
import { TaskImportantToggle as ImportantToggle } from "@components/task-important-toggle";
import { TaskTimeInput as TimeInput } from "@components/task-time-input";
import { useSidebar } from "../../modules/menu-layout/use-sidebar";
import { InputField } from "./input-field";
import { InputFooter } from "./footer";
import { CreateTaskMobile } from "./mobile";

interface CreateTaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (additionalProps?: Partial<Task>) => void;
  currentProjectId?: string | null;
  mode?: "default" | "drawer";
  onClose?: () => void;
}

export function CreateTaskInput({
  value,
  onChange,
  onSubmit,
  currentProjectId,
  mode = "default",
  onClose,
}: CreateTaskInputProps) {
  const { isOpen, mounted } = useSidebar();
  const [draft, setDraft, removeDraft] = useLocalStorage("task_draft", "");
  const { saveStatus, save, clear } = useDebouncedSave(600);

  const [isImportant, setIsImportant] = useState(false);
  const [dueDateStr, setDueDateStr] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("none");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (draft && !value) {
      onChange(draft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mode === "drawer") {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      if (typeof window !== "undefined" && window.innerWidth >= 640) {
        inputRef.current?.focus();
      }
    }
  }, [mode]);

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
    if (!value.trim()) return;

    clear();
    removeDraft();
    onSubmit({
      important: isImportant,
      dueDate: dueDateStr,
      dueTime,
      projectId: selectedProjectId !== "none" ? selectedProjectId : undefined,
    });
    setIsImportant(false);
    setDueDateStr("");
    setDueTime("");
    setSelectedProjectId("none");
    onClose?.();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmitAction();
  }

  const isDrawer = mode === "drawer";

  if (isDrawer) {
    return (
      <CreateTaskMobile
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmitAction}
        isImportant={isImportant}
        onImportantToggle={() => setIsImportant(!isImportant)}
        dueDateStr={dueDateStr}
        onDueDateChange={setDueDateStr}
        dueTime={dueTime}
        onDueTimeChange={setDueTime}
        selectedProjectId={selectedProjectId}
        onProjectIdChange={setSelectedProjectId}
        currentProjectId={currentProjectId}
        saveStatus={saveStatus}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`fixed bottom-0 left-0 right-0 z-40 bg-background p-4 transition-all duration-300 hidden sm:block ${
        mounted && isOpen ? "pl-0 lg:pl-76" : "pl-4"
      }`}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-border bg-secondary-background shadow-[4px_4px_0px_0px_var(--border)] transition-all">
          <InputField
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-t-2 border-border/50 bg-secondary-background/50 px-3 py-2 text-sm z-0">
            <ImportantToggle
              isImportant={isImportant}
              onToggle={() => setIsImportant(!isImportant)}
              className="shrink-0"
            />

            <DatePicker
              dueDateStr={dueDateStr}
              onDateChange={setDueDateStr}
              className="shrink-0 bg-secondary-background"
            />

            <TimeInput
              value={dueTime}
              onChange={setDueTime}
              className="shrink-0 bg-secondary-background"
            />

            <ProjectSelector
              value={selectedProjectId}
              onChange={setSelectedProjectId}
              isVisible={!currentProjectId}
              className="shrink-0 bg-secondary-background sm:w-40"
            />
          </div>
        </div>
        <InputFooter saveStatus={saveStatus} />
      </div>
    </form>
  );
}
