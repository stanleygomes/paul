"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-expect-error - Module declaration for resolvers/zod may be missing or hard to resolve
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@done/ui/components/ui/icon";
import { Button } from "@done/ui/components/ui/button";
import { Input } from "@done/ui/components/ui/input";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@done/ui/components/ui/card";

const emailSchema = z.object({
  email: z.string().email("invalid_email"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<EmailFormData>({
    mode: "onChange",
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <Card className="w-full max-w-lg rounded-base border-4 border-border bg-secondary-background p-4 shadow-[10px_10px_0px_0px_var(--border)] md:p-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-black uppercase tracking-tighter text-foreground flex flex-col gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-base border-4 border-border bg-main text-main-foreground shadow-shadow">
            <Icon icon="solar:check-read-linear" className="h-8 w-8" />
          </div>
          <div>{t("login.form.title")}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <form id="email-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-sm font-bold text-foreground/60 mb-1 uppercase tracking-wider">
                {t("login.form.email_label")}
              </p>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder={t("login.form.email_placeholder")}
                className="h-12 rounded-base border-2 border-border bg-background px-4 font-bold ring-offset-background placeholder:text-foreground/30 focus-visible:ring-2 focus-visible:ring-main"
                required
              />
              {errors.email && (
                <p className="text-xs font-black text-red-500 uppercase mt-1 italic">
                  {t(`login.form.errors.${errors.email.message}`)}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4 mt-4">
        <Button
          type="submit"
          form="email-form"
          disabled={!isValid}
          className="h-14 w-full rounded-base border-2 border-border bg-main text-lg font-black uppercase text-main-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/90"
        >
          {t("login.form.submit")}
        </Button>
        <span className="text-center text-xs font-bold text-foreground/40 leading-tight">
          {t("login.form.agreement")}{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-2 underline-offset-2 hover:text-main"
          >
            {t("login.links.privacy")}
          </a>{" "}
          {t("login.form.and")}{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-2 underline-offset-2 hover:text-main"
          >
            {t("login.links.terms")}
          </a>
          .
        </span>
      </CardFooter>
    </Card>
  );
}
