import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../types/user.entity.js";

export class GetProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
