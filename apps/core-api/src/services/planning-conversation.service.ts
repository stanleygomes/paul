import { PlanningRepository } from "../repositories/planning.repository";
import { BusinessError } from "../errors/BusinessError";

export class PlanningConversationService {
  constructor(private readonly planningRepository: PlanningRepository) {}

  async listConversations(userId: string) {
    return await this.planningRepository.findConversationsByUser(userId);
  }

  async createConversation(userId: string, title?: string) {
    return await this.planningRepository.createConversation(userId, title);
  }

  async deleteConversation(userId: string, conversationId: string) {
    const conversation =
      await this.planningRepository.findConversationById(conversationId);
    if (!conversation || conversation.user_id !== userId) {
      throw new BusinessError("Conversation not found or access denied");
    }
    await this.planningRepository.deleteConversation(conversationId);
  }

  async findConversationById(userId: string, conversationId: string) {
    const conversation =
      await this.planningRepository.findConversationById(conversationId);
    if (!conversation || conversation.user_id !== userId) {
      throw new BusinessError("Conversation not found or access denied");
    }
    return conversation;
  }
}
