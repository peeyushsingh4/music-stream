import { Router, Response } from "express";
import { supabase } from "../config/supabase";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// All favorites routes require authentication
router.use(requireAuth);

// GET /api/favorites - Get user's favorites
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("*, song:songs(*, artist:artists(*), genre:genres(*))")
      .eq("user_id", req.userId!)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// POST /api/favorites - Add a song to favorites
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { songId } = req.body;

    if (!songId) {
      res.status(400).json({ error: "songId is required" });
      return;
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert({ user_id: req.userId!, song_id: songId })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        res.status(409).json({ error: "Song already in favorites" });
        return;
      }
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

// DELETE /api/favorites/:songId - Remove a song from favorites
router.delete("/:songId", async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", req.userId!)
      .eq("song_id", req.params.songId);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

export default router;
