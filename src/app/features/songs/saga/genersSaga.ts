import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSongsGenresApi } from "../../../../api/api";
import {
  getGenresStart,
  getGenresSuccess,
  getGenresFailure,
} from "../slice/genresSlice";

function* fetchGenres(): Generator<any, void, any> {
  try {
    put(getGenresStart());
    const genres = yield call(fetchSongsGenresApi);
    yield put(getGenresSuccess(genres));
  } catch (error: any) {
    yield put(getGenresFailure(error.message));
  }
}
function* genresSaga() {
  yield takeEvery("genres/getGenresStart", fetchGenres);
}

export default genresSaga;
