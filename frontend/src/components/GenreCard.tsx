import Link from "next/link";
import Image from "next/image";
import { Genre } from "@/types";

const genreColors: Record<string, string> = {
  pop: "from-pink-500 to-purple-600",
  rock: "from-red-600 to-orange-500",
  jazz: "from-blue-600 to-indigo-700",
  electronic: "from-cyan-500 to-blue-500",
  classical: "from-amber-600 to-yellow-500",
};

export default function GenreCard({ genre }: { genre: Genre }) {
  const gradient = genreColors[genre.slug] || "from-gray-600 to-gray-800";

  return (
    <Link
      href={`/genre/${genre.id}`}
      className={`relative h-40 rounded-lg overflow-hidden bg-gradient-to-br ${gradient} p-4 hover:scale-[1.02] transition group`}
    >
      <h3 className="text-xl font-bold text-white relative z-10">
        {genre.name}
      </h3>
      {genre.image_url && (
        <div className="absolute bottom-0 right-0 w-24 h-24 rotate-[25deg] translate-x-4 translate-y-2 opacity-80">
          <Image
            src={genre.image_url}
            alt={genre.name}
            fill
            className="object-cover rounded-md"
            sizes="96px"
          />
        </div>
      )}
    </Link>
  );
}
