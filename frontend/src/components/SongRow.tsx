"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Pause, Heart, Music } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { useAuth } from "@/contexts/AuthContext";
import { Song } from "@/types";
import { addFavorite, removeFavorite } from "@/lib/api";
import { useState } from "react";

interface SongRowProps {
  song: Song;
  index: number;
  queue: Song[];
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function SongRow({
  song,
  index,
  queue,
  isFavorite = false,
  onFavoriteToggle,
}: SongRowProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { session } = useAuth();
  const [liked, setLiked] = useState(isFavorite);
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, queue, index);
    }
  };

  const handleFavorite = async () => {
    if (!session?.access_token) return;
    try {
      if (liked) {
        await removeFavorite(session.access_token, song.id);
      } else {
        await addFavorite(session.access_token, song.id);
      }
      setLiked(!liked);
      onFavoriteToggle?.();
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`group grid grid-cols-[16px_4fr_2fr_minmax(60px,1fr)] gap-4 px-4 py-2 rounded-md items-center hover:bg-white/10 transition ${
        isCurrentSong ? "bg-white/10" : ""
      }`}
    >
      {/* Index / Play */}
      <div className="flex items-center justify-center">
        <span
          className={`text-sm group-hover:hidden ${
            isCurrentSong ? "text-spotify-green" : "text-spotify-light-gray"
          }`}
        >
          {index + 1}
        </span>
        <button
          onClick={handlePlay}
          className="hidden group-hover:block text-white"
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 fill-white" />
          )}
        </button>
      </div>

      {/* Song Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded bg-spotify-gray flex-shrink-0 overflow-hidden relative">
          {song.cover_url ? (
            <Image
              src={song.cover_url}
              alt={song.title}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-4 h-4 text-spotify-light-gray" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p
            className={`text-sm font-medium truncate ${
              isCurrentSong ? "text-spotify-green" : "text-white"
            }`}
          >
            {song.title}
          </p>
          {song.artist && (
            <Link
              href={`/artist/${song.artist.id}`}
              className="text-xs text-spotify-light-gray hover:underline truncate block"
            >
              {song.artist.name}
            </Link>
          )}
        </div>
      </div>

      {/* Genre */}
      <div className="hidden sm:block">
        {song.genre && (
          <Link
            href={`/genre/${song.genre.id}`}
            className="text-sm text-spotify-light-gray hover:underline"
          >
            {song.genre.name}
          </Link>
        )}
      </div>

      {/* Duration + Favorite */}
      <div className="flex items-center justify-end gap-3">
        {session && (
          <button
            onClick={handleFavorite}
            className={`opacity-0 group-hover:opacity-100 transition ${
              liked ? "opacity-100" : ""
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                liked
                  ? "text-spotify-green fill-spotify-green"
                  : "text-spotify-light-gray hover:text-white"
              }`}
            />
          </button>
        )}
        <span className="text-sm text-spotify-light-gray">
          {formatDuration(song.duration)}
        </span>
      </div>
    </div>
  );
}
