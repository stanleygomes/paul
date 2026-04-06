import { eq } from "drizzle-orm";
import { db } from "../config/database-client";
import { api_clients } from "../schemas/database/index";
import { ApiClient } from "../types/api-client.entity";
import { BusinessError } from "../errors/BusinessError";

export class ApiClientRepository {
  async findByClientId(clientId: string): Promise<ApiClient | null> {
    const result = await db
      .select()
      .from(api_clients)
      .where(eq(api_clients.client_id, clientId))
      .limit(1);
    return result[0] ?? null;
  }

  async create(client: Omit<ApiClient, "id">): Promise<ApiClient> {
    const result = await db.insert(api_clients).values(client).returning();
    if (!result[0]) throw new BusinessError("API client creation failed");
    return result[0];
  }
}
