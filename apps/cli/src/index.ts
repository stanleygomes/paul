#!/usr/bin/env node

import { Command } from "commander";
import { LoginCommand } from "./commands/login.command";
import { LogoutCommand } from "./commands/logout.command";
import { TaskCommand } from "./commands/task.command";
import { ProjectCommand } from "./commands/project.command";
import { SettingsCommand } from "./commands/settings.command";
import { renderBanner, renderError } from "./utils/output";
import { initializeI18n, t } from "./utils/i18n";
import { HttpManager } from "./api/config/http.config";

async function run() {
  HttpManager.setup();

  const program = new Command();

  program.name("paul").description("Paul CLI").showHelpAfterError();

  const commands = [
    new LoginCommand(program),
    new LogoutCommand(program),
    new TaskCommand(program),
    new ProjectCommand(program),
    new SettingsCommand(program),
  ];

  commands.forEach((cmd) => cmd.register());

  await initializeI18n();

  if (process.argv.length > 2 && process.argv[2] !== "--help") {
    renderBanner(await t("bannerSubtitle"));
  }

  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    renderError(message);
    process.exitCode = 1;
  }
}

void run();
