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
import { toast } from "react-toastify";
import * as actionTypes from "../constants/ActionTypes";
// eslint-disable-next-line import/extensions
import * as actions from "../actions/index";
import { helpApi } from "../services";

/*---------------------------------------------------------------------------------------------
                 Sign Up task start when sign up action is listen by saga
------------------------------------------------------------------------------------------------*/
let token;
const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
if (JwtToken == null || JwtToken == '') {
  token = null;
} else {
  token = JwtToken.accessToken.jwtToken;
}

function* ticketListReq(action) {
  try {
    const response = yield helpApi
      .get('/ticket_fields.json',
        {
          auth: { username: "admin@doctrace.com", password: "solulab-temp" }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.ticketListSuccess({ data: response.data.ticket_fields }));
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

function* ticketSubmitReq(action) {
  try {
    const { email, subject, description, issue } = action.payload;
    const response = yield helpApi
      .post('/tickets.json', {
        ticket: {
          requester: { email, name: email },
          subject,
          comment: { body: description },
          custom_fields: [{ id: 360038338431, value: issue }],
        }
      },
      {
        auth: { username: "admin@doctrace.com", password: "solulab-temp" }
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 201) {
      yield put(actions.ticketSubmitSuccess({ data: response }));
    } else if (response.response.status !== 201) {
      yield put(actions.error({ error: response.response }));
      toast.error(response.response.data.details.requester[0].description);
    } else {
      yield put(actions.error({ error: response.response }));
    }
  } catch (error) {
    // yield put(actions.error({ error: response.response }));
    // toast.error(error);
    console.log(error);
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.TICKET_LIST, ticketListReq);
  yield takeEvery(actionTypes.TICKET_SUBMIT, ticketSubmitReq);
}
