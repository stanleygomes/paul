"use client";

import React, { useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Button } from "@paul/ui/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@paul/ui/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@paul/ui/components/ui/card";
import { Icon } from "@paul/ui/components/ui/icon";

interface OtpFormProps {
  email: string;
  isNewUser: boolean;
  onVerify: (code: string) => Promise<boolean>;
  onBack: () => void;
}

export default function OtpForm({
  email,
  isNewUser,
  onVerify,
  onBack,
}: OtpFormProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleVerify = async () => {
    if (value.length === 6) {
      const success = await onVerify(value);
      if (!success) {
        setValue("");
        inputRef.current?.focus();
      }
    }
  };

  return (
    <Card className="w-full max-w-lg rounded-base border-4 border-border bg-secondary-background p-4 shadow-[10px_10px_0px_0px_var(--border)] md:p-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-black uppercase tracking-tighter text-foreground flex flex-col gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-base border-4 border-border bg-main text-main-foreground shadow-shadow">
            <Icon icon="solar:letter-linear" className="h-8 w-8" />
          </div>
          <div>
            {isNewUser
              ? t("login.otp.title_new")
              : t("login.otp.title_existing")}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4 flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground/70 leading-relaxed">
          <Trans
            i18nKey={
              isNewUser ? "login.otp.message_new" : "login.otp.message_existing"
            }
            values={{ email }}
            components={[
              <span
                key="email"
                className="text-foreground font-black underline decoration-main decoration-2 underline-offset-4"
              />,
            ]}
          />
        </p>

        <div className="flex justify-center py-4">
          <InputOTP
            ref={inputRef}
            maxLength={6}
            value={value}
            onChange={(val) => setValue(val)}
            autoFocus
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-main hover:underline decoration-main decoration-2 underline-offset-4 cursor-pointer text-left"
        >
          {t("login.otp.change_email")}
        </button>
      </CardContent>
      <CardFooter className="mt-4">
        <Button
          onClick={handleVerify}
          disabled={value.length < 6}
          className="h-14 w-full rounded-base border-2 border-border bg-main text-lg font-black uppercase text-main-foreground shadow-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-main/90"
        >
          {isNewUser
            ? t("login.otp.submit_new")
            : t("login.otp.submit_existing")}
        </Button>
      </CardFooter>
    </Card>
  );
}
