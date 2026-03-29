interface ZenNotesProps {
  notes?: string;
}

export function ZenNotes({ notes }: ZenNotesProps) {
  if (!notes) return null;

  return (
    <div className="w-full rounded-base border-4 border-border bg-secondary-background p-6 shadow-shadow">
      <h3 className="font-black text-xl mb-3 border-b-2 border-border pb-2 text-foreground">
        Notes
      </h3>
      <p className="whitespace-pre-wrap font-bold text-foreground/60 text-lg">
        {notes}
      </p>
    </div>
  );
}
