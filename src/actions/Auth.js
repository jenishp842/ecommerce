/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  PROVIDER_SIGNUP,
  PROVIDER_INFO,
  PROVIDER_INFO_SUCCESS,
  PROVIDER_DOCUMENT_VERIFICATION,
  PROVIDER_DOCUMENT_VERIFICATION_SUCCESS,
  PROVIDER_CHECK_USER,
  PROVIDER_CHECK_USER_SUCCESS,
  ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  ERROR_CLEAR,
  TOKEN_ERROR,
  BLOCKCHAIN_REGISTER,
  SIGNUP_SUCCESS,
  RECOVER_PASSWORD,
} from "../constants/ActionTypes";

/* ---PROVIDER SIGNUP-- */

export const providerSignup = (payload) => ({
  type: PROVIDER_SIGNUP,
  payload,
});

/* ---PROVIDER GETINFO-- */

export const providerInfo = (payload) => ({
  type: PROVIDER_INFO,
  payload,
});

/* ---PROVIDER GETINFO SUCCESS-- */

export const providerInfoSuccess = (payload) => ({
  type: PROVIDER_INFO_SUCCESS,
  payload,
});

/* ---PROVIDER DOCUMENT VERIFICATION-- */

export const providerDocumentVerification = (payload) => ({
  type: PROVIDER_DOCUMENT_VERIFICATION,
  payload,
});

/* ---PROVIDER DOCUMENT VERIFICATION SUCCESS-- */

export const providerDocumentVerificationSuccess = (payload) => ({
  type: PROVIDER_DOCUMENT_VERIFICATION_SUCCESS,
  payload,
});

/* ---PROVIDER CHECK USER- */

export const checkUser = (payload) => ({
  type: PROVIDER_CHECK_USER,
  payload,
});

/* ---PROVIDER CHECK USER SUCCESS- */

export const checkUserSuccess = (payload) => ({
  type: PROVIDER_CHECK_USER_SUCCESS,
  payload,
});

/* ---ERROR */

export const error = (payload) => ({
  type: ERROR,
  payload,
});

/* ---ERROR CLEAR */

// AuthError
export const autherror = (payload) => ({
  type: ERROR,
  payload,
});

export const errorClear = () => ({
  type: ERROR_CLEAR,
});

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const tokenError = (payload) => ({
  type: TOKEN_ERROR,
  payload,
});

export const blockchainRegister = (payload) => ({
  type: BLOCKCHAIN_REGISTER,
  payload,
});

export const signupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const recoverPassword = (payload) => ({
  type: RECOVER_PASSWORD,
  payload,
});
