import { Memory } from "@paul/entities";
import {
  MemoryRepository,
  DbMemory,
  DbMemoryInsert,
} from "../repositories/memory.repository.js";

export class MemoryService {
  private memoryRepository: MemoryRepository;

  constructor() {
    this.memoryRepository = new MemoryRepository();
  }

  async getAll(userId: string): Promise<DbMemory[]> {
    return this.memoryRepository.findByUser(userId);
  }

  async create(userId: string, data: DbMemoryInsert): Promise<DbMemory> {
    return this.memoryRepository.create(userId, data);
  }

  async update(
    userId: string,
    memoryId: string,
    data: Partial<DbMemoryInsert>,
  ): Promise<DbMemory | null> {
    return this.memoryRepository.update(userId, memoryId, data);
  }

  async delete(userId: string, memoryId: string): Promise<void> {
    return this.memoryRepository.delete(userId, memoryId);
  }

  async sync(userId: string, memories: Memory[]): Promise<Memory[]> {
    if (memories.length > 0) {
      await this.memoryRepository.bulkUpsert(userId, memories as any);
    }

    const dbMemories = await this.memoryRepository.findByUser(userId);
    return dbMemories as any;
  }
}
