"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Music, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 rounded-lg bg-spotify-dark-gray">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Music className="w-10 h-10 text-spotify-green" />
          <span className="text-2xl font-bold text-white">Music Stream</span>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Log in to Music Stream
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 rounded-md bg-spotify-gray text-white placeholder:text-spotify-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-white border border-transparent hover:border-spotify-light-gray/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-md bg-spotify-gray text-white placeholder:text-spotify-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-white border border-transparent hover:border-spotify-light-gray/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-spotify-green text-black font-bold text-sm hover:scale-[1.02] hover:bg-spotify-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Log In
          </button>
        </form>

        <hr className="my-8 border-spotify-gray" />

        <p className="text-center text-sm text-spotify-light-gray">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-white underline hover:text-spotify-green"
          >
            Sign up for Music Stream
          </Link>
        </p>
      </div>
    </div>
  );
}
