/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
import { takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import * as actions from '../actions/index';
import { user, reportsAPI } from '../services';

function* getReceiverAPI(action) {
  const { payload } = action;
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    const response = yield user
      .get(`/receiver-list?search=`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.toReceiverAPISuccess({ data: response.data.data }));
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.toReceiverAPIError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.toReceiverAPIError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.toReceiverAPIError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* getProviderAPI(action) {
  const { payload } = action;
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    const response = yield reportsAPI
      .get(`/user?keyword=`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.toProviderAPISuccess({ data: response.data.data }));
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.toProviderAPIError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.toProviderAPIError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.toProviderAPIError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* submitFormData(action) {
  const { payload, advanceSearchValueData } = action;
  try {
    yield put(actions.advanceSearchInitialization());
    yield put(actions.advanceSearchValues(payload));
    const response = yield user
      .post(`/document-search`, { ...payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.submitAdvanceSearchSuccess({ data: response.data.data, advanceSearchValueData }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.submitAdvanceSearchError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.submitAdvanceSearchError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.submitAdvanceSearchError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* simpleFormData(action) {
  const { payload } = action;
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    yield put(actions.simpleSearchInitialization());
    yield put(actions.simpleSearchValue(payload));
    const response = yield user
      .get(`/document-search?keyword=${payload}`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.submitAdvanceSearchSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.submitAdvanceSearchError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.submitAdvanceSearchError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.submitAdvanceSearchError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}
export default function* rootsaga() {
  yield takeEvery(actionTypes.TO_RECEIVER_API, getReceiverAPI);
  yield takeEvery(actionTypes.FROM_PROVIDER_API, getProviderAPI);
  yield takeEvery(actionTypes.PROVIDER_ADVANCESEARCH, submitFormData);
  yield takeEvery(actionTypes.PROVIDER_SIMPLESEARCH, simpleFormData);
}
