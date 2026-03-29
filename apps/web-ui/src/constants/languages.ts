export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
] as const;

export type Language = (typeof LANGUAGE_OPTIONS)[number]["value"];
