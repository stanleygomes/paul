import { useRef } from "react";
import { FormField } from "./form-field";

interface TaskTagsProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@paul/ui/components/ui/tooltip";

export function TaskTags({ tags, onTagsChange }: TaskTagsProps) {
  const { t } = useTranslation();
  const tagInputRef = useRef<HTMLTextAreaElement>(null);

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      e.currentTarget.value = "";
    }
  }

  function removeTag(tagToRemove: string) {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <FormField label={t("task_form.labels.tags")}>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-base border-2 border-border bg-[#cbf0f8] dark:bg-[#cbf0f8]/20 px-2 py-1 text-xs font-bold"
          >
            {tag}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="p-0.5 rounded-full cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  onClick={() => removeTag(tag)}
                  aria-label={t("task_form.aria.remove_tag", { tag })}
                >
                  <X className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {t("task_form.aria.remove_tag", { tag })}
              </TooltipContent>
            </Tooltip>
          </span>
        ))}
      </div>
      <textarea
        ref={tagInputRef}
        placeholder={t("task_form.placeholders.tags")}
        onKeyDown={handleTagKeyDown}
        rows={2}
        className="w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-sm outline-none resize-none"
      />
    </FormField>
  );
}
