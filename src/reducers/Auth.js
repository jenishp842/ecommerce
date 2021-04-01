/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  info: '',
  documentVerification: '',
  checkUser: '',
  error: '',
  isSuperProvider: '',
  document: '',
  checkUserData: '',
  isVerified: '',
  tokenError: '',
  signupSuccess: '',
  isFirstTimeLogin: '',
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_INFO_SUCCESS:
      return {
        ...state,
        info: action.payload.data,
      };
    case actionTypes.PROVIDER_DOCUMENT_VERIFICATION_SUCCESS:
      return {
        ...state,
        documentVerification: action.payload.data,
      };
    case actionTypes.PROVIDER_CHECK_USER_SUCCESS:
      return {
        ...state,
        checkUser: action.payload.data,
        checkUserData: action.payload.checkUser,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.ERROR_CLEAR:
      return {
        ...state,
        error: '',
        checkUser: '',
      };
    case actionTypes.LOGIN_SUCCESS:
      const {
        isSuperProvider,
        document,
        isVerified,
      } = action.payload.data.data;
      return {
        ...state,
        isSuperProvider: isSuperProvider ? isSuperProvider : '',
        document: document ? document : '',
        isVerified: isVerified ? isVerified : '',
        isFirstTimeLogin: action.payload.data.data.isFirstTimeLogin == undefined ? action.payload.data.data.isFirstTimeLogin : null
      };
    case actionTypes.TOKEN_ERROR:
      return {
        ...state,
        tokenError: action.payload.error,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: action.payload.data,
      };
    default:
      return state;
  }
};
