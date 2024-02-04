import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { Statistics } from "../../../../types/statistics";

type statisticsState = {
  statistics: Statistics | null;
  loading: boolean;
  error: any;
};

const initialState: statisticsState = {
  statistics: null,
  loading: false,
  error: null,
};

const statisticSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    getStatisticsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload;
    },
    getStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getStatisticsStart,
  getStatisticsSuccess,
  getStatisticsFailure,
} = statisticSlice.actions;

export const selectStatistics = (state: RootState) =>
  state.statistics.statistics;

export const selectLoadingState = (state: RootState) =>
  state.statistics.loading;

export const selectErrorState = (state: RootState) => state.statistics.error;

export default statisticSlice.reducer;
