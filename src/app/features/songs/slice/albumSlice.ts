import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Album } from "../../../../types/album";
import { RootState } from "../../../../store/store";
import { AlbumsSort } from "../../../../types/sortby";

type InitialState = {
  albums: Album[];
  loading: boolean;
  error: string | null;
  albumsSort: AlbumsSort;
  searchInput: string;
};

const initialState: InitialState = {
  albums: [],
  loading: false,
  error: null,
  albumsSort: "album",
  searchInput: "",
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    getAlbumStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAlbumSuccess: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
      state.loading = false;
    },
    getAlbumFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
    setAlbumsSort(state, actions: PayloadAction<AlbumsSort>) {
      state.albumsSort = actions.payload;
    },
  },
});

export const selectLoading = (state: RootState) => state.album.loading;
export const selectError = (state: RootState) => state.album.error;
export const selectAlbumsSort = (state: RootState) => state.album.albumsSort;
export const selectSearchInput = (state: RootState) => state.album.searchInput;

export const selectFilteredAlbums = (state: RootState) => {
  const { albums, albumsSort, searchInput } = state.album;
  // Filter songs based on search input
  const filteredAlbums = albums.filter((album) =>
    album.album?.toUpperCase().includes(searchInput.toUpperCase())
  );
  // Sort the filtered songs based on the selected sorting option
  return filteredAlbums.sort((a, b) =>
    a[albumsSort] > b[albumsSort] ? 1 : -1
  );
};

export const {
  getAlbumStart,
  getAlbumSuccess,
  getAlbumFailure,
  setSearchInput,
  setAlbumsSort,
} = albumSlice.actions;

export default albumSlice.reducer;
