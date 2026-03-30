"use client";

import React from "react";
import EmailForm from "./email-form";
import LoginLinks from "./login-links";
import LoginHeader from "./login-header";
import LoginFooter from "./login-footer";

export default function Login() {
  const handleProceed = (data: { email: string }) => {
    console.log("Sending code to", data.email);
    // Aqui no futuro você integrará com o seu auth-api
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-base">
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <LoginHeader />

        <EmailForm onSubmit={handleProceed} />

        <LoginLinks />
      </div>

      <LoginFooter />
    </div>
  );
}
