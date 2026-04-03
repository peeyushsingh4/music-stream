import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import songsRouter from "./routes/songs";
import artistsRouter from "./routes/artists";
import genresRouter from "./routes/genres";
import favoritesRouter from "./routes/favorites";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/songs", songsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/genres", genresRouter);
app.use("/api/favorites", favoritesRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Music Stream API running on port ${PORT}`);
});
