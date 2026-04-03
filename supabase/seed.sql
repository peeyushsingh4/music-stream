-- ============================================
-- Music Stream - Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================
-- NOTE: audio_url values below are placeholders.
-- Replace them with your actual Supabase Storage URLs
-- after uploading MP3s from https://freemusicarchive.org

-- ============================================
-- GENRES
-- ============================================
INSERT INTO genres (id, name, slug, image_url) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Pop', 'pop', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300'),
  ('a1000000-0000-0000-0000-000000000002', 'Rock', 'rock', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300'),
  ('a1000000-0000-0000-0000-000000000003', 'Jazz', 'jazz', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300'),
  ('a1000000-0000-0000-0000-000000000004', 'Electronic', 'electronic', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300'),
  ('a1000000-0000-0000-0000-000000000005', 'Classical', 'classical', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300');

-- ============================================
-- ARTISTS
-- ============================================
INSERT INTO artists (id, name, bio, image_url) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Luna Echo', 'An indie pop artist blending dreamy vocals with electronic beats.', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300'),
  ('b1000000-0000-0000-0000-000000000002', 'The Voltage', 'High-energy rock band from Seattle with a garage sound.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'),
  ('b1000000-0000-0000-0000-000000000003', 'Miles Blue', 'Smooth jazz pianist inspired by classic Blue Note recordings.', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300'),
  ('b1000000-0000-0000-0000-000000000004', 'SynthWave', 'Retro-futuristic electronic producer from Berlin.', 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300'),
  ('b1000000-0000-0000-0000-000000000005', 'Aria Strings', 'Classical ensemble performing modern arrangements.', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300'),
  ('b1000000-0000-0000-0000-000000000006', 'Neon Pulse', 'Electronic duo known for their festival-ready anthems.', 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300'),
  ('b1000000-0000-0000-0000-000000000007', 'Ruby Fox', 'Pop vocalist with a powerful range and catchy hooks.', 'https://images.unsplash.com/photo-1529518969858-8baa65152fc8?w=300'),
  ('b1000000-0000-0000-0000-000000000008', 'Stone Garden', 'Alternative rock group with poetic lyrics.', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300');

-- ============================================
-- SONGS
-- Replace audio_url with your Supabase Storage URLs
-- Format: https://<project>.supabase.co/storage/v1/object/public/audio/<filename>.mp3
-- ============================================
INSERT INTO songs (id, title, artist_id, genre_id, duration, audio_url, cover_url) VALUES
  -- Pop
  ('c1000000-0000-0000-0000-000000000001', 'Midnight Glow', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 214, '/audio/midnight-glow.mp3', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'),
  ('c1000000-0000-0000-0000-000000000002', 'Daydream', 'b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001', 198, '/audio/daydream.mp3', 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300'),
  ('c1000000-0000-0000-0000-000000000003', 'Golden Hour', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 245, '/audio/golden-hour.mp3', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300'),
  ('c1000000-0000-0000-0000-000000000004', 'Sugar Rush', 'b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001', 187, '/audio/sugar-rush.mp3', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300'),
  -- Rock
  ('c1000000-0000-0000-0000-000000000005', 'Thunder Road', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 267, '/audio/thunder-road.mp3', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300'),
  ('c1000000-0000-0000-0000-000000000006', 'Breaking Walls', 'b1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000002', 302, '/audio/breaking-walls.mp3', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300'),
  ('c1000000-0000-0000-0000-000000000007', 'Electric Rebel', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 234, '/audio/electric-rebel.mp3', 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300'),
  ('c1000000-0000-0000-0000-000000000008', 'Fading Light', 'b1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000002', 278, '/audio/fading-light.mp3', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300'),
  -- Jazz
  ('c1000000-0000-0000-0000-000000000009', 'Blue Monday', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 356, '/audio/blue-monday.mp3', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300'),
  ('c1000000-0000-0000-0000-000000000010', 'Velvet Night', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 289, '/audio/velvet-night.mp3', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300'),
  ('c1000000-0000-0000-0000-000000000011', 'Smooth Operator', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 312, '/audio/smooth-operator.mp3', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300'),
  ('c1000000-0000-0000-0000-000000000012', 'Late Night Sax', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 274, '/audio/late-night-sax.mp3', 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300'),
  -- Electronic
  ('c1000000-0000-0000-0000-000000000013', 'Neon Dreams', 'b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004', 223, '/audio/neon-dreams.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300'),
  ('c1000000-0000-0000-0000-000000000014', 'Digital Sunrise', 'b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000004', 198, '/audio/digital-sunrise.mp3', 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300'),
  ('c1000000-0000-0000-0000-000000000015', 'Pulse Wave', 'b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004', 256, '/audio/pulse-wave.mp3', 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300'),
  ('c1000000-0000-0000-0000-000000000016', 'Cyber City', 'b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000004', 234, '/audio/cyber-city.mp3', 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300'),
  -- Classical
  ('c1000000-0000-0000-0000-000000000017', 'Morning Sonata', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005', 423, '/audio/morning-sonata.mp3', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300'),
  ('c1000000-0000-0000-0000-000000000018', 'Autumn Waltz', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005', 387, '/audio/autumn-waltz.mp3', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300'),
  ('c1000000-0000-0000-0000-000000000019', 'Twilight Concerto', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005', 456, '/audio/twilight-concerto.mp3', 'https://images.unsplash.com/photo-1519139270028-4cde344e22c8?w=300'),
  ('c1000000-0000-0000-0000-000000000020', 'Winter Prelude', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005', 345, '/audio/winter-prelude.mp3', 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300');
