import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@modules/auth/use-auth";
import { planningApiService, PlanningMessage } from "./planning-api.service";
import { toast } from "@paul/ui";

export function usePlanning() {
  const { token } = useAuth();
  const [messages, setMessages] = useState<PlanningMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (!token) return;
    try {
      const history = await planningApiService.getMessages(token);
      setMessages(history);
    } catch (error) {
      console.error("Failed to fetch planning messages", error);
    } finally {
      setIsInitialLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function sendMessage(content: string) {
    if (!token || !content.trim() || isLoading) return;

    const userMessage: PlanningMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await planningApiService.chat(token, content);
      const aiMessage: PlanningMessage = { role: "model", content: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Failed to send message to AI");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function clearChat() {
    if (!token) return;
    try {
      await planningApiService.clearHistory(token);
      setMessages([]);
    } catch (error) {
      toast.error("Failed to clear chat history");
      console.error(error);
    }
  }

  return {
    messages,
    isLoading,
    isInitialLoading,
    sendMessage,
    clearChat,
  };
}
