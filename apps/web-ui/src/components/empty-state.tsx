"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  {
    title: "Wow, you did it!",
    body: "Every task is complete. Enjoy your free time!",
  },
  {
    title: "All caught up!",
    body: "You crushed your to-do list. Time to relax.",
  },
  {
    title: "Zero tasks remaining!",
    body: "Great job tackling everything for today.",
  },
  {
    title: "Nothing to do here!",
    body: "You're an absolute productivity machine.",
  },
  {
    title: "Boom! List cleared.",
    body: "Take a deep breath, smile, and rest up.",
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
    <div className="rounded-base border-2 border-black bg-[#ffe066] p-8 text-center shadow-shadow transition-all">
      <p className="text-xl font-bold">{message.title}</p>
      <p className="mt-2 text-sm font-medium">{message.body}</p>
    </div>
  );
}
