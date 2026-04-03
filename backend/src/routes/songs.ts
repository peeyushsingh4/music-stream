import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";

const router = Router();

// GET /api/songs - List songs with optional filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const { genre, artist, limit = "50", offset = "0" } = req.query;

    let query = supabase
      .from("songs")
      .select("*, artist:artists(*), genre:genres(*)")
      .order("created_at", { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (genre) {
      query = query.eq("genre_id", genre as string);
    }
    if (artist) {
      query = query.eq("artist_id", artist as string);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// GET /api/songs/search?q= - Search songs
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).json({ error: "Search query is required" });
      return;
    }

    // Search in song titles and artist names
    const { data: songsByTitle, error: titleError } = await supabase
      .from("songs")
      .select("*, artist:artists(*), genre:genres(*)")
      .ilike("title", `%${q}%`);

    if (titleError) throw titleError;

    // Also search by artist name
    const { data: artists, error: artistError } = await supabase
      .from("artists")
      .select("id")
      .ilike("name", `%${q}%`);

    if (artistError) throw artistError;

    let songsByArtist: typeof songsByTitle = [];
    if (artists && artists.length > 0) {
      const artistIds = artists.map((a) => a.id);
      const { data, error } = await supabase
        .from("songs")
        .select("*, artist:artists(*), genre:genres(*)")
        .in("artist_id", artistIds);

      if (error) throw error;
      songsByArtist = data || [];
    }

    // Merge and deduplicate
    const allSongs = [...(songsByTitle || [])];
    const existingIds = new Set(allSongs.map((s) => s.id));
    for (const song of songsByArtist) {
      if (!existingIds.has(song.id)) {
        allSongs.push(song);
      }
    }

    res.json(allSongs);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

// GET /api/songs/:id - Get single song
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("songs")
      .select("*, artist:artists(*), genre:genres(*)")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: "Song not found" });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch song" });
  }
});

export default router;
