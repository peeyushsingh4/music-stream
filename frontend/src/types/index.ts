export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  created_at: string;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  genre_id: string;
  duration: number;
  audio_url: string;
  cover_url: string | null;
  created_at: string;
  artist?: Artist;
  genre?: Genre;
}

export interface Favorite {
  id: string;
  user_id: string;
  song_id: string;
  created_at: string;
  song?: Song;
}

export interface ArtistWithSongs extends Artist {
  songs: Song[];
}

export interface GenreWithSongs extends Genre {
  songs: Song[];
}
