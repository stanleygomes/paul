"use client";

import { useEffect, useRef, useState } from "react";
import { usePlanning } from "@modules/planning/use-planning";
import { useTasks } from "@modules/task/use-tasks";
import { toast } from "@paul/ui";
import { PlanWelcome } from "./welcome";
import { PlanMessageItem } from "./message-item";
import { PlanInput } from "./input";
import { PlanHeader } from "./header";
import { PlanSyncLoader } from "./sync-loader";
import { PlanThinkingIndicator } from "./thinking-indicator";
import { PlanHistory } from "./history";
import { parseTaskFromResponse } from "./utils/task-parser";
import { AnimatePresence } from "framer-motion";
import { useSidebar } from "@modules/menu-layout/use-sidebar";

const MOCK_CONVERSATIONS = [
  { id: "1", title: "Project: Next.js App", date: "TODAY" },
  { id: "2", title: "Weekend Trip Planning", date: "YESTERDAY" },
  { id: "3", title: "Grocery List Brainstorm", date: "2 DAYS AGO" },
  { id: "4", title: "Workout Routine Idea", date: "LAST WEEK" },
];

export default function PlanPage() {
  const { messages, isLoading, sendMessage, clearChat, isInitialLoading } =
    usePlanning();
  const { createTask } = useTasks();
  const { isOpen, mounted } = useSidebar();
  const [inputValue, setInputValue] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentConvId, setCurrentConvId] = useState("1");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    clearChat();
  };

  const handleCreateTask = (taskData: any) => {
    createTask({
      content: taskData.title,
      notes: taskData.description,
      important: taskData.important,
      dueDate: taskData.dueDate,
      dueTime: taskData.dueTime,
    });
    toast.success("Task created from plan!");
  };

  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden font-jakarta">
      <PlanHeader
        isOpen={isOpen}
        mounted={mounted}
        isHistoryOpen={isHistoryOpen}
        setIsHistoryOpen={setIsHistoryOpen}
        onNewChat={handleNewChat}
        onClearChat={clearChat}
        hasMessages={messages.length > 0}
      />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-32 pb-48 w-full max-w-5xl mx-auto scroll-smooth no-scrollbar"
      >
        {isInitialLoading ? (
          <PlanSyncLoader />
        ) : isHistoryOpen ? (
          <PlanHistory
            conversations={MOCK_CONVERSATIONS}
            currentConversationId={currentConvId}
            onSelectConversation={(id) => {
              setCurrentConvId(id);
              setIsHistoryOpen(false);
            }}
          />
        ) : messages.length === 0 ? (
          <PlanWelcome />
        ) : (
          <div className="py-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <PlanMessageItem
                  key={i}
                  message={msg}
                  taskData={
                    msg.role === "model"
                      ? parseTaskFromResponse(msg.content)
                      : null
                  }
                  onCreateTask={handleCreateTask}
                />
              ))}
            </AnimatePresence>

            {isLoading && <PlanThinkingIndicator />}
          </div>
        )}
      </div>

      {!isInitialLoading && !isHistoryOpen && (
        <PlanInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}
