import type { Memory } from "@paul/entities";
import {
  MemoryRepository,
  DbMemoryInsert,
} from "../repositories/memory.repository";
import { MemoryMapper } from "../mappers/memory.mapper";

export class MemoryService {
  private memoryRepository: MemoryRepository;

  constructor() {
    this.memoryRepository = new MemoryRepository();
  }

  async getAll(userId: string): Promise<Memory[]> {
    const dbMemories = await this.memoryRepository.findByUser(userId);
    return MemoryMapper.toDomainList(dbMemories);
  }

  async create(userId: string, data: Partial<Memory>): Promise<Memory> {
    const dbData = MemoryMapper.toDatabasePartial(data);
    const result = await this.memoryRepository.create(
      userId,
      dbData as DbMemoryInsert,
    );
    return MemoryMapper.toDomain(result);
  }

  async update(
    userId: string,
    memoryId: string,
    data: Partial<Memory>,
  ): Promise<Memory | null> {
    const dbData = MemoryMapper.toDatabasePartial(data);
    const result = await this.memoryRepository.update(userId, memoryId, dbData);
    return result ? MemoryMapper.toDomain(result) : null;
  }

  async delete(userId: string, memoryId: string): Promise<void> {
    return this.memoryRepository.delete(userId, memoryId);
  }

  async sync(userId: string, memories: Memory[]): Promise<Memory[]> {
    if (memories.length > 0) {
      const dbMemories = MemoryMapper.toDatabaseList(memories, userId);
      await this.memoryRepository.bulkUpsert(userId, dbMemories);
    }

    const dbMemories = await this.memoryRepository.findByUser(userId);
    return MemoryMapper.toDomainList(dbMemories);
  }
}
