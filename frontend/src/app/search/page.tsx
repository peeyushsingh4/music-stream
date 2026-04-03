"use client";

import { useState, useEffect, useRef } from "react";
import { Song } from "@/types";
import { searchSongs } from "@/lib/api";
import SongRow from "@/components/SongRow";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchSongs(query.trim());
        setResults(data);
        setSearched(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-spotify-light-gray" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full pl-12 pr-4 py-3 rounded-full bg-spotify-gray text-white placeholder:text-spotify-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-white"
          autoFocus
        />
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 text-spotify-green animate-spin" />
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-spotify-light-gray text-lg">
            No results found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-spotify-light-gray text-sm mt-2">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
          {/* Table Header */}
          <div className="grid grid-cols-[16px_4fr_2fr_minmax(60px,1fr)] gap-4 px-4 py-2 border-b border-spotify-gray text-xs text-spotify-light-gray uppercase tracking-wider">
            <span>#</span>
            <span>Title</span>
            <span className="hidden sm:block">Genre</span>
            <span className="text-right">Duration</span>
          </div>
          <div className="mt-2">
            {results.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                index={index}
                queue={results}
              />
            ))}
          </div>
        </div>
      )}

      {!searched && !loading && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-spotify-light-gray mx-auto mb-4" />
          <p className="text-spotify-light-gray text-lg">
            Search for songs, artists, or genres
          </p>
        </div>
      )}
    </div>
  );
}
