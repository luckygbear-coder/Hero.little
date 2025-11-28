import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameSessions = pgTable("game_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroName: text("hero_name").notNull(),
  heroPower: text("hero_power").notNull(),
  clearedStages: text("cleared_stages").default("").notNull(),
  currentHearts: integer("current_hearts").default(3).notNull(),
  totalStars: integer("total_stars").default(0).notNull(),
  completedBingoLines: text("completed_bingo_lines").default("").notNull(),
  createdAt: varchar("created_at").default(sql`NOW()`).notNull(),
});

export const insertGameSessionSchema = createInsertSchema(gameSessions).omit({
  id: true,
  createdAt: true,
});

export type InsertGameSession = z.infer<typeof insertGameSessionSchema>;
export type GameSession = typeof gameSessions.$inferSelect;
