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
import { takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actionTypes from "../constants/ActionTypes";
import * as actions from "../actions/index";
import { user, planAPI, paymentAPI } from "../services";

function* getSubscriptionInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));

    // yield put(actions.listUserInitialization());
    const response = yield user
      .get("/subscription", {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.subscriptionSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
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

function* subscriptionSelectionReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const { subscriptionId } = action.payload;
    const response = yield user
      .post(
        "/subscription",
        {
          subscriptionId,
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
      yield put(actions.subscriptionSelectionSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 500) {
      yield put(actions.payableAmount({ data: response.response.data }));
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

function* subscriptionSelectionUpdateReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const { subscriptionId } = action.payload;
    const response = yield user
      .put(
        "/subscription",
        {
          subscriptionId,
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
      yield put(actions.subscriptionSelectionSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 500) {
      yield put(actions.payableAmount({ data: response.response.data }));
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

function* getPlanInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));

    // yield put(actions.listUserInitialization());
    const response = yield planAPI
      .get("/admin/subscription/my-plan", {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getMyPlanSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response }));
    } else if (response.response.status == 500) {
      if (response.response.data.msg == "User is not Activate") {
        yield put(actions.isactive({ data: false }));
      }
      yield put(actions.subscriptionError({ error: response.response }));
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

function* getInvoiceDetail(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));

    // yield put(actions.listUserInitialization());
    const response = yield paymentAPI
      .get("/auth/invoice/active", {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken,
        },
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.invoiceDetailSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
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

function* subscriptionPayableReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const { subscriptionList, newSubscriptionId } = action.payload;
    const response = yield user
      .post(
        "/subscription/payable",
        {
          subscriptionList,
          newSubscriptionId,
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
      yield put(actions.subscriptionPayableSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
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

function* promoReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const { promoCode, newSubId } = action.payload;
    const response = yield user
      .post(
        "/check-promo-validity",
        {
          code: promoCode,
          subscriptionId: newSubId,
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
      yield put(actions.promoSuccess({ data: response.data }));
      toast.success(response.data.msg);
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 500) {
      // yield put(actions.promoSuccess({ data: response.response.data }));
      toast.error(response.response.data.msg);
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

export default function* rootsaga() {
  yield takeEvery(actionTypes.GET_SUBSCRIPTION, getSubscriptionInfo);
  yield takeEvery(actionTypes.SUBSCRIPTION_SELECTION, subscriptionSelectionReq);
  yield takeEvery(actionTypes.GET_MYPLAN, getPlanInfo);
  yield takeEvery(
    actionTypes.SUBSCRIPTION_UPDATE_SELECTION,
    subscriptionSelectionUpdateReq
  );
  yield takeEvery(actionTypes.GET_INVOICE_DETAIL, getInvoiceDetail);
  yield takeEvery(actionTypes.SUBSCRIPTION_PAYABLE, subscriptionPayableReq);
  yield takeEvery(actionTypes.PROMO, promoReq);
}
