-- ============================================
-- Music Stream - Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE genres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
  duration INTEGER NOT NULL DEFAULT 0, -- duration in seconds
  audio_url TEXT NOT NULL,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_songs_artist ON songs(artist_id);
CREATE INDEX idx_songs_genre ON songs(genre_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_songs_title_search ON songs USING gin(to_tsvector('english', title));

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Artists, genres, songs are publicly readable
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Artists are viewable by everyone" ON artists FOR SELECT USING (true);

ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Genres are viewable by everyone" ON genres FOR SELECT USING (true);

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Songs are viewable by everyone" ON songs FOR SELECT USING (true);

-- Favorites: users can only see/manage their own
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- STORAGE BUCKETS (run separately if needed)
-- ============================================
-- In Supabase Dashboard > Storage, create these buckets:
--   1. "audio"  - Public bucket for MP3 files
--   2. "covers" - Public bucket for album cover images
