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
import { user, paymentAPI } from "../services";

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

function* paymentUserReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    const response = yield paymentAPI
      .post('/auth/payment/customer', {},
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
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

function* customerPaymentDetailReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const response = yield paymentAPI
      .get('/auth/payment',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.customerPaymentDetailSuccess({ data: response.data }));
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

function* cardPaymentReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { cardNumber, cvc, expiryMonth, expiryYear, invoiceId, amount, isSave, paymentMethodId, cardType, promocode, newSubscriptionId, requiredToPay  } = action.payload;
    const response = yield paymentAPI
      .post('/auth/payment/card',
        {
          cardNumber,
          cvc,
          expiryYear,
          expiryMonth,
          invoiceId,
          amount,
          paymentMethodId,
          isSave,
          cardType,
          promocode,
          newSubscriptionId,
          requiredToPay
        },
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.cardPaymentSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 500) {
      yield put(actions.paymentError({ data: response.response.data }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* cardRemoveReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { cardId } = action.payload;
    const response = yield paymentAPI({
      method: 'delete',
      url: '/auth/payment/card',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken
      },
      data: {
        cardId
      },
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.cardRemoveSuccess({ data: response.data.data }));
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

export default function* rootsaga() {
  yield takeEvery(actionTypes.PAYMENT_USER, paymentUserReq);
  yield takeEvery(actionTypes.CUSTOMER_PAYMENT_DETAIL, customerPaymentDetailReq);
  yield takeEvery(actionTypes.CARD_PAYMENT, cardPaymentReq);
  yield takeEvery(actionTypes.CARD_REMOVE, cardRemoveReq);
}
