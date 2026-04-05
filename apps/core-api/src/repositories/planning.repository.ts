import { eq, asc, desc } from "drizzle-orm";
import { db } from "../config/database-client.js";
import {
  planning_conversations,
  planning_messages,
} from "../schemas/database/index.js";

export interface SavePlanningMessageInput {
  userId: string;
  conversationId: string;
  role: "user" | "model";
  content: string;
}

export class PlanningRepository {
  async save(data: SavePlanningMessageInput) {
    await db.insert(planning_messages).values({
      conversation_id: data.conversationId,
      user_id: data.userId,
      role: data.role,
      content: data.content,
    });

    // Update conversation updated_at
    await db
      .update(planning_conversations)
      .set({ updated_at: new Date() })
      .where(eq(planning_conversations.id, data.conversationId));
  }

  async findConversationsByUser(userId: string) {
    return await db
      .select()
      .from(planning_conversations)
      .where(eq(planning_conversations.user_id, userId))
      .orderBy(desc(planning_conversations.updated_at));
  }

  async createConversation(userId: string, title: string = "Nova Tarefa") {
    const [conversation] = await db
      .insert(planning_conversations)
      .values({
        user_id: userId,
        title,
      })
      .returning();

    return conversation;
  }

  async findMessagesByConversation(conversationId: string) {
    return await db
      .select()
      .from(planning_messages)
      .where(eq(planning_messages.conversation_id, conversationId))
      .orderBy(asc(planning_messages.created_at));
  }

  async findConversationById(id: string) {
    const [conversation] = await db
      .select()
      .from(planning_conversations)
      .where(eq(planning_conversations.id, id));

    return conversation;
  }

  async deleteConversation(id: string) {
    await db
      .delete(planning_conversations)
      .where(eq(planning_conversations.id, id));
  }
}
