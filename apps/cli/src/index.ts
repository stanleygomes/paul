#!/usr/bin/env node

import { Command } from "commander";
import { registerLoginCommand } from "./commands/login.command";
import { registerLogoutCommand } from "./commands/logout.command";
import { registerTaskCommand } from "./commands/task.command";
import { registerProjectCommand } from "./commands/project.command";
import { registerSettingsCommand } from "./commands/settings.command";
import { renderBanner, renderError } from "./utils/output";
import { initializeI18n, t } from "./utils/i18n";
import { setupHttpClient } from "./api/config/http-setup";

async function run() {
  setupHttpClient();

  const program = new Command();

  program.name("paul").description("Paul CLI").showHelpAfterError();

  registerLoginCommand(program);
  registerLogoutCommand(program);
  registerTaskCommand(program);
  registerProjectCommand(program);
  registerSettingsCommand(program);

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
