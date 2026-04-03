"use client";

import React, { useState } from "react";
import EmailForm from "./email-form";
import OtpForm from "./otp-form";
import LoginLinks from "./login-links";
// import LoginHeader from "./login-header";
import LoginFooter from "./login-footer";
import { authService } from "../../modules/auth/auth-api.service";
import { useAuth } from "../../modules/auth/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "@paul/ui";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const handleProceed = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const response = await authService.sendCode(data.email);
      setEmail(data.email);
      setIsNewUser(!response.isRegistered);
      setStep("otp");
    } catch (error) {
      console.error("Error sending code:", error);
      toast.error(t("login.errors.send_code"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyCode(email, code);

      login(response.token, response.refreshToken);

      router.push("/");

      return true;
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error(t("login.errors.verify_code"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-base">
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 bg-secondary-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:70px_70px]">
        {/* <LoginHeader /> */}

        {step === "email" ? (
          <EmailForm onSubmit={handleProceed} isLoading={isLoading} />
        ) : (
          <OtpForm
            email={email}
            isNewUser={isNewUser}
            onVerify={handleVerify}
            onBack={() => setStep("email")}
            isLoading={isLoading}
          />
        )}

        <LoginLinks />
      </div>

      <LoginFooter />
    </div>
  );
}
