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
  transactionList: '',
  transactionDetailSuccess: '',
};
/*---------------------------------------------------------------------
               Profile
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TRANSACTION_LIST_SUBMIT:
      return {
        ...state,
        transactionList: action.payload.data,
      };
    case actionTypes.TRANSACTION_DETAIL_SUCCESS:
      return {
        ...state,
        transactionDetailSuccess: action.payload.data,
      };
    default:
      return state;
  }
};
