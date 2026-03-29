"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const AVATARS = [
  "/images/face-cool.png",
  "/images/face-happy.png",
  "/images/face-laugh.png",
  "/images/face-smart.png",
  "/images/face-look.png",
  "/images/face-shocked.png",
  "/images/face-surprised.png",
];

interface UserAvatarProps {
  className?: string;
}

export function UserAvatar({ className }: UserAvatarProps) {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * AVATARS.length);
    const selectedAvatar = AVATARS[randomIndex];
    if (selectedAvatar) {
      setAvatar(selectedAvatar);
    }
  }, []);

  if (!avatar) return null;

  return (
    <Link
      href="/settings"
      className="group flex items-center justify-center rounded-full"
    >
      <div
        className={`relative overflow-hidden rounded-full bg-black transition-all group-hover:scale-110 group-hover:rotate-3 group-active:scale-95 shadow-sm group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] ${className}`}
      >
        <Image
          src={avatar}
          alt={t("common.components.user_avatar.alt")}
          fill
          className="object-cover"
        />
      </div>
    </Link>
  );
}
