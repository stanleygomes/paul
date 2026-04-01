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
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const handleProceed = async (data: { email: string }) => {
    try {
      const response = await authService.sendCode(data.email);
      setEmail(data.email);
      setIsNewUser(!response.isRegistered);
      setStep("otp");
    } catch (error) {
      console.error("Error sending code:", error);
      toast.error(t("login.errors.send_code"));
    }
  };

  const handleVerify = async (code: string) => {
    try {
      const response = await authService.verifyCode(email, code);

      login(response.token, response.refreshToken);

      router.push("/");

      return true;
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error(t("login.errors.verify_code"));
      return false;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-base">
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        {/* <LoginHeader /> */}

        {step === "email" ? (
          <EmailForm onSubmit={handleProceed} />
        ) : (
          <OtpForm
            email={email}
            isNewUser={isNewUser}
            onVerify={handleVerify}
            onBack={() => setStep("email")}
          />
        )}

        <LoginLinks />
      </div>

      <LoginFooter />
    </div>
  );
}
