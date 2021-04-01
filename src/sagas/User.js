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
import { user, faqApi } from '../services';
import { toast } from 'react-toastify';

function* getUserListInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    yield put(actions.listUserInitialization());
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
      yield put(actions.getUserDataListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* deleteUserListInfo(action) {
  const { userId } = action.payload;
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    const response = yield user({
      method: 'delete',
      url: '/provider-user',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken
      },
      data: {
        providerId: userId
      },
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      // getRoleListInfo()
      yield put(actions.deleteUserSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status == 500) {
      toast.error(response.response.data.msg);
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* addUserListInfo(action) {
  const { payload } = action;

  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    yield put(actions.addUserInitialization());
    const response = yield user
      .post('/provider-user', payload, {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken
        }
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      getUserListInfo(action);
      yield put(actions.addUserSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.addUserError());
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.addUserError());
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.addUserError());
    //  toast.error(response.response.data.message);
    yield put(actions.error({ error: response.response.data.msg }));
  }
}

function* editUserListInfo(action) {
  const { payload } = action;

  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    yield put(actions.addUserInitialization());
    const response = yield user
      .put('/provider-user', payload, {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken
        }
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      getUserListInfo(action);
      yield put(actions.editUserSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.addUserError());
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.addUserError());
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.addUserError());
    //  toast.error(response.response.data.message);
    yield put(actions.error({ error: response.response.data.msg }));
  }
}

function* faqReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    const response = yield faqApi
      .get('/faq',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.faqSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* faqSearchReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { keyword } = action.payload;
    const response = yield faqApi
      .get(`/faq/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.faqSearchSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.PROVIDER_GET_USER_MANAGEMENT_LIST, getUserListInfo);
  yield takeEvery(actionTypes.PROVIDER_DELETE_USER_MANAGEMENT_LIST, deleteUserListInfo);
  yield takeEvery(actionTypes.PROVIDER_ADD_USER_MANAGEMENT_LIST, addUserListInfo);
  yield takeEvery(actionTypes.PROVIDER_EDIT_USER_MANAGEMENT_LIST, editUserListInfo);
  yield takeEvery(actionTypes.FAQ, faqReq);
  yield takeEvery(actionTypes.FAQ_SEARCH, faqSearchReq);
}
