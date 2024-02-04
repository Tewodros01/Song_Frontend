import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAlbumFailure,
  getAlbumStart,
  getAlbumSuccess,
} from "../slice/albumSlice";
import { fetchSongsAlbumApi } from "../../../../api/api";

function* fetchAlbums(): Generator<any, void, any> {
  try {
    put(getAlbumStart());
    const albums = yield call(fetchSongsAlbumApi);
    yield put(getAlbumSuccess(albums));
  } catch (error: any) {
    yield put(getAlbumFailure(error.message));
  }
}
function* albumSaga() {
  yield takeEvery("albums/getAlbumStart", fetchAlbums);
}

export default albumSaga;
