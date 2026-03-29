"use client";

import ErrorPage from "@containers/error";

export default function NotFound() {
  return (
    <ErrorPage
      title="404 - Page Not Found"
      description="Ops! A página que você está procurando parece ter sido concluída ou nunca existiu."
      buttonText="Voltar para o Início"
    />
  );
}
