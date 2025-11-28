import { db } from "./db";
import { gameSessions } from "@shared/schema";
import { type GameSession, type InsertGameSession } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getGameSession(id: string): Promise<GameSession | undefined>;
  createGameSession(session: InsertGameSession): Promise<GameSession>;
  updateGameSession(id: string, updates: Partial<GameSession>): Promise<GameSession>;
}

export class DrizzleStorage implements IStorage {
  async getGameSession(id: string): Promise<GameSession | undefined> {
    const result = await db.select().from(gameSessions).where(eq(gameSessions.id, id));
    return result[0];
  }

  async createGameSession(session: InsertGameSession): Promise<GameSession> {
    const result = await db.insert(gameSessions).values(session).returning();
    return result[0];
  }

  async updateGameSession(id: string, updates: Partial<GameSession>): Promise<GameSession> {
    const result = await db
      .update(gameSessions)
      .set(updates)
      .where(eq(gameSessions.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DrizzleStorage();
