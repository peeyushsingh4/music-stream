import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";

const router = Router();

// GET /api/artists - List all artists
router.get("/", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .order("name");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});

// GET /api/artists/:id - Get artist with songs
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { data: artist, error: artistError } = await supabase
      .from("artists")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (artistError) throw artistError;
    if (!artist) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }

    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("*, genre:genres(*)")
      .eq("artist_id", req.params.id)
      .order("title");

    if (songsError) throw songsError;

    res.json({ ...artist, songs: songs || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artist" });
  }
});

export default router;
