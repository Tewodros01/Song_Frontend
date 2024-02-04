import { call, put, takeEvery } from "redux-saga/effects";
import { fetchstaSticsApi } from "../../../../api/api";
import {
  getStatisticsFailure,
  getStatisticsSuccess,
} from "../slice/statisticsSlice";

function* fetchStatistics(): Generator<any, void, any> {
  try {
    const statistics = yield call(fetchstaSticsApi);
    yield put(getStatisticsSuccess(statistics));
  } catch (error: any) {
    yield put(getStatisticsFailure(error.message));
  }
}
function* statisticsSaga() {
  yield takeEvery("statistics/getStatisticsStart", fetchStatistics);
}

export default statisticsSaga;
