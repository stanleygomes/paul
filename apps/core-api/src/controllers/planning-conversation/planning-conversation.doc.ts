export const conversationResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    user_id: { type: "string" },
    title: { type: "string" },
    status: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};

export const listConversationsSchema = {
  description: "List all planning conversations for the authenticated user",
  tags: ["Planning"],
  response: {
    200: {
      type: "object",
      properties: {
        conversations: {
          type: "array",
          items: conversationResponseSchema,
        },
      },
    },
  },
};

export const createConversationSchema = {
  description: "Create a new planning conversation",
  tags: ["Planning"],
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
    },
  },
  response: {
    201: conversationResponseSchema,
  },
};

export const deleteConversationSchema = {
  description: "Delete a planning conversation by ID",
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
        success: { type: "boolean" },
      },
    },
  },
};
