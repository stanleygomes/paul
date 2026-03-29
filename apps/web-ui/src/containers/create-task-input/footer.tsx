interface InputFooterProps {
  saveStatus: string;
}

export function InputFooter({ saveStatus }: InputFooterProps) {
  return (
    <div className="flex items-center justify-between px-1">
      <p className="w-16 text-xs font-semibold text-foreground/40 transition-opacity">
        {saveStatus === "saving"
          ? "Saving..."
          : saveStatus === "saved"
            ? "Saved ✓"
            : ""}
      </p>
      <p className="hidden sm:block text-center text-xs text-foreground/50">
        Type and press <kbd className="font-semibold">Ctrl + Enter</kbd> to add
        a task
      </p>
      <div className="w-16" />
    </div>
  );
}
