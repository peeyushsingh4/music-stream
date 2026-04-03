import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amplifier",
  description: "Amplifier — your personal music streaming experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PlayerProvider>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 md:ml-60 pb-[90px] overflow-y-auto bg-gradient-to-b from-spotify-gray to-spotify-black min-h-screen">
                <Navbar />
                <div className="px-6 py-4">{children}</div>
              </main>
            </div>
            <MusicPlayer />
          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
