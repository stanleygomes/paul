import { LogoutModule } from "../modules/auth/logout.module";
import { BaseCommand } from "./base.command";

export class LogoutCommand extends BaseCommand {
  public register(): void {
    this.program
      .command("logout")
      .description("Clear local session data")
      .action(LogoutModule.run);
  }
}
