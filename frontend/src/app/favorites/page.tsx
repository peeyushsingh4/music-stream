"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Favorite, Song } from "@/types";
import { getFavorites } from "@/lib/api";
import SongRow from "@/components/SongRow";
import { Loader2, Heart, LogIn } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { session, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!session?.access_token) return;
    try {
      const data = await getFavorites(session.access_token);
      setFavorites(data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (authLoading) return;
    if (!session) {
      setLoading(false);
      return;
    }
    fetchFavorites();
  }, [session, authLoading, fetchFavorites]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-spotify-green animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 text-spotify-light-gray mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Liked Songs</h2>
        <p className="text-spotify-light-gray mb-6">
          Log in to see your favorite songs
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-spotify-green text-black font-bold hover:scale-105 transition"
        >
          <LogIn className="w-5 h-5" />
          Log in
        </Link>
      </div>
    );
  }

  const songs: Song[] = favorites
    .map((f) => f.song)
    .filter((s): s is Song => !!s);

  return (
    <div>
      {/* Header */}
      <div className="flex items-end gap-6 mb-8 -mx-6 -mt-4 px-6 pt-12 pb-6 bg-gradient-to-b from-purple-900/60 to-transparent">
        <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-purple-700 to-blue-300 flex-shrink-0 flex items-center justify-center shadow-2xl">
          <Heart className="w-20 h-20 text-white fill-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white uppercase tracking-wider">
            Playlist
          </p>
          <h1 className="text-5xl font-bold text-white mt-2">Liked Songs</h1>
          <p className="text-sm text-spotify-light-gray mt-2">
            {songs.length} song{songs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Songs */}
      {songs.length > 0 ? (
        <div>
          <div className="grid grid-cols-[16px_4fr_2fr_minmax(60px,1fr)] gap-4 px-4 py-2 border-b border-spotify-gray text-xs text-spotify-light-gray uppercase tracking-wider">
            <span>#</span>
            <span>Title</span>
            <span className="hidden sm:block">Genre</span>
            <span className="text-right">Duration</span>
          </div>
          <div className="mt-2">
            {songs.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                index={index}
                queue={songs}
                isFavorite={true}
                onFavoriteToggle={fetchFavorites}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-spotify-light-gray text-lg">
            Songs you like will appear here
          </p>
          <p className="text-spotify-light-gray text-sm mt-2">
            Find songs and tap the heart icon to save them
          </p>
        </div>
      )}
    </div>
  );
}
