import axios, { AxiosResponse } from "axios";
import { Song } from "../types/song";
import { Album } from "../types/album";
import { Artist } from "../types/artist";
import { Statistics } from "../types/statistics";
import { API_BASE_URL } from "../constants/constants";

interface ApiTypes {
  method: "GET" | "POST" | "PUT" | "DELETE";
  route: string;
  payload?: any;
}

async function fetchFromApi<T>({
  method,
  route,
  payload,
}: ApiTypes): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios({
      method: method,
      url: route,
      data: payload,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch data from ${route}. Please try again later.`
    );
  }
}

// Function to fetch all songs
export const fetchSongsApi = async (): Promise<Song[]> => {
  return fetchFromApi<Song[]>({
    method: "GET",
    route: `${API_BASE_URL}/songs`,
  });
};

// Function to create a new song
export const addSongApi = async (song: Song): Promise<Song> => {
  return fetchFromApi<Song>({
    method: "POST",
    route: `${API_BASE_URL}/songs`,
    payload: song,
  });
};

// Function to update an existing song
export const updateSongApi = async (updatedSong: Song): Promise<Song> => {
  return fetchFromApi<Song>({
    method: "PUT",
    route: `${API_BASE_URL}/songs/${updatedSong.id}`,
    payload: updatedSong,
  });
};

// Function to delete a song
export const deleteSongApi = async (songId: string): Promise<string> => {
  await axios.delete(`${API_BASE_URL}/songs/${songId}`);
  return songId;
};

// Function to fetch all Artists
export const fetchSongsArtistApi = async (): Promise<Artist[]> => {
  return fetchFromApi<Artist[]>({
    method: "GET",
    route: `${API_BASE_URL}/songs/allArtist`,
  });
};

// Function to fetch all Albums
export const fetchSongsAlbumApi = async (): Promise<Album[]> => {
  return fetchFromApi<Album[]>({
    method: "GET",
    route: `${API_BASE_URL}/songs/allAlbum`,
  });
};

// Function to fetch Genres
export const fetchSongsGenresApi = async (): Promise<Album[]> => {
  return fetchFromApi<Album[]>({
    method: "GET",
    route: `${API_BASE_URL}/songs/allGenre`,
  });
};

// Function to fetch statistics
export const fetchstaSticsApi = async (): Promise<Statistics> => {
  return fetchFromApi<Statistics>({
    method: "GET",
    route: `${API_BASE_URL}/songs/statistics`,
  });
};
