import { input, select } from "@inquirer/prompts";
import type { z } from "zod";
import { t, type DictionaryKey } from "./i18n/i18n.util";

interface AskAndParseParams<T> {
  messageKey: DictionaryKey;
  schema: z.ZodSchema<T>;
  initialValue?: string | null;
}

export async function askAndParse<T>({
  messageKey,
  schema,
  initialValue,
}: AskAndParseParams<T>): Promise<T> {
  const message = await t(messageKey);
  const rawValue = initialValue ?? (await input({ message }));
  return schema.parse(rawValue);
}

interface SelectAndParseParams<V> {
  messageKey: DictionaryKey;
  choices: { name: string; value: V }[];
  initialValue?: V | null;
}

export async function selectAndParse<V>({
  messageKey,
  choices,
  initialValue,
}: SelectAndParseParams<V>): Promise<V> {
  if (initialValue) return initialValue;

  const message = await t(messageKey);
  return select({
    message,
    choices,
  });
}
