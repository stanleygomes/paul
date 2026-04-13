import { DrawerHeader } from "@paul/ui";
import { Rocket, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AutoResizeTextarea } from "@components/auto-resize-textarea";
import { TaskDatePicker as DatePicker } from "@components/task-date-picker";
import { TaskProjectSelector as ProjectSelector } from "@components/task-project-selector";
import { TaskTimeInput as TimeInput } from "@components/task-time-input";
import { useProjects } from "../../modules/project/use-projects";

interface CreateTaskMobileProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isImportant: boolean;
  onImportantToggle: () => void;
  dueDateStr: string;
  onDueDateChange: (date: string) => void;
  dueTime: string;
  onDueTimeChange: (time: string) => void;
  selectedProjectId: string;
  onProjectIdChange: (id: string) => void;
  currentProjectId?: string | null;
  saveStatus: string;
}

export function CreateTaskMobile({
  value,
  onChange,
  onSubmit,
  isImportant,
  onImportantToggle,
  dueDateStr,
  onDueDateChange,
  dueTime,
  onDueTimeChange,
  selectedProjectId,
  onProjectIdChange,
  currentProjectId,
  saveStatus,
}: CreateTaskMobileProps) {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const hasProjects = projects.length > 0;

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden overscroll-none">
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted flex-shrink-0" />

      <DrawerHeader className="px-6 pb-2 pt-6 text-left shrink-0">
        {/* <DrawerTitle className="text-3xl font-black uppercase tracking-tighter">
          {t("actions.create_task")}
        </DrawerTitle> */}
      </DrawerHeader>

      <div className="px-6 pt-2 pb-6 overflow-y-auto no-scrollbar flex-1">
        <div className="mb-8">
          {/* <label className="block font-black uppercase tracking-wider mb-2 text-sm text-foreground/60">
            {t("projects.form.name_label")}
          </label> */}
          <div className="w-full bg-secondary-background border-2 border-border rounded-xl px-5 py-6 flex items-center focus-within:ring-4 focus-within:ring-main/20 transition-all shadow-sm">
            <AutoResizeTextarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-xl font-bold text-foreground focus:outline-none placeholder:text-foreground/20 resize-none no-scrollbar flex items-center"
              placeholder={t("create_task.placeholder")}
              rows={1}
              autoFocus
            />
          </div>
        </div>

        {/* Project Selection */}
        {!currentProjectId && hasProjects && (
          <div className="mb-8">
            <label className="block font-black uppercase tracking-wider mb-2 text-sm text-foreground/60">
              {t("task_form.labels.project")}
            </label>
            <ProjectSelector
              value={selectedProjectId}
              onChange={onProjectIdChange}
              isVisible={true}
              className="w-full bg-secondary-background border-2 border-border rounded-xl px-4 py-6 !h-auto text-lg font-bold flex justify-between shadow-sm"
            />
          </div>
        )}

        {/* Date and Time */}
        <div className="mb-8">
          <label className="block font-black uppercase tracking-wider mb-2 text-sm text-foreground/60">
            {t("task_form.labels.due_date")}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              dueDateStr={dueDateStr}
              onDateChange={onDueDateChange}
              className="w-full bg-secondary-background border-2 border-border rounded-xl px-4 py-6 !h-auto text-lg font-bold flex justify-center shadow-sm"
            />
            <TimeInput
              value={dueTime}
              onChange={onDueTimeChange}
              className="w-full bg-secondary-background border-2 border-border rounded-xl px-4 py-6 !h-auto text-lg font-bold flex justify-center shadow-sm"
            />
          </div>
        </div>

        {/* Priority/Importance */}
        <div className="mb-10">
          <label className="block font-black uppercase tracking-wider mb-2 text-sm text-foreground/60">
            {t("task_form.labels.is_important")}
          </label>
          <button
            type="button"
            onClick={onImportantToggle}
            className={`w-full flex items-center justify-center gap-3 py-6 rounded-xl border-2 border-border font-black text-lg transition-all shadow-sm ${
              isImportant
                ? "bg-[#fef08a] text-foreground border-border"
                : "bg-secondary-background text-foreground/60"
            }`}
          >
            <Star className={isImportant ? "fill-current" : ""} />
            {isImportant
              ? t("task_form.buttons.important")
              : t("task_form.buttons.unimportant")}
          </button>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="p-6 pt-2 bg-background border-t-2 border-border/5 shrink-0">
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="w-full bg-main text-main-foreground border-2 border-border py-5 rounded-xl font-black text-xl uppercase tracking-tighter shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex items-center justify-center gap-3">
            {t("create_task.add_button")}
            <Rocket className="h-6 w-6 group-hover:animate-bounce" />
          </div>
        </button>

        {saveStatus && (
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-foreground/40">
            {saveStatus === "saving"
              ? t("create_task.status.saving")
              : t("create_task.status.saved")}
          </p>
        )}
      </div>
    </div>
  );
}
