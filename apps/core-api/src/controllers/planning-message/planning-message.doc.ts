export const planningMessageResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    conversation_id: { type: "string" },
    user_id: { type: "string" },
    role: { type: "string" },
    content: { type: "string" },
    created_at: { type: "string", format: "date-time" },
  },
};

export const chatSchema = {
  description:
    "Send a message to the planning AI assistant within a conversation",
  tags: ["Planning"],
  params: {
    type: "object",
    properties: {
      conversationId: { type: "string" },
    },
  },
  body: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        response: { type: "string" },
      },
    },
  },
};

export const getMessagesSchema = {
  description: "Get all messages for a planning conversation",
  tags: ["Planning"],
  params: {
    type: "object",
    properties: {
      conversationId: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        messages: {
          type: "array",
          items: planningMessageResponseSchema,
        },
      },
    },
  },
};
