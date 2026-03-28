"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";

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
    <div className="flex flex-col mt-10 items-center rounded-base mx-20 border-2 border-black bg-[#ffe066] text-center shadow-shadow transition-all">
      {/* <Image
        src={message.image}
        alt={message.title}
        width={300}
        height={300}
        className="w-full object-contain"
      /> */}
      <div className="px-8 py-4">
        <p className="text-xl font-bold">{message.title}</p>
        <p className="mt-2 text-sm font-medium">{message.body}</p>
      </div>
    </div>
  );
}
