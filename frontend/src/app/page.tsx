"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Song, Genre } from "@/types";
import { getSongs, getGenres } from "@/lib/api";
import SongCard from "@/components/SongCard";
import GenreCard from "@/components/GenreCard";
import { Loader2, Play, Pause, Music } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { DEMO_SONGS, DEMO_GENRES } from "@/lib/demoData";

const SONG_COLORS = [
  "from-pink-600 to-purple-700",
  "from-blue-600 to-cyan-500",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-red-600 to-pink-600",
  "from-violet-600 to-indigo-600",
  "from-teal-500 to-cyan-600",
  "from-yellow-500 to-orange-500",
];

function QuickPickCard({
  song,
  allSongs,
  index,
}: {
  song: Song;
  allSongs: Song[];
  index: number;
}) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;
  const colorClass = SONG_COLORS[index % SONG_COLORS.length];

  const handleClick = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, allSongs, index);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-0 bg-white/10 hover:bg-white/20 rounded-md overflow-hidden transition-all w-full text-left"
    >
      <div
        className={`w-16 h-16 flex-shrink-0 bg-gradient-to-br ${colorClass} flex items-center justify-center relative overflow-hidden`}
      >
        {song.cover_url ? (
          <Image
            src={song.cover_url}
            alt={song.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <Music className="w-7 h-7 text-white/80" />
        )}
      </div>
      <span className="flex-1 text-sm font-semibold text-white truncate px-4">
        {song.title}
      </span>
      <div
        className={`w-10 h-10 rounded-full bg-spotify-green flex items-center justify-center shadow-xl mr-3 flex-shrink-0 transition-all duration-200 ${
          isCurrentSong && isPlaying
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
      >
        {isCurrentSong && isPlaying ? (
          <Pause className="w-4 h-4 text-black fill-black" />
        ) : (
          <Play className="w-4 h-4 text-black fill-black ml-0.5" />
        )}
      </div>
    </button>
  );
}

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
        setSongs(songsData.length > 0 ? songsData : DEMO_SONGS);
        setGenres(genresData.length > 0 ? genresData : DEMO_GENRES);
      } catch {
        setSongs(DEMO_SONGS);
        setGenres(DEMO_GENRES);
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

  const quickPickSongs = songs.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Greeting + Quick Picks */}
      <section>
        <h1 className="text-3xl font-bold text-white mb-5">{getGreeting()}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {quickPickSongs.map((song, index) => (
            <QuickPickCard
              key={song.id}
              song={song}
              allSongs={songs}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Browse Genres */}
      {genres.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Browse by Genre</h2>
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
          <h2 className="text-2xl font-bold text-white mb-4">Recently Added</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {songs.map((song, index) => (
              <SongCard key={song.id} song={song} queue={songs} index={index} />
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
