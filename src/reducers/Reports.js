/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  tikReports: {
    tikReportsData: {},
    tikReportsLoader: false,
  },
  torReports: {
    torReportsData: {},
    torReportsLoader: false,
  },
  torFilterData: '',
  tabData: 'all',
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_INITIALIZATION_TIK_REPORTS_MANAGEMENT_LIST:
      return {
        ...state,
        tikReports: {
          tikReportsData: {},
          tikReportsLoader: true,
        },
      };
    case actionTypes.PROVIDER_TIK_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        tikReports: {
          tikReportsData: action.payload.data,
          tikReportsLoader: false,
        },
      };
    case actionTypes.TIK_REPORTS_ERROR:
      return {
        ...state,
        tikReports: {
          tikReportsData: {},
          tikReportsLoader: false,
        },
      };
    case actionTypes.PROVIDER_INITIALIZATION_TOR_REPORTS_MANAGEMENT_LIST:
      return {
        ...state,
        torReports: {
          torReportsData: {},
          torReportsLoader: true,
        },
      };
    case actionTypes.PROVIDER_TOR_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        torReports: {
          torReportsData: action.payload.data,
          torReportsLoader: false,
        },
      };
    case actionTypes.TOR_REPORTS_ERROR:
      return {
        ...state,
        torReports: {
          torReportsData: {},
          torReportsLoader: false,
        },
      };
    case actionTypes.GET_TIK_TAB_DATA_TIK:
      return {
        ...state,
        tabData: action.payload,
      };
    case actionTypes.TOR_REPORTS_ROLE_SUCCESS:
      return {
        ...state,
        torFilterData: action.payload.data,
      };
    default:
      return state;
  }
};
