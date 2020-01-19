import {
  all,
  // takeLatest,
} from 'redux-saga/effects';

// import { SessionActions } from '@/store/ducks/session';
// import { getSessionRequest } from './session';

export default function* rootSaga() {
  yield all([
    // takeLatest(SessionActions.getSessionRequest, getSessionRequest),
  ]);
}
