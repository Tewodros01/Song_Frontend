import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Genre } from "../../../../types/genre";
import { RootState } from "../../../../store/store";
import { GenresSort } from "../../../../types/sortby";

type InitialState = {
  genres: Genre[];
  loading: boolean;
  error: string | null;
  genresSort: GenresSort;
  searchInput: string;
};

const initialState: InitialState = {
  genres: [],
  loading: false,
  error: null,
  genresSort: "genre",
  searchInput: "",
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    getGenresStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGenresSuccess: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
      state.loading = false;
    },
    getGenresFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
    setGenresSort(state, actions: PayloadAction<GenresSort>) {
      state.genresSort = actions.payload;
    },
  },
});

export const selectLoading = (state: RootState) => state.genres.loading;
export const selectError = (state: RootState) => state.genres.error;
export const selectGenresSort = (state: RootState) => state.genres.genresSort;
export const selectSearchInput = (state: RootState) => state.genres.searchInput;

export const selectFilteredGenres = (state: RootState) => {
  const { genres, genresSort, searchInput } = state.genres;
  // Filter songs based on search input
  const filteredGenres = genres.filter((genre) =>
    genre.genre?.toUpperCase().includes(searchInput.toUpperCase())
  );
  // Sort the filtered songs based on the selected sorting option
  return filteredGenres.sort((a, b) =>
    a[genresSort] > b[genresSort] ? 1 : -1
  );
};

export const {
  getGenresStart,
  getGenresSuccess,
  getGenresFailure,
  setGenresSort,
  setSearchInput,
} = genresSlice.actions;

export default genresSlice.reducer;
