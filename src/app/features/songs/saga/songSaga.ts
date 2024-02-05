import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSongsApi,
  addSongApi,
  updateSongApi,
  deleteSongApi,
} from "../../../../api/api";
import {
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
} from "../slice/songSlice";
import { Song } from "../../../../types/song";

function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    put(fetchSongsStart());
    const songs: Song[] = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(songs));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSongSaga(action: PayloadAction<Song>): Generator<any, void, any> {
  try {
    const newSong: Song = yield call(addSongApi, action.payload);
    yield put(addSongSuccess(newSong));
  } catch (error: any) {
    yield put(addSongFailure(error.message));
  }
}

function* updateSongSaga(
  action: PayloadAction<Song>
): Generator<any, void, any> {
  try {
    const updatedSong: Song = yield call(updateSongApi, action.payload);
    yield put(updateSongSuccess(updatedSong));
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSongSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    yield call(deleteSongApi, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteSongFailure(error.message));
  }
}

function* songSaga() {
  yield takeLatest("songs/fetchSongsStart", fetchSongsSaga);
  yield takeLatest("songs/addSongStart", addSongSaga);
  yield takeLatest("songs/updateSongStart", updateSongSaga);
  yield takeLatest("songs/deleteSongStart", deleteSongSaga);
}

export default songSaga;
