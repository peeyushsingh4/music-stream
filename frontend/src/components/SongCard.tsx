"use client";

import Image from "next/image";
import { Play, Pause, Music } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Song } from "@/types";

const CARD_COLORS = [
  "from-pink-600 to-purple-700",
  "from-blue-600 to-cyan-500",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-red-600 to-pink-600",
  "from-violet-600 to-indigo-600",
  "from-teal-500 to-cyan-600",
  "from-yellow-500 to-orange-500",
];

function getSongColor(id: string): string {
  const charCode = id.charCodeAt(id.length - 1);
  return CARD_COLORS[charCode % CARD_COLORS.length];
}

interface SongCardProps {
  song: Song;
  queue?: Song[];
  index?: number;
}

export default function SongCard({ song, queue, index = 0 }: SongCardProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, queue || [song], index);
    }
  };

  return (
    <div className="group p-4 rounded-md bg-spotify-dark-gray hover:bg-spotify-gray transition cursor-pointer">
      <div className="relative mb-4">
        <div className="aspect-square rounded-md overflow-hidden relative">
          {song.cover_url ? (
            <Image
              src={song.cover_url}
              alt={song.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${getSongColor(song.id)} flex items-center justify-center`}
            >
              <Music className="w-12 h-12 text-white/70" />
            </div>
          )}
        </div>
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-green flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105"
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-6 h-6 text-black fill-black" />
          ) : (
            <Play className="w-6 h-6 text-black fill-black ml-0.5" />
          )}
        </button>
      </div>
      <p className="text-sm font-semibold text-white truncate">{song.title}</p>
      <p className="text-xs text-spotify-light-gray mt-1 truncate">
        {song.artist?.name}
      </p>
    </div>
  );
}
