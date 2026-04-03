"use client";

import Image from "next/image";
import { usePlayer } from "@/contexts/PlayerContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
  } = usePlayer();

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-spotify-dark-gray border-t border-spotify-gray z-50 flex items-center justify-center">
        <p className="text-spotify-light-gray text-sm">
          Select a song to start playing
        </p>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-spotify-dark-gray border-t border-spotify-gray z-50 px-4 grid grid-cols-3 items-center">
      {/* Song Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-14 h-14 rounded bg-spotify-gray flex-shrink-0 overflow-hidden relative">
          {currentSong.cover_url ? (
            <Image
              src={currentSong.cover_url}
              alt={currentSong.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-6 h-6 text-spotify-light-gray" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white font-medium truncate">
            {currentSong.title}
          </p>
          <p className="text-xs text-spotify-light-gray truncate">
            {currentSong.artist?.name}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="text-spotify-light-gray hover:text-white transition"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black fill-black" />
            ) : (
              <Play className="w-5 h-5 text-black fill-black ml-0.5" />
            )}
          </button>
          <button
            onClick={next}
            className="text-spotify-light-gray hover:text-white transition"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-[11px] text-spotify-light-gray w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-1 bg-spotify-gray rounded-full cursor-pointer group relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              seek(percent * duration);
            }}
          >
            <div
              className="h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>
          <span className="text-[11px] text-spotify-light-gray w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
          className="text-spotify-light-gray hover:text-white transition"
        >
          {volume === 0 ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        <div
          className="w-24 h-1 bg-spotify-gray rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            setVolume(Math.max(0, Math.min(1, percent)));
          }}
        >
          <div
            className="h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
