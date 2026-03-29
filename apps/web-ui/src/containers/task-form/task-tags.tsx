import { useRef } from "react";
import { FormField } from "./form-field";

interface TaskTagsProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TaskTags({ tags, onTagsChange }: TaskTagsProps) {
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
    <FormField label="Tags">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-base border-2 border-border bg-[#cbf0f8] dark:bg-[#cbf0f8]/20 px-2 py-1 text-xs font-bold"
          >
            {tag}
            <button
              type="button"
              className="hover:text-red-500"
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <textarea
        ref={tagInputRef}
        placeholder="Add tag (press Enter or comma)"
        onKeyDown={handleTagKeyDown}
        rows={2}
        className="w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-sm outline-none resize-none"
      />
    </FormField>
  );
}
