"use client";

import { useEffect, useState } from "react";
import { Song, Genre } from "@/types";
import { getSongs, getGenres } from "@/lib/api";
import SongCard from "@/components/SongCard";
import GenreCard from "@/components/GenreCard";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [songsData, genresData] = await Promise.all([
          getSongs("limit=8"),
          getGenres(),
        ]);
        setSongs(songsData);
        setGenres(genresData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-spotify-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <section>
        <h1 className="text-3xl font-bold text-white mb-6">
          {getGreeting()}
        </h1>
      </section>

      {/* Browse Genres */}
      {genres.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Browse by Genre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {genres.map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Added */}
      {songs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Recently Added
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {songs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                queue={songs}
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
