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
import { user2 } from '../services';
import { toast } from 'react-toastify';

function* getRoleListInfo(action) {
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    yield put(actions.listRoleInitialization());
    const response = yield user2
      .get('/role',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getRoleDataListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listRoleError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.listRoleError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listRoleError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* deleteRoleListInfo(action) {
  const { payload } = action;
  try {
    yield put(actions.deleteRoleInitialization());
    const response = yield user2
      .delete('/role', { data: payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.deleteRoleSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.deleteRoleError());
      // yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.deleteRoleError());
      toast.error(response.response.data.msg);
      // yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.deleteRoleError());
    // yield put(actions.error({ error: response.response.data.message }));
  }
}

//
function* addRoleListInfo(action) {
  const { payload } = action;
  try {
    yield put(actions.addRoleInitialization());
    const response = yield user2
      .post('/role', { ...payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.addRoleSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.addRoleError());
      // yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.addRoleError());
      toast.error(response.response.data.msg);
      // yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.addRoleError());
    //  toast.error(response.response.data.message);
    // yield put(actions.error({ error: response.response.data.msg }));
  }
}

function* editRoleListInfo(action) {
  const { payload } = action;
  try {
    yield put(actions.editRoleInitialization());
    const response = yield user2
      .put('/role', { ...payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.editRoleSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.editRoleError());
      // yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.editRoleError());
      toast.error(response.response.data.msg);
      // yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.editRoleError());
    //  toast.error(response.response.data.message);
    // yield put(actions.error({ error: response.response.data.msg }));
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.PROVIDER_GET_ROLE_MANAGEMENT_LIST, getRoleListInfo);
  yield takeEvery(actionTypes.PROVIDER_DELETE_ROLE_MANAGEMENT_LIST, deleteRoleListInfo);
  yield takeEvery(actionTypes.PROVIDER_ADD_ROLE_MANAGEMENT_LIST, addRoleListInfo);
  yield takeEvery(actionTypes.PROVIDER_ADD_ROLE_MANAGEMENT_LIST_SUCCESS, getRoleListInfo);
  yield takeEvery(actionTypes.PROVIDER_DELETE_ROLE_MANAGEMENT_LIST_SUCCESS, getRoleListInfo);
  yield takeEvery(actionTypes.PROVIDER_EDIT_ROLE_MANAGEMENT_LIST, editRoleListInfo);
  yield takeEvery(actionTypes.PROVIDER_EDIT_ROLE_MANAGEMENT_LIST_SUCCESS, getRoleListInfo);
}
