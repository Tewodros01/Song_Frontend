import axios, { AxiosResponse } from "axios";
import { Song } from "../types/song";
import { Album } from "../types/album";
import { Artist } from "../types/artist";
import { Statistics } from "../types/statistics";
import { API_BASE_URL } from "../constants/constants";

// Function to fetch all songs
export const fetchSongsApi = async (): Promise<Song[]> => {
  try {
    const response: AxiosResponse<Song[]> = await axios.get<Song[]>(
      `${API_BASE_URL}/songs`
    );
    return response.data;
  } catch (error) {
    // Handle network errors or response errors
    throw new Error("Failed to fetch songs. Please try again later.");
  }
};

// Function to create a new song
export const addSongApi = async (song: Song): Promise<Song> => {
  try {
    const response: AxiosResponse<Song> = await axios.post<Song>(
      `${API_BASE_URL}/songs`,
      song
    );
    return response.data;
  } catch (error) {
    // Handle network errors or response errors
    throw new Error("Failed to create song. Please try again later.");
  }
};

// Function to update an existing song
export const updateSongApi = async (updatedSong: Song): Promise<Song> => {
  try {
    const response: AxiosResponse<Song> = await axios.put<Song>(
      `${API_BASE_URL}/songs/${updatedSong.id}`,
      updatedSong
    );
    return response.data;
  } catch (error) {
    // Handle network errors or response errors
    throw new Error("Failed to update song. Please try again later.");
  }
};

// Function to delete a song
export const deleteSongApi = async (songId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/songs/${songId}`);
  } catch (error) {
    // Handle network errors or response errors
    throw new Error("Failed to delete song. Please try again later.");
  }
};

// Function to fetch all songs
export const fetchSongsArtistApi = async (): Promise<Artist[]> => {
  try {
    const response: AxiosResponse<Artist[]> = await axios.get<Artist[]>(
      `${API_BASE_URL}/songs/allArtist`
    );
    return response.data;
  } catch (error) {
    // Handle network errors or response errors
    throw new Error("Failed to fetch songs. Please try again later.");
  }
};

// Function to fetch all songs
export const fetchSongsAlbumApi = async (): Promise<Album[]> => {
  try {
    const response: AxiosResponse<Album[]> = await axios.get<Album[]>(
      `${API_BASE_URL}/songs/allAlbum`
    );
    return response.data;
  } catch (error) {
    // Handle network errors or response errors
    throw new Error("Failed to fetch songs. Please try again later.");
  }
};

// Function to fetch stastics
export const fetchstaSticsApi = async (): Promise<Statistics> => {
  try {
    const response: AxiosResponse<Statistics> = await axios.get<Statistics>(
      `${API_BASE_URL}/songs/statistics`
    );
    return response.data;
  } catch (error) {
    // Handle network errors or response errors
    throw new Error("Failed to fetch songs. Please try again later.");
  }
};
