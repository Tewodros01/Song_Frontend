import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../../../types/song";
import { RootState } from "../../../../store/store";
import { SongsSort } from "../../../../types/sortby";

interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  songsSort: SongsSort;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  songsSort: "createdAt",
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.error = null;
      state.loading = false;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      state.error = null;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSongsSort(state, action: PayloadAction<SongsSort>) {
      state.songsSort = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  setSongsSort,
} = songSlice.actions;

export const selectSongById = (songId: string) => (state: RootState) =>
  state.songs.songs.find((song) => song.id === songId);
export const selectSongs = (state: RootState) => state.songs.songs;
export const selectSongsSort = (state: RootState) => state.songs.songsSort;
export const selectLoading = (state: RootState) => state.songs.loading;
export const selectError = (state: RootState) => state.songs.error;

export const selectSortedSongs = (state: RootState) => {
  const { songs, songsSort } = state.songs;
  return songs.slice().sort((a, b) => {
    if (songsSort === "createdAt") {
      // Sort by createdAt
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    } else {
      // Sort by other properties
      return (a[songsSort] || "").localeCompare(b[songsSort] || "");
    }
  });
};

export default songSlice.reducer;
