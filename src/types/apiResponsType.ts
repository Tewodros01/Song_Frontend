import { Song } from "./song";

export interface FetchSongsResponse {
  songs: Song[];
}

export interface FetchSongResponse {
  song: Song;
}

export interface CreateOrUpdateSongRequest {
  title: string;
  artist: string;
  album: string;
  duration: number;
}

export interface CreateOrUpdateSongResponse {
  success: boolean;
  message?: string;
}

export interface DeleteSongResponse {
  success: boolean;
  message?: string;
}
