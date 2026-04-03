"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GenreWithSongs } from "@/types";
import { getGenre } from "@/lib/api";
import SongRow from "@/components/SongRow";
import { Loader2, Music } from "lucide-react";

export default function GenrePage() {
  const params = useParams();
  const [genre, setGenre] = useState<GenreWithSongs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenre() {
      try {
        const data = await getGenre(params.id as string);
        setGenre(data);
      } catch (error) {
        console.error("Failed to fetch genre:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGenre();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-spotify-green animate-spin" />
      </div>
    );
  }

  if (!genre) {
    return (
      <div className="text-center py-16">
        <p className="text-spotify-light-gray text-lg">Genre not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Genre Header */}
      <div className="flex items-end gap-6 mb-8 -mx-6 -mt-4 px-6 pt-12 pb-6 bg-gradient-to-b from-spotify-gray/80 to-transparent">
        <div className="w-48 h-48 rounded-lg overflow-hidden bg-spotify-gray flex-shrink-0 flex items-center justify-center shadow-2xl">
          <Music className="w-20 h-20 text-spotify-light-gray" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white uppercase tracking-wider">
            Genre
          </p>
          <h1 className="text-5xl font-bold text-white mt-2">{genre.name}</h1>
          <p className="text-sm text-spotify-light-gray mt-2">
            {genre.songs.length} song{genre.songs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Songs */}
      {genre.songs.length > 0 && (
        <div>
          <div className="grid grid-cols-[16px_4fr_2fr_minmax(60px,1fr)] gap-4 px-4 py-2 border-b border-spotify-gray text-xs text-spotify-light-gray uppercase tracking-wider">
            <span>#</span>
            <span>Title</span>
            <span className="hidden sm:block">Artist</span>
            <span className="text-right">Duration</span>
          </div>
          <div className="mt-2">
            {genre.songs.map((song, index) => (
              <SongRow
                key={song.id}
                song={{ ...song, genre }}
                index={index}
                queue={genre.songs.map((s) => ({ ...s, genre }))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
