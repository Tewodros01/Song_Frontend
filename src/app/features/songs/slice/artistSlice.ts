import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { Artist } from "../../../../types/artist";
import { ArtistsSort } from "../../../../types/sortby";

type ArtistState = {
  artists: Artist[];
  loading: boolean;
  error: string | null;
  artistsSort: ArtistsSort;
  searchInput: string;
};

const initialState: ArtistState = {
  artists: [],
  loading: false,
  error: null,
  artistsSort: "artist",
  searchInput: "",
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
      state.artists = action.payload;
      state.loading = false;
    },
    getArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
    setArtistsSort(state, actions: PayloadAction<ArtistsSort>) {
      state.artistsSort = actions.payload;
    },
  },
});

export const selectLoading = (state: RootState) => state.artist.loading;
export const selectError = (state: RootState) => state.artist.error;
export const selectArtistsSort = (state: RootState) => state.artist.artistsSort;
export const selectSearchInput = (state: RootState) => state.artist.searchInput;

export const selectFilteredArtists = (state: RootState) => {
  const { artists, artistsSort, searchInput } = state.artist;
  // Filter songs based on search input
  const filteredArtists = artists.filter((artist) =>
    artist.artist?.toUpperCase().includes(searchInput.toUpperCase())
  );
  // Sort the filtered songs based on the selected sorting option
  return filteredArtists.sort((a, b) =>
    a[artistsSort] > b[artistsSort] ? 1 : -1
  );
};

export const {
  getArtistStart,
  getArtistSuccess,
  getArtistFailure,
  setSearchInput,
  setArtistsSort,
} = artistSlice.actions;
export default artistSlice.reducer;
