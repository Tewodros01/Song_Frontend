import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    getAlbumSuccess: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
      state.loading = false;
    },
    getAlbumFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const selectAlbum = (state: RootState) => state.album.albums;
export const selectLoading = (state: RootState) => state.album.loading;
export const selectError = (state: RootState) => state.album.error;

export const { getAlbumStart, getAlbumSuccess, getAlbumFailure } =
  albumSlice.actions;
export default albumSlice.reducer;
