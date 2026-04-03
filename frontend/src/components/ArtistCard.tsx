import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { Artist } from "@/types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artist/${artist.id}`}
      className="group p-4 rounded-md bg-spotify-dark-gray hover:bg-spotify-gray transition"
    >
      <div className="aspect-square rounded-full overflow-hidden bg-spotify-gray mb-4 relative">
        {artist.image_url ? (
          <Image
            src={artist.image_url}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-12 h-12 text-spotify-light-gray" />
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-white truncate text-center">
        {artist.name}
      </p>
      <p className="text-xs text-spotify-light-gray mt-1 text-center">
        Artist
      </p>
    </Link>
  );
}
