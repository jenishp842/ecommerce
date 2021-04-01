/* eslint-disable no-empty */
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
/*---------------------------------------------------------------------------------------------
    Auth related api request handled here.
    Basically we create a task and on each takeEvery a task start and call api, dispatched a action
------------------------------------------------------------------------------------------------*/

import { takeEvery, put } from "redux-saga/effects";
import * as actionTypes from "../constants/ActionTypes";
// eslint-disable-next-line import/extensions
import * as actions from "../actions/index";
import { user } from "../services";
import { notification } from "../actions/index";

/*---------------------------------------------------------------------------------------------
                 Sign Up task start when sign up action is listen by saga
------------------------------------------------------------------------------------------------*/
let token;
const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
if (JwtToken == null || JwtToken == "") {
  token = null;
} else {
  token = JwtToken.accessToken.jwtToken;
}

function* notificationReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const response = yield user
      .get("/notification", {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.notificationSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* fcmUpdateReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const { oldFCMToken, newFCMToken } = action.payload;
    const response = yield user
      .post(
        "/update-fcm",
        {
          oldFCMToken,
          newFCMToken,
        },
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          },
        }
      )
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: error }));
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.NOTIFICATION, notificationReq);
  yield takeEvery(actionTypes.FCM_UPDATE, fcmUpdateReq);
}
