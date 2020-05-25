import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga(action){
  yield localStorage.removeItem('token'); // the step will be executed and it will wait for it to finish
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put({
    type: actionTypes.AUTH_LOGOUT
  })
}