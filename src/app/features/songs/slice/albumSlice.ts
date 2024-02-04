import { createSlice } from "@reduxjs/toolkit";
import { Album } from "../../../../types/album";
import { RootState } from "../../../../store/store";

type InitialState = {
  albums: Album[];
  loading: boolean;
  error: any;
};

const initialState: InitialState = {
  albums: [],
  loading: false,
  error: "",
};
const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    getAlbumStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAlbumSuccess: (state, action) => {
      state.loading = false;
      state.albums = action.payload;
    },
    getAlbumFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectAlbum = (state: RootState) => state.album.albums;
export const selectLoading = (state: RootState) => state.album.loading;
export const selectError = (state: RootState) => state.album.error;

export const { getAlbumStart, getAlbumSuccess, getAlbumFailure } =
  albumSlice.actions;
export default albumSlice.reducer;
