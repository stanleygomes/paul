import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";

export function renderBanner(subtitle: string): void {
  const title = figlet.textSync("Paul", {
    font: "Small",
    horizontalLayout: "default",
  });

  const content = `${chalk.cyan(title)}\n${chalk.dim(subtitle)}`;
  console.log(
    boxen(content, {
      borderColor: "cyan",
      padding: 1,
      margin: 1,
      title: "CLI",
    }),
  );
}

export function renderSuccess(message: string): void {
  console.log(chalk.green(`✔ ${message}`));
}

export function renderInfo(message: string): void {
  console.log(chalk.blue(`ℹ ${message}`));
}

export function renderWarning(message: string): void {
  console.log(chalk.yellow(`⚠ ${message}`));
}

export function renderError(message: string): void {
  console.error(chalk.red(`✖ ${message}`));
}
