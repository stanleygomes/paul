import { Logger, loadTemplateFile } from "@paul/node-utils";
import { PlanningRepository } from "../repositories/planning.repository.js";
import { BusinessError } from "../errors/BusinessError.js";
import { AiService } from "./ai.service.js";

const logger = Logger.getLogger();

export class PlanningMessageService {
  constructor(
    private readonly planningRepository: PlanningRepository,
    private readonly aiService: AiService,
  ) {}

  private getSystemPrompt(): string {
    try {
      return loadTemplateFile(
        import.meta.url,
        "../templates/planning-prompt.md",
      );
    } catch (error) {
      logger.error({ error }, "Failed to load planning prompt template");
      throw new BusinessError("System configuration error");
    }
  }

  async chat(
    userId: string,
    conversationId: string,
    userMessage: string,
    authToken?: string,
  ) {
    await this.validateOwnership(userId, conversationId);

    await this.planningRepository.save({
      userId,
      conversationId,
      role: "user",
      content: userMessage,
    });

    const history =
      await this.planningRepository.findMessagesByConversation(conversationId);

    const aiContents = this.prepareAiContents(history);

    try {
      const aiResponse = await this.aiService.executePrompt(
        aiContents,
        authToken,
      );

      await this.planningRepository.save({
        userId,
        conversationId,
        role: "assistant",
        content: aiResponse,
      });

      return aiResponse;
    } catch (error) {
      if (error instanceof BusinessError) throw error;
      logger.error(
        { error, userId, conversationId },
        "Failed to chat with AI in PlanningMessageService",
      );
      throw new BusinessError("Planning chat failed");
    }
  }

  async getMessages(userId: string, conversationId: string) {
    await this.validateOwnership(userId, conversationId);
    return await this.planningRepository.findMessagesByConversation(
      conversationId,
    );
  }

  private async validateOwnership(userId: string, conversationId: string) {
    const conversation =
      await this.planningRepository.findConversationById(conversationId);
    if (!conversation || conversation.user_id !== userId) {
      throw new BusinessError("Conversation not found or access denied");
    }
  }

  private prepareAiContents(history: any[]) {
    return [
      {
        role: "user",
        parts: [{ text: `INSTRUÇÃO DE SISTEMA: ${this.getSystemPrompt()}` }],
      },
      ...history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];
  }
}
