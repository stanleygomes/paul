import { generateUUID } from "@paul/utils";
import { PlanningRepository } from "../repositories/planning.repository.js";
import { config } from "../config/environment.js";
import { BusinessError } from "../errors/BusinessError.js";
import { Logger } from "@paul/node-utils";

const logger = Logger.getLogger();

export class PlanningService {
  private readonly systemPrompt = `You are a task planning assistant. Your goal is to help the user define a task.
Interact with the user to get a clear title and description.
When you have enough information, you MUST provide a JSON block at the very end of your message with the following structure:
{
  "task": {
    "title": "...",
    "description": "...",
    "important": boolean,
    "dueDate": "YYYY-MM-DD (optional)",
    "dueTime": "HH:mm (optional)"
  }
}
Keep the conversation focused on planning the task. Be concise and helpful.`;

  constructor(private readonly planningRepository: PlanningRepository) {}

  async chat(userId: string, userMessage: string, authToken?: string) {
    // 1. Save user message
    await this.planningRepository.save({
      id: generateUUID(),
      userId,
      role: "user",
      content: userMessage,
    });

    // 2. Get history
    const history = await this.planningRepository.findByUser(userId);

    // 3. Prepare contents for Gemini
    // We prepend the system prompt as a 'user' message with a specific instruction if the API doesn't support system-role yet,
    // but the best way is to have it as the first message or a specific role.
    // Drizzle-Gemini (ai-api) expects { role: string, parts: { text: string }[] }
    const contents = [
      {
        role: "user",
        parts: [{ text: `SYSTEM INSTRUCTION: ${this.systemPrompt}` }],
      },
      ...history.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
    ];

    try {
      const aiApiUrl = config.services.ai.url;
      const response = await fetch(`${aiApiUrl}/prompt/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: authToken } : {}),
        },
        body: JSON.stringify({ contents }),
      });

      if (!response.ok) {
        throw new BusinessError("AI API error during planning chat");
      }

      const data = (await response.json()) as { response: string };
      const aiResponse = data.response;

      // 4. Save AI response
      await this.planningRepository.save({
        id: generateUUID(),
        userId,
        role: "model",
        content: aiResponse,
      });

      return aiResponse;
    } catch (error) {
      logger.error(
        { error, userId },
        "Failed to chat with AI in PlanningService",
      );
      throw new BusinessError("Planning chat failed");
    }
  }

  async getMessages(userId: string) {
    return await this.planningRepository.findByUser(userId);
  }

  async clearHistory(userId: string) {
    await this.planningRepository.deleteByUser(userId);
  }
}
