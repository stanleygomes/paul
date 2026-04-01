import { FastifySchema } from "fastify";

export const listMemoriesSchema: FastifySchema = {
  tags: ["Memory"],
  summary: "List all memories",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: "object",
      properties: {
        memories: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              content: { type: "string" },
              created_at: { type: "string", format: "date-time" },
              updated_at: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  },
};

export const createMemorySchemaDoc: FastifySchema = {
  tags: ["Memory"],
  summary: "Create a new memory",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    required: ["id", "content"],
    properties: {
      id: { type: "string" },
      content: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        content: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    },
  },
};

export const updateMemorySchemaDoc: FastifySchema = {
  tags: ["Memory"],
  summary: "Update an existing memory",
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      content: { type: "string" },
    },
  },
};

export const deleteMemorySchema: FastifySchema = {
  tags: ["Memory"],
  summary: "Delete a memory",
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
};
