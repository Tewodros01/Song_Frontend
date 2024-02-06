import { call, put, takeEvery } from "redux-saga/effects";
import {
  getArtistFailure,
  getArtistStart,
  getArtistSuccess,
} from "../slice/artistSlice";
import { fetchSongsArtistApi } from "../../../../api/api";

function* fetchArtist(): Generator<any, void, any> {
  try {
    put(getArtistStart());
    const artist = yield call(fetchSongsArtistApi);
    yield put(getArtistSuccess(artist));
  } catch (error: any) {
    yield put(getArtistFailure(error.message));
  }
}

function* artistSaga() {
  yield takeEvery("artists/getArtistStart", fetchArtist);
}

export default artistSaga;
