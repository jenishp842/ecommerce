/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actionTypes from '../constants/ActionTypes';
import * as actions from '../actions/index';
import { reportsAPI } from '../services';

function* getTikReportsInfo(action) {
  const { payload } = action;
  let url = '';
  if (payload === null) {
    url = '/';
  } else {
    const { startDate, endDate } = payload;
    url = `/?startDate=${startDate}&endDate=${endDate}`;
  }

  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    yield put(actions.tikReportsInitialization());
    const response = yield reportsAPI
      .get(url,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          },
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.tikReportsSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.tikReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.tikReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.tikReportsError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* getTorReportsInfo(action) {
  const { payload } = action;
  let torStartDate;
  let torEndDate;
  let torFilter;
  let torFilterArray;
  if (payload === null) {
    torStartDate = '';
    torEndDate = '';
    torFilter = '';
    torFilterArray = [];
  } else {
    const {
      startDate, endDate, filter, filterData,
    } = payload;
    torStartDate = startDate;
    torEndDate = endDate;
    torFilter = filter;
    torFilterArray = filterData;
  }

  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    yield put(actions.torReportsInitialization());
    const response = yield reportsAPI
      .post('/provider-report', {
        startDate: torStartDate,
        endDate: torEndDate,
        filter: torFilter,
        filterArray: torFilterArray,
      },
      {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.torReportsSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.torReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.torReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.torReportsError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* getRoleInfo(action) {
  const { keyword, filter } = action.payload;

  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    const response = yield reportsAPI
      .get(`${filter}?keyword=${keyword}`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          },
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.TorfilterRoleSuccess({ data: response.data.data }));
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      // yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.torReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.torReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.torReportsError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* getTeamReportsInfo(action) {
  const { payload } = action;
  let torStartDate;
  let torEndDate;
  let torFilter;
  let torFilterArray;
  if (payload === null) {
    torStartDate = '';
    torEndDate = '';
    torFilter = '';
    torFilterArray = [];
  } else {
    const {
      startDate, endDate, filter, filterData,
    } = payload;
    torStartDate = startDate;
    torEndDate = endDate;
    torFilter = filter;
    torFilterArray = filterData;
  }

  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    yield put(actions.torReportsInitialization());
    const response = yield reportsAPI
      .post('/team-report', {
        startDate: torStartDate,
        endDate: torEndDate,
        filter: torFilter,
        filterArray: torFilterArray,
      },
      {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.torReportsSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.torReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.torReportsError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.torReportsError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.TIK_REPORTS, getTikReportsInfo);
  yield takeEvery(actionTypes.TOR_REPORTS_ROLE, getRoleInfo);
  yield takeEvery(actionTypes.TOR_REPORTS, getTorReportsInfo);
  yield takeEvery(actionTypes.TEAM_REPORTS, getTeamReportsInfo);
}
