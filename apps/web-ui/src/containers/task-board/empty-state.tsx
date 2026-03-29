"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface EmptyMessage {
  title: string;
  body: string;
  image: string;
}

export function EmptyState() {
  const { t } = useTranslation();
  const [message, setMessage] = useState<EmptyMessage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const messages = t("task_board.empty_state", {
      returnObjects: true,
    }) as Array<{ title: string; body: string }>;

    if (!Array.isArray(messages)) return;

    const randomMsg =
      messages[Math.floor(Math.random() * messages.length)] ?? messages[0];

    if (randomMsg) {
      setMessage({
        title: randomMsg.title,
        body: randomMsg.body,
        image: "/images/cool-1.png",
      });
    }
    setMounted(true);
  }, [t]);

  if (!mounted || !message) return null;

  return (
    <div className="mb-20 mt-10 flex flex-col items-center rounded-base border-2 border-border bg-main px-6 py-8 text-center text-main-foreground shadow-shadow transition-all md:px-8 md:py-12">
      <div className="mb-6 rounded-full border-2 border-border bg-background p-4 text-foreground shadow-shadow">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <p className="text-xl font-bold">{message.title}</p>
      <p className="mt-2 text-sm font-medium opacity-80">{message.body}</p>
    </div>
  );
}
