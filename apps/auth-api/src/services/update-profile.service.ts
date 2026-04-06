import { UserRepository } from "../repositories/user.repository";
import { User } from "../types/user.entity";

export class UpdateProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, data: { name: string }): Promise<User> {
    return await this.userRepository.update(id, { name: data.name });
  }
}
