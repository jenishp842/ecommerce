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
import { user, blockchain } from "../services";
import { JS } from "aws-amplify";

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

function* signUp(action) {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      referralCode,
      cognitoId,
    } = action.payload;
    const Email = email;
    const response = yield user
      .post("/signup", {
        firstName,
        lastName,
        mobileNumber: mobile,
        email: Email,
        referralCode,
        cognitoId,
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status == 200) {
      yield put(actions.signupSuccess({ data: response.data.data }));
    } else if (response != 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(
      actions.autherror({ authmessage: response.response.data.message })
    );
  }
}

function* getInfoRequest(action) {
  try {
    const { email } = action.payload;
    // const Email = email.toLowerCase();
    const response = yield user
      .post("/get-info", {
        email,
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status == 200) {
      yield localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.data)
      );
      yield put(actions.providerInfoSuccess({ data: response.data }));
    } else if (response != 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

// function* rememberME(action) {
//   const { email, password } = action.payload;
//   yield localStorage.setItem(
//     'email',
//     JSON.stringify(email),
//   );
//   yield localStorage.setItem(
//     'password',
//     JSON.stringify(password),
//   );
// }

function* documentVerificationRequest(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const { duns, organizationName } = action.payload;
    const cognitoId = JSON.parse(localStorage.getItem("cognitoId"));
    // const Email = email.toLowerCase();
    const response = yield user
      .post(
        "/submit-document",
        {
          duns_number: duns,
          organization_name: organizationName,
          _id: cognitoId,
        },
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken,
          },
        }
      )
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status == 200) {
      yield localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.data)
      );
      yield put(
        actions.providerDocumentVerificationSuccess({ data: response.data })
      );
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status != 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* checkUserRequest(action) {
  try {
    const { field, value } = action.payload;
    // const Email = email.toLowerCase();
    const valueId = field == "mobileNumber" ? `+${value}` : value;
    const response = yield user
      .get(`/check-user?field=${field}&value=${valueId}`)
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status == 200) {
      yield put(actions.checkUserSuccess({ data: response.data }));
      yield put(actions.error({ error: "" }));
    } else if (response.status != 200) {
      yield put(
        actions.checkUserSuccess({ data: "", checkUser: response.data })
      );
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* loginRequest(action) {
  try {
    const { cognitoId } = action.payload;
    // const Email = email.toLowerCase();
    const response = yield user
      .post("/login", {
        cognitoId,
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status == 200) {
      yield put(actions.loginSuccess({ data: response.data }));
      localStorage.setItem(
        "isFirstTimeLogin",
        JSON.stringify(response.data.data.isFirstTimeLogin)
      );
      localStorage.setItem(
        "logId",
        JSON.stringify(response.data.data.logId)
      );
    } else if (response != 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* blockchainRegisterReq(action) {
  try {
    const { username, passcode, orgName } = action.payload;
    // const Email = email.toLowerCase();
    const response = yield blockchain
      .post("/register-user", {
        username,
        passcode,
        orgName,
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status == 200) {
      console.log("200");
    } else if (response != 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* recoverPasswordReq(action) {
  try {
    const { email, passcode, certi } = action.payload;
    // const Email = email.toLowerCase();
    const fd = new FormData();
    fd.append('email', email);
    fd.append('newPasscode', passcode);
    fd.append('certificate', certi);
    const response = yield blockchain({
      method: "post",
      url: "/recover-wallet",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: fd,
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status == 200) {
      console.log("200");
    } else if (response != 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}
export default function* rootsaga() {
  yield takeEvery(actionTypes.PROVIDER_SIGNUP, signUp);
  yield takeEvery(actionTypes.PROVIDER_INFO, getInfoRequest);
  yield takeEvery(
    actionTypes.PROVIDER_DOCUMENT_VERIFICATION,
    documentVerificationRequest
  );
  yield takeEvery(actionTypes.PROVIDER_CHECK_USER, checkUserRequest);
  yield takeEvery(actionTypes.LOGIN, loginRequest);
  yield takeEvery(actionTypes.BLOCKCHAIN_REGISTER, blockchainRegisterReq);
  yield takeEvery(actionTypes.RECOVER_PASSWORD, recoverPasswordReq);
}
