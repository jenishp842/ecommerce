/* eslint-disable import/named */
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
import { toast } from 'react-toastify';
import * as actionTypes from '../constants/ActionTypes';
import * as actions from '../actions/index';
import { user3, user } from '../services';

function* getUserListInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    // yield put(actions.listUserInitialization());
    const response = yield user
      .get('/provider-user',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getUserListingTeamSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.getUserListingTeamError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.getUserListingTeamError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.getUserListingTeamError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* getTeamListInfo(action) {
  try {
    const response = yield user3
      .get('/team-test')
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getTeamDataListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listTeamError());
      toast.error(response.response.data.msg);
    } else {
      yield put(actions.listTeamError());
      toast.error(response.response.data.msg);
    }
  } catch (error) {
    yield put(actions.listTeamError());
  }
}

// Delete
function* deleteTeamListInfo(action) {
  const { payload } = action;
  try {
    yield put(actions.deleteTeamInitialization());
    const response = yield user3
      .delete('/team-test', { data: payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.deleteTeamSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.deleteTeamError());
      //   yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.deleteTeamError());
      toast.error(response.response.data.msg);
      // yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    toast.error(response.response.data.msg);
    yield put(actions.deleteTeamError());
    // yield put(actions.error({ error: response.response.data.message }));
  }
}

// ADD
function* addTeamListInfo(action) {
  const { payload } = action;
  try {
    yield put(actions.addTeamInitialization());
    const response = yield user3
      .post('/team-test', { ...payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.addTeamSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.addTeamError());
    } else {
      toast.error(response.response.data.msg);
      yield put(actions.addTeamError());
    }
  } catch (error) {
    yield put(actions.addTeamError());
  }
}

// EDIT
function* editTeamListInfo(action) {
  const { payload } = action;
  try {
    yield put(actions.editTeamInitialization());
    const response = yield user3
      .put('/team-test', { ...payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.editTeamDetailsSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.editTeamError());
    } else {
      toast.error(response.response.data.msg);
      yield put(actions.editTeamError());
    }
  } catch (error) {
    yield put(actions.editTeamError());
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.PROVIDER_GET_TEAM_MANAGEMENT_LIST, getTeamListInfo);
  yield takeEvery(actionTypes.PROVIDER_ADD_TEAM_MANAGEMENT_LIST, addTeamListInfo);
  yield takeEvery(actionTypes.PROVIDER_ADD_TEAM_MANAGEMENT_LIST_SUCCESS, getTeamListInfo);
  yield takeEvery(actionTypes.PROVIDER_DELETE_TEAM_MANAGEMENT_LIST, deleteTeamListInfo);
  yield takeEvery(actionTypes.PROVIDER_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS, getTeamListInfo);
  yield takeEvery(actionTypes.PROVIDER_EDIT_TEAM_MANAGEMENT_LIST, editTeamListInfo);
  yield takeEvery(actionTypes.PROVIDER_EDIT_TEAM_MANAGEMENT_LIST_SUCCESS, getTeamListInfo,);
  yield takeEvery(actionTypes.PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST, getUserListInfo);
}
