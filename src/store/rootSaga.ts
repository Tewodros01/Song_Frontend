import { all } from "redux-saga/effects";
import songSaga from "../app/features/songs/saga/songSaga";
import statisticsSaga from "../app/features/Home/saga/statisticsSaga";
import artistSaga from "../app/features/songs/saga/artistSaga";
import albumSaga from "../app/features/songs/saga/albumSaga";
import genresSaga from "../app/features/songs/saga/genersSaga";

export default function* rootSaga() {
  yield all([
    songSaga(),
    statisticsSaga(),
    artistSaga(),
    albumSaga(),
    genresSaga(),
  ]);
}
