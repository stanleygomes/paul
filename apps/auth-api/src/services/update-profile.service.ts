import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../types/user.entity.js";

export class UpdateProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, data: { name: string }): Promise<User> {
    return await this.userRepository.update(id, { name: data.name });
  }
}
