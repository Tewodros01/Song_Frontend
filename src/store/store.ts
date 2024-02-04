import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import songReducer from "../app/features/songs/slice/songSlice";
import songSaga from "../app/features/songs/saga/songSaga";
import statisticReducer from "../app/features/Home/slice/statisticsSlice";
import statisticsSaga from "../app/features/Home/saga/statisticsSaga";
import artistReducer from "../app/features/songs/slice/artistSlice";
import albumReducer from "../app/features/songs/slice/albumSlice";
import artistSaga from "../app/features/songs/saga/artistSaga";
import albumSaga from "../app/features/songs/saga/albumSaga";

const rootReducer = combineReducers({
  songs: songReducer,
  statistics: statisticReducer,
  artist: artistReducer,
  album: albumReducer,
});

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(songSaga);
sagaMiddleware.run(statisticsSaga);
sagaMiddleware.run(artistSaga);
sagaMiddleware.run(albumSaga);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
