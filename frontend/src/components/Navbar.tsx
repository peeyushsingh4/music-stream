"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User, ChevronLeft, ChevronRight } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-spotify-black/90 backdrop-blur-sm">
      {/* Navigation arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => router.forward()}
          className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Auth section */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-spotify-light-gray hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-spotify-gray text-white text-sm font-semibold hover:bg-spotify-light-gray/20 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="text-sm text-spotify-light-gray font-semibold hover:text-white transition"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition"
            >
              <LogIn className="w-4 h-4" />
              Log in
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
