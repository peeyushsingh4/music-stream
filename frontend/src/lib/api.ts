const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// Songs
export const getSongs = (params?: string) =>
  fetchAPI<import("@/types").Song[]>(`/songs${params ? `?${params}` : ""}`);

export const getSong = (id: string) =>
  fetchAPI<import("@/types").Song>(`/songs/${id}`);

export const searchSongs = (query: string) =>
  fetchAPI<import("@/types").Song[]>(
    `/songs/search?q=${encodeURIComponent(query)}`
  );

// Artists
export const getArtists = () =>
  fetchAPI<import("@/types").Artist[]>("/artists");

export const getArtist = (id: string) =>
  fetchAPI<import("@/types").ArtistWithSongs>(`/artists/${id}`);

// Genres
export const getGenres = () =>
  fetchAPI<import("@/types").Genre[]>("/genres");

export const getGenre = (id: string) =>
  fetchAPI<import("@/types").GenreWithSongs>(`/genres/${id}`);

// Favorites
export const getFavorites = (token: string) =>
  fetchAPI<import("@/types").Favorite[]>("/favorites", {
    headers: authHeaders(token),
  });

export const addFavorite = (token: string, songId: string) =>
  fetchAPI("/favorites", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ songId }),
  });

export const removeFavorite = (token: string, songId: string) =>
  fetchAPI(`/favorites/${songId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
