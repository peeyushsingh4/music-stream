"use client";

import { useEffect, useState } from "react";
import { Artist, Genre } from "@/types";
import { getArtists, getGenres } from "@/lib/api";
import GenreCard from "@/components/GenreCard";
import ArtistCard from "@/components/ArtistCard";
import { Loader2 } from "lucide-react";

export default function BrowsePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [genresData, artistsData] = await Promise.all([
          getGenres(),
          getArtists(),
        ]);
        setGenres(genresData);
        setArtists(artistsData);
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
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-white mb-6">Browse</h1>
      </section>

      {/* Genres */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>

      {/* Artists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
}
