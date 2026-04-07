import type { Language } from "../types/language.types";
import { getSettings } from "./settings-store";

const dictionary = {
  en: {
    bannerSubtitle: "Your terminal task assistant",
    loginRequired: "You must run 'paul login' before using this command.",
    askEmail: "Type your email",
    askCode: "Type the 6-digit code",
    codeSentExisting: "Code sent. Signing in to existing account.",
    codeSentNew: "Code sent. Creating a new account.",
    loginSuccess: "Login completed successfully.",
    taskCreated: "Task created.",
    taskUpdated: "Task updated.",
    taskDeleted: "Task deleted.",
    projectCreated: "Project created.",
    projectUpdated: "Project updated.",
    projectDeleted: "Project deleted.",
    languageUpdated: "Language updated.",
    noTasks: "No tasks found.",
    noProjects: "No projects found.",
    selectTask: "Select a task",
    selectProject: "Select a project",
    askTaskTitle: "Task title",
    askProjectTitle: "Project title",
    loading: "Loading...",
  },
  pt: {
    bannerSubtitle: "Seu assistente de tarefas no terminal",
    loginRequired:
      "Você precisa executar 'paul login' antes de usar este comando.",
    askEmail: "Digite seu e-mail",
    askCode: "Digite o código de 6 dígitos",
    codeSentExisting: "Código enviado. Entrando na conta existente.",
    codeSentNew: "Código enviado. Criando uma nova conta.",
    loginSuccess: "Login concluído com sucesso.",
    taskCreated: "Tarefa criada.",
    taskUpdated: "Tarefa atualizada.",
    taskDeleted: "Tarefa excluída.",
    projectCreated: "Projeto criado.",
    projectUpdated: "Projeto atualizado.",
    projectDeleted: "Projeto excluído.",
    languageUpdated: "Idioma atualizado.",
    noTasks: "Nenhuma tarefa encontrada.",
    noProjects: "Nenhum projeto encontrado.",
    selectTask: "Selecione uma tarefa",
    selectProject: "Selecione um projeto",
    askTaskTitle: "Título da tarefa",
    askProjectTitle: "Título do projeto",
    loading: "Carregando...",
  },
} as const;

type DictionaryKey = keyof (typeof dictionary)["en"];
let currentLanguage: Language | null = null;

export async function initializeI18n(): Promise<void> {
  if (!currentLanguage) {
    const settings = await getSettings();
    currentLanguage = settings.language;
  }
}

export async function t(key: DictionaryKey): Promise<string> {
  await initializeI18n();
  const language = currentLanguage ?? "en";
  return dictionary[language][key];
}

export function setCurrentLanguage(language: Language): void {
  currentLanguage = language;
}

export function languageLabel(language: Language): string {
  return language === "pt" ? "Português" : "English";
}
