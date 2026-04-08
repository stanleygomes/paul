import { runLogoutModule } from "../modules/auth";
import { BaseCommand } from "./base.command";

export class LogoutCommand extends BaseCommand {
  public register(): void {
    this.program
      .command("logout")
      .description("Clear local session data")
      .action(runLogoutModule);
  }
}
