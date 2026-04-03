import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";

const router = Router();

// GET /api/genres - List all genres
router.get("/", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("genres")
      .select("*")
      .order("name");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

// GET /api/genres/:id - Get genre with songs
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { data: genre, error: genreError } = await supabase
      .from("genres")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (genreError) throw genreError;
    if (!genre) {
      res.status(404).json({ error: "Genre not found" });
      return;
    }

    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("*, artist:artists(*)")
      .eq("genre_id", req.params.id)
      .order("title");

    if (songsError) throw songsError;

    res.json({ ...genre, songs: songs || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genre" });
  }
});

export default router;
