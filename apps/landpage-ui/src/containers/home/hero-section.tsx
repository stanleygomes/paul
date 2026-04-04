import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-secondary-background px-6 pb-24 pt-24 md:pt-24 lg:pb-40 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] border-b-4 border-border">
      <div className="z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block rounded-full border-4 border-border bg-main px-6 py-2 text-sm font-black uppercase tracking-widest text-main-foreground shadow-[4px_4px_0px_0px_var(--border)]"
        >
          {t("landing.hero.framework")}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 break-words text-4xl font-black uppercase tracking-tighter text-foreground sm:text-6xl md:text-8xl lg:text-8xl"
        >
          {t("landing.hero.title_main")}{" "}
          <span className="bg-main px-4 py-2 text-main-foreground shadow-[10px_10px_0px_0px_var(--border)]">
            {t("landing.hero.title_highlight")}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-12 max-w-2xl text-xl font-bold leading-relaxed text-foreground/60 md:text-2xl italic"
        >
          {t("landing.hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
          className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            href={process.env.NEXT_PUBLIC_WEB_UI_URL || "/"}
            className="group flex h-16 w-full items-center justify-center gap-4 rounded-base border-4 border-border bg-main px-12 text-xl font-black uppercase text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none hover:no-underline md:w-auto active:translate-x-2 active:translate-y-2 active:shadow-none"
          >
            {t("landing.hero.cta")}
            <ArrowRightIcon className="h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ x: 100, rotate: 12 }}
        animate={{ x: 0, rotate: -12 }}
        transition={{ duration: 1, delay: 0.8, type: "spring" }}
        className="absolute right-[5%] top-[20%] hidden h-32 w-32 border-8 border-border bg-orange-400 lg:block shadow-shadow"
      ></motion.div>

      <motion.div
        initial={{ x: -100, rotate: -12 }}
        animate={{ x: 0, rotate: 12 }}
        transition={{ duration: 1, delay: 1, type: "spring" }}
        className="absolute left-[5%] bottom-[15%] hidden h-24 w-24 border-4 border-border bg-blue-400 lg:block shadow-shadow"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
        className="absolute right-[10%] bottom-[20%] hidden h-40 w-40 overflow-hidden rounded-base border-4 border-border bg-white lg:block shadow-[10px_10px_0px_0px_var(--border)]"
      >
        <Image
          src="/images/logo-paul.jpg"
          alt="Done Logo"
          fill
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
