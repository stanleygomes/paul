export function SettingsMain({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-8">{children}</div>
    </main>
  );
}
