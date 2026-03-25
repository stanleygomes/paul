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
      className="fixed bottom-0 left-0 right-0 border-t-2 border-black bg-[#ffd670] p-4"
    >
      <div className="mx-auto flex w-full max-w-2xl gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Create a new task..."
          className="flex-1 rounded-base border-2 border-black bg-white px-4 py-3 text-sm font-medium outline-none"
        />
        <button
          type="submit"
          className="rounded-base border-2 border-black bg-[#00f5d4] px-5 py-3 text-sm font-bold shadow-shadow"
        >
          Add
        </button>
      </div>
    </form>
  );
}
