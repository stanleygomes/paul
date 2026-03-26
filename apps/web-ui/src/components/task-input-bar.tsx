import { FormEvent } from "react";

interface TaskInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function TaskInputBar({ value, onChange, onSubmit }: TaskInputBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-[#fef6d9] p-6"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
        <div className="flex overflow-hidden rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="New task..."
            className="flex-1 bg-transparent px-5 py-4 text-sm font-medium outline-none placeholder:text-black/30"
          />
          <button
            type="submit"
            className="m-1.5 rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-80"
          >
            Add
          </button>
        </div>
        <p className="text-center text-xs text-black/50 mt-3">
          Type and press <kbd className="font-semibold">Enter</kbd> to add a
          task
        </p>
      </div>
    </form>
  );
}
