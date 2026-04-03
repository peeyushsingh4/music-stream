"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library, Heart, Radio } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Library },
  { href: "/search", label: "Search", icon: Search },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 bg-black h-full p-6 gap-6 fixed left-0 top-0 bottom-[90px] z-20">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-4">
        <Radio className="w-8 h-8 text-spotify-green" />
        <span className="text-xl font-bold text-white">Amplifier</span>
      </Link>

      {/* Main Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive
                  ? "text-white bg-spotify-gray"
                  : "text-spotify-light-gray hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <hr className="border-spotify-gray" />

      {/* Favorites */}
      <Link
        href="/favorites"
        className={`flex items-center gap-4 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
          pathname === "/favorites"
            ? "text-white bg-spotify-gray"
            : "text-spotify-light-gray hover:text-white"
        }`}
      >
        <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-purple-700 to-blue-300 flex items-center justify-center">
          <Heart className="w-3 h-3 text-white fill-white" />
        </div>
        Liked Songs
      </Link>
    </aside>
  );
}
