"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const MESSAGES = [
  {
    title: "Wow, you did it!",
    body: "Every task is complete. Enjoy your free time!",
    image: "/images/cool-1.png",
  },
  {
    title: "All caught up!",
    body: "You crushed your to-do list. Time to relax.",
    image: "/images/cool-1.png",
  },
  {
    title: "Zero tasks remaining!",
    body: "Great job tackling everything for today.",
    image: "/images/cool-1.png",
  },
  {
    title: "Nothing to do here!",
    body: "You're an absolute productivity machine.",
    image: "/images/cool-1.png",
  },
  {
    title: "Boom! List cleared.",
    body: "Take a deep breath, smile, and rest up.",
    image: "/images/cool-1.png",
  },
];

export function EmptyState() {
  const [message, setMessage] = useState(MESSAGES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const randomMsg =
      MESSAGES[Math.floor(Math.random() * MESSAGES.length)] ?? MESSAGES[0];
    setMessage(randomMsg);
    setMounted(true);
  }, []);

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
