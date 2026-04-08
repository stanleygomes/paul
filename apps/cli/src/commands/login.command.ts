import { LoginModule } from "../modules/auth/login.module";
import { BaseCommand } from "./base.command";

export class LoginCommand extends BaseCommand {
  public register(): void {
    this.program
      .command("login")
      .description("Login with email and verification code")
      .action(LoginModule.run);
  }
}
