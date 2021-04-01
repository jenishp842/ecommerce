/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  toReceiverData: [],
  toProviderData: [],
  advanceSearchValue: '',
  advanceSearchValueData: '',
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TO_RECEIVER_API_SUCCESS:
      return {
        ...state,
        toReceiverData: action.payload.data,
      };
    case actionTypes.TO_RECEIVER_API_ERROR:
      return {
        ...state,
        toReceiverData: [],
      };
    case actionTypes.FROM_PROVIDER_API_SUCCESS:
      return {
        ...state,
        toProviderData: action.payload.data,
      };
    case actionTypes.FROM_PROVIDER_API_ERROR:
      return {
        ...state,
        toProviderData: [],
      };
    case actionTypes.PROVIDER_INITIALIZATION_ADVANCESEARCH:
      return {
        ...state,
        searchData: [],
        searchLoader: true,
      };
    case actionTypes.PROVIDER_ADVANCESEARCH_SUCCESS:
      return {
        ...state,
        searchData: action.payload.data,
        searchLoader: false,
        advanceSearchValueData: action.payload.advanceSearchValueData,
      };
    case actionTypes.PROVIDER_ADVANCESEARCH_ERROR:
      return {
        ...state,
        searchData: [],
        searchLoader: false,
      };
    case actionTypes.PROVIDER_INITIALIZATION_SIMPLESEARCH:
      return {
        ...state,
        searchData: [],
        searchLoader: true,
      };
    case actionTypes.ADVANCE_SEARCH_VALUES:
      return {
        ...state,
        advanceSearchValue: action.payload,
      };
    case actionTypes.SIMPLE_SEARCH_VALUES:
      return {
        ...state,
        simpleSearchValues: action.payload,
      };
    case actionTypes.CLEAR_SEARCH_VALUES:
      return {
        ...state,
        simpleSearchValues: '',
        advanceSearchValue: '',
      };
    default:
      return state;
  }
};
