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
  apiKey: '',
  logList: '',
  logListDetail: '',
  logReportSuccess: '',
};
/*---------------------------------------------------------------------
               Profile
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GENERATE_KEY_SUCCESS:
      return {
        ...state,
        apiKey: action.payload.data,
      };
    case actionTypes.LOG_LIST_SUCCESS:
      return {
        ...state,
        logList: action.payload.data,
      };
    case actionTypes.LOG_LIST_DETAIL_SUCCESS:
      return {
        ...state,
        logListDetail: action.payload.data,
      };
    case actionTypes.LOG_REPORT_SUCCESS:
      return {
        ...state,
        logReportSuccess: action.payload.data,
      };
    default:
      return state;
  }
};
