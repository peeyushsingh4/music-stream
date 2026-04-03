"use client";

import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Song } from "@/types";

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  queueIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

type PlayerAction =
  | { type: "SET_SONG"; payload: { song: Song; queue?: Song[]; index?: number } }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_VOLUME"; payload: number };

const initialState: PlayerState = {
  currentSong: null,
  queue: [],
  queueIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "SET_SONG":
      return {
        ...state,
        currentSong: action.payload.song,
        queue: action.payload.queue || state.queue,
        queueIndex: action.payload.index ?? 0,
        isPlaying: true,
        currentTime: 0,
      };
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "NEXT": {
      const nextIndex = state.queueIndex + 1;
      if (nextIndex >= state.queue.length) return { ...state, isPlaying: false };
      return {
        ...state,
        currentSong: state.queue[nextIndex],
        queueIndex: nextIndex,
        isPlaying: true,
        currentTime: 0,
      };
    }
    case "PREV": {
      // If more than 3 seconds in, restart current song
      if (state.currentTime > 3) return { ...state, currentTime: 0 };
      const prevIndex = state.queueIndex - 1;
      if (prevIndex < 0) return { ...state, currentTime: 0 };
      return {
        ...state,
        currentSong: state.queue[prevIndex],
        queueIndex: prevIndex,
        isPlaying: true,
        currentTime: 0,
      };
    }
    case "SET_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    default:
      return state;
  }
}

interface PlayerContextType extends PlayerState {
  playSong: (song: Song, queue?: Song[], index?: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio element with state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.currentSong) {
      audio.src = state.currentSong.audio_url;
      if (state.isPlaying) {
        audio.play().catch(() => {});
      }
    }
  }, [state.currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [state.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = state.volume;
  }, [state.volume]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => dispatch({ type: "SET_TIME", payload: audio.currentTime });
    const onDurationChange = () => dispatch({ type: "SET_DURATION", payload: audio.duration });
    const onEnded = () => dispatch({ type: "NEXT" });

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playSong = useCallback((song: Song, queue?: Song[], index?: number) => {
    dispatch({ type: "SET_SONG", payload: { song, queue, index } });
  }, []);

  const play = useCallback(() => dispatch({ type: "PLAY" }), []);
  const pause = useCallback(() => dispatch({ type: "PAUSE" }), []);
  const togglePlay = useCallback(() => {
    dispatch({ type: state.isPlaying ? "PAUSE" : "PLAY" });
  }, [state.isPlaying]);
  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      dispatch({ type: "SET_TIME", payload: time });
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: "SET_VOLUME", payload: volume });
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playSong,
        play,
        pause,
        togglePlay,
        next,
        prev,
        seek,
        setVolume,
        audioRef,
      }}
    >
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
