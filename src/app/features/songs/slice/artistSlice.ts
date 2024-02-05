import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { Artist } from "../../../../types/artist";

type ArtistState = {
  artists: Artist[];
  loading: boolean;
  error: any;
};

const initialState: ArtistState = {
  artists: [],
  loading: false,
  error: "",
};
const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    getArtistStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getArtistSuccess: (state, action: PayloadAction<Artist[]>) => {
      state.loading = false;
      state.artists = action.payload;
    },
    getArtistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectArtist = (state: RootState) => state.artist.artists;
export const selectLoading = (state: RootState) => state.artist.loading;
export const selectError = (state: RootState) => state.artist.error;

export const { getArtistStart, getArtistSuccess, getArtistFailure } =
  artistSlice.actions;
export default artistSlice.reducer;
