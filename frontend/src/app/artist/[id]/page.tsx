"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArtistWithSongs } from "@/types";
import { getArtist } from "@/lib/api";
import SongRow from "@/components/SongRow";
import { Loader2, User } from "lucide-react";

export default function ArtistPage() {
  const params = useParams();
  const [artist, setArtist] = useState<ArtistWithSongs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtist() {
      try {
        const data = await getArtist(params.id as string);
        setArtist(data);
      } catch (error) {
        console.error("Failed to fetch artist:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArtist();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-spotify-green animate-spin" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="text-center py-16">
        <p className="text-spotify-light-gray text-lg">Artist not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Artist Header */}
      <div className="flex items-end gap-6 mb-8 -mx-6 -mt-4 px-6 pt-12 pb-6 bg-gradient-to-b from-spotify-gray/80 to-transparent">
        <div className="w-48 h-48 rounded-full overflow-hidden bg-spotify-gray flex-shrink-0 relative shadow-2xl">
          {artist.image_url ? (
            <Image
              src={artist.image_url}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="192px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-20 h-20 text-spotify-light-gray" />
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-white uppercase tracking-wider">
            Artist
          </p>
          <h1 className="text-5xl font-bold text-white mt-2">{artist.name}</h1>
          {artist.bio && (
            <p className="text-sm text-spotify-light-gray mt-3 max-w-lg">
              {artist.bio}
            </p>
          )}
          <p className="text-sm text-spotify-light-gray mt-2">
            {artist.songs.length} song{artist.songs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Songs */}
      {artist.songs.length > 0 && (
        <div>
          <div className="grid grid-cols-[16px_4fr_2fr_minmax(60px,1fr)] gap-4 px-4 py-2 border-b border-spotify-gray text-xs text-spotify-light-gray uppercase tracking-wider">
            <span>#</span>
            <span>Title</span>
            <span className="hidden sm:block">Genre</span>
            <span className="text-right">Duration</span>
          </div>
          <div className="mt-2">
            {artist.songs.map((song, index) => (
              <SongRow
                key={song.id}
                song={{ ...song, artist }}
                index={index}
                queue={artist.songs.map((s) => ({ ...s, artist }))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
