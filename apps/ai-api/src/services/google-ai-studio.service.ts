import { httpClient } from "@paul/http";
import { config } from "../config/environment.js";
import { BusinessError } from "../errors/BusinessError.js";

interface GoogleAiStudioResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export class GoogleAiStudioService {
  async executePrompt(
    contents: Array<{ role: string; parts: Array<{ text: string }> }>,
  ): Promise<string> {
    if (!config.services.googleAiStudio.apiKey) {
      throw new BusinessError("Google AI Studio API key is not configured");
    }

    const model = config.services.googleAiStudio.model;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.services.googleAiStudio.apiKey}`;

    try {
      const response = await httpClient.post<GoogleAiStudioResponse>(url, {
        contents,
      });

      const data = response.data;
      const text = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

      if (!text) {
        throw new BusinessError("Google AI Studio returned an empty response");
      }

      return text;
    } catch (error: any) {
      if (error instanceof BusinessError) {
        throw error;
      }

      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "Failed to execute prompt";

      throw new BusinessError(`Google AI Studio Error: ${errorMessage}`);
    }
  }
}
