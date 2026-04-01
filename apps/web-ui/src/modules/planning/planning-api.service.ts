import { httpClient } from "@paul/http";
import { CORE_API_URL } from "../../config/api-config";

export interface PlanningMessage {
  role: "user" | "model";
  content: string;
}

export const planningApiService = {
  async chat(token: string, message: string): Promise<string> {
    const response = await httpClient.post<{ response: string }>(
      `${CORE_API_URL}/v1/planning/chat`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.response;
  },

  async getMessages(token: string): Promise<PlanningMessage[]> {
    const response = await httpClient.get<{ messages: PlanningMessage[] }>(
      `${CORE_API_URL}/v1/planning/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.messages;
  },

  async clearHistory(token: string): Promise<void> {
    await httpClient.delete(`${CORE_API_URL}/v1/planning/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
