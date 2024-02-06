import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import songReducer from "../app/features/songs/slice/songSlice";
import statisticReducer from "../app/features/Home/slice/statisticsSlice";
import artistReducer from "../app/features/songs/slice/artistSlice";
import albumReducer from "../app/features/songs/slice/albumSlice";
import genresReducer from "../app/features/songs/slice/genresSlice";
import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
  songs: songReducer,
  statistics: statisticReducer,
  artist: artistReducer,
  album: albumReducer,
  genres: genresReducer,
});

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
