import { config } from "../config/environment";
import { BusinessError } from "../errors/BusinessError";
import { Logger } from "@paul/node-utils";

const logger = Logger.getLogger();

export interface AiPromptContent {
  role: string;
  parts: Array<{ text: string }>;
}

export class AiService {
  async executePrompt(
    contents: AiPromptContent[],
    authToken?: string,
  ): Promise<string> {
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
        const errorText = await response.text();
        logger.error({ errorText }, "AI API error");
        throw new BusinessError("AI API error during prompt execution");
      }

      const data = (await response.json()) as { response: string };
      return data.response;
    } catch (error) {
      if (error instanceof BusinessError) throw error;
      logger.error({ error }, "Failed to execute prompt with AI service");
      throw new BusinessError("AI service integration failed");
    }
  }
}
