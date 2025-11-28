import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameSessionSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Create new game session
  app.post("/api/game/new", async (req, res) => {
    try {
      const { heroName, heroPower } = req.body;
      
      if (!heroName || !heroPower) {
        return res.status(400).json({ error: "Missing heroName or heroPower" });
      }

      const session = await storage.createGameSession({
        heroName,
        heroPower,
        clearedStages: "",
        currentHearts: 3,
        totalStars: 0,
        completedBingoLines: "",
      });

      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to create game session" });
    }
  });

  // Get game session
  app.get("/api/game/session/:id", async (req, res) => {
    try {
      const session = await storage.getGameSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch session" });
    }
  });

  // Update game progress (stage cleared)
  app.post("/api/game/clear-stage", async (req, res) => {
    try {
      const { sessionId, stageNumber } = req.body;

      if (!sessionId || !stageNumber) {
        return res.status(400).json({ error: "Missing sessionId or stageNumber" });
      }

      const session = await storage.getGameSession(sessionId);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      const clearedArray = session.clearedStages ? session.clearedStages.split(",") : [];
      if (!clearedArray.includes(String(stageNumber))) {
        clearedArray.push(String(stageNumber));
      }

      const updatedSession = await storage.updateGameSession(sessionId, {
        clearedStages: clearedArray.join(","),
        totalStars: session.totalStars + 1,
      });

      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  // Update game state (hearts, stars, bingo)
  app.post("/api/game/update", async (req, res) => {
    try {
      const { sessionId, hearts, stars, bingoLines } = req.body;

      if (!sessionId) {
        return res.status(400).json({ error: "Missing sessionId" });
      }

      const session = await storage.getGameSession(sessionId);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      const updates: any = {};
      if (hearts !== undefined) updates.currentHearts = hearts;
      if (stars !== undefined) updates.totalStars = stars;
      if (bingoLines !== undefined) updates.completedBingoLines = bingoLines;

      const updatedSession = await storage.updateGameSession(sessionId, updates);
      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ error: "Failed to update session" });
    }
  });

  return httpServer;
}
